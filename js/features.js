(function() {
  // ---------- PRELOADER ----------
  const preloader = document.getElementById('preloader');
  const fillBar = document.querySelector('.loading-bar-fill');
  const percentageEl = document.querySelector('.loading-percentage');
  
  let startTime = Date.now();
  let lcpDone = false;
  let minDisplayTime = 1500; // 1.5 seconds minimum
  
  // Update progress bar visually
  function updateProgress(percent) {
    let value = Math.min(100, Math.max(0, Math.floor(percent)));
    if (fillBar) fillBar.style.width = value + '%';
    if (percentageEl) percentageEl.innerText = value + '%';
  }
  
  // Fake progress that runs smoothly from 0 to 95%,
  // then waits for real loading to finish.
  let fakeProgress = 0;
  const fakeInterval = setInterval(() => {
    if (fakeProgress < 95) {
      // Increment slowly, never stop at 80
      fakeProgress += Math.random() * 3 + 1;
      if (fakeProgress > 95) fakeProgress = 95;
      updateProgress(fakeProgress);
    }
  }, 100);
  
  // Function to finish loading (set to 100% and hide after min time + LCP)
  function finishLoading() {
    clearInterval(fakeInterval);
    updateProgress(100);
    
    const elapsed = Date.now() - startTime;
    const remaining = minDisplayTime - elapsed;
    
    // Wait for both LCP and minimum time
    function hidePreloader() {
      if (!preloader) return;
      preloader.classList.add('fade-out');
      setTimeout(() => {
        if (preloader) preloader.style.display = 'none';
      }, 2000); // fade out transition time
    }
    
    if (remaining > 0) {
      setTimeout(hidePreloader, remaining);
    } else {
      hidePreloader();
    }
  }
  
  // ---- Detect LCP (Largest Contentful Paint) ----
  let lcpValue = 0;
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    if (lastEntry) {
      lcpValue = lastEntry.startTime;
      lcpDone = true;
      // Once LCP is done, check if everything else is also ready
      checkIfReadyToFinish();
    }
  });
  lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  
  // ---- Detect when all real resources are loaded ----
  let allResourcesLoaded = false;
  
  function checkResourcesLoaded() {
    // Get all images, stylesheets, and scripts
    const resources = Array.from(document.querySelectorAll('img, link[rel="stylesheet"], script:not([src])'));
    const promises = resources.map(res => {
      if (res.complete || (res.tagName === 'LINK' && res.sheet)) {
        return Promise.resolve();
      }
      return new Promise(resolve => {
        res.addEventListener('load', resolve);
        res.addEventListener('error', resolve);
      });
    });
    
    // Also wait for window load event (ensures all async scripts & fonts)
    const windowLoad = new Promise(resolve => {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', resolve);
    });
    
    Promise.all([...promises, windowLoad]).then(() => {
      allResourcesLoaded = true;
      checkIfReadyToFinish();
    });
  }
  
  function checkIfReadyToFinish() {
    if (allResourcesLoaded && lcpDone) {
      finishLoading();
    }
  }
  
  // Start checking resources
  checkResourcesLoaded();
  
  // Fallback: if LCP never fires (very rare), force finish after 4 seconds
  setTimeout(() => {
    if (!lcpDone) {
      lcpDone = true;
      checkIfReadyToFinish();
    }
  }, 4000);
  
  // ---------- CUSTOM CURSOR (unchanged, same as before) ----------
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor) return;
  
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  
  function updateCursorPosition() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(updateCursorPosition);
  }
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  updateCursorPosition();
  
  const interactiveSelectors = 'a, button, .btn-turno, .whatsapp-float, nav a, .social-links a, #backToTop';
  
  function addHoverEffects() {
    const elements = document.querySelectorAll(interactiveSelectors);
    elements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover-link');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover-link');
      });
    });
  }
  
  addHoverEffects();
  
  const observer = new MutationObserver(() => addHoverEffects());
  observer.observe(document.body, { childList: true, subtree: true });
  
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });
})();