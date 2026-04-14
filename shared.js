// ===== STORAGE FUNCTIONS =====
function saveToStorage() {
    // Build a serializable copy of state — exclude Image objects
    const serializableState = JSON.parse(JSON.stringify(state, (key, value) => {
        if (value instanceof HTMLImageElement || value instanceof Image) return undefined;
        return value;
    }));
    localStorage.setItem('cardel_state', JSON.stringify(serializableState));
}

function cleanFieldValue(value) {
    if (value === undefined || value === null) return '';
    const s = String(value).trim();
    if (s.toLowerCase() === 'undefined' || s.toLowerCase() === 'null') return '';
    return value;
}

function sanitizeCardTextFields() {
    state.cardData.name = cleanFieldValue(state.cardData.name);
    state.cardData.title = cleanFieldValue(state.cardData.title);
    state.cardData.number = cleanFieldValue(state.cardData.number);
    state.cardData.email = cleanFieldValue(state.cardData.email);
    state.cardData.website = cleanFieldValue(state.cardData.website);
}

function getMaterialCategoryById(materialId) {
    for (const category of Object.keys(state.materials)) {
        if ((state.materials[category] || []).some(m => m.id === materialId)) return category;
    }
    return 'metal';
}

// loadFromStorage is defined below (single authoritative version)
        // Global State
        const state = {
     cardData: {
        name: '',
        title: '',
        website: '',
        showWebsiteFront: true,
        showWebsiteBack: false,
        material: 'silver',
        materialCategory: 'metal',
        // Typography controls
        nameSize: 36,
        numberSize: 18,
        backWebsiteSize: 12,
        font: "'Cormorant Garamond',serif",
        align: 'left',
        // Design upload fields
        designDataUrl: null,
        designOpacity: 0.85,
        designImg: null,
        contrastTransition: 0 // 0 = Dark, 1 = Light
    },
    activeHotspot: null,
    isZoomed: false,
    orderConfig: {
        quantity: 10,
        basePrice: 590,
        addons: {
            nfc: true,
            qr: false,
            laser: false
        }
    },
   materials: {
    // ── METAL (4) ───────────────────────────────────────────────
    metal: [
        { id: 'gunmetal', name: 'Black Metal', color: '#1a1a1a', thickness: '0.8mm', weight: '28g', finish: 'Brushed Matte', price: 0, desc: 'Premium black stainless steel with sophisticated brushed finish' },
        { id: 'gold22k', name: 'Gold Metal', color: '#c9a440', thickness: '0.8mm', weight: '28g', finish: 'Polished Mirror', price: 150, desc: '24k gold-plated with mirror-like reflectivity', badge: 'SIGNATURE' },
        { id: 'silver', name: 'Silver Metal', color: '#9e9e9e', thickness: '0.8mm', weight: '28g', finish: 'Brushed Satin', price: 150, desc: 'Sterling silver-plated with elegant brushed texture' },
        { id: 'platinum', name: 'Platinum', color: '#b0b8c0', thickness: '0.8mm', weight: '30g', finish: 'Brushed Satin', price: 250, desc: 'Rare platinum-plated with sophisticated cool tone', badge: 'RARE' }
    ],

    // ── WOOD (5) ────────────────────────────────────────────────
    wood: [
        { id: 'ebony', name: 'African Ebony', color: '#1c1008', thickness: '1.0mm', weight: '22g', finish: 'High Polish', price: 200, desc: 'Rare African ebony with deep black tone and natural lustre' },
        { id: 'mahogany', name: 'Mahogany', color: '#5a1e0a', thickness: '0.9mm', weight: '14g', finish: 'Natural Oil', price: 80, desc: 'Rich mahogany with a deep semi-gloss finish' },
        { id: 'walnut', name: 'Black Walnut', color: '#3d2008', thickness: '1.0mm', weight: '18g', finish: 'Oiled Natural', price: 100, desc: 'Sustainably sourced American black walnut', badge: 'POPULAR' },
        { id: 'maple', name: 'White Maple', color: '#c8a060', thickness: '1.0mm', weight: '16g', finish: 'Matte Sealed', price: 100, desc: 'Canadian hard maple with clean bright appearance' },
        { id: 'birch', name: 'Birch White', color: '#e8dcc0', thickness: '1.0mm', weight: '15g', finish: 'Natural Matte', price: 90, desc: 'Nordic birch with pale, clean grain pattern' }
    ],

    // ── CARBON (5) ──────────────────────────────────────────────
    carbon: [
        { id: 'cf-black', name: 'Carbon Black', color: '#111111', thickness: '0.6mm', weight: '20g', finish: 'Twill Weave', price: 100, desc: 'Aerospace-grade with signature 2x2 pattern', badge: 'ULTRA', cf: true },
        { id: 'cf-blue', name: 'Carbon Blue', color: '#0a1020', thickness: '0.6mm', weight: '20g', finish: 'Twill Weave', price: 120, desc: 'Carbon fiber infused with deep midnight blue tint', cf: true },
        { id: 'cf-red', name: 'Carbon Red', color: '#200a0a', thickness: '0.6mm', weight: '20g', finish: 'Twill Weave', price: 120, desc: 'Carbon fiber with striking ruby red undertone', cf: true },
        { id: 'cf-silver', name: 'Carbon Silver', color: '#1a1a1a', thickness: '0.6mm', weight: '21g', finish: 'Twill Weave', price: 110, desc: 'Carbon fiber with metallic silver clear coat', cf: true },
        { id: 'forged-carbon', name: 'Forged Carbon', color: '#2a2a2a', thickness: '0.7mm', weight: '22g', finish: 'Forged Composite', price: 250, desc: 'Hand-forged with unique marble-like patterns', cf: true }
    ],

    // ── LIMITED (6) ─────────────────────────────────────────────
    limited: [
        { id: 'obsidian', name: 'Obsidian', color: '#2a2a3a', thickness: '1.1mm', weight: '30g', finish: 'Natural Polish', price: 350, desc: 'Volcanic obsidian with deep glassy finish', badge: 'RARE' },
        { id: 'aurora', name: 'Aurora', color: '#1a0a2e', thickness: '0.9mm', weight: '28g', finish: 'Iridescent', price: 450, desc: 'Multi-layer aurora coating shifts colour with light', badge: '12 LEFT' },
        { id: 'meteorite', name: 'Meteorite Inlay', color: '#4a4a4a', thickness: '1.2mm', weight: '32g', finish: 'Etched Pattern', price: 500, desc: 'Authentic Muonionalusta meteorite, 4.5B years old', badge: 'RARE' },
        { id: 'ivory', name: 'Ivory Pearl', color: '#f8f4ec', thickness: '0.9mm', weight: '15g', finish: 'Pearlescent', price: 300, desc: 'Genuine mother-of-pearl inlay with soft iridescence' },
        { id: 'glacial', name: 'Glacial Blue', color: '#a8d4e8', thickness: '0.8mm', weight: '25g', finish: 'Anodized Frost', price: 280, desc: 'Frozen aesthetic with crisp, cool anodized finish', badge: 'NEW' },
        { id: 'vanta', name: 'Vanta Black', color: '#050505', thickness: '0.8mm', weight: '28g', finish: 'Ultra-Matte', price: 600, desc: 'The darkest card ever made — absorbs 99.9% of light', badge: 'ULTRA' }
    ]
},
            
            // ── TEMPLATES (Shared source) ───────────────────────────────────
            templates: [
                { id: 'editorial', name: 'Editorial', cat: 'editorial', mid: 'gunmetal' },
                { id: 'corporate', name: 'Corporate', cat: 'corporate', mid: 'gold22k' },
                { id: 'minimal', name: 'Minimal', cat: 'minimal', mid: 'silver' },
                { id: 'luxury', name: 'Luxury Gold', cat: 'editorial', mid: 'walnut' },
                { id: 'carbon-pro', name: 'Carbon Pro', cat: 'editorial', mid: 'cf-black' },
                { id: 'ivory-cls', name: 'Ivory', cat: 'minimal', mid: 'ivory' }
            ]
        };

        // Initialize — only run index.html-specific calls when on that page
       window.addEventListener('load', () => {
    // Keep one persisted state across index/materials/order pages.
    const isIndexPage = !!document.getElementById('cardContainer3d');
    
    if (isIndexPage) {
        // ALWAYS start fresh on the index page as requested: 
        // Silver material + empty identity fields on every refresh.
        state.cardData.material = 'silver';
        state.cardData.materialCategory = 'metal';
        state.cardData.name = '';
        state.cardData.title = '';
        state.cardData.number = '';
        state.cardData.email = '';
        state.cardData.website = '';
        
        // Update storage to reflect the reset, so it stays silver even if they navigate away and back
        saveToStorage();
    } else {
        // Materials or Order page: load normal persisted state
        loadFromStorage();
    }

    // index.html-only initializations (guarded by element presence)
    const savedCategory = state.cardData.materialCategory || 'metal';
    if (document.getElementById('materialsGrid'))    loadMaterials(savedCategory);
    if (document.getElementById('cardContainer3d'))  setup3DTilt();
    if (document.getElementById('steps-section'))    setupStepImagesTilt();
    if (document.getElementById('cardInputOverlay')) setupCardInputs();
    setupSidebarEnterFlow();

    // updateAllCards is now page-safe (uses null-checks inside)
    updateAllCards();

    // Force canvas redraw after a short delay to ensure textures are fresh
    // (handles the case where user returns from materials page with a new material)
    setTimeout(() => {
        if (document.getElementById('heroFrontCanvas')) {
            drawCard('heroFrontCanvas', 'front', 600, 378);
            drawCard('heroBackCanvas', 'back', 600, 378);
        }
    }, 150);

    // Restore sidebar inputs and checklist from saved state (index.html)
    syncSidebarFromState();
    updateChecklistState();
    
    // Animate card entrance immediately (index.html only)
    setTimeout(() => {
        const cardWrapper = document.getElementById('cardEntranceWrapper');
        if (cardWrapper) cardWrapper.classList.add('loaded');
    }, 100);
});

      // ─────────────────────────────────────────────
      // SIDEBAR ↔ CARD SYNC
      // ─────────────────────────────────────────────
      let _syncDebounce = null;
      let _nextDetailsRevealAt = 0;
      const offCanvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
      const offCtx = offCanvas ? offCanvas.getContext('2d') : null;

     function triggerNextDetailsReveal() {
         const now = Date.now();
         if (now - _nextDetailsRevealAt < 450) return;
         _nextDetailsRevealAt = now;

         const nextBtn = document.getElementById('nextBtn');
         const checklist = document.querySelector('.checklist-container');
         const preview = document.getElementById('cardPreviewSection');

         if (nextBtn) {
             nextBtn.classList.add('visible');
             if (typeof gsap !== 'undefined') {
                 gsap.fromTo(nextBtn, { x: -28, opacity: 0.35 }, { x: 0, opacity: 1, duration: 0.48, ease: 'power3.out', clearProps: 'transform' });
             }
         }
         if (typeof gsap !== 'undefined') {
             if (checklist) gsap.fromTo(checklist, { x: -18 }, { x: 0, duration: 0.4, ease: 'power2.out', clearProps: 'transform' });
             if (preview) gsap.fromTo(preview, { x: 18 }, { x: 0, duration: 0.4, ease: 'power2.out', clearProps: 'transform' });
         }
     }
     window.triggerNextDetailsReveal = triggerNextDetailsReveal;

     function setupSidebarEnterFlow() {
         const ids = ['sidebarName', 'sidebarTitle', 'sidebarNumber', 'sidebarEmail', 'sidebarWebsite'];
         const fields = ids.map(id => document.getElementById(id)).filter(Boolean);
         if (!fields.length) return;

         fields.forEach((field, idx) => {
             field.addEventListener('keydown', (e) => {
                 if (e.key !== 'Enter') return;
                 e.preventDefault();
                 const nextField = fields[idx + 1];
                 if (nextField) {
                     nextField.focus();
                     nextField.select?.();
                 } else {
                     triggerNextDetailsReveal();
                 }
             });
         });
     }
     window.setupSidebarEnterFlow = setupSidebarEnterFlow;

     // Called when user types in the sidebar inputs
     function syncFromSidebar(field, value) {
         state.cardData[field] = value;
         updateChecklistState(); // instant — no canvas, just class changes
        
        // Remove guidance glow from sidebar on first typing
        const checklist = document.querySelector('.checklist-container');
        if (checklist) checklist.classList.remove('guidance-glow');

         // Debounce the expensive canvas redraw by 120ms
         clearTimeout(_syncDebounce);
         _syncDebounce = setTimeout(() => {
             updateAllCards();
             saveToStorage();
         }, 120);
     }
     window.syncFromSidebar = syncFromSidebar;

     // Sync sidebar fields FROM state (e.g., after card overlay editing)
     function syncSidebarFromState() {
          const sidebarName   = document.getElementById('sidebarName');
          const sidebarTitle  = document.getElementById('sidebarTitle');
          const sidebarNumber = document.getElementById('sidebarNumber');
          const sidebarEmail  = document.getElementById('sidebarEmail');
          const sidebarWebsite = document.getElementById('sidebarWebsite');
          
          if (sidebarName)   sidebarName.value   = cleanFieldValue(state.cardData.name)   || '';
          if (sidebarTitle)  sidebarTitle.value  = cleanFieldValue(state.cardData.title)  || '';
          if (sidebarNumber) sidebarNumber.value = cleanFieldValue(state.cardData.number) || '';
          if (sidebarEmail)  sidebarEmail.value  = cleanFieldValue(state.cardData.email)  || '';
          if (sidebarWebsite) sidebarWebsite.value = cleanFieldValue(state.cardData.website) || '';
          
          updateChecklistState();
      }
     window.syncSidebarFromState = syncSidebarFromState;

     // Update the check-circle states based on filled fields
     function updateChecklistState() {
         const item1 = document.getElementById('check-item-1');
         const item2 = document.getElementById('check-item-2');
         const item3 = document.getElementById('check-item-3');
         const item4 = document.getElementById('check-item-4');
         const item5 = document.getElementById('check-item-5');
         
         if (item1) item1.classList.toggle('completed', !!state.cardData.name);
         if (item2) item2.classList.toggle('completed', !!state.cardData.title);
         if (item3) item3.classList.toggle('completed', !!state.cardData.number);
         if (item4) item4.classList.toggle('completed', !!state.cardData.email);
         if (item5) item5.classList.toggle('completed', !!state.cardData.website);

         // Show Continue button when name + number + email are filled
         const nextBtn = document.getElementById('nextBtn');
         if (nextBtn) {
             const ready = state.cardData.name && state.cardData.number && state.cardData.email;
             nextBtn.classList.toggle('visible', !!ready);
         }
     }
     window.updateChecklistState = updateChecklistState;

     // Card Zoom Functionality with GSAP
