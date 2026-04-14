document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll ──
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // ── Hamburger menu ──
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      const isOpen = mobileNav.classList.contains('open');
      spans[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
      spans[1].style.opacity   = isOpen ? '0' : '1';
      spans[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
    });
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  }

  // ── Active nav link ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });

  // ── Scroll reveal ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ── Counter animation ──
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); statObserver.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-number').forEach(el => statObserver.observe(el));

  // ── Live Chat ──
  const chatBubble = document.querySelector('.chat-bubble');
  const chatPanel  = document.querySelector('.chat-panel');
  const chatInput  = document.querySelector('.chat-input-row input');
  const chatSend   = document.querySelector('.chat-send');
  const chatMsgs   = document.querySelector('.chat-messages');
  const botReplies = [
    "Hi there! 👋 How can I help you today?",
    "You can book any session from our Booking page!",
    "We offer free adult health checkups every Tuesday and Thursday!",
    "Our team is available Mon–Fri, 9am–6pm.",
    "Check our Resources page for helpful wellbeing guides 😊",
    "Feel free to explore our Amenities page to see all facilities!"
  ];
  let replyIndex = 0;
  if (chatBubble && chatPanel) {
    chatBubble.addEventListener('click', () => chatPanel.classList.toggle('open'));
  }
  function addMessage(text, type) {
    if (!chatMsgs) return;
    const msg = document.createElement('div');
    msg.className = `msg msg-${type}`;
    msg.textContent = text;
    chatMsgs.appendChild(msg);
    chatMsgs.scrollTop = chatMsgs.scrollHeight;
  }
  function sendChat() {
    const val = chatInput?.value.trim();
    if (!val) return;
    addMessage(val, 'user');
    chatInput.value = '';
    setTimeout(() => { addMessage(botReplies[replyIndex++ % botReplies.length], 'bot'); }, 800);
  }
  chatSend?.addEventListener('click', sendChat);
  chatInput?.addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(); });

  // ── Testimonials slider ──
  const track = document.querySelector('.testimonial-track');
  const dots   = document.querySelectorAll('.t-dot');
  let current  = 0;
  let autoSlide;
  function goToSlide(index) {
    if (!track) return;
    const cards = track.querySelectorAll('.testimonial-card');
    current = (index + cards.length) % cards.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }
  if (track) {
    autoSlide = setInterval(() => goToSlide(current + 1), 4500);
    dots.forEach((dot, i) => dot.addEventListener('click', () => { clearInterval(autoSlide); goToSlide(i); autoSlide = setInterval(() => goToSlide(current + 1), 4500); }));
    document.querySelector('.t-prev')?.addEventListener('click', () => { clearInterval(autoSlide); goToSlide(current - 1); autoSlide = setInterval(() => goToSlide(current + 1), 4500); });
    document.querySelector('.t-next')?.addEventListener('click', () => { clearInterval(autoSlide); goToSlide(current + 1); autoSlide = setInterval(() => goToSlide(current + 1), 4500); });
  }

});