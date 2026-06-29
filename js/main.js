import { initHeader } from './components/header.js';

// Import thêm các component khác ở đây trong tương lai
// import { initBanner } from './components/banner.js';

/**
 * Hàm khởi tạo toàn bộ ứng dụng
 */
function initApp() {
    // Khởi tạo logic của component Header
    initHeader();
    
    // Khởi tạo logic của các component khác
    // initBanner();
}

// Chạy hàm khởi tạo khi cấu trúc DOM đã tải xong
document.addEventListener('DOMContentLoaded', initApp);
