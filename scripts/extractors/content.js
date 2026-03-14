/**
 * Extract visible content: text, images, links, forms, navigation, footer
 */

async function extractContent(page) {
  return page.evaluate(() => {
    // Helper: extract button info
    function extractButton(el) {
      if (!el) return null
      return {
        label: el.textContent?.trim(),
        href: el.href || el.getAttribute('href') || '',
        tag: el.tagName,
        classes: el.className?.toString().slice(0, 80),
      }
    }

    // Navigation
    const navElement = document.querySelector('nav, header, [class*="navbar"], [class*="nav-"], [data-w-id]')
    const navigation = {
      links: [],
      logo: null,
      cta: null,
    }
    if (navElement) {
      // Logo
      const logoImg = navElement.querySelector('img[class*="logo"], [class*="logo"] img, a img')
      const logoText = navElement.querySelector('[class*="logo"], .brand, [class*="brand"]')
      if (logoImg) {
        navigation.logo = { type: 'image', src: logoImg.src, alt: logoImg.alt }
      } else if (logoText) {
        navigation.logo = { type: 'text', text: logoText.textContent?.trim() }
      }

      // Links
      navElement.querySelectorAll('a').forEach(a => {
        const text = a.textContent?.trim()
        if (!text || text.length > 50) return
        const isLogo = a.querySelector('img[class*="logo"]') || a.classList.contains('logo') || a.classList.contains('brand') || a.closest('[class*="logo"]')
        if (isLogo) return

        const isCTA = a.classList.contains('btn') || a.classList.contains('button') ||
          a.className?.toString().includes('cta') || a.className?.toString().includes('btn') ||
          a.className?.toString().includes('button')
        const hasDropdown = !!a.querySelector('svg, [class*="chevron"], [class*="dropdown"], [class*="arrow"]') ||
          !!a.nextElementSibling?.classList.contains('dropdown') ||
          a.parentElement?.classList.contains('dropdown')

        if (isCTA) {
          navigation.cta = { label: text, href: a.href }
        } else {
          navigation.links.push({
            label: text,
            href: a.getAttribute('href') || a.href,
            hasDropdown,
          })
        }
      })
    }

    // Sections content
    const sectionElements = document.querySelectorAll('section, [class*="section"], [class*="Section"], main > div > div, .w-section')
    const sections = []

    sectionElements.forEach((section, idx) => {
      const rect = section.getBoundingClientRect()
      if (rect.height < 50 || rect.width < 200) return

      const sData = {
        index: idx,
        tag: section.tagName,
        classes: section.className?.toString().slice(0, 100),
        id: section.id || null,
        rect: { top: Math.round(rect.top + window.scrollY), height: Math.round(rect.height) },
        headings: [],
        paragraphs: [],
        buttons: [],
        images: [],
        lists: [],
        forms: [],
      }

      // Headings
      section.querySelectorAll('h1, h2, h3, h4').forEach(h => {
        const text = h.textContent?.trim()
        if (text) {
          sData.headings.push({
            tag: h.tagName.toLowerCase(),
            text,
            computed: {
              fontSize: getComputedStyle(h).fontSize,
              fontWeight: getComputedStyle(h).fontWeight,
              textTransform: getComputedStyle(h).textTransform,
              letterSpacing: getComputedStyle(h).letterSpacing,
            },
          })
        }
      })

      // Paragraphs
      section.querySelectorAll('p').forEach(p => {
        const text = p.textContent?.trim()
        if (text && text.length > 10) {
          sData.paragraphs.push(text)
        }
      })

      // Buttons
      section.querySelectorAll('a[class*="btn"], a[class*="button"], button, [class*="cta"], a[class*="cta"]').forEach(btn => {
        const b = extractButton(btn)
        if (b && b.label) sData.buttons.push(b)
      })

      // Also get link-style buttons (common in Webflow)
      section.querySelectorAll('a.w-button, a[class*="w-button"]').forEach(btn => {
        const b = extractButton(btn)
        if (b && b.label && !sData.buttons.some(x => x.label === b.label)) {
          sData.buttons.push(b)
        }
      })

      // Images
      section.querySelectorAll('img').forEach(img => {
        if (img.src && img.width > 30) {
          sData.images.push({
            src: img.src,
            alt: img.alt || '',
            width: img.naturalWidth || img.width,
            height: img.naturalHeight || img.height,
          })
        }
      })

      // Background images
      const bgImage = getComputedStyle(section).backgroundImage
      if (bgImage && bgImage !== 'none') {
        const urlMatch = bgImage.match(/url\(["']?(.*?)["']?\)/)
        if (urlMatch) {
          sData.images.push({
            src: urlMatch[1],
            alt: 'background',
            isBackground: true,
          })
        }
      }

      // Lists
      section.querySelectorAll('ul, ol').forEach(list => {
        const items = []
        list.querySelectorAll('li').forEach(li => {
          const text = li.textContent?.trim()
          if (text) items.push(text)
        })
        if (items.length > 0) sData.lists.push(items)
      })

      // Forms
      section.querySelectorAll('form').forEach(form => {
        const fields = []
        form.querySelectorAll('input, textarea, select').forEach(field => {
          fields.push({
            type: field.type || field.tagName.toLowerCase(),
            name: field.name,
            placeholder: field.placeholder || '',
            required: field.required,
          })
        })
        const submitBtn = form.querySelector('button[type="submit"], input[type="submit"], button')
        sData.forms.push({
          action: form.action,
          fields,
          submitLabel: submitBtn?.textContent?.trim() || submitBtn?.value || 'Submit',
        })
      })

      sections.push(sData)
    })

    // Footer extraction
    const footer = document.querySelector('footer, [class*="footer"], [class*="Footer"]')
    let footerData = null
    if (footer) {
      footerData = {
        columns: [],
        copyright: null,
        socials: [],
        logo: null,
        tagline: null,
      }

      // Logo
      const fLogo = footer.querySelector('img[class*="logo"], [class*="logo"] img')
      const fLogoText = footer.querySelector('[class*="logo"], .brand')
      if (fLogo) footerData.logo = { type: 'image', src: fLogo.src }
      else if (fLogoText) footerData.logo = { type: 'text', text: fLogoText.textContent?.trim() }

      // Copyright
      const copyrightEl = footer.querySelector('[class*="copyright"], [class*="Copyright"]')
      if (copyrightEl) {
        footerData.copyright = copyrightEl.textContent?.trim()
      } else {
        // Try to find copyright in any small text
        footer.querySelectorAll('p, span, div').forEach(el => {
          const text = el.textContent?.trim()
          if (text && (text.includes('©') || text.toLowerCase().includes('copyright'))) {
            footerData.copyright = text
          }
        })
      }

      // Tagline
      const taglineEl = footer.querySelector('p:not([class*="copyright"])')
      if (taglineEl) {
        const text = taglineEl.textContent?.trim()
        if (text && !text.includes('©') && text.length > 20 && text.length < 200) {
          footerData.tagline = text
        }
      }

      // Social links
      footer.querySelectorAll('a[href*="facebook"], a[href*="twitter"], a[href*="instagram"], a[href*="youtube"], a[href*="linkedin"], a[href*="pinterest"], a[href*="tiktok"]').forEach(a => {
        const platform = ['facebook', 'twitter', 'instagram', 'youtube', 'linkedin', 'pinterest', 'tiktok']
          .find(p => a.href.includes(p))
        if (platform) footerData.socials.push({ platform, url: a.href })
      })

      // Columns (link groups)
      const linkGroups = footer.querySelectorAll('[class*="column"], [class*="col"], [class*="menu"], [class*="links"]')
      if (linkGroups.length > 0) {
        linkGroups.forEach(group => {
          const title = group.querySelector('h3, h4, h5, h6, [class*="title"], [class*="heading"], strong')
          const links = []
          group.querySelectorAll('a').forEach(a => {
            const text = a.textContent?.trim()
            if (text && text.length < 50 && !['facebook', 'twitter', 'instagram', 'youtube'].some(s => a.href.includes(s))) {
              links.push({ label: text, href: a.getAttribute('href') || a.href })
            }
          })
          if (links.length > 0) {
            footerData.columns.push({
              title: title?.textContent?.trim() || '',
              links,
            })
          }
        })
      }
    }

    return { navigation, sections, footer: footerData }
  })
}

module.exports = { extractContent }
