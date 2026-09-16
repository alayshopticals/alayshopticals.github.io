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
  const forms = document.querySelectorAll('.quick-enquiry-form, #quickEnquiryForm');
  const isArabic = document.documentElement.lang === 'ar' || document.documentElement.dir === 'rtl';

  // Pre-select the service when the popup is opened from a service page.
  const serviceMap = {
    'frames.html': ['Optical Frames','الإطارات البصرية'], 'lenses.html':['Prescription Lenses','العدسات الطبية'],
    'sunglasses.html':['Sunglasses','النظارات الشمسية'], 'medical-glasses.html':['Medical Glasses & Lenses','النظارات والعدسات الطبية'],
    'contact-lenses.html':['Contact Lenses','العدسات اللاصقة'], 'eye-testing.html':['Eye Testing','فحص النظر'],
    'consultation.html':['Eyewear Consultation','استشارات النظارات']
  };
  const setService = () => { const values=serviceMap[path]; if(!values) return; forms.forEach(form=>{ const select=form.querySelector('[name="service"]'); if(select){ [...select.options].forEach(o=>{if(values.includes(o.textContent.trim())) o.selected=true;}); }}); };
  if (modalEl && window.bootstrap) {
    modalEl.addEventListener('show.bs.modal', setService);
    // Show once per session after a calm delay; users can reopen it anytime.
    if (!sessionStorage.getItem('ay_popup_seen')) {
      setTimeout(() => { bootstrap.Modal.getOrCreateInstance(modalEl).show(); sessionStorage.setItem('ay_popup_seen','1'); }, 12000);
    }
  }

  forms.forEach(form => form.addEventListener('submit', function(e) {
    e.preventDefault();
    const d = new FormData(form);
    const intro = isArabic ? 'مرحباً العيش للنظارات، أود إرسال استفسار.' : 'Hello AL AYSH OPTICALS, I would like to make an enquiry.';
    const labels = isArabic ? ['الاسم','الهاتف','البريد الإلكتروني','الخدمة','الرسالة'] : ['Name','Phone','Email','Service','Message'];
    const msg = [intro,'',labels[0]+': '+(d.get('name')||''),labels[1]+': '+(d.get('phone')||''),labels[2]+': '+(d.get('email')||''),labels[3]+': '+(d.get('service')||''),labels[4]+': '+(d.get('message')||'')].join('\n');
    const success = form.querySelector('#enquirySuccess');
    const submitBtn = form.querySelector('button[type=submit]');
    if (success) success.classList.add('show');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '<i class="fa-solid fa-check me-2"></i>Opening WhatsApp…'; }
    window.open('https://wa.me/971547693696?text='+encodeURIComponent(msg), '_blank', 'noopener');
    setTimeout(() => { if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<i class="fa-brands fa-whatsapp me-2"></i>Continue to WhatsApp'; } }, 1800);
  }));
});

(function(){
  const preloader=document.getElementById('sitePreloader'); if(!preloader) return;
  const hide=()=>setTimeout(()=>preloader.classList.add('is-hidden'),900);
  if(document.readyState==='complete') hide(); else window.addEventListener('load',hide,{once:true});
  setTimeout(()=>preloader.classList.add('is-hidden'),2000);
})();
