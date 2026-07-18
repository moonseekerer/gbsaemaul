/* ==========================================================================
   Main Application Core Controller & Sub-Page View Switcher
   Modeled strictly after www.koreaucostarica.com
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initGyeongbukMap();
  initMobileDrawer();
  initScrollTimeline();
  initModalBackdropEvents();
  
  // Initialize AI Saemaul Advisor Chatbot
  if (typeof SaemaulChatbot !== 'undefined') {
    window.saemaulChatbot = new SaemaulChatbot(
      'chat-messages-box',
      'chat-user-input',
      'chat-send-btn'
    );
  }
});

/* --------------------------------------------------------------------------
   Sub-Page View Switcher (koreaucostarica.com Structure)
   -------------------------------------------------------------------------- */
function switchView(viewTarget, scrollToId = null) {
  const views = document.querySelectorAll('.page-view');
  const desktopItems = document.querySelectorAll('#desktop-gnb-menu .nav-item');
  const drawerItems = document.querySelectorAll('.drawer-menu-list .drawer-item');

  // Hide all views and show targeted view
  views.forEach(v => {
    if (v.id === `view-${viewTarget}`) {
      v.classList.add('active');
    } else {
      v.classList.remove('active');
    }
  });

  // Update GNB active states
  desktopItems.forEach(item => {
    if (item.getAttribute('data-target') === viewTarget) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  drawerItems.forEach(item => {
    if (item.getAttribute('data-target') === viewTarget) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Close mobile drawer if open
  closeMobileDrawer();

  // Scroll to targeted section inside the view, or top of page
  if (scrollToId) {
    setTimeout(() => {
      const el = document.getElementById(scrollToId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Re-trigger scroll timeline animation if switching to intro
  if (viewTarget === 'intro') {
    setTimeout(() => {
      initScrollTimeline();
    }, 100);
  }
}

/* --------------------------------------------------------------------------
   Master Toggle All Flip Cards System
   -------------------------------------------------------------------------- */
function toggleAllFlipCards() {
  const containers = document.querySelectorAll('.flip-card-container');
  if (!containers.length) return;
  const isAnyFlipped = Array.from(containers).some(c => c.classList.contains('flipped'));
  containers.forEach(c => {
    if (isAnyFlipped) {
      c.classList.remove('flipped');
    } else {
      c.classList.add('flipped');
    }
  });
}

/* --------------------------------------------------------------------------
   Scroll-Driven 3-Generations Story Line Animation System
   -------------------------------------------------------------------------- */
function initScrollTimeline() {
  const cards = document.querySelectorAll('.timeline-story-card');
  if (!cards.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active-reveal');
        }
      });
    }, { threshold: 0.15 });

    cards.forEach(card => observer.observe(card));
  } else {
    cards.forEach(card => card.classList.add('active-reveal'));
  }
}

/* --------------------------------------------------------------------------
   Modal Controller System (Terms of Service & Privacy Policy)
   -------------------------------------------------------------------------- */
function openTermsModal() {
  const modal = document.getElementById('terms-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeTermsModal() {
  const modal = document.getElementById('terms-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function openPrivacyModal() {
  const modal = document.getElementById('privacy-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closePrivacyModal() {
  const modal = document.getElementById('privacy-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function initModalBackdropEvents() {
  const modals = document.querySelectorAll('.modal-backdrop');
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
}

function initGyeongbukMap() {
  if (typeof GyeongbukMapEngine !== 'undefined') {
    window.gbMapEngine = new GyeongbukMapEngine(
      'gb-map-container',
      'gb-map-tooltip',
      'region-detail-card'
    );
  }
}

/* --------------------------------------------------------------------------
   Mobile Drawer Navigation System
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const closeBtn = document.getElementById('drawer-close-btn');
  const drawer = document.getElementById('mobile-nav-drawer');
  const backdrop = document.getElementById('mobile-backdrop');

  if (hamburgerBtn && drawer && backdrop) {
    hamburgerBtn.addEventListener('click', () => {
      openMobileDrawer();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        closeMobileDrawer();
      });
    }

    backdrop.addEventListener('click', () => {
      closeMobileDrawer();
    });
  }
}

function openMobileDrawer() {
  const drawer = document.getElementById('mobile-nav-drawer');
  const backdrop = document.getElementById('mobile-backdrop');
  if (drawer && backdrop) {
    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileDrawer() {
  const drawer = document.getElementById('mobile-nav-drawer');
  const backdrop = document.getElementById('mobile-backdrop');
  if (drawer && backdrop) {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}


/* ==========================================================================
   Welcome Announcement Modal Popup Logic (공모전 출품용 데모 안내 팝업)
   ========================================================================== */
function initWelcomeModal() {
  const backdrop = document.getElementById('welcome-modal-backdrop');
  if (!backdrop) return;

  const hideUntil = localStorage.getItem('hide_welcome_modal_until');
  if (hideUntil) {
    const hideTime = parseInt(hideUntil, 10);
    if (Date.now() < hideTime) {
      backdrop.classList.remove('active');
      return;
    }
  }
  backdrop.classList.add('active');
}

function closeWelcomeModal() {
  const backdrop = document.getElementById('welcome-modal-backdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
  }
}

function toggleWelcomeDontShow(checkbox) {
  if (checkbox.checked) {
    // Hide for 24 hours
    const expiry = Date.now() + (24 * 60 * 60 * 1000);
    localStorage.setItem('hide_welcome_modal_until', expiry.toString());
  } else {
    localStorage.removeItem('hide_welcome_modal_until');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initWelcomeModal, 200);
});