// Hide the guide tooltip once the card is tapped once
function toggleCardZoom(event) {
    // Remove guidance elements on interaction
    const fingerGuide = document.getElementById('fingerGuide');
    const cardContainer = document.getElementById('cardContainer3d');
    const checklist = document.querySelector('.checklist-container');
    if (fingerGuide) fingerGuide.classList.add('hidden');
    if (cardContainer) cardContainer.classList.add('interacted');
    if (checklist) checklist.classList.remove('guidance-glow');

    // Hide click guide on first interaction
    const guide = document.getElementById('cardClickGuide');
    if (guide) guide.classList.add('hidden');

    // Remove golden highlight once user interacts
    document.querySelectorAll('.golden-glow').forEach(el => el.classList.remove('golden-glow'));

    // Prevent zoom if clicking on input fields
    if (event.target.classList.contains('card-input-field')) {
        return;
    }

    if (!state.isZoomed) {
        zoomIn();
    }
    // Don't close when clicking the card itself - let the document handler do that
}


function getInputColorsForMaterial(materialId) {
    // Light materials need dark text
    const lightMaterials = ['gold-metal', 'silver-metal', 'rose-gold', 'maple', 'mother-pearl'];
    const isLight = lightMaterials.includes(materialId);
    
    return {
        name: isLight ? '#1a1a1a' : '#c9a962',
        title: isLight ? '#555555' : '#aaaaaa',
        number: isLight ? '#1a1a1a' : '#ffffff',
        email: isLight ? '#555555' : '#888888',
        icons: isLight ? '#1a1a1a' : '#c9a962'
    };
}


function handleScrollExit(e) {
    if (state.isZoomed) {
        // Prevent the actual scroll from moving the page while we close
        if (e.cancelable) e.preventDefault();
        closeCardZoom();
    }
}

function zoomIn() {
    // Get elements first
    const cardContainer = document.getElementById('cardContainer3d');
    const overlay = document.getElementById('zoomOverlay');
    const closeHint = document.getElementById('closeHint');
    const heroContent = document.getElementById('heroContent');
    const materialsSection = document.getElementById('materials');
    const navbar = document.getElementById('navbar');
    
    // Get position BEFORE any changes
    const rect = cardContainer.getBoundingClientRect();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const translateX = centerX - (rect.left + rect.width / 2);
    const translateY = centerY - (rect.top + rect.height / 2);
    
    // CRITICAL: Set isZoomed FIRST, then draw
    state.isZoomed = true;
    const section = document.getElementById('cardPreviewSection');
    if (section) section.classList.add('zoomed-state');

    
    // NOW draw with isZoomed = true (hides text, shows material only)
    drawCard('heroFrontCanvas', 'front', 600, 378);
    drawCard('heroBackCanvas', 'back', 600, 378);
    
    // Get dynamic colors based on current material
    const colors = getTextColorsForMaterial(state.cardData.material);

    // Apply dynamic colors to input fields globally via sync
    syncInputColors();
    
    const nameInput = document.getElementById('inputName');
    const titleInput = document.getElementById('inputTitle');
    const numberInput = document.getElementById('inputNumber');
    const emailInput = document.getElementById('inputEmail');

    // Update CSS custom property for icons
    cardContainer.style.setProperty('--icon-color', colors.primary);
    cardContainer.style.setProperty('--text-shadow', colors.shadow);
    
    // Add zoomed class for CSS
    cardContainer.classList.add('zoomed');
    cardContainer.style.opacity = '1';
    cardContainer.style.filter = 'none';
    overlay.classList.add('active');
    closeHint.classList.add('visible');
    
    // Pause floating animation
    cardContainer.style.animation = 'none';
    
    // Sync input values
    sanitizeCardTextFields();
    if (nameInput) nameInput.value = state.cardData.name || '';
    if (titleInput) titleInput.value = state.cardData.title || '';
    if (numberInput) numberInput.value = state.cardData.number || '';
    if (emailInput) emailInput.value = state.cardData.email || '';
    if (document.getElementById('inputWebsite')) document.getElementById('inputWebsite').value = state.cardData.website || '';
    
    // Kill existing tweens
    gsap.killTweensOf(cardContainer);
    
    // Animate overlay
    gsap.to(overlay, { opacity: 1, duration: 0.4, ease: 'power2.out' });
    
    // Animate card to center
    gsap.fromTo(cardContainer, 
        { x: 0, y: 0, scale: 1, opacity: 1 },
        {
            x: translateX,
            y: translateY,
            scale: window.innerWidth < 768 ? 0.95 : 1.4,
            opacity: 1,
            duration: 1.2,
            ease: 'expo.out',
            onComplete: () => {
                setTimeout(() => {
                    if (!state.cardData.name) nameInput.focus();
                    else titleInput.focus();
                }, 100);
            }
        }
    );
    
    // Background stays visible — the overlay blur handles focus
    if (materialsSection) {
        materialsSection.style.filter = 'blur(8px)';
        materialsSection.style.opacity = '0.3';
        materialsSection.style.transition = 'all 0.4s ease';
    }

    // Lock scroll and add exit listener
    if (window.lenis) window.lenis.stop();
    window.addEventListener('wheel', handleScrollExit, { passive: false });
    window.addEventListener('touchmove', handleScrollExit, { passive: false });
}
function closeCardZoom() {
    const cardContainer = document.getElementById('cardContainer3d');
    const canvas = cardContainer.querySelector('.card-canvas-3d');
    const inputOverlay = document.getElementById('cardInputOverlay');
    const overlay = document.getElementById('zoomOverlay');
    const closeHint = document.getElementById('closeHint');
    const heroContent = document.getElementById('heroContent');
    const materialsSection = document.getElementById('materials');
    const navbar = document.getElementById('navbar');
    
    // INSTANT hide inputs before any animation starts
    inputOverlay.style.opacity = '0';
    inputOverlay.style.pointerEvents = 'none';
    
    // INSTANT show canvas
    canvas.style.opacity = '1';
    
    // Remove zoomed class
    cardContainer.classList.remove('zoomed');
    cardContainer.style.opacity = '';
    cardContainer.style.filter = '';
    const section = document.getElementById('cardPreviewSection');
    if (section) section.classList.remove('zoomed-state');
    
    // NOW set state and re-render
    state.isZoomed = false;
    drawCard('heroFrontCanvas', 'front', 600, 378);
    drawCard('heroBackCanvas', 'back', 600, 378);

    // Sync sidebar inputs to reflect any edits made on card
    if (typeof syncSidebarFromState === 'function') syncSidebarFromState();
    
    // Reset input colors
    const inputs = document.querySelectorAll('.card-input-field');
    inputs.forEach(input => {
        input.style.color = '';
        input.blur();
    });
    cardContainer.style.removeProperty('--icon-color');
    
    // Hide hint
    closeHint.classList.remove('visible');
    
    // Kill tweens
    gsap.killTweensOf(cardContainer);
    
    // Animate card back (canvas is already visible)
    gsap.to(cardContainer, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 1.0,
        ease: 'expo.inOut',
        onComplete: () => {
            cardContainer.style.transform = '';
            cardContainer.style.animation = '';
            
            // Clear forced styles after animation
            inputOverlay.style.opacity = '';
            inputOverlay.style.pointerEvents = '';
            canvas.style.opacity = '';
        }
    });
    
    // Hide overlay
    gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => overlay.classList.remove('active')
    });
    
    // Overlay fade handled by GSAP above
    if (materialsSection) {
        materialsSection.style.filter = '';
        materialsSection.style.opacity = '';
    }

    // Unlock scroll and remove exit listener
    if (window.lenis) window.lenis.start();
    window.removeEventListener('wheel', handleScrollExit);
    window.removeEventListener('touchmove', handleScrollExit);
}

// Close zoom when clicking outside card
document.addEventListener('click', (e) => {
    if (state.isZoomed) {
        const cardContainer = document.getElementById('cardContainer3d');
        const inputs = document.querySelectorAll('.card-input-field');
        
        // Check if click is outside card and not on an input
        if (!cardContainer.contains(e.target) && 
            !e.target.classList.contains('card-input-field')) {
            closeCardZoom();
        }
    }
});



// Close on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.isZoomed) {
        closeCardZoom();
    }
});
    function setupCardInputs() {
    const nameInput = document.getElementById('inputName');
    const titleInput = document.getElementById('inputTitle');
    const numberInput = document.getElementById('inputNumber');
    const emailInput = document.getElementById('inputEmail');
    const websiteInput = document.getElementById('inputWebsite');
    const inputs = [nameInput, titleInput, numberInput, emailInput, websiteInput];

    // Helper to show input with proper color dynamics based on material
    function showInput(input) {
        if (!input) return;
        input.style.opacity = '1';
        syncInputColors(); 
    }

    // Click on card area to activate fields
    document.getElementById('cardInputOverlay').addEventListener('click', (e) => {
        if (e.target.id === 'cardInputOverlay') {
            if (!state.cardData.name) {
                showInput(nameInput);
                nameInput.focus();
            } else if (!state.cardData.title) {
                showInput(titleInput);
                titleInput.focus();
            } else if (!state.cardData.number) {
                showInput(numberInput);
                numberInput.focus();
            } else if (!state.cardData.email) {
                showInput(emailInput);
                emailInput.focus();
            } else if (!state.cardData.website) {
                showInput(websiteInput);
                websiteInput.focus();
            }
        }
    });

    // Input field interactions
    inputs.filter(i => i).forEach(input => {
        input.addEventListener('focus', () => showInput(input));
    });

    // Sync with state on input
    if (nameInput) nameInput.addEventListener('input', (e) => {
        state.cardData.name = e.target.value;
        updateChecklistState();
        updateAllCards();
    });

    if (titleInput) titleInput.addEventListener('input', (e) => {
        state.cardData.title = e.target.value;
        updateAllCards();
    });

    if (numberInput) numberInput.addEventListener('input', (e) => {
        state.cardData.number = e.target.value;
        updateChecklistState();
        updateAllCards();
    });

    if (emailInput) emailInput.addEventListener('input', (e) => {
        state.cardData.email = e.target.value;
        updateChecklistState();
        updateAllCards();
    });

    if (websiteInput) websiteInput.addEventListener('input', (e) => {
        state.cardData.website = e.target.value;
        updateChecklistState();
        updateAllCards();
    });

    // Tab navigation
    nameInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' || e.key === 'Enter') {
            e.preventDefault();
            showInput(titleInput);
            titleInput?.focus();
        }
    });

    titleInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' || e.key === 'Enter') {
            e.preventDefault();
            showInput(numberInput);
            numberInput?.focus();
        }
    });

    numberInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' || e.key === 'Enter') {
            e.preventDefault();
            showInput(emailInput);
            emailInput?.focus();
        }
    });

    emailInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' || e.key === 'Enter') {
            e.preventDefault();
            showInput(websiteInput);
            websiteInput?.focus();
        }
    });

    websiteInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            triggerNextDetailsReveal();
            closeCardZoom();
        }
    });
}

      function updateChecklist() {
    const nameSpan = document.getElementById('check-name');
    const numSpan = document.getElementById('check-number');
    const emailSpan = document.getElementById('check-email');
    
    nameSpan.textContent = state.cardData.name || 'Click card to enter full name';
    numSpan.textContent = cleanFieldValue(state.cardData.number) || 'Click card to enter phone';
    emailSpan.textContent = cleanFieldValue(state.cardData.email) || 'Click card to enter email';
    
    // Update completed states
    const item1 = document.getElementById('check-item-1');
    const item2 = document.getElementById('check-item-2');
    const item3 = document.getElementById('check-item-3');
    
    if (state.cardData.name) item1.classList.add('completed');
    else item1.classList.remove('completed');
    
    if (state.cardData.number) item2.classList.add('completed');
    else item2.classList.remove('completed');
    
    if (state.cardData.email) item3.classList.add('completed');
    else item3.classList.remove('completed');
    
    // Show/hide next button
    const nextBtn = document.getElementById('nextBtn');
    if (state.cardData.name && state.cardData.number && state.cardData.email) {
        nextBtn.classList.add('visible');
    } else {
        nextBtn.classList.remove('visible');
    }
}

        

        // Materials
        function loadMaterials(category) {
            const grid = document.getElementById('materialsGrid');
            grid.innerHTML = '';
            
            state.materials[category].forEach((mat, index) => {
                const card = document.createElement('div');
                card.className = `material-card ${mat.id === state.cardData.material ? 'selected' : ''}`;
                card.setAttribute('data-mat-id', mat.id);
                card.onclick = (e) => selectMaterial(mat.id, e);
                card.style.animationDelay = `${index * 0.08}s`;
                
                let bgStyle = `background: ${mat.color};`;
                // Carbon fiber materials get a twill-weave pattern
                if (mat.cf || mat.id.startsWith('cf-') || mat.id === 'forged-carbon') {
                    bgStyle = `background: repeating-linear-gradient(45deg, ${mat.color} 0px, ${mat.color} 4px, #2a2a2a 4px, #2a2a2a 8px);`;
                } else if (mat.id === 'meteorite') {
                    bgStyle = 'background: #4a4a4a;';
                } else if (mat.id === 'mother-pearl') {
                    bgStyle = 'background: linear-gradient(135deg, #fff, #f0f0f0, #fff);';
                } else if (['walnut','ebony','mahogany','maple','birch'].includes(mat.id)) {
                    bgStyle = `background: linear-gradient(160deg, ${mat.color}, ${adjustBrightness(mat.color, -20)});`;
                }

                const iconColor = isDarkMaterial(mat.id) ? '#c9a962' : '#333';
                const textColor = isDarkMaterial(mat.id) ? '#c9a962' : '#1a1a1a';
                const subColor  = isDarkMaterial(mat.id) ? '#aaa' : '#666';

                // NFC icon SVG (top-right of mini-card)
                const nfcSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2.2" stroke-linecap="round" style="position:absolute;top:5px;right:5px;opacity:0.85;">
                    <rect x="2" y="5" width="10" height="14" rx="1.5"/>
                    <path d="M15 8 Q20 12 15 16"/><path d="M18 6 Q25 12 18 18"/>
                </svg>`;

                // WiFi icon SVG (bottom-right of mini-card)
                const wifiSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 24 20" fill="none" stroke="${iconColor}" stroke-width="2.2" stroke-linecap="round" style="position:absolute;bottom:5px;right:5px;opacity:0.85;">
                    <path d="M1 7 Q12 -1 23 7"/><path d="M5 12 Q12 7 19 12"/><path d="M9 17 Q12 14 15 17"/>
                    <circle cx="12" cy="19" r="1.2" fill="${iconColor}" stroke="none"/>
                </svg>`;
                
                card.innerHTML = `
                    <div class="material-preview">
                        ${mat.badge ? `<span class="material-badge">${mat.badge}</span>` : ''}
                        <div class="mini-card" style="${bgStyle}">
                            <div style="position: absolute; top: 8px; left: 10px; width: 18px; height: 14px; background: linear-gradient(135deg, #d4af37, #b8941f); border-radius: 3px;"></div>
                            <div style="position: absolute; bottom: 15px; left: 10px; font-family: var(--font-serif); font-size: 8px; color: ${textColor}; font-style: italic;">CARDEL</div>
                            <div style="position: absolute; bottom: 8px; left: 10px; font-size: 5px; color: ${subColor};">•••• 0000</div>
                            ${nfcSVG}
                            ${wifiSVG}
                        </div>
                    </div>
                    <div class="material-info">
                        <h3>${mat.name}</h3>
                    </div>
                `;
                grid.appendChild(card);
            });
            
            // Highlight the correct category tab
            document.querySelectorAll('.category-tab').forEach(tab => {
                tab.classList.remove('active');
                if (tab.textContent.trim().toLowerCase() === category.toLowerCase() ||
                    tab.textContent.trim().toLowerCase().includes(category.toLowerCase())) {
                    tab.classList.add('active');
                }
            });
        }

