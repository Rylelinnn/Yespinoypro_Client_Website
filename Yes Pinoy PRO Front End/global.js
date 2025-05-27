document.addEventListener('DOMContentLoaded', function() {
    // Stats section functionality
    const statsTrack = document.querySelector('.stats-track');
    if (statsTrack) {
        // Clone the first group for seamless infinite scroll
        const firstGroup = statsTrack.querySelector('.stats-group');
        const clone = firstGroup.cloneNode(true);
        statsTrack.appendChild(clone);

        // Reset animation when it completes
        statsTrack.addEventListener('animationend', () => {
            statsTrack.style.animation = 'none';
            statsTrack.offsetHeight; // Trigger reflow
            statsTrack.style.animation = 'scroll 30s linear infinite';
        });
    }

    // Blog carousel functionality
    const slider = document.querySelector('.blogs-slider');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const currentSlideEl = document.querySelector('.current-slide');
    const totalSlidesEl = document.querySelector('.total-slides');
    
    if (slider && prevBtn && nextBtn) {
      const cards = slider.querySelectorAll('.blog-card');
      const cardWidth = cards[0].offsetWidth + 30; // card width + gap
      const visibleCards = 3;
      let currentIndex = 0;
      const maxIndex = Math.ceil(cards.length / visibleCards) - 1;
      
      // Set total slides
      totalSlidesEl.textContent = maxIndex + 1;
      
      // Update current slide display
      function updateCurrentSlide() {
        currentSlideEl.textContent = currentIndex + 1;
      }
      
      // Scroll to position
      function scrollToPosition(index) {
        slider.scrollTo({
          left: index * cardWidth * visibleCards,
          behavior: 'smooth'
        });
        currentIndex = index;
        updateCurrentSlide();
      }
      
      // Event listeners
      prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
          scrollToPosition(currentIndex - 1);
        }
      });
      
      nextBtn.addEventListener('click', function() {
        if (currentIndex < maxIndex) {
          scrollToPosition(currentIndex + 1);
        }
      });
      
      // Initialize
      updateCurrentSlide();
      
      // Adjust for responsive design
      window.addEventListener('resize', function() {
        // Recalculate card width
        const newCardWidth = cards[0].offsetWidth + 30;
        
        // Scroll to current position with new width
        slider.scrollTo({
          left: currentIndex * newCardWidth * visibleCards,
          behavior: 'auto'
        });
      });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const overlay = document.querySelector('.overlay');
    const body = document.body;

    function toggleMenu() {
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    }

    if (menuToggle && mainNav && overlay) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
        
        overlay.addEventListener('click', toggleMenu);

        // Close menu when clicking a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });

        // Close menu on window resize if open
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
                toggleMenu();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mainNav.classList.contains('active') && 
                !mainNav.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                toggleMenu();
            }
        });
    }
}); 