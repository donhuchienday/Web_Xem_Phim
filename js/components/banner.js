/**
 * Component Banner (Carousel/Slider)
 * Xử lý logic trượt tự động, nút điều hướng và dots
 */

export function initBanner() {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide-item');
    const prevBtn = document.querySelector('.slider-control.prev');
    const nextBtn = document.querySelector('.slider-control.next');
    const dots = document.querySelectorAll('.thumbnail-item'); // Đổi từ .dot sang .thumbnail-item
    const heroSlider = document.querySelector('.hero-slider');

    if (!sliderWrapper || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    const intervalTime = 12000; // 12 giây chuyển slide một lần

    // Hàm di chuyển đến slide cụ thể
    function goToSlide(index) {
        // Xử lý infinite loop logic cơ bản
        if (index < 0) {
            currentIndex = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        // Ẩn tất cả mô tả đang mở trước khi chuyển slide mới
        document.querySelectorAll('.slide-desc.show').forEach(el => el.classList.remove('show'));
        document.querySelectorAll('.desc-toggle-btn.active').forEach(el => el.classList.remove('active'));

        // Cập nhật vị trí slider wrapper (Dùng CSS Transform)
        sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Cập nhật trạng thái active cho Dots
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[currentIndex]) {
            dots[currentIndex].classList.add('active');
        }
    }

    // Hàm chuyển slide tiếp theo
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    // Hàm chuyển slide trước đó
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Thiết lập Auto-play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, intervalTime);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // --- Gắn các sự kiện (Event Listeners) ---
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        // Reset thời gian auto play khi người dùng tự bấm
        stopAutoPlay();
        startAutoPlay();
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    // Xử lý logic Đóng/Mở mô tả
    const descToggleBtns = document.querySelectorAll('.desc-toggle-btn');
    descToggleBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Tránh lan sự kiện
            const slideItem = this.closest('.slide-content');
            const desc = slideItem.querySelector('.slide-desc');
            
            // Toggle
            desc.classList.toggle('show');
            this.classList.toggle('active');
        });
    });

    // Dừng auto-play khi rê chuột vào banner
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopAutoPlay);
        heroSlider.addEventListener('mouseleave', startAutoPlay);
        
        // Hỗ trợ cảm ứng vuốt trên mobile (Basic)
        let touchStartX = 0;
        let touchEndX = 0;
        
        heroSlider.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});

        heroSlider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});

        function handleSwipe() {
            // Ngưỡng vuốt là 50px
            if (touchEndX < touchStartX - 50) {
                nextSlide();
            }
            if (touchEndX > touchStartX + 50) {
                prevSlide();
            }
            stopAutoPlay();
            startAutoPlay();
        }
    }

    // Bắt đầu chạy ngay sau khi gắn sự kiện
    startAutoPlay();
}
