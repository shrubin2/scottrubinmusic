/**
 * nav.js — shared navigation for all pages.
 * Includes hamburger menu for mobile.
 *
 * Drop a <script src="../js/nav.js"></script> (adjust depth as needed)
 * anywhere in <body> where you want the <nav> to appear.
 * The script figures out relative paths and the active link automatically.
 */

(function () {
  // How many folders deep is this page from the site root?
  const depth = (window.location.pathname.match(/\//g) || []).length - 1;
  const root  = depth === 0 ? '' : '../'.repeat(depth);

  const links = [
    { href: root + 'index.html',          label: 'Home' },
    { href: root + 'events.html',         label: 'Events' },
    { href: root + 'media.html',          label: 'Media' },
    { href: root + 'projects/index.html', label: 'Works' },
    { href: root + 'blog/index.html',     label: 'Writing' },
    { href: root + 'interviews.html',     label: 'Interviews' },
  ];

  // Mark the link active if the current page is at or under its path
  const current = window.location.pathname;
  const lis = links.map(({ href, label }) => {
    const a = document.createElement('a');
    a.href = href;
    const abs = a.pathname;

    const sectionMatch = abs.endsWith('index.html') &&
      current.startsWith(abs.replace('index.html', '')) &&
      abs !== (root + 'index.html').replace(/^\//, '/');

    const exactMatch = current === abs || current.endsWith(abs);
    const isActive = exactMatch || sectionMatch;

    return `<li><a href="${href}"${isActive ? ' class="active"' : ''}>${label}</a></li>`;
  }).join('\n      ');

  // Hamburger icon (three lines → becomes × when open)
  const nav = `<nav>
    <div class="nav-name"><a href="${root}index.html">Scott Rubin</a></div>
    <ul class="nav-links">
      ${lis}
      <a class="nav-social" href="https://instagram.com/scottrubinmusic" target="_blank" aria-label="Instagram">
      <i class="fa-brands fa-instagram" style="font-size: 24px;"></i>
    </a>
    </ul>
   
    <button class="nav-hamburger" aria-label="Toggle menu" aria-expanded="false">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </nav>
  <div class="nav-overlay" aria-hidden="true">
    <ul>
      ${lis}
      <a class="nav-social" href="https://instagram.com/scottrubinmusic" target="_blank" aria-label="Instagram">
      <i class="fa-brands fa-instagram"></i>
    </a>
    </ul>
  </div>`;

  document.write(nav);

  // Wire up interactivity after the DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.nav-hamburger');
    const overlay   = document.querySelector('.nav-overlay');

    function openMenu() {
      hamburger.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      overlay.classList.add('is-open');
      document.body.classList.add('nav-open');
    }

    function closeMenu() {
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      overlay.classList.remove('is-open');
      document.body.classList.remove('nav-open');
    }

    hamburger.addEventListener('click', () => {
      hamburger.classList.contains('is-open') ? closeMenu() : openMenu();
    });

    // Close when a link is tapped
    overlay.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });
  });
})();