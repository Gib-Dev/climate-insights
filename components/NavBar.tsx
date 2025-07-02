"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, CloudSun, LayoutDashboard, Menu, X, Cloud } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/provinces", label: "Provinces", icon: Map },
  { href: "/weather", label: "Weather Data", icon: CloudSun },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export default function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      width: '100%',
      background: 'var(--primary)',
      borderBottom: '1px solid var(--border)',
      padding: '0.5rem 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      minHeight: 56,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 24 }}>
        <Cloud size={28} color="#fff" style={{ marginRight: 8 }} />
        <span style={{ fontWeight: 800, fontSize: 22, color: '#fff', letterSpacing: 1 }}>
          Climate Insights
        </span>
      </div>
      {/* Desktop Nav Links */}
      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 32, marginRight: 24 }}>
        <div className="nav-desktop" style={{ display: 'flex', gap: 32 }}>
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`nav-link${isActive ? ' active' : ''}`}
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 17,
                  padding: '6px 14px',
                  borderRadius: 8,
                  background: isActive ? 'rgba(50,130,184,0.18)' : 'none',
                  borderBottom: isActive ? '2.5px solid var(--secondary)' : '2.5px solid transparent',
                  transition: 'color 0.2s, background 0.2s, border-bottom 0.2s',
                }}
                tabIndex={0}
              >
                <Icon size={20} style={{ transition: 'transform 0.2s' }} />
                {label}
              </Link>
            );
          })}
        </div>
        {/* Hamburger Icon for Mobile */}
        <button
          className="nav-hamburger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(m => !m)}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            display: 'none',
            marginLeft: 16,
            padding: 4,
          }}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="nav-mobile-menu" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(15,76,117,0.98)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          transition: 'opacity 0.2s',
        }}>
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`nav-link${isActive ? ' active' : ''}`}
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 22,
                  padding: '18px 32px',
                  borderRadius: 10,
                  margin: '8px 0',
                  background: isActive ? 'rgba(50,130,184,0.18)' : 'none',
                  borderBottom: isActive ? '2.5px solid var(--secondary)' : '2.5px solid transparent',
                  transition: 'color 0.2s, background 0.2s, border-bottom 0.2s',
                }}
                tabIndex={0}
                onClick={() => setMenuOpen(false)}
              >
                <Icon size={26} style={{ transition: 'transform 0.2s' }} />
                {label}
              </Link>
            );
          })}
        </div>
      )}
      <style jsx global>{`
        @media (max-width: 800px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-hamburger {
            display: block !important;
          }
        }
        @media (min-width: 801px) {
          .nav-mobile-menu {
            display: none !important;
          }
        }
        .nav-link:hover {
          color: var(--hover) !important;
          background: rgba(10,58,92,0.12) !important;
        }
        .nav-link.active {
          color: var(--secondary) !important;
          font-weight: 700;
        }
      `}</style>
    </nav>
  );
} 