/**
 * Helper Format
 * Chứa các hàm tiện ích định dạng dữ liệu dùng chung
 */

/**
 * Hàm tiện ích cắt ngắn chuỗi nếu quá dài (ví dụ: tên phim, mô tả)
 * @param {string} text - Chuỗi cần cắt
 * @param {number} maxLength - Độ dài tối đa trước khi cắt
 * @returns {string} - Chuỗi đã cắt kèm "..."
 */
export function truncateText(text, maxLength = 50) {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
}

/**
 * Hàm định dạng số lượt xem (ví dụ: 15000 -> 15K)
 * @param {number} views - Lượt xem
 * @returns {string} - Chuỗi định dạng
 */
export function formatViews(views) {
    if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + 'M';
    }
    if (views >= 1000) {
        return (views / 1000).toFixed(1) + 'K';
    }
    return views.toString();
}