function filterMaterials(category) {
    const grid = document.getElementById('materialsGrid');
    state.cardData.materialCategory = category;
    
    // Fade out current cards
    const currentCards = grid.querySelectorAll('.material-card');
    
    gsap.to(currentCards, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        stagger: 0.03,
        ease: 'power2.in',
        onComplete: () => {
            // Load new materials after fade out
            loadMaterials(category);
            
            // Animate new cards in with proper sequencing
            const newCards = grid.querySelectorAll('.material-card');
            
            // Set initial state
            gsap.set(newCards, {
                opacity: 0,
                y: 20
            });
            
            // Animate to final state
            gsap.to(newCards, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.06,
                ease: 'power2.out'
            });
        }
    });
    
    // Update tab styling
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.textContent.toLowerCase().includes(category)) {
            tab.classList.add('active');
        }
    });
    saveToStorage();
}

        function selectMaterial(materialId, ev) {
            state.cardData.material = materialId;
            state.cardData.materialCategory = getMaterialCategoryById(materialId);
            
            document.querySelectorAll('.material-card').forEach(card => {
                card.classList.remove('selected');
            });
            if (ev && ev.currentTarget) {
                ev.currentTarget.classList.add('selected');
            } else {
                const target = document.querySelector(`.material-card[data-mat-id="${materialId}"]`);
                if (target) target.classList.add('selected');
            }
            
            // Force immediate canvas redraw so hero card updates right away
            if (document.getElementById('heroFrontCanvas')) {
                drawCard('heroFrontCanvas', 'front', 600, 378);
                drawCard('heroBackCanvas', 'back', 600, 378);
            }

            updateAllCards();
            saveToStorage();
            if (typeof updateOrderSummary === 'function') updateOrderSummary();
            
            const mat = getCurrentMaterial();
            
            // GSAP Contrast Transition
            const newIsDark = getYIQBrightness(mat.color || '#000') < 128;
            const targetCT = newIsDark ? 0 : 1;
            
            gsap.to(state.cardData, {
                contrastTransition: targetCT,
                duration: 0.8,
                ease: "power2.inOut",
                onUpdate: () => {
                    if (document.getElementById('heroFrontCanvas')) {
                        drawCard('heroFrontCanvas', 'front', 600, 378);
                        drawCard('heroBackCanvas', 'back', 600, 378);
                    }
                    updateAllCards();
                }
            });

            showToast(`${mat.name} selected`);
        }

      

        // Drawing Functions (Canvas)
        function setup3DTilt() {
    const container = document.getElementById('cardContainer3d');
    const wrapper = document.getElementById('card3dWrapper');
    if (!container || !wrapper) return;
    
    let currentRotateX = 0;
    let currentRotateY = 0;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentScale = 1;
    let targetScale = 1;

    let rafId = null;
    let isHovering = false;
    
    function animate() {
        // Luxuriously smooth interpolation (lowered for a heavier, more premium "metal" feel)
        currentRotateX += (targetRotateX - currentRotateX) * 0.035;
        currentRotateY += (targetRotateY - currentRotateY) * 0.035;
        currentScale += (targetScale - currentScale) * 0.035;
        
        // Apply transform with perspective, rotation and scaling
        wrapper.style.transform = `perspective(1200px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) scale3d(${currentScale}, ${currentScale}, ${currentScale})`;
        
        if (isHovering || Math.abs(targetRotateX - currentRotateX) > 0.01 || Math.abs(targetRotateY - currentRotateY) > 0.01 || Math.abs(targetScale - currentScale) > 0.001) {
            rafId = requestAnimationFrame(animate);
        } else {
            rafId = null;
        }
    }
    
    container.addEventListener('mousemove', (e) => {
        if (state.isZoomed) return;
        
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Increased sensitivity (10 degrees max)
        targetRotateX = (y - centerY) / centerY * -10;
        targetRotateY = (x - centerX) / centerX * 10;
        targetScale = 1.06; // "Pop" on hover
        
        if (!isHovering) {
            isHovering = true;
            if (!rafId) animate();
        }
    });
    
    container.addEventListener('mouseleave', () => {
        isHovering = false;
        targetRotateX = 0;
        targetRotateY = 0;
        targetScale = 1.0;
        if (!rafId) animate();
    });
}

        function updateAllCards() {
            // Draw hero canvases (index.html only — safe to skip if absent)
            if (document.getElementById('heroFrontCanvas')) {
                const heroFrontSize = getCanvasRenderSize('heroFrontCanvas', 600, 378);
                drawCard('heroFrontCanvas', 'front', heroFrontSize.w, heroFrontSize.h);
            }
            if (document.getElementById('heroBackCanvas')) {
                const heroBackSize = getCanvasRenderSize('heroBackCanvas', 600, 378);
                drawCard('heroBackCanvas', 'back', heroBackSize.w, heroBackSize.h);
            }

            // Draw materials page canvases (materials.html only — safe to skip if absent)
            if (document.getElementById('previewCanvasFront')) {
                const matFrontSize = getCanvasRenderSize('previewCanvasFront', 600, 378);
                drawCard('previewCanvasFront', 'front', matFrontSize.w, matFrontSize.h);
            }
            if (document.getElementById('previewCanvasBack')) {
                const matBackSize = getCanvasRenderSize('previewCanvasBack', 600, 378);
                drawCard('previewCanvasBack', 'back', matBackSize.w, matBackSize.h);
            }
            
            // Sync input values with state — null-check all elements (they vary by page)
            const inputName   = document.getElementById('inputName');
            const inputTitle  = document.getElementById('inputTitle');
            const inputNumber = document.getElementById('inputNumber');
            const inputEmail  = document.getElementById('inputEmail');
            const inputWebsite = document.getElementById('inputWebsite');

            if (inputName)    inputName.value    = cleanFieldValue(state.cardData.name)   || '';
            if (inputTitle)   inputTitle.value   = cleanFieldValue(state.cardData.title)  || '';
            if (inputNumber)  inputNumber.value  = cleanFieldValue(state.cardData.number) || '';
            if (inputEmail)   inputEmail.value   = cleanFieldValue(state.cardData.email)  || '';
            if (inputWebsite) inputWebsite.value = cleanFieldValue(state.cardData.website) || '';

            // Sync input colors to handle light/dark material contrast
            syncInputColors();
        }

        function syncInputColors() {
            const colors = getTextColorsForMaterial(state.cardData.material);
            const inputs = document.querySelectorAll('.card-input-field');
            
            inputs.forEach(input => {
                const color = input.classList.contains('input-title') ? colors.secondary : colors.primary;
                input.style.color = color;
                
                // Also update the caret color for consistent luxury feel
                input.style.caretColor = colors.accent;
                
                // Add text shadow for better separation
                input.style.textShadow = `0px 1px 3px ${colors.shadow}`;
            });

            // Update title in sidebar name/title if they have special styling
            const sidebarItems = ['sidebarName', 'sidebarTitle', 'sidebarNumber', 'sidebarEmail'];
            sidebarItems.forEach(id => {
                const el = document.getElementById(id);
                if (el && el.value) {
                    el.closest('.checklist-item')?.classList.add('completed');
                }
            });
        }



        function drawBackground(ctx, w, h, mat) {
            if (mat.id === 'carbon-fiber') {
                ctx.fillStyle = '#111';
                ctx.fillRect(0, 0, w, h);
                const size = w / 40;
                ctx.globalAlpha = 0.15;
                for (let i = -h; i < w; i += size) {
                    const grad = ctx.createLinearGradient(i, 0, i + size, size);
                    grad.addColorStop(0, '#000');
                    grad.addColorStop(0.5, '#555');
                    grad.addColorStop(1, '#000');
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.moveTo(i, 0);
                    ctx.lineTo(i + size, 0);
                    ctx.lineTo(i - h + size, h);
                    ctx.lineTo(i - h, h);
                    ctx.fill();
                }
                ctx.globalAlpha = 1;
            } else if (mat.id === 'forged-carbon') {
                ctx.fillStyle = '#1a1a1a';
                ctx.fillRect(0, 0, w, h);
                for (let i = 0; i < 120; i++) {
                    ctx.globalAlpha = Math.random() * 0.15;
                    ctx.fillStyle = Math.random() > 0.5 ? '#fff' : '#000';
                    const x = Math.random() * w;
                    const y = Math.random() * h;
                    const s = Math.random() * 40 + 10;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + s, y + Math.random() * 20 - 10);
                    ctx.lineTo(x + s/2, y + s);
                    ctx.fill();
                }
                ctx.globalAlpha = 1;
            } else if (['walnut', 'bamboo', 'ebony', 'maple'].includes(mat.id)) {
                ctx.fillStyle = mat.color;
                ctx.fillRect(0, 0, w, h);
                ctx.globalCompositeOperation = 'multiply';
                ctx.globalAlpha = 0.1;
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 2;
                for(let i=0; i < w; i+= 5 + Math.random()*15) {
                    ctx.beginPath();
                    ctx.moveTo(i, 0);
                    let cx = i;
                    for(let j=0; j<h; j+=30) {
                        cx += (Math.random() - 0.5) * 10;
                        ctx.lineTo(cx, j);
                    }
                    ctx.stroke();
                }
                ctx.globalCompositeOperation = 'source-over';
                ctx.globalAlpha = 1;
            } else if (mat.id === 'meteorite') {
                ctx.fillStyle = '#2c2c2c';
                ctx.fillRect(0, 0, w, h);
                ctx.strokeStyle = 'rgba(255,255,255,0.05)';
                ctx.lineWidth = 1;
                const drawLines = (angle) => {
                    ctx.save();
                    ctx.translate(w/2, h/2);
                    ctx.rotate(angle * Math.PI / 180);
                    ctx.translate(-w, -h);
                    for(let i=0; i<w*2; i+=8) {
                        ctx.beginPath();
                        ctx.moveTo(i, 0);
                        ctx.lineTo(i, h*2);
                        ctx.stroke();
                    }
                    ctx.restore();
                };
                drawLines(45);
                drawLines(-45);
                drawLines(0);
            } else if (mat.id === 'mother-pearl') {
                const grad = ctx.createLinearGradient(0, 0, w, h);
                grad.addColorStop(0, '#fff');
                grad.addColorStop(0.5, '#f0f0f0');
                grad.addColorStop(1, '#fff');
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, w, h);
                ctx.globalAlpha = 0.1;
                const sheen = ctx.createLinearGradient(0, 0, w, h);
                sheen.addColorStop(0, 'pink');
                sheen.addColorStop(0.5, 'lightgreen');
                sheen.addColorStop(1, 'lightblue');
                ctx.fillStyle = sheen;
                ctx.fillRect(0, 0, w, h);
                ctx.globalAlpha = 1;
            } else {
                const isMirror = mat.finish.toLowerCase().includes('mirror') || mat.finish.toLowerCase().includes('polished');
                drawMetalFinish(ctx, w, h, mat.color, isMirror, isDarkMaterial(mat.id));
            }
        }

