/* ========================================================
   SUDAMA TRUST - INTERACTIVE JAVASCRIPT
   Drawer Navigation, UPI Intent Launch, Drag Slider, Sticky Keys
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile 3-Bar Drawer Toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerClose = document.getElementById('drawerClose');
  const drawerLinks = document.querySelectorAll('.drawer-link, .btn-donate-full');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 2. Sticky Floating Donate Button on Scroll
  const header = document.getElementById('header');
  const floatingDonateBtn = document.getElementById('floatingDonateBtn');

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    // Header shadow on scroll
    if (scrollPosition > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Show floating donate key after scrolling past 350px
    if (scrollPosition > 350) {
      floatingDonateBtn.classList.add('show');
    } else {
      floatingDonateBtn.classList.remove('show');
    }
  });

  // 3. Payment Key Directly Below QR Code (UPI Intent)
  const launchUpiKey = document.getElementById('launchUpiKey');
  if (launchUpiKey) {
    launchUpiKey.addEventListener('click', (e) => {
      const upiUrl = "upi://pay?pa=sudamatrust@ybl&pn=Sudama%20Trust&cu=INR&tn=Charity%20Donation";
      
      // If user is on desktop, show a helpful toast prompting to scan the QR
      const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
      if (!isMobile) {
        showToast("On PC? Please scan the QR code using PhonePe, GPay, or Paytm on your mobile!");
      }
    });
  }

  // 4. One-Click Copy UPI ID with Toast Notification
  const copyUpiBtn = document.getElementById('copyUpiBtn');
  const upiIdText = document.getElementById('upiIdText');
  const copyBtnText = document.getElementById('copyBtnText');

  if (copyUpiBtn && upiIdText) {
    copyUpiBtn.addEventListener('click', () => {
      const textToCopy = upiIdText.innerText.trim();
      navigator.clipboard.writeText(textToCopy).then(() => {
        copyBtnText.innerText = "Copied!";
        showToast(`UPI ID "${textToCopy}" copied! Open PhonePe/GPay to pay.`);
        setTimeout(() => {
          copyBtnText.innerText = "Copy ID";
        }, 2500);
      }).catch(() => {
        showToast("Please manually copy the UPI ID.");
      });
    });
  }

  // Helper Toast function
  function showToast(message) {
    const toast = document.getElementById('toastNotify');
    const toastMsg = document.getElementById('toastMsg');
    if (!toast || !toastMsg) return;

    toastMsg.innerText = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // 5. Team Members Draggable / Scrollable Slider (Mouse Drag & Touch Swipe)
  const sliderWrapper = document.getElementById('teamSliderWrapper');
  const slideLeftBtn = document.getElementById('slideLeftBtn');
  const slideRightBtn = document.getElementById('slideRightBtn');

  if (sliderWrapper) {
    let isDown = false;
    let startX;
    let scrollLeft;

    sliderWrapper.addEventListener('mousedown', (e) => {
      isDown = true;
      sliderWrapper.classList.add('active');
      startX = e.pageX - sliderWrapper.offsetLeft;
      scrollLeft = sliderWrapper.scrollLeft;
    });

    sliderWrapper.addEventListener('mouseleave', () => {
      isDown = false;
      sliderWrapper.classList.remove('active');
    });

    sliderWrapper.addEventListener('mouseup', () => {
      isDown = false;
      sliderWrapper.classList.remove('active');
    });

    sliderWrapper.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - sliderWrapper.offsetLeft;
      const walk = (x - startX) * 1.8; // scroll speed multiplier
      sliderWrapper.scrollLeft = scrollLeft - walk;
    });

    // Arrow navigation buttons
    if (slideLeftBtn) {
      slideLeftBtn.addEventListener('click', () => {
        sliderWrapper.scrollBy({ left: -310, behavior: 'smooth' });
      });
    }
    if (slideRightBtn) {
      slideRightBtn.addEventListener('click', () => {
        sliderWrapper.scrollBy({ left: 310, behavior: 'smooth' });
      });
    }
  }

  // 6. Highlight active navigation on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});
