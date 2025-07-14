document.addEventListener('DOMContentLoaded', function() {
  // Responsive navigation toggle
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('nav-list');
  if (navToggle && navList) {
    function toggleNav(e) {
      // Prevent scroll on iOS Safari double tap
      if (e) e.preventDefault();
      navList.classList.toggle('open');
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
    }
    navToggle.addEventListener('click', toggleNav);
    navToggle.addEventListener('touchstart', toggleNav);
  }

  // Smooth scroll for nav links
  document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        if (navList) navList.classList.remove('open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // FAQ accordion with ARIA attributes
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      this.classList.toggle('active');
      const answer = document.getElementById(this.getAttribute('aria-controls'));
      if (answer) answer.style.display = expanded ? 'none' : 'block';
    });
  });

  // Toast notification for demo order
  const toast = document.getElementById('toast');
  function showToast(msg) {
    if (toast) {
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    }
  }

  // Advanced confetti using canvas-confetti
  function confetti() {
    if (window.confetti) {
      window.confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.7 },
        zIndex: 999
      });
    }
  }

  // Attach demo order buttons
  ['demoOrderBtn', 'demoOrderBtn2', 'demoOrderBtn3', 'demoOrderBtn4'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Order placed! (Demo)');
        confetti();
      });
    }
  });

  // Lazy load images with srcset for performance
  document.querySelectorAll('img').forEach(img => {
    img.setAttribute('loading', 'lazy');
    // If data-srcset is present, use it for responsive images
    if (img.dataset.srcset) {
      img.setAttribute('srcset', img.dataset.srcset);
    }
  });

  // Resize confetti canvas on window resize
  window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti-canvas');
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });

  // VanillaTilt for 3D tilt
  if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
      max: 18,
      speed: 400,
      glare: true,
      "max-glare": 0.18
    });
  }

  // ScrollReveal for fade-in
  if (window.ScrollReveal) {
    ScrollReveal().reveal('.hero-content, .bento-grid, .testimonial, .faqs, .download, .pricing, .testimonials', {
      delay: 300,
      distance: '30px',
      duration: 800,
      easing: 'ease-out',
      origin: 'bottom',
      reset: false
    });
  }

  // Service Worker registration for PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js');
    });
  }

  // AI Accessibility Widget Logic
  const aiAccessBtn = document.getElementById('aiAccessBtn');
  const aiAccessPanel = document.getElementById('aiAccessPanel');
  const closeAiAccessPanel = document.getElementById('closeAiAccessPanel');

  if (aiAccessBtn && aiAccessPanel && closeAiAccessPanel) {
    aiAccessBtn.addEventListener('click', () => {
      aiAccessPanel.classList.add('active');
      aiAccessPanel.focus();
    });
    closeAiAccessPanel.addEventListener('click', () => {
      aiAccessPanel.classList.remove('active');
      aiAccessBtn.focus();
    });
    // Close panel with Escape
    aiAccessPanel.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        aiAccessPanel.classList.remove('active');
        aiAccessBtn.focus();
      }
    });
  }

  // --- Read Aloud Feature ---
  const readAloudBtn = document.getElementById('readAloudBtn');
  if (readAloudBtn) {
    readAloudBtn.addEventListener('click', () => {
      const text = document.body.innerText || document.body.textContent;
      if ('speechSynthesis' in window) {
        const utter = new SpeechSynthesisUtterance(text.slice(0, 1200)); // Limit for demo
        window.speechSynthesis.cancel(); // Stop previous
        window.speechSynthesis.speak(utter);
      } else {
        alert('Sorry, your browser does not support speech synthesis.');
      }
    });
  }

  // --- Highlight Links Feature ---
  const highlightLinksBtn = document.getElementById('highlightLinksBtn');
  let linksHighlighted = false;
  if (highlightLinksBtn) {
    highlightLinksBtn.addEventListener('click', () => {
      document.querySelectorAll('a').forEach(link => {
        if (!linksHighlighted) {
          link.style.background = '#70f570';
          link.style.color = '#142030';
          link.style.padding = '2px 4px';
          link.style.borderRadius = '4px';
        } else {
          link.style.background = '';
          link.style.color = '';
          link.style.padding = '';
          link.style.borderRadius = '';
        }
      });
      linksHighlighted = !linksHighlighted;
    });
  }

  // --- Simplify Layout Feature ---
  const simplifyLayoutBtn = document.getElementById('simplifyLayoutBtn');
  let simplified = false;
  if (simplifyLayoutBtn) {
    simplifyLayoutBtn.addEventListener('click', () => {
      if (!simplified) {
        document.body.classList.add('simplified-layout');
        // Hide non-essential sections
        document.querySelectorAll('nav, .brand-section, .testimonial-section, .faqs, .download, footer').forEach(el => {
          el.style.display = 'none';
        });
        document.querySelector('main').style.margin = '2rem auto';
        simplifyLayoutBtn.textContent = '🔄 Restore Layout';
      } else {
        document.body.classList.remove('simplified-layout');
        document.querySelectorAll('nav, .brand-section, .testimonial-section, .faqs, .download, footer').forEach(el => {
          el.style.display = '';
        });
        document.querySelector('main').style.margin = '';
        simplifyLayoutBtn.textContent = '🧹 Simplify Layout';
      }
      simplified = !simplified;
    });
  }

  // --- Cute JetBuyBot Chatbot Logic ---
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotWidget = document.getElementById('chatbotWidget');
  const chatbotClose = document.getElementById('chatbotClose');
  const chatbotMessages = document.getElementById('chatbotMessages');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotSend = document.getElementById('chatbotSend');
  const chatbotTyping = document.getElementById('chatbotTyping');
  const chatbotQuickReplies = document.getElementById('chatbotQuickReplies');

  // Open/close logic
  if (chatbotToggle && chatbotWidget && chatbotClose) {
    chatbotToggle.addEventListener('click', () => {
      chatbotWidget.style.display = 'flex';
      chatbotMessages.innerHTML = '';
      addChatbotMessage("👋 Hi! I'm JetBuyBot. How can I help you today?");
      setQuickReplies([
        { label: "Order Coffee", value: "Order coffee" },
        { label: "Show Menu", value: "Show menu" },
        { label: "Help", value: "Help" }
      ]);
    });
    chatbotClose.addEventListener('click', () => chatbotWidget.style.display = 'none');
  }

  // Helper: Add message bubble
  function addChatbotMessage(text, sender = 'bot', delay = 0) {
    setTimeout(() => {
      const bubble = document.createElement('div');
      bubble.className = `chatbot-bubble ${sender}`;
      bubble.innerHTML = text;
      chatbotMessages.appendChild(bubble);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }, delay);
  }

  // Helper: Typing indicator
  function showTyping(show = true) {
    chatbotTyping.style.display = show ? 'flex' : 'none';
  }

  // Helper: Quick replies
  function setQuickReplies(replies = []) {
    chatbotQuickReplies.innerHTML = '';
    replies.forEach(reply => {
      const btn = document.createElement('button');
      btn.className = 'chatbot-quick-reply';
      btn.textContent = reply.label;
      btn.onclick = () => {
        chatbotInput.value = reply.value;
        chatbotInput.focus();
      };
      chatbotQuickReplies.appendChild(btn);
    });
  }

  // Bot responses
  function botRespond(userMsg) {
    showTyping(true);
    setQuickReplies([]);
    setTimeout(() => {
      showTyping(false);
      let response = "I'm JetBuyBot! 🚀<br>Try asking about <b>orders</b>, <b>features</b>, or how to use JetBuy.";
      let quickReplies = [
        { label: "Order Coffee", value: "Order coffee" },
        { label: "Show Menu", value: "Show menu" },
        { label: "Help", value: "Help" }
      ];
      if (/order/i.test(userMsg)) {
        response = "To place an order, just tap <b>Try JetBuy!</b> or say your order with Siri. ☕🍕";
        quickReplies = [{ label: "Show Menu", value: "Show menu" }];
      } else if (/menu/i.test(userMsg)) {
        response = "Here's our demo menu: <ul><li>☕ Caramel Macchiato</li><li>🍕 Pepperoni Pizza</li><li>🥗 Avocado Salad</li></ul>";
        quickReplies = [{ label: "Order Coffee", value: "Order coffee" }];
      } else if (/help|feature/i.test(userMsg)) {
        response = "JetBuy supports voice ordering, quick reorders, and more! Want to try a voice order?";
        quickReplies = [{ label: "Try Voice Order", value: "Try voice order" }];
      } else if (/coffee|pizza|food/i.test(userMsg)) {
        response = "JetBuy delivers your favorites, fast! 🚀";
      }
      addChatbotMessage(response, 'bot');
      setQuickReplies(quickReplies);
    }, 900);
  }

  // Send user message
  function sendUserMessage() {
    const msg = chatbotInput.value.trim();
    if (!msg) return;
    addChatbotMessage(msg, 'user');
    chatbotInput.value = '';
    botRespond(msg);
  }

  if (chatbotSend && chatbotInput) {
    chatbotSend.addEventListener('click', sendUserMessage);
    chatbotInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') sendUserMessage();
    });
  }

  // Siri animation sequence (optional, can be removed if handled inline)
  // Hide all at start (in case user disables JS)
  const siriOrbVisual = document.getElementById('siriOrbVisual');
  const siriCommand = document.getElementById('siriCommand');
  const staticMessage = document.getElementById('staticMessage');
  if (siriOrbVisual && siriCommand && staticMessage) {
    siriOrbVisual.style.display = 'none';
    siriCommand.style.display = 'none';
    staticMessage.style.display = 'none';

    // Show Siri orb after 2s
    setTimeout(() => {
      siriOrbVisual.style.display = 'flex';
    }, 2000);

    // Show "Hey Siri..." after 4s
    setTimeout(() => {
      siriCommand.style.display = 'block';
    }, 4000);

    // Show "A hot Caramel Macchiato..." after 6s
    setTimeout(() => {
      staticMessage.style.display = 'block';
    }, 6000);
  }
});