function drawFrontSide(ctx, w, h, mat, isDark, textColor, subTextColor, accentColor) {
    const scale = w / 600;
    
    // Corner accents
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.moveTo(30 * scale, 50 * scale);
    ctx.lineTo(30 * scale, 30 * scale);
    ctx.lineTo(50 * scale, 30 * scale);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(w - 30 * scale, h - 50 * scale);
    ctx.lineTo(w - 30 * scale, h - 30 * scale);
    ctx.lineTo(w - 50 * scale, h - 30 * scale);
    ctx.stroke();
    ctx.globalAlpha = 1;
    
    // Only draw text when NOT zoomed
    if (!state.isZoomed) {
        const contentX = w * 0.10;  // 10% from left
    const contentY = h * 0.35;  // 35% from top (matches CSS)
        
        // Name
        ctx.save();
        // Use user-selected font, size, and alignment
        const nameFont = state.cardData.font || "'DM Sans',sans-serif";
        const nameSize = state.cardData.nameSize || 32;
        const nameAlign = state.cardData.align || 'center';
        ctx.font = `italic ${nameSize * scale}px ${nameFont}`;
        ctx.fillStyle = textColor;
        ctx.textAlign = nameAlign;
        ctx.fillText(state.cardData.name || 'Your Name', contentX, contentY);
        ctx.restore();
        
        // Title
        ctx.save();
        const titleFont = state.cardData.font || "'DM Sans',sans-serif";
        const titleSize = state.cardData.numberSize || 18;
        ctx.font = `300 ${titleSize * scale}px ${titleFont}`;
        ctx.fillStyle = subTextColor;
        ctx.textAlign = state.cardData.align || 'center';
        ctx.fillText(state.cardData.title || 'Creative Director', contentX, contentY + 28 * scale);
        ctx.restore();
        
        // Divider
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 1.5 * scale;
        ctx.beginPath();
        ctx.moveTo(contentX, contentY + 45 * scale);
        ctx.lineTo(contentX + 80 * scale, contentY + 45 * scale);
        ctx.stroke();
        
        // Contact info
        const contactY = h - 70 * scale;
        // Number (phone)
        ctx.save();
        const numberFont = state.cardData.font || "'DM Sans',sans-serif";
        ctx.font = `400 ${titleSize ? titleSize * scale : 12 * scale}px ${numberFont}`;
        ctx.fillStyle = textColor;
        ctx.textAlign = state.cardData.align || 'center';
        const basicNumber = cleanFieldValue(state.cardData.number);
        ctx.fillText(basicNumber || '+1 (555) 000-0000', contentX, contactY);
        ctx.restore();
        
        // Email
        ctx.save();
        ctx.font = `300 ${titleSize ? titleSize * 0.85 * scale : 11 * scale}px ${numberFont}`;
        ctx.fillStyle = subTextColor;
        ctx.textAlign = state.cardData.align || 'center';
        const basicEmail = cleanFieldValue(state.cardData.email);
        ctx.fillText(basicEmail || 'hello@cardel.com', contentX, contactY + 22 * scale);
        ctx.restore();
    }
    
    
    // Icons (always show)
    const iconColor = isDark ? '#c9a962' : '#1a1a1a';
    const iconSize = 32 * scale;
    
    // NFC icon
    const nfcX = w - 58 * scale;
    const nfcY = 48 * scale;
    ctx.save();
    ctx.strokeStyle = iconColor;
    ctx.lineWidth = iconSize * 0.14;
    ctx.lineCap = 'round';
    ctx.strokeRect(nfcX - iconSize * 0.35, nfcY - iconSize * 0.35, iconSize * 0.7, iconSize * 0.7);
    for(let i = 1; i <= 3; i++){
        const r = iconSize * 0.32 + i * iconSize * 0.10;
        ctx.beginPath();
        ctx.arc(nfcX + iconSize * 0.08, nfcY, r, Math.PI * 1.05, Math.PI * 1.95, false);
        ctx.stroke();
    }
    ctx.restore();
    
    // WiFi icon
    const wifiX = w - 58 * scale;
    const wifiY = h - 48 * scale;
    ctx.save();
    ctx.strokeStyle = iconColor;
    ctx.lineWidth = iconSize * 0.13;
    ctx.lineCap = 'round';
    for(let i = 1; i <= 4; i++){
        const r = iconSize * 0.18 * i;
        ctx.globalAlpha = 0.35 + i * 0.16;
        ctx.beginPath();
        ctx.arc(wifiX, wifiY - iconSize * 0.12, r, Math.PI * 1.2, Math.PI * 1.8, false);
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = iconColor;
    ctx.beginPath();
    ctx.arc(wifiX, wifiY - iconSize * 0.12, iconSize * 0.09, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}


function drawBackSide(ctx, w, h, mat, isDark, subTextColor, accentColor) {
    const scale = w / 600;
    
    // Center monogram
    ctx.save();
    ctx.font = `300 ${48 * scale}px "Cormorant Garamond"`;
    ctx.fillStyle = accentColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('C', w / 2, h / 2);
    ctx.restore();
    
    // Corner accents
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.moveTo(w - 30 * scale, 50 * scale);
    ctx.lineTo(w - 30 * scale, 30 * scale);
    ctx.lineTo(w - 50 * scale, 30 * scale);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(30 * scale, h - 50 * scale);
    ctx.lineTo(30 * scale, h - 30 * scale);
    ctx.lineTo(50 * scale, h - 30 * scale);
    ctx.stroke();
    ctx.globalAlpha = 1;
}


        function drawMetalFinish(ctx, w, h, color, isMirror, isDark) {
            const grad = ctx.createLinearGradient(0, 0, w, h);
            const shift = (c, p) => adjustBrightness(c, p * 0.4); 
            if (isMirror) {
                grad.addColorStop(0, shift(color, -20));
                grad.addColorStop(0.4, color);
                grad.addColorStop(0.5, shift(color, 25));
                grad.addColorStop(0.6, color);
                grad.addColorStop(1, shift(color, -20));
            } else {
                grad.addColorStop(0, shift(color, -15));
                grad.addColorStop(0.3, color);
                grad.addColorStop(0.5, shift(color, 10));
                grad.addColorStop(0.7, color);
                grad.addColorStop(1, shift(color, -15));
            }
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, w, h);
            const imageData = ctx.getImageData(0, 0, w, h);
            const data = imageData.data;
            const noiseFactor = isMirror ? 3 : 6; 
            for (let i = 0; i < data.length; i += 4) {
                const r1 = Math.random();
                const r2 = Math.random();
                const noise = ((r1 + r2) / 2 - 0.5) * noiseFactor;
                data[i] = data[i] + noise;
                data[i+1] = data[i+1] + noise;
                data[i+2] = data[i+2] + noise;
            }
            ctx.putImageData(imageData, 0, 0);
            if (!isMirror) {
                ctx.save();
                ctx.globalCompositeOperation = 'overlay'; 
                ctx.globalAlpha = 0.04;
                ctx.fillStyle = '#fff';
                for (let y = 0; y < h; y += 2) {
                    if (Math.random() > 0.5) {
                        ctx.fillRect(0, y, w, 1); 
                    }
                }
                ctx.restore();
            }
            const vign = ctx.createRadialGradient(w/2, h/2, w/2.5, w/2, h/2, w);
            vign.addColorStop(0, 'rgba(0,0,0,0)');
            vign.addColorStop(1, 'rgba(0,0,0,0.15)');
            ctx.fillStyle = vign;
            ctx.fillRect(0, 0, w, h);
        }

function getCanvasRenderSize(canvasId, fallbackW = 600, fallbackH = 378) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return { w: fallbackW, h: fallbackH };
    const rect = canvas.getBoundingClientRect();
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);
    if (w > 0 && h > 0) return { w, h };
    return { w: fallbackW, h: fallbackH };
}

function isIndexPageContext() {
    return !!document.getElementById('cardContainer3d');
}

// HDR-Quality Card Rendering
function drawCard(canvasId, side, w, h, materialOverride = null) {
    sanitizeCardTextFields();
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof canvas.getContext !== 'function') return;
    
    // Main visible canvas context
    const ctx = canvas.getContext('2d', { 
        alpha: false,
        desynchronized: true 
    });
    
    // High DPI for crisp rendering
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const tw = Math.floor(w * dpr);
    const th = Math.floor(h * dpr);

    if (canvas.width !== tw || canvas.height !== th) {
        canvas.width = tw;
        canvas.height = th;
    }
    
    if (!offCanvas) return;
    
    // Only resize if needed to prevent flickering context resets
    if (offCanvas.width !== tw || offCanvas.height !== th) {
        offCanvas.width = tw;
        offCanvas.height = th;
    }
    
    // Reset buffer transform, globalAlpha & clear it before drawing
    offCtx.setTransform(1, 0, 0, 1, 0, 0);
    offCtx.globalAlpha = 1;
    offCtx.globalCompositeOperation = 'source-over';
    offCtx.clearRect(0, 0, tw, th);
    offCtx.scale(dpr, dpr);
    
    const mat = getCurrentMaterial(materialOverride || state.cardData.material);
    const isDark = isDarkMaterial(mat.id);
    
    // Enable high-quality image smoothing on the off-screen buffer
    offCtx.imageSmoothingEnabled = true;
    offCtx.imageSmoothingQuality = 'high';
    
    const indexViewOnly = isIndexPageContext();

    // Draw with HDR-style lighting onto the buffer
    drawHDRBackground(offCtx, w, h, mat, isDark);
    
    // Design overlay layer (now drawn as a background skin below the text content)
    drawDesignOverlay(offCtx, w, h, indexViewOnly);
    
    if (side === 'front') {
        drawHDRFrontSide(offCtx, w, h, mat, isDark, indexViewOnly);
    } else {
        drawHDRBackSide(offCtx, w, h, mat, isDark, indexViewOnly);
    }
    
    // Premium border with gradient
    drawPremiumBorder(offCtx, w, h);
    
    // Flicker-free paint: flush buffer to visible canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(offCanvas, 0, 0);
}

// ===== DESIGN UPLOAD OVERLAY =====
// Renders user-uploaded SVG or transparent PNG across the full card area
function drawDesignOverlay(ctx, w, h, indexViewOnly = false) {
    if (indexViewOnly) return;
    const img = state.cardData.designImg;
    if (!img || !img.width || !img.height) return;

    // "Full Bleed" — occupies the entire card area
    const drawX = 0;
    const drawY = 0;
    const drawW = w;
    const drawH = h;

    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    // Keep design fully solid while card is in click-to-edit (zoom) mode
    ctx.globalAlpha = state.isZoomed ? 1 : (state.cardData.designOpacity ?? 0.85);
    
    // Use drawImage to fill the entire card bounds
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();
}
window.drawDesignOverlay = drawDesignOverlay;

// ===== DESIGN UPLOAD HANDLER =====
function applyDesignUpload(file) {
    if (!file) return;
    const validTypes = ['image/png', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
        if (typeof showToast === 'function') showToast('Only SVG or transparent PNG allowed');
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        const dataUrl = e.target.result;
        state.cardData.designDataUrl = dataUrl;
        const img = new Image();
        img.onload = () => {
            state.cardData.designImg = img;
            if (typeof updateAllCards === 'function') updateAllCards();
            if (typeof saveToStorage === 'function') saveToStorage();
            if (typeof showToast === 'function') showToast('Design applied to card');
        };
        img.src = dataUrl;
    };
    reader.readAsDataURL(file);
}
window.applyDesignUpload = applyDesignUpload;

function removeDesign() {
    state.cardData.designDataUrl = null;
    state.cardData.designImg = null;
    if (typeof updateAllCards === 'function') updateAllCards();
    if (typeof saveToStorage === 'function') saveToStorage();
    if (typeof showToast === 'function') showToast('Design removed');
}
window.removeDesign = removeDesign;

function drawHDRBackground(ctx, w, h, mat, isDark) {
    // Base material with depth
    if (mat.id === 'carbon-fiber') {
        drawCarbonFiberHDR(ctx, w, h);
    } else if (mat.id === 'forged-carbon') {
        drawForgedCarbonHDR(ctx, w, h);
    } else if (['walnut', 'bamboo', 'ebony', 'maple'].includes(mat.id)) {
        drawWoodHDR(ctx, w, h, mat);
    } else if (mat.id === 'meteorite') {
        drawMeteoriteHDR(ctx, w, h);
    } else if (mat.id === 'mother-pearl') {
        drawMotherOfPearlHDR(ctx, w, h);
    } else {
        drawMetalHDR(ctx, w, h, mat);
    }
    
    // Add subtle vignette for depth
    drawVignette(ctx, w, h, isDark);
}

function drawMetalHDR(ctx, w, h, mat) {
    const isMirror = mat.finish.toLowerCase().includes('mirror') || 
                     mat.finish.toLowerCase().includes('polished');
    
    // Multi-layer gradient for depth
    const baseGrad = ctx.createLinearGradient(0, 0, w, h);
    const color = mat.color;
    
    if (isMirror) {
        // Mirror-like reflective surface
        baseGrad.addColorStop(0, adjustBrightness(color, -30));
        baseGrad.addColorStop(0.25, adjustBrightness(color, -10));
        baseGrad.addColorStop(0.45, adjustBrightness(color, 20));
        baseGrad.addColorStop(0.5, adjustBrightness(color, 40));
        baseGrad.addColorStop(0.55, adjustBrightness(color, 20));
        baseGrad.addColorStop(0.75, adjustBrightness(color, -10));
        baseGrad.addColorStop(1, adjustBrightness(color, -30));
    } else {
        // Brushed metal with subtle variation
        baseGrad.addColorStop(0, adjustBrightness(color, -20));
        baseGrad.addColorStop(0.3, color);
        baseGrad.addColorStop(0.5, adjustBrightness(color, 15));
        baseGrad.addColorStop(0.7, color);
        baseGrad.addColorStop(1, adjustBrightness(color, -20));
    }
    
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, w, h);
    
    // Add anisotropic reflection lines (brushed effect)
    if (!isMirror) {
        ctx.save();
        ctx.globalAlpha = 0.03;
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        
        for (let y = 0; y < h; y += 3) {
            const opacity = Math.sin(y / h * Math.PI) * 0.5 + 0.5;
            ctx.globalAlpha = opacity * 0.04;
            ctx.beginPath();
            ctx.moveTo(0, y);
            
            // Slight wave for realistic brushed look
            for (let x = 0; x <= w; x += 20) {
                const wave = Math.sin(x / w * Math.PI * 2) * 2;
                ctx.lineTo(x, y + wave);
            }
            ctx.stroke();
        }
        ctx.restore();
    }
    
    // Add subtle noise for material realism
    addFilmGrain(ctx, w, h, 0.015);
}

function drawCarbonFiberHDR(ctx, w, h) {
    // Deep black base
    const baseGrad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w);
    baseGrad.addColorStop(0, '#1a1a1a');
    baseGrad.addColorStop(1, '#0d0d0d');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, w, h);
    
    // Twill weave pattern with depth
    ctx.save();
    const size = 12;
    const cols = Math.ceil(w / size) + 2;
    const rows = Math.ceil(h / size) + 2;
    
    for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
            const x = col * size;
            const y = row * size;
            const isEven = (row + col) % 2 === 0;
            
            // Create 3D effect for weave
            const grad = ctx.createLinearGradient(x, y, x + size, y + size);
            if (isEven) {
                grad.addColorStop(0, '#2a2a2a');
                grad.addColorStop(0.5, '#1a1a1a');
                grad.addColorStop(1, '#0a0a0a');
            } else {
                grad.addColorStop(0, '#0a0a0a');
                grad.addColorStop(0.5, '#1a1a1a');
                grad.addColorStop(1, '#2a2a2a');
            }
            
            ctx.fillStyle = grad;
            ctx.fillRect(x, y, size - 1, size - 1);
        }
    }
    ctx.restore();
    
    // Glossy overlay
    const gloss = ctx.createLinearGradient(0, 0, w, h);
    gloss.addColorStop(0, 'rgba(255,255,255,0.08)');
    gloss.addColorStop(0.5, 'rgba(255,255,255,0)');
    gloss.addColorStop(1, 'rgba(255,255,255,0.05)');
    ctx.fillStyle = gloss;
    ctx.fillRect(0, 0, w, h);
}

