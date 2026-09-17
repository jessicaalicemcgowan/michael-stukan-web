"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toRoman, useCart } from "@/hooks/useCart";
import { HERO_REVEAL_MS } from "@/components/Hero";
import styles from "./Nav.module.css";

// Collection/Campaign dropdowns list every artist from data/archive.js —
// only Richard Kilroy (the first collection, now built) has a real page,
// at .../i-richard-kilroy; the rest stay "#" placeholders until their
// own pages exist. The parent Collection/Campaign link goes straight to
// that same Richard Kilroy page too, same as clicking its own dropdown
// entry, since it's the only season live right now.
const primaryLinks = [
  { href: "/about", label: "About" },
  {
    href: "/collection/i-richard-kilroy",
    label: "Collection",
    subLinks: [
      { href: "/collection/i-richard-kilroy", label: "Richard Kilroy" },
      { href: "#", label: "Jessica Rose Bird" },
      { href: "#", label: "John Booth" },
      { href: "#", label: "Colm Mac Athlaoich" },
      { href: "#", label: "Faye Wei Wei" },
    ],
  },
  {
    href: "/campaign/i-richard-kilroy",
    label: "Campaign",
    subLinks: [
      { href: "/campaign/i-richard-kilroy", label: "Richard Kilroy" },
      { href: "#", label: "Jessica Rose Bird" },
      { href: "#", label: "John Booth" },
      { href: "#", label: "Colm Mac Athlaoich" },
      { href: "#", label: "Faye Wei Wei" },
    ],
  },
  { href: "/shop", label: "Shop" },
];

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const [menuOpen, setMenuOpen] = useState(false);
  const [overHero, setOverHero] = useState(isHome);
  const [entranceVisible, setEntranceVisible] = useState(!isHome);
  const [openGroup, setOpenGroup] = useState(null);
  const { items, openCart } = useCart();

  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);
  const closeMenu = () => {
    setMenuOpen(false);
    setOpenGroup(null);
  };

  const handlePrimaryClick = (event, href, hasSubLinks) => {
    if (hasSubLinks && window.matchMedia("(max-width: 779px)").matches) {
      event.preventDefault();
      setOpenGroup((prev) => (prev === href ? null : href));
      return;
    }
    closeMenu();
  };

  useEffect(() => {
    if (!isHome) {
      setOverHero(false);
      return undefined;
    }

    setOverHero(true);
    const handleScroll = () => {
      setOverHero(window.scrollY < window.innerHeight * 0.9);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    if (!isHome) {
      setEntranceVisible(true);
      return undefined;
    }

    setEntranceVisible(false);
    const timer = window.setTimeout(() => setEntranceVisible(true), HERO_REVEAL_MS);
    return () => window.clearTimeout(timer);
  }, [isHome]);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    // Locking body alone isn't reliable on mobile Safari — the <html>
    // element can still scroll independently underneath. Locking both
    // (same pattern Hero.jsx uses for its own scroll lock) is what
    // actually prevents the page behind the open menu from scrolling.
    const { overflow: htmlOverflow } = document.documentElement.style;
    const { overflow: bodyOverflow } = document.body.style;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;
    };
  }, [menuOpen]);

  return (
    <header
      className={styles.nav}
      data-over-hero={overHero}
      data-entrance={entranceVisible}
      data-on-about={isAbout}
    >
      <button
        type="button"
        className={styles.toggle}
        data-open={menuOpen}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {"( "}
        <span className={styles.toggleText}>{menuOpen ? "CLOSE" : "MENU"}</span>
        {" )"}
      </button>

      <Link href="/" className={styles.brand} onClick={closeMenu}>
        Michael Stukan
      </Link>

      <nav className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}>
        <div className={styles.primaryLinks}>
          {primaryLinks.map(({ href, label, subLinks }) => (
            <div
              key={href}
              className={
                label === "Shop"
                  ? `${styles.linkGroup} ${styles.linkGroupShop}`
                  : styles.linkGroup
              }
            >
              <Link
                href={href}
                onClick={(event) => handlePrimaryClick(event, href, Boolean(subLinks))}
                className={`${styles.link} ${subLinks ? styles.linkNoHover : ""} ${isActive(href) ? styles.linkActive : ""}`}
              >
                {label}
              </Link>
              {subLinks && (
                <div
                  className={`${styles.dropdown} ${openGroup === href ? styles.dropdownOpen : ""}`}
                >
                  <div className={styles.dropdownInner}>
                    {subLinks.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={closeMenu}
                        className={styles.dropdownLink}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.secondaryLinks}>
          <button
            type="button"
            className={styles.cart}
            aria-label={`Open cart, ${items.length} items`}
            onClick={openCart}
          >
            <span>({toRoman(items.length)})</span>
            {/* Inline (not <img src="...">) so it can pick up the
                surrounding text color via currentColor — an <img> can't
                see the page's CSS variables, which is why this stayed
                maroon even after the nav itself switched to beige on the
                About page. */}
            <svg
              viewBox="0 0 12.1083 12.2695"
              fill="none"
              aria-hidden="true"
              className={styles.cartDot}
            >
              <path
                d="M9.80436 1.44773C9.80685 1.45171 9.82377 1.4542 9.83173 1.46117C9.93525 1.55075 10.0597 1.67368 10.1537 1.77272C10.1871 1.80806 10.2025 1.85832 10.2324 1.89714C10.2692 1.94492 10.3244 1.97379 10.3633 2.01708C10.4718 2.13703 10.5748 2.29429 10.6743 2.4227C10.7654 2.54115 10.8425 2.64616 10.9301 2.76361C10.9913 2.84523 11.1103 3.02589 11.1372 3.11796C11.1586 3.19062 11.1615 3.16574 11.1974 3.22447C11.2631 3.33296 11.3104 3.44544 11.3641 3.55941C11.4532 3.74903 11.5532 3.94611 11.6234 4.14817C11.6831 4.32037 11.7309 4.49555 11.806 4.6583C11.8658 4.78769 11.8727 4.97831 11.9245 5.10123C11.9315 5.11766 12.0066 5.43369 12.0365 5.58648C12.0619 5.71538 12.0624 5.76863 12.0713 5.89803C12.0788 6.00901 12.1136 6.13194 12.1076 6.24442C12.0877 6.60922 12.1081 6.92027 12.0385 7.28557C11.9927 7.52595 11.9559 7.78375 11.8837 8.01468C11.8469 8.13313 11.812 8.25008 11.7667 8.36356C11.7015 8.52779 11.6418 8.69899 11.5652 8.85427C11.5124 8.96127 11.3308 9.28925 11.289 9.35395C11.174 9.53212 11.0824 9.71925 10.949 9.88597C10.6987 10.1995 10.3777 10.4374 10.09 10.7106C9.97656 10.8186 9.82626 10.963 9.68392 11.0486C9.54606 11.1312 9.24895 11.3561 9.11358 11.4412C8.5059 11.822 8.18838 11.9091 7.49809 12.1076C7.43041 12.127 7.34829 12.136 7.2816 12.1544C7.25572 12.1614 6.95163 12.2161 6.88345 12.2226C6.42807 12.2629 6.29917 12.2704 5.84429 12.2694C5.39986 12.2684 4.96687 12.2236 4.53538 12.1201C4.43186 12.0952 4.32834 12.0584 4.22532 12.03C4.22532 12.03 4.19272 12.0185 4.1646 12.0185C4.16162 12.0161 4.14121 12.0166 4.12977 12.0121C4.03122 11.9703 3.91327 11.9349 3.82767 11.8752C3.69429 11.7821 3.53453 11.7229 3.39021 11.6408C3.14186 11.4995 2.9184 11.3203 2.67354 11.1755C2.63953 11.1554 2.63674 11.1541 2.60138 11.1342C2.59839 11.1182 2.58097 11.1098 2.56953 11.1003C2.20074 10.8112 1.88819 10.5598 1.57416 10.208C1.50398 10.1293 1.44974 10.0502 1.38305 9.96958C1.25912 9.82028 1.16805 9.73667 1.06303 9.56098C0.958024 9.3853 0.860477 9.21908 0.764424 9.04737C0.613626 8.77763 0.475767 8.44418 0.370756 8.15104C0.147794 7.52993 -0.0174377 6.8073 0.00147432 6.14986C0.0193909 5.52675 0.0990206 4.92605 0.317006 4.34127C0.442422 4.00583 0.537481 3.65745 0.695744 3.33495C0.888845 2.94178 1.17203 2.6163 1.39698 2.24453C1.50896 2.05988 1.67071 1.90262 1.82101 1.7548C2.43814 1.14763 3.07069 0.779841 3.88192 0.441914C4.06208 0.366763 4.18003 0.324958 4.37214 0.275189C4.53339 0.233384 4.70559 0.154252 4.86733 0.125386C4.93303 0.113442 5.01316 0.118419 5.07835 0.109461C5.12762 0.102991 5.18436 0.0771111 5.23462 0.074125C5.34511 0.0676551 5.33814 0.0791017 5.45311 0.0422731C5.55513 0.0094259 5.93586 0.0213705 6.00106 0.018882C6.02943 0.0178867 6.21805 -0.0119745 6.30713 0.00544448C6.335 0.010919 6.48481 0.0248542 6.52313 0.0273427C6.63013 0.0348079 6.77346 0.0781064 6.88445 0.0970184C7.03873 0.123396 7.1522 0.134345 7.30648 0.176648C7.52795 0.236868 7.76087 0.327944 7.97886 0.412053C8.16549 0.484217 8.33669 0.559367 8.51387 0.653429C8.66417 0.733557 8.80451 0.828117 8.96029 0.897792C9.03437 0.988393 9.15116 0.999334 9.80436 1.44773Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
