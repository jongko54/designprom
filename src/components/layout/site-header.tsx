import Link from "next/link";

import { navItems } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="site-shell top-bar">
      <div className="brand-stack">
        <Link className="brand-mark" href="/" prefetch={false}>
          designprom
        </Link>
        <span className="header-meta">the digital archive / issue 04</span>
      </div>
      <nav className="main-nav" aria-label="Primary">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} prefetch={false}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