function drawForgedCarbonHDR(ctx, w, h) {
    ctx.fillStyle = '#151515';
    ctx.fillRect(0, 0, w, h);
    
    // Random marble-like chunks with depth
    ctx.save();
    for (let i = 0; i < 200; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const size = Math.random() * 30 + 5;
        const rotation = Math.random() * Math.PI * 2;
        
        ctx.translate(x, y);
        ctx.rotate(rotation);
        
        // Chunk with shadow and highlight
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
        const brightness = Math.random();
        if (brightness > 0.6) {
            grad.addColorStop(0, '#3a3a3a');
            grad.addColorStop(1, '#1a1a1a');
        } else {
            grad.addColorStop(0, '#0a0a0a');
            grad.addColorStop(1, '#000000');
        }
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, -size/2);
        ctx.lineTo(size/2, 0);
        ctx.lineTo(0, size/2);
        ctx.lineTo(-size/2, 0);
        ctx.closePath();
        ctx.fill();
        
        ctx.rotate(-rotation);
        ctx.translate(-x, -y);
    }
    ctx.restore();
    
    // Clear coat reflection
    const clearCoat = ctx.createLinearGradient(0, 0, w, h/2);
    clearCoat.addColorStop(0, 'rgba(255,255,255,0.1)');
    clearCoat.addColorStop(0.5, 'rgba(255,255,255,0)');
    ctx.fillStyle = clearCoat;
    ctx.fillRect(0, 0, w, h);
}

function drawWoodHDR(ctx, w, h, mat) {
    // Base wood color with depth
    const baseGrad = ctx.createLinearGradient(0, 0, 0, h);
    baseGrad.addColorStop(0, adjustBrightness(mat.color, 10));
    baseGrad.addColorStop(0.5, mat.color);
    baseGrad.addColorStop(1, adjustBrightness(mat.color, -15));
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, w, h);
    
    // Wood grain with organic variation
    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    
    const grainCount = 40;
    for (let i = 0; i < grainCount; i++) {
        const x = (i / grainCount) * w + (Math.random() - 0.5) * 20;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        
        let currentX = x;
        for (let y = 0; y < h; y += 10) {
            const wave = Math.sin(y / h * Math.PI * 3 + i) * 5 + 
                        (Math.random() - 0.5) * 3;
            currentX += wave * 0.3;
            ctx.lineTo(currentX, y);
        }
        
        const grainWidth = Math.random() * 2 + 0.5;
        ctx.lineWidth = grainWidth;
        ctx.globalAlpha = 0.1 + Math.random() * 0.1;
        ctx.stroke();
    }
    ctx.restore();
    
    // Wood pores texture
    addFilmGrain(ctx, w, h, 0.02);
}

function drawMeteoriteHDR(ctx, w, h) {
    // Metallic gray base
    const baseGrad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w);
    baseGrad.addColorStop(0, '#4a4a4a');
    baseGrad.addColorStop(0.7, '#3a3a3a');
    baseGrad.addColorStop(1, '#2a2a2a');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, w, h);
    
    // Widmanstätten pattern (etched lines)
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    
    const drawPattern = (angle, spacing) => {
        ctx.save();
        ctx.translate(w/2, h/2);
        ctx.rotate(angle);
        ctx.translate(-w, -h);
        
        for (let i = 0; i < w * 2; i += spacing) {
            const grad = ctx.createLinearGradient(i, 0, i + 2, 0);
            grad.addColorStop(0, 'rgba(255,255,255,0)');
            grad.addColorStop(0.5, 'rgba(255,255,255,0.15)');
            grad.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.strokeStyle = grad;
            
            ctx.beginPath();
            ctx.moveTo(i, 0);
            // Slight curve for realism
            for (let y = 0; y < h * 2; y += 20) {
                const curve = Math.sin(y / 100) * 3;
                ctx.lineTo(i + curve, y);
            }
            ctx.stroke();
        }
        ctx.restore();
    };
    
    drawPattern(Math.PI / 4, 15);
    drawPattern(-Math.PI / 4, 20);
    drawPattern(0, 25);
    ctx.restore();
    
    // Metallic sheen
    const sheen = ctx.createLinearGradient(0, 0, w, h);
    sheen.addColorStop(0, 'rgba(255,255,255,0.1)');
    sheen.addColorStop(0.5, 'rgba(255,255,255,0)');
    sheen.addColorStop(1, 'rgba(255,255,255,0.08)');
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, w, h);
}

function drawMotherOfPearlHDR(ctx, w, h) {
    // Iridescent base
    const baseGrad = ctx.createLinearGradient(0, 0, w, h);
    baseGrad.addColorStop(0, '#ffffff');
    baseGrad.addColorStop(0.3, '#f8f8f8');
    baseGrad.addColorStop(0.5, '#f0f0f0');
    baseGrad.addColorStop(0.7, '#f8f8f8');
    baseGrad.addColorStop(1, '#ffffff');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, w, h);
    
    // Iridescent shimmer
    ctx.save();
    const shimmerColors = [
        'rgba(255,200,200,0.1)',
        'rgba(200,255,200,0.1)',
        'rgba(200,200,255,0.1)',
        'rgba(255,255,200,0.1)'
    ];
    
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const size = Math.random() * 100 + 50;
        const color = shimmerColors[Math.floor(Math.random() * shimmerColors.length)];
        
        const grad = ctx.createRadialGradient(x, y, 0, x, y, size);
        grad.addColorStop(0, color);
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();
    
    // Pearl texture
    addFilmGrain(ctx, w, h, 0.01);
}

function drawVignette(ctx, w, h, isDark) {
    const vignette = ctx.createRadialGradient(w/2, h/2, w/3, w/2, h/2, w);
    if (isDark) {
        vignette.addColorStop(0, 'rgba(0,0,0,0)');
        vignette.addColorStop(0.7, 'rgba(0,0,0,0.2)');
        vignette.addColorStop(1, 'rgba(0,0,0,0.5)');
    } else {
        vignette.addColorStop(0, 'rgba(0,0,0,0)');
        vignette.addColorStop(0.7, 'rgba(0,0,0,0.05)');
        vignette.addColorStop(1, 'rgba(0,0,0,0.15)');
    }
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);
}

function drawPremiumBorder(ctx, w, h) {
    // Multi-layer border for depth
    const borderGrad = ctx.createLinearGradient(0, 0, w, h);
    borderGrad.addColorStop(0, 'rgba(255,255,255,0.4)');
    borderGrad.addColorStop(0.2, 'rgba(255,255,255,0.1)');
    borderGrad.addColorStop(0.5, 'rgba(255,255,255,0)');
    borderGrad.addColorStop(0.8, 'rgba(255,255,255,0.1)');
    borderGrad.addColorStop(1, 'rgba(255,255,255,0.3)');
    
    // Outer glow
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 10;
    
    ctx.strokeStyle = borderGrad;
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, w - 2, h - 2);
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
    
    // Inner highlight
    const innerGrad = ctx.createLinearGradient(0, 0, 0, h);
    innerGrad.addColorStop(0, 'rgba(255,255,255,0.2)');
    innerGrad.addColorStop(0.1, 'rgba(255,255,255,0)');
    innerGrad.addColorStop(0.9, 'rgba(255,255,255,0)');
    innerGrad.addColorStop(1, 'rgba(255,255,255,0.1)');
    
    ctx.strokeStyle = innerGrad;
    ctx.lineWidth = 1;
    ctx.strokeRect(4, 4, w - 8, h - 8);
}

function addFilmGrain(ctx, w, h, intensity) {
    // Use a subtle diagonal gradient instead of random noise to avoid per-frame flicker
    ctx.save();
    ctx.globalAlpha = intensity * 0.4;
    ctx.globalCompositeOperation = 'overlay';
    const grad = ctx.createLinearGradient(0, 0, w * 0.6, h * 0.4);
    grad.addColorStop(0, 'rgba(255,255,255,0.06)');
    grad.addColorStop(0.5, 'rgba(255,255,255,0)');
    grad.addColorStop(1, 'rgba(0,0,0,0.04)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
}

// Add this function to your JavaScript
function getContrastColor(backgroundColor) {
    // Remove # if present
    const hex = backgroundColor.replace('#', '');
    
    // Parse RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Calculate relative luminance (WCAG formula)
    const rsRGB = r / 255;
    const gsRGB = g / 255;
    const bsRGB = b / 255;
    
    const rLinear = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
    const gLinear = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
    const bLinear = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);
    
    const luminance = 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
    
    // Return black for light backgrounds, white for dark
    // Threshold 0.179 is the mathematical midpoint for optimal contrast
    return luminance > 0.179 ? '#1a1a1a' : '#ffffff';
}

// Enhanced version that also returns secondary text color and accent
function getYIQBrightness(hex) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
}

// Enhanced version that also returns secondary text color and accent
function getTextColorsForMaterial(materialId) {
    const mat = getCurrentMaterial(materialId || state.cardData.material);
    const brightness = getYIQBrightness(mat.color || '#999999');
    const isDark = brightness < 128;

    return {
        primary: isDark ? '#f7e7b0' : '#171717',
        secondary: isDark ? '#fff9ea' : '#2a2a2a',
        accent: isDark ? '#e1bf70' : '#8a7038',
        shadow: isDark ? 'rgba(0,0,0,0.94)' : 'rgba(0,0,0,0.14)'
    };
}

function drawHDRFrontSide(ctx, w, h, mat, isDark, indexViewOnly = false) {
    const scale = w / 600;
    
    // Function to interpolate colors for smooth transition
    const interpColor = (c1, c2, f) => {
        const r1 = parseInt(c1.substring(1,3), 16), g1 = parseInt(c1.substring(3,5), 16), b1 = parseInt(c1.substring(5,7), 16);
        const r2 = parseInt(c2.substring(1,3), 16), g2 = parseInt(c2.substring(3,5), 16), b2 = parseInt(c2.substring(5,7), 16);
        const r = Math.round(r1 + (r2 - r1) * f), g = Math.round(g1 + (g2 - g1) * f), b = Math.round(b1 + (b2 - b1) * f);
        return `rgb(${r},${g},${b})`;
    };

    const contrast = getTextColorsForMaterial(mat.id);
    const textColor = contrast.primary;
    const subTextColor = contrast.secondary;
    const accentColor = contrast.accent;

    // Multi-stop luxury shadow for maximum separation
    const applyLuxuryShadow = (blurScale = 1) => {
        ctx.shadowColor = contrast.shadow;
        ctx.shadowBlur = 4 * scale * blurScale;
        ctx.shadowOffsetY = 1 * scale * blurScale;
    };
    
    if (!indexViewOnly) {
        // Corner accents
        drawCornerAccent(ctx, 30 * scale, 30 * scale, 20 * scale, accentColor, true);
        drawCornerAccent(ctx, w - 30 * scale, h - 30 * scale, 20 * scale, accentColor, false);
    }
    
    // Only draw text when not zoomed (this hides placeholder text when editing)
    if (!state.isZoomed) {
        const contentX = 60 * scale;
        const contentY = h / 2 - 20 * scale;

        if (!indexViewOnly) {
            // Luxury Branding (Logo or Monogram)
            const brandingY = contentY - (state.cardData.logoSize || 32) * scale * 1.5 - 25 * scale;
            const lp = state.cardData.logoPos || 'center';
            const bSize = (state.cardData.logoSize || 32) * scale * 1.5;
            let bx = lp === 'center' ? (w - bSize) / 2 : (lp === 'right' ? w - bSize - 60*scale : 60*scale);

            const lType = (state.cardData.logoImg && state.cardData.logoImg.width > 0) ? 'logo' : (state.cardData.logoType || 'initials');

            if (lType === 'logo' && state.cardData.logoImg && state.cardData.logoImg.width > 0) {
                let lw = bSize;
                let lh = state.cardData.logoImg.height * (lw / state.cardData.logoImg.width);
                let lx = lp === 'center' ? (w - lw) / 2 : (lp === 'right' ? w - lw - 60*scale : 60*scale);
                let ly = contentY - lh - 25 * scale;
                ctx.globalAlpha = 1; 
                ctx.drawImage(state.cardData.logoImg, lx, ly, lw, lh);
            } else if (lType === 'initials' && state.cardData.initials) {
                ctx.save();
                ctx.shadowColor = isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)';
                ctx.shadowBlur = 5 * scale;
                ctx.beginPath();
                ctx.arc(bx + bSize/2, brandingY + bSize/2, bSize/2, 0, Math.PI * 2);
                ctx.strokeStyle = accentColor;
                ctx.lineWidth = 1 * scale;
                ctx.stroke();
                ctx.font = `300 ${bSize * 0.35}px "Playfair Display"`;
                ctx.fillStyle = textColor;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(state.cardData.initials.toUpperCase(), bx + bSize/2, brandingY + bSize/2);
                ctx.restore();
            }
        }
        
        const textAlign = indexViewOnly ? 'left' : (state.cardData.align || 'left');
        const leftX = 60 * scale;
        const centerX = w / 2;
        const rightX = w - 70 * scale; // Increased padding for right alignment
        const textX = textAlign === 'center' ? centerX : (textAlign === 'right' ? rightX : leftX);
        const nameFont = indexViewOnly ? "'Cormorant Garamond',serif" : (state.cardData.font || "'DM Sans',sans-serif");
        const nameSize = indexViewOnly ? 36 : (Number(state.cardData.nameSize) || 36);
        const numberSize = indexViewOnly ? 18 : (Number(state.cardData.numberSize) || 18);

        // Name with heavy luxury depth shadow
        ctx.save();
        applyLuxuryShadow(1.5);
        ctx.font = `italic ${nameSize * scale}px ${nameFont}`;
        ctx.fillStyle = textColor;
        ctx.textAlign = textAlign;
        const displayName = state.cardData.name || 'Your Name';
        ctx.fillText(displayName, textX, contentY);
        ctx.restore();
        
        // Title
        ctx.save();
        applyLuxuryShadow(0.8);
        ctx.textAlign = textAlign;
        ctx.textBaseline = 'alphabetic';
        ctx.font = `300 ${numberSize * scale}px ${nameFont}`;
        ctx.fillStyle = subTextColor;
        const displayTitle = state.cardData.title || 'Creative Director';
        ctx.fillText(displayTitle, textX, contentY + 28 * scale);
        ctx.restore();
        
        // Divider
        const dividerStartX = textAlign === 'left' ? textX : (textAlign === 'right' ? textX - 80 * scale : textX - 40 * scale);
        const dividerEndX = textAlign === 'left' ? textX + 80 * scale : (textAlign === 'right' ? textX : textX + 40 * scale);
        const divGrad = ctx.createLinearGradient(dividerStartX, 0, dividerEndX, 0);
        divGrad.addColorStop(0, accentColor);
        divGrad.addColorStop(1, isDark ? 'rgba(201,169,98,0.3)' : 'rgba(201,169,98,0.6)');
        ctx.strokeStyle = divGrad;
        ctx.lineWidth = 1.5 * scale;
        ctx.beginPath();
        ctx.moveTo(dividerStartX, contentY + 45 * scale);
        ctx.lineTo(dividerEndX, contentY + 45 * scale);
        ctx.stroke();
        
        // Contact info with subtle shadows
        const contactY = h - 70 * scale;
        
        ctx.save();
        applyLuxuryShadow(0.5);
        ctx.font = `400 ${numberSize * scale}px ${nameFont}`;
        ctx.fillStyle = textColor;
        ctx.textAlign = textAlign;
        ctx.textBaseline = 'alphabetic';
        const displayNumber = cleanFieldValue(state.cardData.number) || '+1 (555) 000-0000';
        ctx.fillText(displayNumber, textX, contactY);
        
        ctx.font = `300 ${Math.max(10, numberSize * 0.85) * scale}px ${nameFont}`;
        ctx.fillStyle = subTextColor;
        const displayEmail = cleanFieldValue(state.cardData.email) || 'hello@cardel.com';
        ctx.fillText(displayEmail, textX, contactY + 22 * scale);

        // Website URL
        const displayWebsite = cleanFieldValue(state.cardData.website) || 'www.cardel.com';
        if (displayWebsite) {
            ctx.font = `300 ${Math.max(9, numberSize * 0.8) * scale}px ${nameFont}`;
            ctx.fillStyle = subTextColor;
            ctx.globalAlpha = 0.8;
            ctx.fillText(displayWebsite, textX, contactY + 40 * scale);
            ctx.globalAlpha = 1;
        }
        ctx.restore();
        // ─── Improved icons: NFC with text + upside-down waves (opening upwards) ────
const iconColor = textColor;
const iconSize = 32 * scale;

// Dynamic Icon Positioning: Move to opposite side of text alignment
const iconX = textAlign === 'right' ? 58 * scale : w - 58 * scale;

// ── NFC icon + "NFC" text ── top right
{
    const centerX = iconX;
    const centerY = 48 * scale;
    
    // NFC symbol
    ctx.save();
    ctx.strokeStyle = iconColor;
    ctx.lineWidth = iconSize * 0.14;
    ctx.lineCap = 'round';
    ctx.strokeRect(centerX - iconSize*0.35, centerY - iconSize*0.35, iconSize*0.7, iconSize*0.7);
    for(let i = 1; i <= 3; i++){
        let r = iconSize*0.32 + i*iconSize*0.10;
        ctx.beginPath();
        ctx.arc(centerX + iconSize*0.08, centerY, r, Math.PI*1.05, Math.PI*1.95, false);
        ctx.stroke();
    }
    ctx.restore();
    
    // "NFC" text below the icon
    ctx.save();
    ctx.font = `500 ${11 * scale}px Inter`;
    ctx.fillStyle = iconColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText("NFC", centerX, centerY + iconSize*0.45);
    ctx.restore();
}

// ── Upside-down Wi-Fi / waves icon (curves opening upwards) ── bottom right
{
    const centerX = iconX;
    const centerY = h - 48 * scale;
    
    ctx.save();
    ctx.strokeStyle = iconColor;
    ctx.lineWidth = iconSize * 0.13;
    ctx.lineCap = 'round';
    
    // Draw 4 arcs — but flipped (starting from bottom going up)
    for(let i = 1; i <= 4; i++){
        let r = iconSize * 0.18 * i;
        ctx.globalAlpha = 0.35 + i * 0.16;
        ctx.beginPath();
        ctx.arc(centerX, centerY - iconSize*0.12, r, Math.PI * 1.2, Math.PI * 1.8, false);
        ctx.stroke();
    }
    
    // Center dot
    ctx.globalAlpha = 1;
    ctx.fillStyle = iconColor;
    ctx.beginPath();
    ctx.arc(centerX, centerY - iconSize*0.12, iconSize*0.09, 0, Math.PI*2);
    ctx.fill();
    
    ctx.restore();
}

        
    }
    
    
    // Geometric decoration
    if (!indexViewOnly) drawGeometricDecoration(ctx, w, h, isDark);
}

