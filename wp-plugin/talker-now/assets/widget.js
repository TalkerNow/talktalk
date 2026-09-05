(function () {
  "use strict";

  var cfg = window.talkerNow;
  if (!cfg || !document.body || window.talkerNowBooted) {
    return;
  }
  window.talkerNowBooted = true;

  var LEAVE_DELAY_MS = 220;
  var A_HOLD_MS = 1100;
  var WAVE_MS = 1500;
  var POST_WAVE_MS = 400;
  var BADGE_ALONE_MS = 1600;
  var CHIP_STAGGER_MS = 1000;
  var SESSION_KEY = "talkerNowSession";

  var reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function parseRest(res) {
    if (res && res.status === 429) {
      return Promise.resolve({
        code: "talker_rate_limited",
        visual: "scan",
        crawl: "running",
      });
    }
    return res.json().catch(function () {
      return {};
    });
  }

  function sessionId() {
    try {
      var existing = window.sessionStorage.getItem(SESSION_KEY);
      if (existing) {
        return existing;
      }
      var id =
        "tn_" +
        Math.random().toString(36).slice(2) +
        Date.now().toString(36);
      window.sessionStorage.setItem(SESSION_KEY, id);
      return id;
    } catch (e) {
      return "tn_" + Date.now().toString(36);
    }
  }

  function el(tag, className, attrs) {
    var node = document.createElement(tag);
    if (className) {
      node.className = className;
    }
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        if (key === "text") {
          node.textContent = attrs[key];
        } else {
          node.setAttribute(key, attrs[key]);
        }
      });
    }
    return node;
  }

  var i18n = cfg.i18n || {};
  var isManager = Boolean(cfg.manager && cfg.surface === "admin");
  var root = el("div", "talker-now-root is-beat-a");
  if (isManager) {
    root.classList.add("is-admin");
  }
  var stage = el("div", "talker-now-stage");
  var invites = el("div", "talker-now-invites");
  var launcherWrap = el("div", "talker-now-launcher-wrap is-shown is-calm");
  var halo = el("div", "talker-now-halo");
  halo.appendChild(el("span", "talker-now-ring"));
  halo.appendChild(el("span", "talker-now-ring"));
  halo.appendChild(el("span", "talker-now-ring"));
  var badge = el("span", "talker-now-badge", { text: "1" });
  var launcher = el("button", "talker-now-launcher", {
    type: "button",
    "aria-label": i18n.open || "Ouvrir la discussion",
    "aria-expanded": "false",
  });
  launcher.innerHTML =
    '<svg class="talker-now-bubble" viewBox="-682.69 -622.02 1365.38 1365.38" aria-hidden="true">' +
    '<path fill="#F7F6F4" stroke="#C43F17" stroke-width="66.70" stroke-linejoin="miter" stroke-miterlimit="10" ' +
    'd="M -93.33 396.27 A 466.65 400.00 0 1 0 -291.66 315.72 L -312.50 554.69 Z"/>' +
    '<circle class="talker-now-dot" cx="-163" cy="0" r="60"/>' +
    '<circle class="talker-now-dot" cx="0" cy="0" r="60"/>' +
    '<circle class="talker-now-dot" cx="163" cy="0" r="60"/>' +
    "</svg>";

  var ad = el("div", "talker-now-ad");
  ad.appendChild(el("span", "", { text: "Talker" }));

  var panel = el("div", "talker-now-panel");
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "true");
  panel.setAttribute("aria-label", i18n.title || cfg.siteName || "Discussion");

  var head = el("div", "talker-now-panel-head");
  head.appendChild(el("h2", "", { text: i18n.title || cfg.siteName || "" }));
  var closeBtn = el("button", "talker-now-close", {
    type: "button",
    "aria-label": i18n.close || "Fermer",
    text: i18n.close || "Fermer",
  });
  head.appendChild(closeBtn);

  var thread = el("div", "talker-now-thread");

  var contact = el("details", "talker-now-contact");
  contact.appendChild(
    el("summary", "", { text: i18n.contactToggle || i18n.contactHint || "" })
  );
  var contactFields = el("div", "talker-now-contact-fields");
  var nameInput = el("input", "", {
    type: "text",
    name: "talker-name",
    autocomplete: "name",
    placeholder: i18n.name || "Nom",
  });
  var emailInput = el("input", "", {
    type: "email",
    name: "talker-email",
    autocomplete: "email",
    placeholder: i18n.email || "E-mail",
  });
  var phoneInput = el("input", "", {
    type: "tel",
    name: "talker-phone",
    autocomplete: "tel",
    placeholder: i18n.phone || "Téléphone",
  });
  contactFields.appendChild(nameInput);
  contactFields.appendChild(emailInput);
  contactFields.appendChild(phoneInput);
  contact.appendChild(contactFields);

  var composer = el("div", "talker-now-composer");
  var composerRow = el("div", "talker-now-composer-row");
  var textarea = el("textarea", "", {
    rows: "1",
    placeholder: i18n.placeholder || "",
  });
  var sendBtn = el("button", "talker-now-send", {
    type: "button",
    text: i18n.send || "Envoyer",
  });
  composerRow.appendChild(textarea);
  composerRow.appendChild(sendBtn);
  composer.appendChild(composerRow);

  panel.appendChild(head);
  panel.appendChild(thread);
  if (cfg.showContact) {
    panel.appendChild(contact);
  }
  panel.appendChild(composer);
  if (cfg.poweredBy) {
    panel.appendChild(
      el("p", "talker-now-powered", {
        text: i18n.poweredBy || "Propulsé par talker.now",
      })
    );
  }

  launcherWrap.appendChild(halo);
  launcherWrap.appendChild(badge);
  launcherWrap.appendChild(launcher);

  stage.appendChild(invites);
  stage.appendChild(ad);
  stage.appendChild(launcherWrap);
  root.appendChild(panel);
  root.appendChild(stage);
  document.body.appendChild(root);

  var chipNodes = [];
  (cfg.invites || []).forEach(function (invite) {
    if (!invite || !invite.label) {
      return;
    }
    var chip = el("button", "talker-now-chip", { type: "button" });
    if (invite.id === "hello") {
      chip.classList.add("is-hello");
      var helloSpan = el("span");
      var raw = String(invite.label);
      var cut = raw.indexOf("?");
      if (cut !== -1 && cut < raw.length - 1) {
        helloSpan.appendChild(document.createTextNode(raw.slice(0, cut + 1).trim()));
        helloSpan.appendChild(document.createElement("br"));
        helloSpan.appendChild(document.createTextNode(raw.slice(cut + 1).trim()));
      } else {
        helloSpan.textContent = raw;
      }
      chip.appendChild(helloSpan);
    } else {
      chip.appendChild(el("span", "", { text: invite.label }));
    }
    if (invite.id === "talker") {
      chip.classList.add("is-shine");
    }
    chip.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      hover = false;
      openPanel();
      if (!isManager) {
        sendMessage(invite.label, invite.id || "invite");
      }
    });
    invites.appendChild(chip);
    chipNodes.push(chip);
  });

  var hover = false;
  var panelOpen = false;
  var chipsRevealed = false;
  var unreadOn = false;
  var leaveTimer = null;
  var attractTimer = null;
  var attractHaloTimer = null;
  var attractBadgeTimer = null;
  var attractChipTimer = null;
  var busy = false;
  var greeted = false;

  function chipsWanted() {
    return !panelOpen && chipsRevealed && (unreadOn || hover);
  }

  function anyChipIn() {
    return chipNodes.some(function (chip) {
      return chip.classList.contains("is-in");
    });
  }

  function syncChrome() {
    var show = chipsWanted();
    invites.classList.toggle("is-open", show && anyChipIn());
    ad.classList.toggle("is-on", show && !isManager && anyChipIn());
    launcher.setAttribute("aria-expanded", panelOpen || show ? "true" : "false");
  }

  function setBeat(name) {
    root.classList.remove("is-beat-a", "is-beat-b", "is-beat-c", "is-beat-d");
    if (name) {
      root.classList.add("is-beat-" + name);
    }
  }

  function stopHalo() {
    halo.classList.remove("is-pulse");
  }

  function stopUnread() {
    unreadOn = false;
    badge.classList.remove("is-on");
    launcherWrap.classList.remove("is-unread");
  }

  function setCalm(on) {
    launcherWrap.classList.toggle("is-calm", on);
  }

  function hideAllChips() {
    chipsRevealed = false;
    chipNodes.forEach(function (chip) {
      chip.classList.remove("is-in");
    });
    invites.classList.remove("is-open");
    ad.classList.remove("is-on");
  }

  function clearAttractTimers() {
    clearTimeout(attractTimer);
    clearTimeout(attractHaloTimer);
    clearTimeout(attractBadgeTimer);
    clearTimeout(attractChipTimer);
  }

  function abortAttract() {
    clearAttractTimers();
    stopHalo();
    stopUnread();
    setCalm(false);
    setBeat("");
    hideAllChips();
    syncChrome();
  }

  function showCalmBubble() {
    stopHalo();
    stopUnread();
    setCalm(true);
    launcherWrap.classList.add("is-shown");
    hideAllChips();
    setBeat("a");
    syncChrome();
  }

  function showUnreadMark() {
    setCalm(true);
    stopHalo();
    unreadOn = true;
    badge.classList.add("is-on");
    launcherWrap.classList.add("is-unread");
    setBeat("c");
    hideAllChips();
    syncChrome();
  }

  function revealChips() {
    chipsRevealed = true;
    setBeat("d");
    var i = 0;
    function nextChip() {
      if (panelOpen || !unreadOn) {
        return;
      }
      if (i >= chipNodes.length) {
        syncChrome();
        return;
      }
      chipNodes[i].classList.add("is-in");
      invites.classList.add("is-open");
      if (!isManager && i === 0) {
        ad.classList.add("is-on");
      }
      i += 1;
      attractChipTimer = setTimeout(nextChip, CHIP_STAGGER_MS);
    }
    nextChip();
  }

  function playAttractSequence() {
    if (panelOpen) {
      return;
    }
    clearAttractTimers();
    showCalmBubble();

    function afterBadgeAlone() {
      if (panelOpen || !unreadOn) {
        return;
      }
      revealChips();
    }

    function afterWave() {
      if (panelOpen) {
        return;
      }
      stopHalo();
      setBeat("a");
      attractTimer = setTimeout(function () {
        if (panelOpen) {
          return;
        }
        showUnreadMark();
        attractChipTimer = setTimeout(afterBadgeAlone, BADGE_ALONE_MS);
      }, POST_WAVE_MS);
    }

    if (reduced) {
      attractTimer = setTimeout(function () {
        if (panelOpen) {
          return;
        }
        showUnreadMark();
        attractChipTimer = setTimeout(afterBadgeAlone, BADGE_ALONE_MS);
      }, A_HOLD_MS);
      return;
    }

    attractHaloTimer = setTimeout(function () {
      if (panelOpen) {
        return;
      }
      stopUnread();
      hideAllChips();
      setCalm(true);
      setBeat("b");
      halo.classList.add("is-pulse");
      attractBadgeTimer = setTimeout(afterWave, WAVE_MS);
    }, A_HOLD_MS);
  }

  function openPanel() {
    panelOpen = true;
    panel.classList.add("is-open");
    abortAttract();
    launcherWrap.classList.add("is-shown");
    chipsRevealed = true;
    chipNodes.forEach(function (chip) {
      chip.classList.add("is-in");
    });
    syncChrome();
    if (!greeted) {
      greeted = true;
      if (isManager) {
        startManagerHello();
      } else if (cfg.greeting) {
        addBot(cfg.greeting);
      }
    }
    textarea.focus();
  }

  function closePanel() {
    panelOpen = false;
    panel.classList.remove("is-open");
    launcherWrap.classList.add("is-shown");
    syncChrome();
  }

  function addMsg(text, who) {
    var msg = el("div", "talker-now-msg is-" + who, { text: text });
    thread.appendChild(msg);
    thread.scrollTop = thread.scrollHeight;
    return msg;
  }

  function addBot(text) {
    return addMsg(text, "bot");
  }

  function addTyping() {
    var msg = el("div", "talker-now-msg is-bot");
    var dots = el("span", "talker-now-typing");
    dots.appendChild(el("i"));
    dots.appendChild(el("i"));
    dots.appendChild(el("i"));
    msg.appendChild(dots);
    thread.appendChild(msg);
    thread.scrollTop = thread.scrollHeight;
    return msg;
  }

  var scanNode = null;
  function addScan() {
    if (scanNode && scanNode.parentNode) {
      return scanNode;
    }
    var msg = el("div", "talker-now-msg is-bot is-scan");
    msg.setAttribute("role", "status");
    msg.setAttribute(
      "aria-label",
      i18n.scanning || "Je parcours votre site."
    );
    var box = el("div", "talker-now-scan");
    var wheel = el("span", "talker-now-scan-wheel");
    wheel.setAttribute("aria-hidden", "true");
    var machine = el("span", "talker-now-scan-machine");
    machine.setAttribute("aria-hidden", "true");
    machine.innerHTML =
      '<svg class="talker-now-scan-pc" viewBox="0 0 32 28" focusable="false">' +
      '<rect x="2" y="1" width="28" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>' +
      '<rect x="11" y="21" width="10" height="2" fill="currentColor"/>' +
      '<path d="M8 26h16" stroke="currentColor" stroke-width="2" fill="none"/>' +
      '<rect x="7" y="6" width="4" height="4" fill="currentColor" opacity="0.35"/>' +
      '<rect x="14" y="6" width="4" height="4" fill="currentColor" opacity="0.55"/>' +
      '<rect x="21" y="6" width="4" height="4" fill="currentColor" opacity="0.8"/>' +
      "</svg>";
    box.appendChild(wheel);
    box.appendChild(machine);
    box.appendChild(
      el("span", "talker-now-scan-copy", {
        text: i18n.scanningShort || "Je parcours votre site…",
      })
    );
    msg.appendChild(box);
    thread.appendChild(msg);
    thread.scrollTop = thread.scrollHeight;
    scanNode = msg;
    return msg;
  }

  function removeScan() {
    if (scanNode && scanNode.parentNode) {
      scanNode.parentNode.removeChild(scanNode);
    }
    scanNode = null;
  }

  function crawlKnownDone() {
    try {
      return window.sessionStorage.getItem("talkerNowCrawl") === "done";
    } catch (e) {
      return false;
    }
  }

  function rememberCrawl(status) {
    try {
      if (status === "done" || status === "failed") {
        window.sessionStorage.setItem("talkerNowCrawl", "done");
      } else if (status) {
        window.sessionStorage.setItem("talkerNowCrawl", String(status));
      }
    } catch (e) {}
  }

  function showManagerPayload(data) {
    var intro = (data && data.intro) || "";
    var question = (data && data.question) || "";
    var reply = (data && (data.reply || data.message || data.text)) || "";
    if (intro) {
      addBot(intro);
    }
    if (question && question !== intro) {
      addBot(question);
    } else if (!intro && reply) {
      addBot(reply);
    }
  }

  var managerHelloBusy = false;
  function startManagerHello() {
    if (!cfg.restUrl || managerHelloBusy) {
      if (!cfg.restUrl && !crawlKnownDone()) {
        addScan();
      }
      return;
    }
    managerHelloBusy = true;
    if (!crawlKnownDone()) {
      addScan();
    }
    fetch(cfg.restUrl, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "X-WP-Nonce": cfg.nonce || "",
      },
      body: JSON.stringify({
        session: sessionId(),
        message: "",
        intent: "hello",
        surface: "admin",
        actor: "manager",
        contact: {},
      }),
    })
      .then(parseRest)
      .then(function (data) {
        managerHelloBusy = false;
        rememberCrawl(data && data.crawl);
        if (data && data.visual === "scan") {
          addScan();
          window.setTimeout(startManagerHello, 1200);
          return;
        }
        removeScan();
        showManagerPayload(data);
      })
      .catch(function () {
        managerHelloBusy = false;
        if (!crawlKnownDone()) {
          addScan();
          window.setTimeout(startManagerHello, 1600);
          return;
        }
        removeScan();
        addBot(
          i18n.scanned ||
            "J’ai parcouru votre site, on peut commencer le QCM."
        );
      });
  }

  function contactPayload() {
    return {
      name: (nameInput.value || "").trim(),
      email: (emailInput.value || "").trim(),
      phone: (phoneInput.value || "").trim(),
    };
  }

  function sendMessage(text, intent) {
    var message = (text || "").trim();
    if (!message || busy) {
      return;
    }
    busy = true;
    sendBtn.disabled = true;
    addMsg(message, "user");
    var typing = addTyping();
    var body = {
      session: sessionId(),
      message: message,
      intent: intent || "message",
      surface: cfg.surface === "admin" ? "admin" : "public",
      actor: cfg.manager && cfg.surface === "admin" ? "manager" : "visitor",
      contact: contactPayload(),
    };
    var fallback = isManager
      ? "C’est noté."
      : i18n.offline || "Merci. Nous vous recontacterons.";

    function done(reply) {
      if (typing && typing.parentNode) {
        typing.parentNode.removeChild(typing);
      }
      addBot(reply || fallback);
      busy = false;
      sendBtn.disabled = false;
    }

    if (!cfg.restUrl) {
      done(fallback);
      return;
    }

    fetch(cfg.restUrl, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "X-WP-Nonce": cfg.nonce || "",
      },
      body: JSON.stringify(body),
    })
      .then(parseRest)
      .then(function (data) {
        var reply =
          (data && (data.reply || data.question || data.message || data.text)) ||
          fallback;
        done(reply);
      })
      .catch(function () {
        done(fallback);
      });
  }

  function onEnter() {
    hover = true;
    clearTimeout(leaveTimer);
    syncChrome();
  }

  function onLeave() {
    hover = false;
    clearTimeout(leaveTimer);
    leaveTimer = setTimeout(syncChrome, LEAVE_DELAY_MS);
  }

  launcherWrap.addEventListener("mouseenter", onEnter);
  launcherWrap.addEventListener("mouseleave", onLeave);
  invites.addEventListener("mouseenter", onEnter);
  invites.addEventListener("mouseleave", onLeave);

  launcher.addEventListener("click", function () {
    if (panelOpen) {
      closePanel();
      return;
    }
    openPanel();
  });

  closeBtn.addEventListener("click", closePanel);

  sendBtn.addEventListener("click", function () {
    var value = textarea.value;
    textarea.value = "";
    sendMessage(value, "message");
  });

  textarea.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      var value = textarea.value;
      textarea.value = "";
      sendMessage(value, "message");
    }
  });

  document.addEventListener("pointerdown", function (event) {
    var target = event.target;
    if (!(target instanceof Node)) {
      return;
    }
    if (root.contains(target)) {
      return;
    }
    if (panelOpen) {
      closePanel();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && panelOpen) {
      closePanel();
    }
  });

  playAttractSequence();

  if (cfg.manager && cfg.surface === "admin" && cfg.restUrl) {
    try {
      if (!window.sessionStorage.getItem("talkerNowSiteRead")) {
        window.sessionStorage.setItem("talkerNowSiteRead", "1");
        fetch(cfg.restUrl, {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            "X-WP-Nonce": cfg.nonce || "",
          },
          body: JSON.stringify({
            session: sessionId(),
            message: "",
            intent: "site_read",
            surface: "admin",
            actor: "manager",
            contact: {},
          }),
        })
          .then(parseRest)
          .then(function (data) {
            rememberCrawl(data && data.crawl);
          })
          .catch(function () {});
      }
    } catch (e) {}
  }
})();
