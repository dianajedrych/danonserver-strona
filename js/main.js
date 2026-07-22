(function () {
  var container = document.getElementById('bg-shapes');
  if (!container) return;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function makeTriangle(top, left) {
    var span = document.createElement('span');
    var half = rand(4, 7);
    var height = rand(7, 12);
    var opacity = rand(0.15, 0.32).toFixed(2);
    var rotate = rand(-150, 150).toFixed(0);
    span.style.top = top.toFixed(1) + '%';
    span.style.left = left.toFixed(1) + '%';
    span.style.width = '0';
    span.style.height = '0';
    span.style.borderLeft = half + 'px solid transparent';
    span.style.borderRight = half + 'px solid transparent';
    span.style.borderBottom = height + 'px solid rgba(255,255,255,' + opacity + ')';
    span.style.transform = 'rotate(' + rotate + 'deg)';
    return span;
  }

  function makeSquare(top, left) {
    var span = document.createElement('span');
    var size = rand(6, 12).toFixed(0);
    var opacity = rand(0.15, 0.32).toFixed(2);
    var rotate = rand(-90, 90).toFixed(0);
    span.style.top = top.toFixed(1) + '%';
    span.style.left = left.toFixed(1) + '%';
    span.style.width = size + 'px';
    span.style.height = size + 'px';
    span.style.border = '1.5px solid rgba(255,255,255,' + opacity + ')';
    span.style.transform = 'rotate(' + rotate + 'deg)';
    return span;
  }

  function makeCircle(top, left) {
    var span = document.createElement('span');
    var size = rand(7, 12).toFixed(0);
    var opacity = rand(0.15, 0.32).toFixed(2);
    span.style.top = top.toFixed(1) + '%';
    span.style.left = left.toFixed(1) + '%';
    span.style.width = size + 'px';
    span.style.height = size + 'px';
    span.style.borderRadius = '50%';
    span.style.border = '1.5px solid rgba(255,255,255,' + opacity + ')';
    return span;
  }

  var makers = [makeTriangle, makeTriangle, makeSquare, makeCircle];
  var fragment = document.createDocumentFragment();

  // Even scatter across the whole page height.
  for (var i = 0; i < 160; i++) {
    fragment.appendChild(pick(makers)(rand(0, 100), rand(0, 100)));
  }

  // Extra density near the top of the hero, matching the reference image.
  for (var j = 0; j < 60; j++) {
    fragment.appendChild(pick(makers)(rand(0, 25), rand(0, 100)));
  }

  container.appendChild(fragment);
})();

(function () {
  var overlay = document.getElementById('contact-modal');
  var form = document.getElementById('contact-form');
  if (!overlay || !form) return;

  var formWrap = document.getElementById('contact-form-wrap');
  var doneWrap = document.getElementById('contact-form-done');
  var closeDoneBtn = document.getElementById('contact-form-close-done');
  var closeBtn = document.getElementById('contact-modal-close');
  var errorBox = document.getElementById('contact-form-error');
  var contactField = document.getElementById('contact-field');
  var lastFocused = null;

  function openModal() {
    lastFocused = document.activeElement;
    overlay.hidden = false;
    formWrap.hidden = false;
    doneWrap.hidden = true;
    errorBox.hidden = true;
    document.body.style.overflow = 'hidden';
    contactField.focus();
  }

  function closeModal() {
    overlay.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  document.querySelectorAll('[data-open-contact]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });

  closeBtn.addEventListener('click', closeModal);
  closeDoneBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !overlay.hidden) closeModal();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var contact = (data.get('contact') || '').toString().trim();

    if (!contact) {
      errorBox.hidden = false;
      contactField.focus();
      return;
    }
    errorBox.hidden = true;

    var lines = [
      'Nowe zapytanie ze strony DanonServer',
      '',
      'Kontakt: ' + contact,
      'Rodzaj użytku: ' + data.get('usage'),
      'Potrzebna przestrzeń: ' + data.get('storage'),
      'Preferowana pora kontaktu: ' + data.get('when'),
      'Preferowany sposób kontaktu: ' + data.get('method'),
      'Chce więcej informacji przed rozmową: ' + (data.get('moreInfo') ? 'Tak' : 'Nie'),
      '',
      'Wiadomość:',
      (data.get('message') || '').toString().trim() || '(brak)'
    ];

    var subject = encodeURIComponent('Zapytanie ze strony DanonServer');
    var body = encodeURIComponent(lines.join('\n'));
    var mailto = 'mailto:kontakt@danonserver.pl?subject=' + subject + '&body=' + body;

    formWrap.hidden = true;
    doneWrap.hidden = false;
    window.location.href = mailto;
  });
})();
