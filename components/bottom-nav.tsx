"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Inici", icon: "house" },
  { href: "/projects", label: "Projectes", icon: "collection" },
  { href: "/settle", label: "Saldar", icon: "arrow-left-right" },
] as const;

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <>
      <nav
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "stretch",
          background: "var(--c-surface)",
          borderTop: "1px solid var(--c-border)",
          zIndex: 10,
        }}
      >
        {TABS.map((tab) => {
          const active =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              style={{
                flex: 1,
                minHeight: 60,
                padding: "8px 0 12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                color: active ? "var(--c-blue)" : "var(--c-sub)",
              }}
            >
              <i className={`bi bi-${tab.icon}`} style={{ fontSize: 19 }} />
              <span style={{ fontSize: 11, fontWeight: 500 }}>{tab.label}</span>
            </Link>
          );
        })}
      </nav>
      <button
        aria-label="Afegeix una despesa"
        style={{
          position: "fixed",
          right: 20,
          bottom: 84,
          width: 60,
          height: 60,
          borderRadius: 999,
          border: 0,
          background: "var(--c-blue)",
          color: "#fff",
          fontSize: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        <i className="bi bi-plus-lg" />
      </button>
    </>
  );
}