function drawHDRBackSide(ctx, w, h, mat, isDark, indexViewOnly = false) {
    const scale = w / 600;
    
    const interpColor = (c1, c2, f) => {
        const r1 = parseInt(c1.substring(1,3), 16), g1 = parseInt(c1.substring(3,5), 16), b1 = parseInt(c1.substring(5,7), 16);
        const r2 = parseInt(c2.substring(1,3), 16), g2 = parseInt(c2.substring(3,5), 16), b2 = parseInt(c2.substring(5,7), 16);
        const r = Math.round(r1 + (r2 - r1) * f), g = Math.round(g1 + (g2 - g1) * f), b = Math.round(b1 + (b2 - b1) * f);
        return `rgb(${r},${g},${b})`;
    };

    const cf = indexViewOnly
        ? (isDark ? 0 : 1)
        : (state.cardData.contrastTransition !== undefined ? state.cardData.contrastTransition : (isDark ? 0 : 1));
    const accentColor = interpColor('#c9a962', '#8a7038', cf);
    
    if (!indexViewOnly) {
        // Corner accents
        drawCornerAccent(ctx, w - 30 * scale, 30 * scale, 20 * scale, accentColor, true, true);
        drawCornerAccent(ctx, 30 * scale, h - 30 * scale, 20 * scale, accentColor, false, true);
    }
    
   
    
    const white = '#ffffff';
    const black = '#1a1a1a';
    const textColor = interpColor(white, black, cf);

    // QR code — reads from state.cardData (set by materials page controls)
    const showQR = indexViewOnly
        ? false
        : (state.cardData.showQR !== undefined ? state.cardData.showQR : state.orderConfig.addons.qr);
    let qrLayout = null;
    if (showQR) {
        const qrSizePx = (state.cardData.qrSize || 65) * scale;
        const qrPos = state.cardData.qrPos || 'center';
        const qrSidePad = 60 * scale;
        const qrX = qrPos === 'center' ? (w - qrSizePx) / 2
                   : qrPos === 'right'  ? w - qrSizePx - qrSidePad
                   : qrSidePad;
        const qrY = h * 0.5 - qrSizePx * 0.56;
        const qrUrl = state.cardData.qrUrl || '';
        // Blend QR ink with selected material while keeping strong scan contrast
        const matBase = (mat && mat.color) ? mat.color : (isDark ? '#2a2a2a' : '#d8d8d8');
        const qrInkColor = adjustBrightness(matBase, isDark ? 62 : -68);
        drawPremiumQR(ctx, qrX, qrY, qrSizePx, qrInkColor, qrUrl, {
            showPlate: true,
            plateColor: isDark ? 'rgba(245,245,245,0.95)' : 'rgba(255,255,255,0.92)',
            plateBorder: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.18)',
            shadowColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.12)'
        });
        qrLayout = { x: qrX, y: qrY, size: qrSizePx };
    }

    // Website URL (under QR like the reference image)
    const backWebsite = cleanFieldValue(state.cardData.website);
    if (((!indexViewOnly && state.cardData.showWebsiteBack) || indexViewOnly) && backWebsite) {
        ctx.save();
        const backWebsiteSize = indexViewOnly ? 12 : (Number(state.cardData.backWebsiteSize) || 12);
        ctx.font = `400 ${backWebsiteSize * scale}px "Cormorant Garamond"`;
        ctx.fillStyle = isDark ? 'rgba(240,240,240,0.92)' : 'rgba(30,30,30,0.9)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'alphabetic';
        ctx.globalAlpha = 1;
        const webX = w / 2;
        const webY = h - Math.max(16, backWebsiteSize + 8) * scale;
        ctx.fillText(backWebsite, webX, webY);
        ctx.restore();
    }
}

function drawCornerAccent(ctx, x, y, size, color, isTop, isInverted = false) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.6;
    
    // Add subtle glow
    ctx.shadowColor = color;
    ctx.shadowBlur = 5;
    
    ctx.beginPath();
    if (isTop && !isInverted) {
        ctx.moveTo(x, y + size);
        ctx.lineTo(x, y);
        ctx.lineTo(x + size, y);
    } else if (!isTop && !isInverted) {
        ctx.moveTo(x, y - size);
        ctx.lineTo(x, y);
        ctx.lineTo(x - size, y);
    } else if (isTop && isInverted) {
        ctx.moveTo(x, y + size);
        ctx.lineTo(x, y);
        ctx.lineTo(x - size, y);
    } else {
        ctx.moveTo(x, y - size);
        ctx.lineTo(x, y);
        ctx.lineTo(x + size, y);
    }
    ctx.stroke();
    ctx.restore();
}

function drawMetallicText(ctx, text, x, y, font, color, centered = true) {
    ctx.save();
    
    // Create metallic gradient for text
    const metrics = ctx.measureText(text);
    const textGrad = ctx.createLinearGradient(x - metrics.width/2, y - 20, x + metrics.width/2, y + 20);
    textGrad.addColorStop(0, adjustBrightness(color, 20));
    textGrad.addColorStop(0.3, color);
    textGrad.addColorStop(0.5, adjustBrightness(color, 30));
    textGrad.addColorStop(0.7, color);
    textGrad.addColorStop(1, adjustBrightness(color, 10));
    
    ctx.font = font;
    ctx.fillStyle = textGrad;
    ctx.textAlign = centered ? 'center' : 'left';
    ctx.textBaseline = 'middle';
    
    // Add subtle shadow
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 3;
    ctx.shadowOffsetY = 2;
    
    ctx.fillText(text, x, y);
    ctx.restore();
}

function drawGeometricDecoration(ctx, w, h, isDark) {
    ctx.save();
    ctx.globalAlpha = 0.03;
    ctx.strokeStyle = isDark ? '#fff' : '#000';
    ctx.lineWidth = 0.5;
    
    // Concentric circles
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(w - 100, h - 100, 30 + (i * 15), 0, Math.PI * 2);
        ctx.stroke();
    }
    ctx.restore();
}

let _qrDataCache = {};
function getQRCodeModules(text) {
    if (!text) text = "https://cardel.com";
    if (_qrDataCache[text]) return _qrDataCache[text];

    try {
        if (typeof QRCode === 'undefined') {
            return null;
        }
        // Temporary div to generate QR data
        const tempDiv = document.createElement('div');
        const qrc = new QRCode(tempDiv, {
            text: text,
            width: 128,
            height: 128,
            correctLevel: QRCode.CorrectLevel.H // Level H for maximum robustness
        });
        // Access modules from David Shim library
        const modules = qrc._oQRCode.modules;
        if (modules) {
            _qrDataCache[text] = modules;
            return modules;
        }
    } catch (e) {
        console.warn("QR missing modules:", e);
    }
    return null;
}

function drawPremiumQR(ctx, x, y, size, qrColor, url, options = {}) {
    qrColor = qrColor || '#1a1a1a';
    url = url || '';
    const shadowColor = options.shadowColor || 'rgba(0,0,0,0.25)';
    const showPlate = !!options.showPlate;
    const plateColor = options.plateColor || 'rgba(255,255,255,0.95)';
    const plateBorder = options.plateBorder || 'rgba(0,0,0,0.2)';

    if (showPlate) {
        const pad = Math.round(size * 0.12);
        const radius = Math.max(6, size * 0.06);
        const px = x - pad;
        const py = y - pad;
        const pw = size + pad * 2;
        const ph = size + pad * 2;

        ctx.save();
        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = Math.max(4, size * 0.12);
        ctx.fillStyle = plateColor;
        ctx.beginPath();
        ctx.moveTo(px + radius, py);
        ctx.lineTo(px + pw - radius, py);
        ctx.quadraticCurveTo(px + pw, py, px + pw, py + radius);
        ctx.lineTo(px + pw, py + ph - radius);
        ctx.quadraticCurveTo(px + pw, py + ph, px + pw - radius, py + ph);
        ctx.lineTo(px + radius, py + ph);
        ctx.quadraticCurveTo(px, py + ph, px, py + ph - radius);
        ctx.lineTo(px, py + radius);
        ctx.quadraticCurveTo(px, py, px + radius, py);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = plateBorder;
        ctx.lineWidth = Math.max(1, size * 0.018);
        ctx.stroke();
        ctx.restore();
    }

    // Get real modules from library
    const modules = getQRCodeModules(url);
    
    // Draw pattern
    ctx.fillStyle = qrColor;
    ctx.save();
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = Math.max(2, size * 0.06);
    if (modules) {
        const count = modules.length;
        const mSize = size / count;
        const r = mSize * 0.2; // Module rounding radius

        for (let row = 0; row < count; row++) {
            for (let col = 0; col < count; col++) {
                if (modules[row][col]) {
                    const mx = x + col * mSize;
                    const my = y + row * mSize;
                    
                    // Detect finder patterns (corners) to make them solid for better recognition
                    const isFinder = (row < 7 && col < 7) || (row < 7 && col >= count - 7) || (row >= count - 7 && col < 7);
                    
                    if (isFinder) {
                        // Finder modules: use squares to ensure the three big boxes are standard
                        ctx.fillRect(mx - 0.1, my - 0.1, mSize + 0.2, mSize + 0.2);
                    } else {
                        // Standard modules: Rounded squares that touch
                        ctx.beginPath();
                        ctx.moveTo(mx + r, my);
                        ctx.lineTo(mx + mSize - r, my);
                        ctx.quadraticCurveTo(mx + mSize, my, mx + mSize, my + r);
                        ctx.lineTo(mx + mSize, my + mSize - r);
                        ctx.quadraticCurveTo(mx + mSize, my + mSize, mx + mSize - r, my + mSize);
                        ctx.lineTo(mx + r, my + mSize);
                        ctx.quadraticCurveTo(mx, my + mSize, mx, my + mSize - r);
                        ctx.lineTo(mx, my + r);
                        ctx.quadraticCurveTo(mx, my, mx + r, my);
                        ctx.fill();
                    }
                }
            }
        }
    } else {
        // Fallback or waiting for load
        ctx.shadowBlur = 0;
        ctx.textAlign = 'center';
        ctx.font = '10px Inter';
        ctx.fillStyle = '#888';
        ctx.fillText("GEN...", x + size/2, y + size/2);
    }
    ctx.restore();
}

