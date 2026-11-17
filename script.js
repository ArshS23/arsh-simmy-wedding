(() => {
  'use strict';
  // An explicit offset keeps the wedding date the same for guests everywhere.
  const weddingDate = Date.parse('2027-01-24T00:00:00+05:30');
  const units = ['days', 'hours', 'minutes', 'seconds'];
  const fields = units.map(unit => document.getElementById(unit));
  function updateCountdown() {
    const remaining = Math.max(0, weddingDate - Date.now());
    const totalSeconds = Math.floor(remaining / 1000);
    const values = [Math.floor(totalSeconds / 86400), Math.floor(totalSeconds / 3600) % 24, Math.floor(totalSeconds / 60) % 60, totalSeconds % 60];
    fields.forEach((field, index) => { field.textContent = String(values[index]).padStart(2, '0'); });
    if (remaining === 0) {
      document.getElementById('countdown-heading').textContent = 'The day we have been waiting for is here';
      clearInterval(countdownInterval);
    }
  }
  let countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();

  if ('IntersectionObserver' in window) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
      document.documentElement.classList.add('js-motion');
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
    }
    const navLinks = [...document.querySelectorAll('nav a')];
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            const active = link.hash === `#${entry.target.id}`;
            link.classList.toggle('active', active);
            if (active) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          });
        }
      });
    }, { rootMargin: '-10% 0px -55% 0px', threshold: 0 });
    document.querySelectorAll('#our-wedding, #events, #location').forEach(section => sectionObserver.observe(section));
  }
})();
