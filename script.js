(function () {
  var $ = function (s) { return document.querySelector(s); };
  var burger = $('#burger'), menu = $('#menu'), scrim = $('#scrim'), bar = $('#bar');

  function setMenu(open) {
    menu.classList.toggle('open', open);
    scrim.classList.toggle('show', open);
    burger.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
  }
  burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  scrim.addEventListener('click', function () { setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  document.querySelectorAll('[data-nav]').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });

  // Header shadow + floating Donate button once the hero is scrolled past
  var fab = $('#floatDonate');
  function onScroll() {
    var y = window.scrollY;
    bar.classList.toggle('scrolled', y > 10);
    var donate = $('#donate').getBoundingClientRect();
    var onDonate = donate.top < window.innerHeight * 0.6 && donate.bottom > 0;
    fab.classList.toggle('show', y > 400 && !onDonate);
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Highlight current section in the menu
  var links = {};
  menu.querySelectorAll('a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        Object.values(links).forEach(function (l) { l.classList.remove('active'); });
        if (links[e.target.id]) links[e.target.id].classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(function (s) { io.observe(s); });

  // UPI pay button: opens the user's UPI app on phones
  var pay = $('#payBtn'), note = $('#payNote');
  var isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  pay.addEventListener('click', function (e) {
    if (!isMobile) {
      e.preventDefault();
      note.textContent = 'UPI apps open on phones. Please scan the QR code above with your phone.';
    } else {
      note.textContent = 'Opening your UPI app…';
      setTimeout(function () { note.textContent = 'If nothing opened, scan the QR code with any UPI app.'; }, 2500);
    }
  });

  // Team slider: drag with mouse (touch scrolls natively)
  var track = $('#track'), down = false, startX = 0, startLeft = 0;
  track.addEventListener('mousedown', function (e) { down = true; startX = e.pageX; startLeft = track.scrollLeft; track.classList.add('dragging'); });
  window.addEventListener('mouseup', function () { down = false; track.classList.remove('dragging'); });
  window.addEventListener('mousemove', function (e) { if (down) track.scrollLeft = startLeft - (e.pageX - startX); });

  $('#yr').textContent = new Date().getFullYear();
})();
