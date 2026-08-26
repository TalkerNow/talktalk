(function () {
  "use strict";

  var cfg = window.talkerNow;
  if (!cfg || !document.body || window.talkerNowBooted) {
    return;
  }
  window.talkerNowBooted = true;

  var ATTRACT_FIRST_MS = 2400;
  var ATTRACT_ON_MS = 4000;
  var ATTRACT_REST_MS = 7000;
  var LEAVE_DELAY_MS = 220;
  var SESSION_KEY = "talkerNowSession";

  var reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
  var root = el("div", "talker-now-root");
  var stage = el("div", "talker-now-stage");
  var invites = el("div", "talker-now-invites");
  var launcherWrap = el("div", "talker-now-launcher-wrap");
  var halo = el("div", "talker-now-halo");
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

  (cfg.invites || []).forEach(function (invite) {
    if (!invite || !invite.label) {
      return;
    }
    var chip = el("button", "talker-now-chip", { type: "button" });
    chip.appendChild(el("span", "", { text: invite.label }));
    if (invite.id === "talker") {
      chip.classList.add("is-shine");
    }
    if (invite.id === "hello") {
      chip.classList.add("is-hello");
    }
    chip.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      pinned = false;
      hover = false;
      openPanel();
      if (!isManager) {
        sendMessage(invite.label, invite.id || "invite");
      }
    });
    invites.appendChild(chip);
  });

  var hover = false;
  var pinned = false;
  var panelOpen = false;
  var attractOn = false;
  var leaveTimer = null;
  var attractTimer = null;
  var attractOffTimer = null;
  var busy = false;
  var greeted = false;

  function chipsWanted() {
    return !panelOpen && (hover || pinned || attractOn);
  }

  function syncChrome() {
    var show = chipsWanted();
    invites.classList.toggle("is-open", show);
    ad.classList.toggle("is-on", show);
    launcher.setAttribute("aria-expanded", panelOpen || show ? "true" : "false");
  }

  function pinInvites() {
    pinned = true;
    syncChrome();
  }

  function setAttract(on) {
    attractOn = on;
    halo.classList.toggle("is-on", on);
    badge.classList.toggle("is-on", on);
    syncChrome();
  }

  function clearAttractTimers() {
    clearTimeout(attractTimer);
    clearTimeout(attractOffTimer);
  }

  function scheduleAttract(delay) {
    if (reduced || panelOpen) {
      return;
    }
    clearAttractTimers();
    attractTimer = setTimeout(function () {
      if (panelOpen) {
        return;
      }
      setAttract(true);
      attractOffTimer = setTimeout(function () {
        setAttract(false);
        scheduleAttract(ATTRACT_REST_MS);
      }, ATTRACT_ON_MS);
    }, delay);
  }

  function openPanel() {
    panelOpen = true;
    panel.classList.add("is-open");
    setAttract(false);
    clearAttractTimers();
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
    scheduleAttract(ATTRACT_REST_MS);
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

  var managerHelloBusy = false;
  function startManagerHello() {
    if (!cfg.restUrl || managerHelloBusy) {
      if (!cfg.restUrl) {
        addBot(
          i18n.scanning ||
            "Je parcours votre site maintenant : je défile et je lis l’accueil. Un instant, je reviens avec des questions sur votre métier."
        );
      }
      return;
    }
    managerHelloBusy = true;
    var typing = addTyping();
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
      .then(function (res) {
        return res.json().catch(function () {
          return {};
        });
      })
      .then(function (data) {
        if (typing && typing.parentNode) {
          typing.parentNode.removeChild(typing);
        }
        managerHelloBusy = false;
        var reply = (data && (data.reply || data.message || data.text)) || "";
        if (reply) {
          addBot(reply);
        }
        if (data && data.crawl && data.crawl !== "done" && data.qcm !== "asked") {
          window.setTimeout(startManagerHello, 1600);
        }
      })
      .catch(function () {
        if (typing && typing.parentNode) {
          typing.parentNode.removeChild(typing);
        }
        managerHelloBusy = false;
        addBot(
          i18n.scanning ||
            "Je parcours votre site maintenant : je défile et je lis l’accueil. Un instant, je reviens avec des questions sur votre métier."
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
      ? i18n.scanning ||
        "Je parcours votre site maintenant : je défile et je lis l’accueil. Un instant, je reviens avec des questions sur votre métier."
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
      .then(function (res) {
        return res.json().catch(function () {
          return {};
        });
      })
      .then(function (data) {
        var reply =
          (data && (data.reply || data.message || data.text)) || fallback;
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
    pinned = !pinned;
    syncChrome();
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
      return;
    }
    if (pinned) {
      pinned = false;
      syncChrome();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && panelOpen) {
      closePanel();
    }
  });

  scheduleAttract(ATTRACT_FIRST_MS);

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
        }).catch(function () {});
      }
    } catch (e) {}
  }
})();
