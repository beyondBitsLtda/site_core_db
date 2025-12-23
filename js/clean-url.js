(() => {
  const { cleanPath } = document.body.dataset || {};

  if (!cleanPath) return;

  const { pathname, search, hash } = window.location;

  if (!pathname.endsWith('.html')) return;

  const cleanPathname = pathname.replace(/\.html$/, '');
  const newUrl = `${cleanPathname}${search}${hash}`;

  if (newUrl !== `${pathname}${search}${hash}`) {
    window.history.replaceState({}, '', newUrl);
  }
})();
