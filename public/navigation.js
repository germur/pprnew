export function initNavigation() {
  const toggle = document.querySelector('[data-services-toggle]');
  const dropdown = document.querySelector('#services-dropdown');
  if (toggle && dropdown) {
    const setOpen = open => {
      toggle.setAttribute('aria-expanded', String(open));
      dropdown.inert = !open;
      dropdown.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('click', e => {
      if (!toggle.parentElement.contains(e.target)) setOpen(false);
    });
    toggle.parentElement.addEventListener('focusout', e => {
      if (!toggle.parentElement.contains(e.relatedTarget)) setOpen(false);
    });
    toggle.parentElement.addEventListener('keydown', e => {
      if (e.key === 'Escape') { setOpen(false); toggle.focus(); }
      if (e.key === 'ArrowDown' && e.target === toggle) {
        e.preventDefault(); setOpen(true); dropdown.querySelector('a')?.focus();
      }
    });
  }
  const burger = document.querySelector('.burger');
  const mobile = document.querySelector('.mnav');
  if (!burger || !mobile) return;
  let open = false;
  let previousOverflow = '';
  const background = [...document.querySelectorAll('main,footer,.util,.mobile-actions')];
  const setOpen = value => {
    if (open === value) return;
    open = value;
    mobile.inert = !open;
    mobile.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    background.forEach(el => { el.inert = open; });
    if (open) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      // Wait for the menu's visibility styles before moving keyboard focus.
      window.requestAnimationFrame(() => {
        if (open) mobile.querySelector('a')?.focus();
      });
    } else {
      document.body.style.overflow = previousOverflow;
      burger.focus();
    }
  };
  mobile.addEventListener('transitionend', e => {
    if (open && e.target === mobile && document.activeElement === burger) {
      mobile.querySelector('a')?.focus();
    }
  });
  burger.addEventListener('click', () => setOpen(!open));
  mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', e => {
    if (!open) return;
    if (e.key === 'Escape') { e.preventDefault(); setOpen(false); }
    if (e.key !== 'Tab') return;
    const controls = [...document.querySelectorAll('.head-cta a,.head-cta button'), ...mobile.querySelectorAll('a')].filter(el => el.getClientRects().length > 0);
    const first = controls[0], last = controls.at(-1);
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  window.matchMedia('(min-width: 1081px)').addEventListener('change', e => {
    if (e.matches) setOpen(false);
  });
}
