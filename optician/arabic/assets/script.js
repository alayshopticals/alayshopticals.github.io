document.addEventListener('DOMContentLoaded', function () {
  const backTop = document.getElementById('backTop');
  if (backTop) {
    const toggleTop = () => { backTop.style.display = window.scrollY > 500 ? 'flex' : 'none'; };
    window.addEventListener('scroll', toggleTop, {passive:true}); toggleTop();
    backTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
  }
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => { if (a.getAttribute('href') === path) a.classList.add('active'); });

  const modalEl = document.getElementById('quickEnquiry');
  const forms = document.querySelectorAll('#quickEnquiryForm, .quick-enquiry-form');
  if (modalEl && window.bootstrap) {
    try {
      if (!sessionStorage.getItem('ay_popup_seen')) {
        setTimeout(() => { bootstrap.Modal.getOrCreateInstance(modalEl).show(); sessionStorage.setItem('ay_popup_seen','1'); }, 18000);
      }
    } catch(e) {}
  }
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const d = new FormData(form);
      const rtl = document.documentElement.dir === 'rtl';
      const msg = rtl ? [
        'مرحباً العيش للنظارات، أرغب في إرسال استفسار.', '',
        'الاسم: ' + (d.get('name') || ''), 'الهاتف: ' + (d.get('phone') || ''),
        'البريد الإلكتروني: ' + (d.get('email') || ''), 'الخدمة: ' + (d.get('service') || ''),
        'الرسالة: ' + (d.get('message') || '')
      ].join('\n') : [
        'Hello AL AYSH OPTICALS, I would like to make an enquiry.', '',
        'Name: ' + (d.get('name') || ''), 'Phone: ' + (d.get('phone') || ''),
        'Email: ' + (d.get('email') || ''), 'Service: ' + (d.get('service') || ''),
        'Message: ' + (d.get('message') || '')
      ].join('\n');
      window.open('https://wa.me/971547693696?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    });
  });
});