function isDarkMaterial(id) {
    const mat = getCurrentMaterial(id || state.cardData.material);
    if (!mat) return true;
    return getYIQBrightness(mat.color || '#000000') < 128;
}

        function adjustBrightness(color, percent) {
            const num = parseInt(color.replace('#', ''), 16);
            const amt = Math.round(2.55 * percent);
            const R = Math.min(255, Math.max(0, (num >> 16) + amt));
            const G = Math.min(255, Math.max(0, (num >> 8 & 0x00FF) + amt));
            const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
            return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
        }

        function getCurrentMaterial(materialId) {
            const selectedMaterialId = materialId || state.cardData.material;
            for (const cat of Object.keys(state.materials)) {
                const mat = state.materials[cat].find(m => m.id === selectedMaterialId);
                if (mat) return mat;
            }
            return state.materials.metal[0];
        }


// Intersection Observer for scroll animations and card cloning
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reveal section
                if (entry.target.classList.contains('reveal-section')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                
                // Clone hero card to this section if it has a card container
                const cardContainer = entry.target.querySelector('.steps-card-container, .partners-card-container');
                if (cardContainer && !cardContainer.hasChildNodes()) {
                    cloneHeroCard(cardContainer);
                }
                
                // Reveal items with stagger
                const items = entry.target.querySelectorAll('.reveal-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                        if (item.style.transform.includes('scaleX')) {
                            item.style.transform = 'scaleX(1)';
                        }
                    }, index * 100);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('.reveal-section').forEach(section => {
        observer.observe(section);
    });
});

// Track which sections have been revealed
const revealedSections = new Set();

// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !revealedSections.has(entry.target.id)) {
                revealedSections.add(entry.target.id);
                
                // Reveal section
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Render cards for this section
                if (entry.target.id === 'steps-section') {
                    renderStepsCard();
                } else if (entry.target.id === 'partners-section') {
                    renderPartnersCard();
                }
                
                // Reveal items with stagger
                const items = entry.target.querySelectorAll('.reveal-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                        if (item.style.transform.includes('scaleX')) {
                            item.style.transform = 'scaleX(1)';
                        }
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('.reveal-section').forEach(section => {
        observer.observe(section);
    });
});

// Render card for steps section
function renderStepsCard() {
    if (typeof drawCard !== 'function') return;
    const size = getCanvasRenderSize('stepsCardCanvas', 380, 240);
    drawCard('stepsCardCanvas', 'front', size.w, size.h);
}

// Render card for partners section
function renderPartnersCard() {
    if (typeof drawCard !== 'function') return;
    const size = getCanvasRenderSize('partnersCardCanvas', 360, 225);
    drawCard('partnersCardCanvas', 'front', size.w, size.h);
}

// Draw preview card using existing state and materials
function drawPreviewCard(ctx, w, h, side) {
    const mat = getCurrentMaterial();
    const isDark = isDarkMaterial(mat.id);
    const contrast = getTextColorsForMaterial(mat.id);
    const textColor = contrast.primary;
    const subTextColor = contrast.secondary;
    const accentColor = contrast.accent;
    
    // Clear canvas
    ctx.clearRect(0, 0, w, h);
    
    // Draw background using existing function
    drawBackground(ctx, w, h, mat);
    
    // Draw card content
    if (side === 'front') {
        drawPreviewFrontSide(ctx, w, h, mat, isDark, textColor, subTextColor, accentColor);
    }
    
    // Draw border
    const borderGrad = ctx.createLinearGradient(0, 0, w, h);
    borderGrad.addColorStop(0, 'rgba(255,255,255,0.35)');
    borderGrad.addColorStop(0.5, 'rgba(255,255,255,0)');
    borderGrad.addColorStop(1, 'rgba(255,255,255,0.15)');
    ctx.strokeStyle = borderGrad;
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, w - 2, h - 2);
}

// Draw front side for preview
function drawPreviewFrontSide(ctx, w, h, mat, isDark, textColor, subTextColor, accentColor) {
    const scale = w / 600;
    
    // Corner accents
    drawCornerAccent(ctx, 20 * scale, 20 * scale, 15 * scale, accentColor, true);
    drawCornerAccent(ctx, w - 20 * scale, h - 20 * scale, 15 * scale, accentColor, false);
    
    const contentX = 40 * scale;
    const contentY = h / 2 - 10 * scale;
    const textAlign = state.cardData.align || 'left';
    const leftX = contentX;
    const centerX = w / 2;
    const rightX = w - 40 * scale;
    const textX = textAlign === 'center' ? centerX : (textAlign === 'right' ? rightX : leftX);
    const selectedFont = state.cardData.font || "'DM Sans',sans-serif";
    
    // Name
    ctx.save();
    ctx.shadowColor = isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 3 * scale;
    ctx.font = `italic ${28 * scale}px ${selectedFont}`;
    ctx.fillStyle = textColor;
    ctx.textAlign = textAlign;
    const displayName = state.cardData.name || 'Your Name';
    ctx.fillText(displayName, textX, contentY);
    ctx.restore();
    
    // Title
    ctx.font = `300 ${10 * scale}px ${selectedFont}`;
    ctx.fillStyle = subTextColor;
    ctx.letterSpacing = '0.2em';
    ctx.textAlign = textAlign;
    const displayTitle = state.cardData.title || 'Creative Director';
    ctx.fillText(displayTitle, textX, contentY + 20 * scale);
    
    // Divider
    const dividerStartX = textAlign === 'left' ? textX : (textAlign === 'right' ? textX - 60 * scale : textX - 30 * scale);
    const dividerEndX = textAlign === 'left' ? textX + 60 * scale : (textAlign === 'right' ? textX : textX + 30 * scale);
    const divGrad = ctx.createLinearGradient(dividerStartX, 0, dividerEndX, 0);
    divGrad.addColorStop(0, accentColor);
    divGrad.addColorStop(1, isDark ? 'rgba(201,169,98,0.3)' : 'rgba(201,169,98,0.6)');
    ctx.strokeStyle = divGrad;
    ctx.lineWidth = 1.5 * scale;
    ctx.beginPath();
    ctx.moveTo(dividerStartX, contentY + 35 * scale);
    ctx.lineTo(dividerEndX, contentY + 35 * scale);
    ctx.stroke();
    
    // Contact info
    const contactY = h - 50 * scale;
    
    ctx.save();
    ctx.shadowColor = isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)';
    ctx.shadowBlur = 2 * scale;
    ctx.font = `400 ${10 * scale}px ${selectedFont}`;
    ctx.fillStyle = textColor;
    ctx.textAlign = textAlign;
    const displayNumber = cleanFieldValue(state.cardData.number) || '+1 (555) 000-0000';
    ctx.fillText(displayNumber, textX, contactY);
    ctx.restore();
    
    ctx.font = `300 ${9 * scale}px ${selectedFont}`;
    ctx.fillStyle = subTextColor;
    ctx.textAlign = textAlign;
    const displayEmail = cleanFieldValue(state.cardData.email) || 'hello@cardel.com';
    ctx.fillText(displayEmail, textX, contactY + 18 * scale);
    
    // Website
    const previewWebsite = cleanFieldValue(state.cardData.website) || 'www.cardel.com';
    if (previewWebsite) {
        ctx.font = `300 ${8.5 * scale}px ${selectedFont}`;
        ctx.fillStyle = subTextColor;
        ctx.globalAlpha = 0.7;
        ctx.textAlign = textAlign;
        ctx.fillText(previewWebsite, textX, contactY + 34 * scale);
        ctx.globalAlpha = 1;
    }
    
    // Dynamic Icon Positioning for Preview Cards
    const iconX = textAlign === 'right' ? 40 * scale : w - 40 * scale;
    
    // NFC Icon
    const iconColor = isDark ? '#c9a962' : '#1a1a1a';
    const iconSize = 20 * scale;
    const nfcX = iconX;
    const nfcY = 22 * scale;
    
    ctx.save();
    ctx.strokeStyle = iconColor;
    ctx.lineWidth = iconSize * 0.14;
    ctx.lineCap = 'round';
    ctx.strokeRect(nfcX - iconSize*0.35, nfcY - iconSize*0.35, iconSize*0.7, iconSize*0.7);
    for(let i = 1; i <= 3; i++){
        let r = iconSize*0.32 + i*iconSize*0.10;
        ctx.beginPath();
        ctx.arc(nfcX + iconSize*0.08, nfcY, r, Math.PI*1.05, Math.PI*1.95, false);
        ctx.stroke();
    }
    ctx.font = `500 ${8 * scale}px Inter`;
    ctx.fillStyle = iconColor;
    ctx.textAlign = 'center';
    ctx.fillText("NFC", nfcX, nfcY + iconSize*0.6);
    ctx.restore();
    
    // WiFi Icon
    const wifiX = iconX;
    const wifiY = h - 22 * scale;
    
    ctx.save();
    ctx.strokeStyle = iconColor;
    ctx.lineWidth = iconSize * 0.13;
    ctx.lineCap = 'round';
    
    for(let i = 1; i <= 4; i++){
        let r = iconSize * 0.18 * i;
        ctx.globalAlpha = 0.35 + i * 0.16;
        ctx.beginPath();
        ctx.arc(wifiX, wifiY - iconSize*0.12, r, Math.PI * 1.2, Math.PI * 1.8, false);
        ctx.stroke();
    }
    
    ctx.globalAlpha = 1;
    ctx.fillStyle = iconColor;
    ctx.beginPath();
    ctx.arc(wifiX, wifiY - iconSize*0.12, iconSize*0.09, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
}

// Update preview cards when state changes
const originalUpdateAllCards = updateAllCards;
updateAllCards = function() {
    originalUpdateAllCards();
    
    // Re-render preview cards if sections are visible
    if (revealedSections.has('steps-section')) {
        renderStepsCard();
    }
    if (revealedSections.has('partners-section')) {
        renderPartnersCard();
    }
};
    


        (function() {
            const wrap = document.getElementById('cardFloatWrap');
            if (!wrap) return;

            const card = wrap.querySelector('.about-card-image');
            if (!card) return;

            const MAX_ROTATE = 3.5;
            const MAX_TRANSLATE = 6;
            let targetX = 0, targetY = 0, targetRX = 0, targetRY = 0;
            let curX = 0, curY = 0, curRX = 0, curRY = 0;
            let hovering = false;

            function tick(time) {
                if (!hovering) {
                    // Always-on ambient drift to avoid abrupt stopping
                    const t = (time || performance.now()) * 0.001;
                    targetX = Math.sin(t * 0.8) * 1.5;
                    targetY = Math.cos(t * 0.6) * 1.2;
                    targetRX = Math.cos(t * 0.7) * 0.8;
                    targetRY = Math.sin(t * 0.9) * 1.0;
                }

                curX += (targetX - curX) * 0.08;
                curY += (targetY - curY) * 0.08;
                curRX += (targetRX - curRX) * 0.08;
                curRY += (targetRY - curRY) * 0.08;

                card.style.transform = `perspective(800px) translateX(${curX}px) translateY(${curY}px) rotateX(${curRX}deg) rotateY(${curRY}deg)`;
                requestAnimationFrame(tick);
            }

            wrap.addEventListener('mousemove', (e) => {
                const rect = wrap.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const normX = (x / rect.width) * 2 - 1;
                const normY = (y / rect.height) * 2 - 1;

                hovering = true;
                targetRY = normX * MAX_ROTATE;
                targetRX = normY * -MAX_ROTATE;
                targetX = normX * MAX_TRANSLATE;
                targetY = normY * MAX_TRANSLATE;
            });

            wrap.addEventListener('mouseleave', () => {
                hovering = false;
            });

            requestAnimationFrame(tick);
        })();
    
    

function continueToMaterials() {
    console.log("Validating identity details...");
    
    const fields = [
        { key: 'name', id: 'check-item-1' },
        { key: 'title', id: 'check-item-2' },
        { key: 'number', id: 'check-item-3' },
        { key: 'email', id: 'check-item-4' }
    ];

    let isValid = true;

    try {
        fields.forEach(field => {
            const value = state.cardData[field.key] || "";
            if (!value || value.toString().trim() === '') {
                isValid = false;
                const element = document.getElementById(field.id);
                if (element) {
                    element.classList.add('shake', 'invalid-field');
                    setTimeout(() => {
                        element.classList.remove('shake', 'invalid-field');
                    }, 800);
                }
            }
        });

        if (!isValid) {
            showToast("Please complete your identity to continue.");
            return;
        }

        saveToStorage();
        window.location.href = 'materials.html';
    } catch (err) {
        console.error("Validation error:", err);
        window.location.href = 'materials.html';
    }
}
window.continueToMaterials = continueToMaterials;

function loadFromStorage() {
    const saved = localStorage.getItem('cardel_state');
    if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.cardData) {
            Object.assign(state.cardData, parsed.cardData);
            state.cardData.materialCategory = getMaterialCategoryById(state.cardData.material);
            sanitizeCardTextFields();
            if (state.cardData.logoDataUrl) {
                const img = new Image();
                img.onload = () => {
                    state.cardData.logoImg = img;
                    if (typeof updateAllCards === 'function') updateAllCards();
                };
                img.src = state.cardData.logoDataUrl;
            }
            if (state.cardData.designDataUrl) {
                const dImg = new Image();
                dImg.onload = () => {
                    state.cardData.designImg = dImg;
                    if (typeof updateAllCards === 'function') updateAllCards();
                };
                dImg.src = state.cardData.designDataUrl;
            }
        }
        if (parsed.orderConfig) {
            Object.assign(state.orderConfig, parsed.orderConfig);
        }
        if (state.cardData.showQR !== undefined) {
            state.orderConfig.addons.qr = !!state.cardData.showQR;
        }
    }
}

// getCurrentMaterial and isDarkMaterial are defined above — no duplicates needed

