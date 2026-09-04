"use client";

import { useState, useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { TalkerWordmark } from "@/components/brand/mark";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useLocale } from "@/components/i18n/locale-context";
import { Menu, X } from "lucide-react";

function resolveNavHref(href: string, pathname: string) {
  if (!href.startsWith("#")) return href;
  return pathname === "/" ? href : `/${href}`;
}

function NavTextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="relative group text-sm text-foreground/70 transition-colors duration-300 hover:text-foreground"
    >
      {children}
      <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#C43F17] transition-all duration-300 group-hover:w-full" />
    </a>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const { t } = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinks = [
    { name: t.nav.features, href: "/produit" },
    { name: t.nav.howItWorks, href: "#how-it-works" },
    { name: t.nav.pricing, href: "#pricing" },
    { name: t.nav.faq, href: "#faq" },
    { name: t.nav.contact, href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 overflow-visible transition-all duration-500 ${
        isScrolled
          ? "top-4 left-0 right-0"
          : "top-0 left-0 right-0"
      }`}
    >
      <nav 
        className={`mx-auto overflow-visible transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "w-[calc(100%-2rem)] max-w-[960px] bg-[#F7F6F4]/90 backdrop-blur-xl border border-foreground/10 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            : "bg-transparent max-w-[1400px]"
        }`}
      >
        <div 
          className={`flex items-center justify-between overflow-visible transition-all duration-500 ${
            isScrolled ? "h-12 px-4 sm:px-5" : "h-20 px-6 lg:px-8"
          }`}
        >
          <a href="/" className="flex items-center shrink-0">
            <TalkerWordmark compact={isScrolled} />
          </a>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center ${isScrolled ? "gap-6 lg:gap-8" : "gap-12"}`}>
            {navLinks.map((link) => (
              <NavTextLink key={link.name} href={resolveNavHref(link.href, pathname)}>
                {link.name}
              </NavTextLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className={`hidden md:flex items-center overflow-visible ${isScrolled ? "gap-3" : "gap-4"}`}>
            {!isScrolled ? <LanguageSwitcher variant="nav" /> : null}
            <NavTextLink href="/installer">{t.nav.download}</NavTextLink>
            <Button
              asChild
              size="sm"
              variant="iridescent"
              className={`rounded-full transition-all duration-500 ${isScrolled ? "px-4 h-8 text-xs" : "px-6"}`}
            >
              <a href="/installer">{t.nav.createAgent}</a>
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="shrink-0 p-2 -mr-0.5 md:hidden"
            aria-label={t.nav.menu}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

      </nav>
      
      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${
          isMobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: 0 }}
      >
        <div className="flex flex-col h-full px-8 pt-28 pb-8">
          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={resolveNavHref(link.href, pathname)}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-3xl font-display text-foreground hover:text-muted-foreground transition-all duration-500 ${
                  isMobileMenuOpen 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms" }}
              >
                {link.name}
              </a>
            ))}
            <div
              className={`transition-all duration-500 ${
                isMobileMenuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: isMobileMenuOpen ? `${navLinks.length * 75}ms` : "0ms" }}
            >
              <LanguageSwitcher variant="menu" />
            </div>
          </div>
          
          {/* Bottom CTAs */}
          <div className={`flex gap-4 overflow-visible pt-8 border-t border-foreground/10 transition-all duration-500 ${
            isMobileMenuOpen 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: isMobileMenuOpen ? "300ms" : "0ms" }}
          >
            <Button 
              asChild
              variant="outline" 
              className="flex-1 rounded-full h-14 text-base"
            >
              <a href="/installer" onClick={() => setIsMobileMenuOpen(false)}>
                {t.nav.download}
              </a>
            </Button>
            <Button 
              asChild
              variant="iridescent"
              className="flex-1 rounded-full h-14 text-base"
            >
              <a href="/installer" onClick={() => setIsMobileMenuOpen(false)}>
                {t.nav.createAgent}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
