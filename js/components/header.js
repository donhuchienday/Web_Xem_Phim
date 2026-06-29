/**
 * Component Header
 * Xử lý các logic liên quan đến thanh điều hướng (Sticky, Mobile Menu)
 */

export function initHeader() {
    const header = document.getElementById('header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mainNav = document.getElementById('main-nav');

    // Nếu không tìm thấy các element trên DOM thì bỏ qua
    if (!header || !mobileToggle || !mainNav) return;

    // 1. Xử lý Sticky Header: Đổi màu nền khi cuộn trang
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Xử lý Menu Mobile: Bật/tắt sidebar menu trên điện thoại
    mobileToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        
        // Cập nhật Icon (Bars <-> Xmark)
        const icon = mobileToggle.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
}