// Order functions
function selectQuantity(qty, price, element) {
    state.orderConfig.quantity = qty;
    state.orderConfig.basePrice = price;
    document.querySelectorAll('.quantity-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    updateOrderSummary();
    saveToStorage();
}

function toggleAddon(addon) {
    state.orderConfig.addons[addon] = !state.orderConfig.addons[addon];
    const toggle = document.getElementById(addon + 'Toggle');
    const priceLine = document.getElementById(addon + 'SummaryLine');
    
    if (state.orderConfig.addons[addon]) {
        toggle.classList.add('active');
        if (priceLine) priceLine.style.display = 'flex';
    } else {
        toggle.classList.remove('active');
        if (priceLine) priceLine.style.display = 'none';
    }
    updateOrderSummary();
    saveToStorage();
}

function updateOrderSummary() {
    const mat = getCurrentMaterial();
    const qty = state.orderConfig.quantity;
    let total = state.orderConfig.basePrice;
    
    document.getElementById('summaryQty').textContent = `${qty}x ${mat.name} Cards`;
    document.getElementById('summaryBasePrice').textContent = `$${state.orderConfig.basePrice}`;
    
    if (state.orderConfig.addons.qr) total += 45;
    if (state.orderConfig.addons.laser) total += 80;
    
    document.getElementById('summaryTotal').textContent = `$${total.toLocaleString()}`;
}



function showToast(message) {
    const t = document.getElementById('toast');
    t.textContent = message;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}
// ================================================
// THREE.JS Global Scrolling Card Controller (V4 - Magnetic & Sticky)
// ================================================

const ThreeCardController = {
    isInitialized: false,
    _groupOpacity: -1,

    setCardGroupOpacity(alpha) {
        const next = Math.max(0, Math.min(1, alpha));
        if (Math.abs(next - this._groupOpacity) < 0.01) return;
        this._groupOpacity = next;
        if (!this.cardGroup) return;
        this.cardGroup.traverse((obj) => {
            if (obj && obj.material) {
                obj.material.transparent = true;
                obj.material.opacity = next;
            }
        });
    },

    init() {
        if (this.isInitialized) return;

        this.canvas = document.getElementById('threeOverlay');
        if (!this.canvas || typeof THREE === 'undefined') return;

        // 1. Scene & Camera Setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        this.updateCameraZ(); 

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true, precision: 'highp' });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // 2. Textures
        this.frontTexture = new THREE.CanvasTexture(document.getElementById('heroFrontCanvas'));
        this.backTexture = new THREE.CanvasTexture(document.getElementById('heroBackCanvas'));
        this.frontTexture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
        this.backTexture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
        // LinearFilter: no mipmap blur — keeps canvas text/detail crisp on the 3D mesh
        this.frontTexture.minFilter = THREE.LinearFilter;
        this.frontTexture.magFilter = THREE.LinearFilter;
        this.backTexture.minFilter  = THREE.LinearFilter;
        this.backTexture.magFilter  = THREE.LinearFilter;
        this.frontTexture.generateMipmaps = false;
        this.backTexture.generateMipmaps  = false;

        // 3. Custom Rounded Rectangle Geometry
        this.cardGroup = new THREE.Group();
        const cardW = 600;
        const cardH = 378;
        const cardDepth = 4;
        const radius = 24; 

        const shape = new THREE.Shape();
        shape.moveTo(radius, 0);
        shape.lineTo(cardW - radius, 0);
        shape.quadraticCurveTo(cardW, 0, cardW, radius);
        shape.lineTo(cardW, cardH - radius);
        shape.quadraticCurveTo(cardW, cardH, cardW - radius, cardH);
        shape.lineTo(radius, cardH);
        shape.quadraticCurveTo(0, cardH, 0, cardH - radius);
        shape.lineTo(0, radius);
        shape.quadraticCurveTo(0, 0, radius, 0);

        const faceGeo = new THREE.ShapeGeometry(shape);
        faceGeo.center(); 
        faceGeo.computeBoundingBox(); 

        const box = faceGeo.boundingBox;
        const pos = faceGeo.attributes.position;
        const uvs = [];
        for (let i = 0; i < pos.count; i++) {
            const u = (pos.getX(i) - box.min.x) / (box.max.x - box.min.x);
            const v = (pos.getY(i) - box.min.y) / (box.max.y - box.min.y);
            uvs.push(u, v);
        }
        faceGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

        const frontMesh = new THREE.Mesh(
            faceGeo, 
            new THREE.MeshBasicMaterial({ map: this.frontTexture, transparent: true })
        );
        frontMesh.position.z = (cardDepth / 2) + 0.2; 

        const backGeo = faceGeo.clone();
        const backUvs = [];
        for (let i = 0; i < pos.count; i++) {
            const u = (pos.getX(i) - box.min.x) / (box.max.x - box.min.x);
            const v = (pos.getY(i) - box.min.y) / (box.max.y - box.min.y);
            backUvs.push(1.0 - u, v); 
        }
        backGeo.setAttribute('uv', new THREE.Float32BufferAttribute(backUvs, 2));

        const backMesh = new THREE.Mesh(
            backGeo, 
            new THREE.MeshBasicMaterial({ map: this.backTexture, transparent: true })
        );
        backMesh.rotation.y = Math.PI; 
        backMesh.position.z = -(cardDepth / 2) - 0.2; 

        const extrudeSettings = { depth: cardDepth, bevelEnabled: false };
        const edgeGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        edgeGeo.center();
        
        const edgeMesh = new THREE.Mesh(
            edgeGeo, 
            new THREE.MeshBasicMaterial({ color: 0x111111 }) 
        );

        this.cardGroup.add(frontMesh);
        this.cardGroup.add(backMesh);
        this.cardGroup.add(edgeMesh);
        this.scene.add(this.cardGroup);

       const ogUpdate = window.updateAllCards || function(){};
window.updateAllCards = () => {
    ogUpdate();
    // Force immediate texture refresh when state changes
    this.frontTexture.needsUpdate = true;
    this.backTexture.needsUpdate = true;
    this._lastTexUp = 0; // reset throttle so next frame uploads immediately
    // Also trigger a re-render of hero canvases to ensure sync
    if (typeof drawCard === 'function') {
        drawCard('heroFrontCanvas', 'front', 600, 378);
        drawCard('heroBackCanvas', 'back', 600, 378);
    }
};

        // 5. Track DOM Anchors
        this.anchors = [
            document.getElementById('cardEntranceWrapper'), 
            document.getElementById('stepsCardCanvas'),     
            document.querySelector('.about-card-image'),    
            document.getElementById('partnersCardCanvas')   
        ];

        this.anchors.forEach((anchor, i) => {
            if (i > 0 && anchor) {
                anchor.style.cursor = 'pointer';
                anchor.addEventListener('click', () => {
                    document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
                });
            }
        });

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.updateCameraZ();
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.setupScrollTrigger();
        });

        this.setupScrollTrigger();
        this.frameCount = 0;
        this.renderLoop();
        this.isInitialized = true;
    },

    updateCameraZ() {
        this.camera.position.z = window.innerHeight / (2 * Math.tan((45 * Math.PI) / 360));
    },

    setupScrollTrigger() {
        if (!this.anchors[0] || !this.anchors[3]) return;

        ScrollTrigger.getAll().forEach(st => {
            if (st.vars.id && st.vars.id.includes('threeCard')) st.kill();
        });

        this.proxy = { progress: 0 };

        // Main Animation Track
        gsap.timeline({
            scrollTrigger: {
                id: 'threeCardTrack',
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5, // Increased for more premium, fluid motion
                invalidateOnRefresh: true // Recalculate on resize/layout shift
            }
        }).to(this.proxy, { 
            progress: 3, 
            ease: "none",
            force3D: true // Ensure smoother hardware-accelerated transitions
        });

        // Magnetic Scroll Snapping (Gently centers the section when scrolling stops)
       /* const snapSections = [
            { id: '#hero', ratio: 0 },         // Snaps to top
            { id: '#steps-section', ratio: 0.5 }, // Snaps to center
            { id: '.about-lux-section', ratio: 0.5 },
            { id: '#partners-section', ratio: 0.5 }
        ];

        snapSections.forEach((sec, i) => {
            const el = document.querySelector(sec.id);
            if(el) {
                ScrollTrigger.create({
                    id: `threeCardSnap${i}`,
                    trigger: el,
                    start: "top bottom",
                    end: "bottom top",
                    snap: {
                        snapTo: sec.ratio, 
                        duration: { min: 0.3, max: 0.6 },
                        delay: 0.15, // Wait briefly after scrolling stops
                        ease: "power2.inOut"
                    }
                });
            }
        });*/
    },

    renderLoop() {
    requestAnimationFrame(() => this.renderLoop());

    if (!this.anchors[0]) return;

    // Always update textures — prevents stale canvas state
    this.frontTexture.needsUpdate = true;
    this.backTexture.needsUpdate = true;

    const scrollY = window.scrollY;
    const domCard = this.anchors[0];

    if (scrollY < 50 || (typeof state !== 'undefined' && state.isZoomed)) {
        domCard.style.opacity = '1';
        domCard.style.pointerEvents = 'auto';
        domCard.style.visibility = 'visible';
        this.cardGroup.visible = false;
    } else {
        domCard.style.opacity = '0';
        domCard.style.pointerEvents = 'none';
        domCard.style.visibility = 'hidden';
        this.cardGroup.visible = true;
    }

    if (this.cardGroup.visible) {
        let progress = this.proxy ? this.proxy.progress : 0;
        
        let currentIndex = Math.floor(progress);
        if (currentIndex >= 3) currentIndex = 2; 
        
        let nextIndex = Math.min(currentIndex + 1, 3);
        let rawSegment = progress - currentIndex; 

        // NEW: Conditional scroll logic — second and third segments (Steps->About, About->Partners) are linear
        let segmentProgress;
        if (currentIndex >= 1) {
            // Linear transition: non-stopping, continuous flow
            segmentProgress = Math.max(0, Math.min(1, rawSegment));
        } else {
            // Segment 0 (Hero -> Steps): Maintain deadzone + smoothstep for premium entry
            segmentProgress = (rawSegment - 0.05) / 0.90;
            segmentProgress = Math.max(0, Math.min(1, segmentProgress));
            segmentProgress = segmentProgress * segmentProgress * (3 - 2 * segmentProgress);
        }

        const a1 = this.anchors[currentIndex];
        const a2 = this.anchors[nextIndex];

        if (a1 && a2) {
            const rect1 = a1.getBoundingClientRect();
            const rect2 = a2.getBoundingClientRect();

            if (rect1.width === 0 || rect2.width === 0) return;

            // Document-relative Y — stable against reveal-animation jitters
            const docY1 = rect1.top + window.scrollY;
            const docY2 = rect2.top + window.scrollY;
            
            const x1 = rect1.left + rect1.width / 2 - window.innerWidth / 2;
            const x2 = rect2.left + rect2.width / 2 - window.innerWidth / 2;
            
            const idealY1 = -(docY1 - window.scrollY + rect1.height / 2) + window.innerHeight / 2;
            const idealY2 = -(docY2 - window.scrollY + rect2.height / 2) + window.innerHeight / 2;

            const targetX = THREE.MathUtils.lerp(x1, x2, segmentProgress);
            const targetY = THREE.MathUtils.lerp(idealY1, idealY2, segmentProgress);
            const targetScale = THREE.MathUtils.lerp(rect1.width / 600, rect2.width / 600, segmentProgress);

            this.cardGroup.position.set(targetX, targetY, 0);
            this.cardGroup.scale.set(targetScale, targetScale, targetScale);

            const baseRotation = currentIndex * (Math.PI * 2);
            const transitionRotation = segmentProgress * (Math.PI * 2);
            
            const isResting = segmentProgress === 0 || segmentProgress === 1;
            const tilt = isResting ? 0 : (targetX / window.innerWidth) * 0.15;

            this.cardGroup.rotation.y = baseRotation + transitionRotation;
            this.cardGroup.rotation.z = tilt;
            this.cardGroup.rotation.x = -tilt;
        }
    }

    // Canvas z-index: drop below DOM card when fully settled at top
    if (this.canvas) {
        const isSettledAtTop = (typeof this.proxy !== 'undefined' && this.proxy.progress < 0.01 && window.scrollY < 100);
        this.canvas.style.zIndex = isSettledAtTop ? '100' : '10001';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.display = 'block';
    }

    this.renderer.render(this.scene, this.camera);
}
};

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        ThreeCardController.init();
    }, 200);
});
function setupStepImagesTilt() {
    const images = document.querySelectorAll('.card-parallax');
    images.forEach(img => {
        new TiltEffect(img, {
            max: 10,
            perspective: 800,
            scale: 1.05,
            speed: 600
        });
    });
}

class TiltEffect {
    constructor(element, options = {}) {
        this.element = element;
        this.settings = {
            max: options.max || 15,
            perspective: options.perspective || 1000,
            scale: options.scale || 1,
            speed: options.speed || 300,
            easing: options.easing || "cubic-bezier(.03,.98,.52,.99)",
            ...options
        };

        this.reverse = this.settings.reverse ? -1 : 1;
        this.glare = this.settings.glare;
        this.maxGlare = this.settings.maxGlare;

        this.transitionTimeout = null;
        this.updateCall = null;

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);

        this.addEventListeners();
    }

    addEventListeners() {
        this.element.addEventListener("mousemove", this.onMouseMove);
        this.element.addEventListener("mouseenter", this.onMouseEnter);
        this.element.addEventListener("mouseleave", this.onMouseLeave);
    }

    onMouseEnter() {
        this.setTransition();
    }

    onMouseMove(e) {
        if (this.updateCall !== null) {
            cancelAnimationFrame(this.updateCall);
        }
        this.updateCall = requestAnimationFrame(() => this.update(e));
    }

    onMouseLeave() {
        this.setTransition();
        this.reset();
    }

    setTransition() {
        clearTimeout(this.transitionTimeout);
        this.element.style.transition = `transform ${this.settings.speed}ms ${this.settings.easing}`;
        this.transitionTimeout = setTimeout(() => {
            this.element.style.transition = "";
        }, this.settings.speed);
    }

    update(e) {
        const rect = this.element.getBoundingClientRect();
        const width = this.element.offsetWidth;
        const height = this.element.offsetHeight;
        const left = rect.left;
        const top = rect.top;

        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        const tiltX = (this.settings.max / 2 - x * this.settings.max).toFixed(2);
        const tiltY = (y * this.settings.max - this.settings.max / 2).toFixed(2);

        this.element.style.transform = `perspective(${this.settings.perspective}px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale3d(${this.settings.scale}, ${this.settings.scale}, ${this.settings.scale})`;
    }

    reset() {
        this.element.style.transform = `perspective(${this.settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }
}
