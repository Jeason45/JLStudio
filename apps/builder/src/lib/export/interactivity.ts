/**
 * Vanilla JS interactivity script for exported static sites.
 * Handles: accordions, FAQ, tabs, mobile menu, dropdowns, lightbox, sliders, forms.
 * Injected as an inline <script> at the end of <body>.
 */
export function getInteractivityScript(formEndpoint: string): string {
  return `
(function() {
  'use strict';

  // ─── UTILS ──────────────────────────────────────
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  // ─── ACCORDION / FAQ ────────────────────────────
  function initAccordions() {
    $$('[data-interactive="accordion"], [data-interactive="faq"]').forEach(function(section) {
      var buttons = $$('button[aria-expanded]', section);
      buttons.forEach(function(btn) {
        btn.addEventListener('click', function() {
          var expanded = btn.getAttribute('aria-expanded') === 'true';
          var content = btn.parentElement.querySelector('.grid, [data-accordion-content]');
          if (!content) {
            // Try next sibling
            content = btn.nextElementSibling;
          }

          // Single mode: close others in same section
          var singleMode = !section.hasAttribute('data-multi');
          if (singleMode) {
            $$('button[aria-expanded="true"]', section).forEach(function(other) {
              if (other !== btn) {
                other.setAttribute('aria-expanded', 'false');
                var otherContent = other.parentElement.querySelector('.grid, [data-accordion-content]');
                if (!otherContent) otherContent = other.nextElementSibling;
                if (otherContent) {
                  otherContent.style.gridTemplateRows = '0fr';
                  otherContent.style.opacity = '0';
                }
                var otherIcon = other.querySelector('svg:last-child, .chevron-icon');
                if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
              }
            });
          }

          // Toggle this item
          var newState = !expanded;
          btn.setAttribute('aria-expanded', String(newState));
          if (content) {
            content.style.gridTemplateRows = newState ? '1fr' : '0fr';
            content.style.opacity = newState ? '1' : '0';
          }

          // Rotate icon
          var icon = btn.querySelector('svg:last-child');
          if (icon) {
            icon.style.transform = newState ? 'rotate(180deg)' : 'rotate(0deg)';
            icon.style.transition = 'transform 0.2s ease';
          }
        });
      });

      // Initialize: close all accordion contents
      $$('button[aria-expanded="false"]', section).forEach(function(btn) {
        var content = btn.parentElement.querySelector('.grid');
        if (!content) content = btn.nextElementSibling;
        if (content && content.classList.contains('grid')) {
          content.style.gridTemplateRows = '0fr';
          content.style.opacity = '0';
          content.style.transition = 'grid-template-rows 0.2s ease, opacity 0.2s ease';
        }
      });
    });
  }

  // ─── TABS ───────────────────────────────────────
  function initTabs() {
    $$('[data-interactive="tabs"]').forEach(function(section) {
      var tablist = $('[role="tablist"]', section);
      if (!tablist) return;

      var tabs = $$('[role="tab"]', tablist);
      var panels = $$('[role="tabpanel"]', section);

      function activateTab(tab) {
        var targetId = tab.getAttribute('aria-controls');

        // Deactivate all
        tabs.forEach(function(t) {
          t.setAttribute('aria-selected', 'false');
          t.setAttribute('tabindex', '-1');
          // Remove active styling
          t.style.opacity = '';
        });
        panels.forEach(function(p) {
          p.style.display = 'none';
          p.style.opacity = '0';
        });

        // Activate target
        tab.setAttribute('aria-selected', 'true');
        tab.setAttribute('tabindex', '0');
        tab.focus();

        var panel = document.getElementById(targetId);
        if (panel) {
          panel.style.display = '';
          panel.style.opacity = '1';
        }

        // Handle image crossfade for brixsa-style tabs
        var tabIndex = tabs.indexOf(tab);
        $$('[data-tab-image]', section).forEach(function(img, i) {
          img.style.opacity = i === tabIndex ? '1' : '0';
          img.style.transition = 'opacity 0.3s ease';
        });
      }

      tabs.forEach(function(tab) {
        tab.addEventListener('click', function() { activateTab(tab); });
        tab.addEventListener('keydown', function(e) {
          var idx = tabs.indexOf(tab);
          var newIdx = idx;
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { newIdx = (idx + 1) % tabs.length; e.preventDefault(); }
          else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { newIdx = (idx - 1 + tabs.length) % tabs.length; e.preventDefault(); }
          else if (e.key === 'Home') { newIdx = 0; e.preventDefault(); }
          else if (e.key === 'End') { newIdx = tabs.length - 1; e.preventDefault(); }
          if (newIdx !== idx) activateTab(tabs[newIdx]);
        });
      });

      // Initialize: show first tab panel, hide others
      panels.forEach(function(p, i) {
        if (i > 0) { p.style.display = 'none'; p.style.opacity = '0'; }
        else { p.style.opacity = '1'; }
      });
    });
  }

  // ─── MOBILE MENU ────────────────────────────────
  function initMobileMenus() {
    $$('[data-interactive="site-header"], [data-interactive="navbar-advanced"]').forEach(function(section) {
      // Find hamburger button: button that is hidden on md+ and contains Menu icon
      var hamburger = null;
      $$('button', section).forEach(function(btn) {
        var cl = btn.className || '';
        if (cl.indexOf('md:hidden') !== -1 || (btn.parentElement && btn.parentElement.className && btn.parentElement.className.indexOf('md:hidden') !== -1)) {
          hamburger = btn;
        }
      });

      if (!hamburger) {
        // Fallback: find button with Menu/hamburger SVG
        $$('button', section).forEach(function(btn) {
          var svgs = $$('svg', btn);
          if (svgs.length > 0 && !hamburger) {
            var paths = $$('line, path', svgs[0]);
            // Menu icon typically has 3 horizontal lines
            if (paths.length >= 3) hamburger = btn;
          }
        });
      }

      if (!hamburger) return;

      // Find mobile menu container: div with md:hidden that contains links
      var mobileMenu = null;
      $$('div', section).forEach(function(div) {
        var cl = div.className || '';
        if (cl.indexOf('md:hidden') !== -1 && $$('a', div).length > 0) {
          mobileMenu = div;
        }
      });

      if (!mobileMenu) return;

      var isOpen = false;
      mobileMenu.style.overflow = 'hidden';
      mobileMenu.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
      mobileMenu.style.maxHeight = '0';
      mobileMenu.style.opacity = '0';

      hamburger.addEventListener('click', function() {
        isOpen = !isOpen;
        if (isOpen) {
          mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
          mobileMenu.style.opacity = '1';
        } else {
          mobileMenu.style.maxHeight = '0';
          mobileMenu.style.opacity = '0';
        }

        // Toggle hamburger icon (Menu ↔ X)
        var svgs = $$('svg', hamburger);
        if (svgs.length >= 2) {
          svgs[0].style.display = isOpen ? 'none' : '';
          svgs[1].style.display = isOpen ? '' : 'none';
        }
      });

      // Close menu when clicking a link
      $$('a', mobileMenu).forEach(function(link) {
        link.addEventListener('click', function() {
          isOpen = false;
          mobileMenu.style.maxHeight = '0';
          mobileMenu.style.opacity = '0';
          var svgs = $$('svg', hamburger);
          if (svgs.length >= 2) {
            svgs[0].style.display = '';
            svgs[1].style.display = 'none';
          }
        });
      });
    });

    // Sticky navbar scroll effect
    $$('[data-interactive="navbar-advanced"]').forEach(function(section) {
      var nav = $('nav', section) || section;
      var origBg = nav.style.backgroundColor || '';

      window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
          nav.style.backgroundColor = origBg || 'rgba(0,0,0,0.8)';
          nav.style.backdropFilter = 'blur(10px)';
          nav.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        } else {
          nav.style.backgroundColor = origBg;
          nav.style.backdropFilter = '';
          nav.style.boxShadow = '';
        }
      }, { passive: true });
    });
  }

  // ─── DROPDOWNS ──────────────────────────────────
  function initDropdowns() {
    // Find dropdown triggers: buttons with aria-expanded + chevron that aren't accordion buttons
    $$('[data-interactive="dropdown"], [data-interactive="navbar-advanced"]').forEach(function(section) {
      $$('[data-dropdown-trigger], button[aria-expanded]', section).forEach(function(trigger) {
        // Skip accordion-style buttons
        if (trigger.closest('[data-interactive="accordion"], [data-interactive="faq"]')) return;

        var menu = trigger.nextElementSibling;
        if (!menu || menu.getAttribute('role') === 'tabpanel') return;

        // Check if it looks like a dropdown menu
        var hasLinks = $$('a', menu).length > 0;
        if (!hasLinks) return;

        var isOpen = false;
        menu.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        menu.style.opacity = '0';
        menu.style.transform = 'translateY(-8px)';
        menu.style.pointerEvents = 'none';

        function openMenu() {
          isOpen = true;
          menu.style.opacity = '1';
          menu.style.transform = 'translateY(0)';
          menu.style.pointerEvents = 'auto';
          trigger.setAttribute('aria-expanded', 'true');
          var icon = trigger.querySelector('svg:last-child');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }

        function closeMenu() {
          isOpen = false;
          menu.style.opacity = '0';
          menu.style.transform = 'translateY(-8px)';
          menu.style.pointerEvents = 'none';
          trigger.setAttribute('aria-expanded', 'false');
          var icon = trigger.querySelector('svg:last-child');
          if (icon) icon.style.transform = 'rotate(0deg)';
        }

        // Hover mode
        var closeTimer = null;
        var container = trigger.parentElement;

        container.addEventListener('mouseenter', function() {
          clearTimeout(closeTimer);
          openMenu();
        });
        container.addEventListener('mouseleave', function() {
          closeTimer = setTimeout(closeMenu, 200);
        });

        // Click mode fallback (mobile)
        trigger.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (isOpen) closeMenu(); else openMenu();
        });
      });
    });

    // Close all dropdowns on outside click
    document.addEventListener('click', function(e) {
      $$('[aria-expanded="true"]').forEach(function(trigger) {
        if (!trigger.parentElement.contains(e.target)) {
          trigger.setAttribute('aria-expanded', 'false');
          var menu = trigger.nextElementSibling;
          if (menu) {
            menu.style.opacity = '0';
            menu.style.transform = 'translateY(-8px)';
            menu.style.pointerEvents = 'none';
          }
        }
      });
    });
  }

  // ─── LIGHTBOX ───────────────────────────────────
  function initLightbox() {
    $$('[data-interactive="lightbox"]').forEach(function(section) {
      var images = $$('img', section);
      if (images.length === 0) return;

      var items = images.map(function(img) {
        return { src: img.src, alt: img.alt || '' };
      });

      // Make images clickable
      images.forEach(function(img, i) {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() { openLightbox(items, i); });
      });
    });
  }

  var lightboxEl = null;
  var lightboxImg = null;
  var lightboxIdx = 0;
  var lightboxItems = [];

  function createLightbox() {
    if (lightboxEl) return;

    lightboxEl = document.createElement('div');
    lightboxEl.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.95);backdrop-filter:blur(8px);display:none;align-items:center;justify-content:center;';

    // Close button
    var closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = 'position:absolute;top:16px;right:16px;color:#fff;font-size:32px;background:none;border:none;cursor:pointer;z-index:10;width:44px;height:44px;display:flex;align-items:center;justify-content:center;';
    closeBtn.addEventListener('click', closeLightbox);

    // Prev button
    var prevBtn = document.createElement('button');
    prevBtn.innerHTML = '&#8249;';
    prevBtn.style.cssText = 'position:absolute;left:16px;top:50%;transform:translateY(-50%);color:#fff;font-size:48px;background:rgba(255,255,255,0.1);border:none;cursor:pointer;width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;';
    prevBtn.addEventListener('click', function() { navigateLightbox(-1); });

    // Next button
    var nextBtn = document.createElement('button');
    nextBtn.innerHTML = '&#8250;';
    nextBtn.style.cssText = 'position:absolute;right:16px;top:50%;transform:translateY(-50%);color:#fff;font-size:48px;background:rgba(255,255,255,0.1);border:none;cursor:pointer;width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;';
    nextBtn.addEventListener('click', function() { navigateLightbox(1); });

    // Image
    lightboxImg = document.createElement('img');
    lightboxImg.style.cssText = 'max-width:90vw;max-height:85vh;object-fit:contain;border-radius:8px;transition:opacity 0.2s ease;';

    // Caption
    var caption = document.createElement('p');
    caption.id = 'lightbox-caption';
    caption.style.cssText = 'position:absolute;bottom:20px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,0.7);font-size:14px;text-align:center;';

    // Counter
    var counter = document.createElement('p');
    counter.id = 'lightbox-counter';
    counter.style.cssText = 'position:absolute;top:20px;left:20px;color:rgba(255,255,255,0.5);font-size:13px;';

    lightboxEl.appendChild(closeBtn);
    lightboxEl.appendChild(prevBtn);
    lightboxEl.appendChild(nextBtn);
    lightboxEl.appendChild(lightboxImg);
    lightboxEl.appendChild(caption);
    lightboxEl.appendChild(counter);
    document.body.appendChild(lightboxEl);

    // Close on backdrop click
    lightboxEl.addEventListener('click', function(e) {
      if (e.target === lightboxEl) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (lightboxEl.style.display === 'none') return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });
  }

  function openLightbox(items, idx) {
    createLightbox();
    lightboxItems = items;
    lightboxIdx = idx;
    updateLightbox();
    lightboxEl.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (lightboxEl) {
      lightboxEl.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  function navigateLightbox(dir) {
    lightboxIdx = (lightboxIdx + dir + lightboxItems.length) % lightboxItems.length;
    updateLightbox();
  }

  function updateLightbox() {
    if (!lightboxImg || !lightboxItems[lightboxIdx]) return;
    lightboxImg.src = lightboxItems[lightboxIdx].src;
    lightboxImg.alt = lightboxItems[lightboxIdx].alt;
    var caption = document.getElementById('lightbox-caption');
    if (caption) caption.textContent = lightboxItems[lightboxIdx].alt;
    var counter = document.getElementById('lightbox-counter');
    if (counter) counter.textContent = (lightboxIdx + 1) + ' / ' + lightboxItems.length;
  }

  // ─── SLIDER / CAROUSEL ─────────────────────────
  function initSliders() {
    $$('[data-interactive="slider"]').forEach(function(section) {
      // Find the slides container (typically has overflow-hidden and flex children)
      var container = $('[class*="overflow"]', section) || $('.embla, [class*="embla"]', section);
      if (!container) {
        // Fallback: find a div that has multiple similar children
        $$('div', section).forEach(function(div) {
          var cl = div.className || '';
          if (cl.indexOf('flex') !== -1 && div.children.length > 1) {
            container = div;
          }
        });
      }
      if (!container) return;

      var slides = Array.from(container.children);
      if (slides.length <= 1) return;

      var currentIdx = 0;

      // Setup CSS scroll-snap
      container.style.display = 'flex';
      container.style.overflowX = 'auto';
      container.style.scrollSnapType = 'x mandatory';
      container.style.scrollBehavior = 'smooth';
      container.style.scrollbarWidth = 'none';
      container.style.msOverflowStyle = 'none';
      // Hide webkit scrollbar
      var styleEl = document.createElement('style');
      styleEl.textContent = '[data-interactive="slider"] [style*="scroll-snap"]::-webkit-scrollbar{display:none}';
      document.head.appendChild(styleEl);

      slides.forEach(function(slide) {
        slide.style.flexShrink = '0';
        slide.style.width = '100%';
        slide.style.scrollSnapAlign = 'start';
      });

      function goTo(idx) {
        idx = Math.max(0, Math.min(idx, slides.length - 1));
        currentIdx = idx;
        slides[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        updateDots();
      }

      // Find prev/next buttons
      $$('button', section).forEach(function(btn) {
        var svgs = $$('svg', btn);
        if (svgs.length === 0) return;
        var paths = (svgs[0].innerHTML || '').toLowerCase();
        // ChevronLeft typically has a path going left
        var ariaLabel = btn.getAttribute('aria-label') || '';
        if (paths.indexOf('left') !== -1 || ariaLabel.indexOf('prev') !== -1 || btn.className.indexOf('left') !== -1) {
          btn.addEventListener('click', function() { goTo(currentIdx - 1); });
        } else if (paths.indexOf('right') !== -1 || ariaLabel.indexOf('next') !== -1 || btn.className.indexOf('right') !== -1) {
          btn.addEventListener('click', function() { goTo(currentIdx + 1); });
        }
      });

      // Find or create dot indicators
      var dotsContainer = $('[class*="justify-center"][class*="gap"]', section);
      var dots = dotsContainer ? $$('button', dotsContainer) : [];

      dots.forEach(function(dot, i) {
        dot.addEventListener('click', function() { goTo(i); });
      });

      function updateDots() {
        dots.forEach(function(dot, i) {
          dot.style.opacity = i === currentIdx ? '1' : '0.4';
          dot.style.transform = i === currentIdx ? 'scale(1.2)' : 'scale(1)';
        });
      }

      // Track scroll position to update current index
      container.addEventListener('scroll', function() {
        var scrollLeft = container.scrollLeft;
        var width = container.offsetWidth;
        var newIdx = Math.round(scrollLeft / width);
        if (newIdx !== currentIdx) {
          currentIdx = newIdx;
          updateDots();
        }
      }, { passive: true });

      // Auto-play if configured
      var autoplay = section.getAttribute('data-autoplay');
      if (autoplay) {
        var interval = parseInt(autoplay) || 5000;
        var timer = setInterval(function() {
          goTo((currentIdx + 1) % slides.length);
        }, interval);

        section.addEventListener('mouseenter', function() { clearInterval(timer); });
        section.addEventListener('mouseleave', function() {
          timer = setInterval(function() {
            goTo((currentIdx + 1) % slides.length);
          }, interval);
        });
      }

      updateDots();
    });
  }

  // ─── FORMS ──────────────────────────────────────
  function initForms() {
    var endpoint = ${JSON.stringify(formEndpoint)};

    $$('[data-interactive="contact"], [data-interactive="newsletter"], [data-interactive="form"]').forEach(function(section) {
      var forms = $$('form', section);
      if (forms.length === 0) {
        // Wrap inputs in a virtual form
        var inputs = $$('input, textarea, select', section);
        if (inputs.length === 0) return;

        var submitBtn = $('button[type="submit"], button:last-of-type', section);
        if (submitBtn) {
          submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            submitFormData(section, inputs, submitBtn, endpoint);
          });
        }
        return;
      }

      forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          var inputs = $$('input, textarea, select', form);
          var submitBtn = $('button[type="submit"], button:last-of-type', form);
          submitFormData(section, inputs, submitBtn, endpoint);
        });
      });
    });
  }

  function submitFormData(section, inputs, submitBtn, endpoint) {
    var data = {};
    inputs.forEach(function(input) {
      var name = input.name || input.placeholder || input.type;
      if (input.type === 'checkbox') {
        data[name] = input.checked;
      } else if (input.type === 'radio') {
        if (input.checked) data[name] = input.value;
      } else {
        data[name] = input.value;
      }
    });

    // Disable button
    var origText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi en cours...';
    }

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: data, source: window.location.pathname })
    })
    .then(function(res) {
      if (!res.ok) throw new Error('Erreur serveur');
      return res.json();
    })
    .then(function() {
      // Show success
      if (submitBtn) {
        submitBtn.textContent = 'Envoyé !';
        submitBtn.style.backgroundColor = '#22c55e';
      }
      // Clear inputs
      inputs.forEach(function(input) {
        if (input.type !== 'radio' && input.type !== 'checkbox') input.value = '';
      });
      setTimeout(function() {
        if (submitBtn) {
          submitBtn.textContent = origText;
          submitBtn.style.backgroundColor = '';
          submitBtn.disabled = false;
        }
      }, 3000);
    })
    .catch(function() {
      if (submitBtn) {
        submitBtn.textContent = 'Erreur, réessayez';
        submitBtn.style.backgroundColor = '#ef4444';
        setTimeout(function() {
          submitBtn.textContent = origText;
          submitBtn.style.backgroundColor = '';
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  }

  // ─── SMOOTH SCROLL ──────────────────────────────
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        var target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ─── SCROLL ANIMATIONS ─────────────────────────
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Observe direct children of #site-canvas (section wrappers)
    var canvas = document.getElementById('site-canvas');
    if (canvas) {
      Array.from(canvas.children).forEach(function(child, i) {
        // Skip first section (hero/header)
        if (i < 1) return;
        child.style.opacity = '0';
        child.style.transform = 'translateY(30px)';
        child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        child.style.transitionDelay = (i * 0.05) + 's';
        observer.observe(child);
      });
    }
  }

  // ─── INIT ALL ───────────────────────────────────
  document.addEventListener('DOMContentLoaded', function() {
    initAccordions();
    initTabs();
    initMobileMenus();
    initDropdowns();
    initLightbox();
    initSliders();
    initForms();
    initSmoothScroll();
    initScrollReveal();
  });
})();
`
}
