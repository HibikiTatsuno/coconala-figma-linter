// Tailwind CSS カスタムカラー設定
window.CUSTOM_COLORS = {
  'warm-yellow': '#ffeaa7',
  'warm-orange': '#fab1a0',
  'primary': '#e17055',
  'primary-dark': '#d63031',
  'success': '#00b894',
  'success-dark': '#00a085',
  'info': '#74b9ff',
  'error': '#ff7675',
  'light-blue': '#81ecec',
  'content-bg': '#fdcb6e',
  'text-gray': '#636e72',
  'text-dark': '#2d3436'
};

// Tailwind設定オブジェクト
window.TAILWIND_CONFIG = {
  theme: {
    extend: {
      colors: window.CUSTOM_COLORS
    }
  }
}; 