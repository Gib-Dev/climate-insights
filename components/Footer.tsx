'use client';
import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        width: '100%',
        background: 'var(--background)',
        borderTop: '1px solid var(--border)',
        color: 'var(--text)',
        textAlign: 'center',
        padding: '1rem 0',
        marginTop: 48,
        fontSize: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <div>
        &copy; {new Date().getFullYear()} Climate Insights &mdash; Built by{' '}
        <a
          href="https://github.com/Gib-Dev"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}
        >
          Magib
        </a>
      </div>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center' }}>
        <a
          href="https://github.com/Gib-Dev/climate-insights"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon-link"
        >
          <Github size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/magib-biteye"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon-link"
        >
          <Linkedin size={20} />
        </a>
      </div>
      <style jsx global>{`
        .footer-icon-link {
          color: var(--text);
          transition: color 0.2s;
        }
        .footer-icon-link:hover {
          color: var(--primary);
        }
      `}</style>
    </footer>
  );
}
