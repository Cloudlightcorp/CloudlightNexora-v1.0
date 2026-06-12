document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileNav = document.getElementById('mobileNav');
    const body = document.body;
    
    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            mobileNav.classList.toggle('open');
            
            if (mobileNav.classList.contains('open')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
    }
    
    document.addEventListener('click', function(e) {
        if (mobileNav && mobileNav.classList.contains('open')) {
            const isClickInside = mobileNav.contains(e.target) || 
                                  (mobileToggle && mobileToggle.contains(e.target));
            if (!isClickInside) {
                mobileToggle.classList.remove('active');
                mobileNav.classList.remove('open');
                body.style.overflow = '';
            }
        }
    });
    
    const dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const parent = this.parentElement;
            const submenu = parent.querySelector('.mobile-submenu');
            
            dropdownToggles.forEach(otherToggle => {
                if (otherToggle !== this) {
                    otherToggle.classList.remove('active');
                    const otherSubmenu = otherToggle.parentElement.querySelector('.mobile-submenu');
                    if (otherSubmenu) {
                        otherSubmenu.classList.remove('open');
                    }
                }
            });
            
            this.classList.toggle('active');
          
            if (submenu) {
                submenu.classList.toggle('open');
            }
        });
    });
    
    const allMobileLinks = document.querySelectorAll('.mobile-nav a');
    allMobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileToggle && mobileNav) {
                mobileToggle.classList.remove('active');
                mobileNav.classList.remove('open');
                body.style.overflow = '';
            }
        });
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 881 && mobileNav && mobileNav.classList.contains('open')) {
            if (mobileToggle) mobileToggle.classList.remove('active');
            mobileNav.classList.remove('open');
            body.style.overflow = '';
        }
    });
    
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            if (window.innerWidth >= 881 && mobileNav && mobileNav.classList.contains('open')) {
                if (mobileToggle) mobileToggle.classList.remove('active');
                mobileNav.classList.remove('open');
                body.style.overflow = '';
            }
        }, 200);
    });
    
    if (mobileNav) {
        mobileNav.addEventListener('touchmove', function(e) {
            e.stopPropagation();
        }, { passive: false });
    }
});

const slides = document.querySelectorAll(".slide");
let current = 0;
let slideInterval;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
}

function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
}

function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
}

function startSlideShow() {
    stopSlideShow();
    slideInterval = setInterval(nextSlide, 3000);
}

function stopSlideShow() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

if (slides.length > 0) {
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    const slider = document.querySelector(".hero-slider");
    
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            nextSlide();
            startSlideShow();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            prevSlide();
            startSlideShow();
        });
    }
    
    if (slider) {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;
        let isSwiping = false;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
            isSwiping = true;
            stopSlideShow();
        }, {passive: true});
        
        slider.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
        }, {passive: true});
        
        slider.addEventListener('touchend', (e) => {
            if (!isSwiping) return;
            isSwiping = false;
            
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;
            
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            
            startSlideShow();
        }, {passive: true});
        
        slider.addEventListener('mouseenter', stopSlideShow);
        slider.addEventListener('mouseleave', startSlideShow);
        slider.addEventListener('touchstart', stopSlideShow, {passive: true});
    }
    
    startSlideShow();
}