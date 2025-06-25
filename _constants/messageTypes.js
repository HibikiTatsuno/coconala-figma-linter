// Figmaプラグインメッセージタイプ定数
window.MESSAGE_TYPES = {
  // 受信メッセージ
  CONTENT_LOADED: 'content-loaded',
  FRAME_DATA_LOADED: 'frame-data-loaded',
  
  // 送信メッセージ
  REQUEST_CONTENT: 'request-content',
  REQUEST_FRAME_DATA: 'request-frame-data',
  CLOSE_PLUGIN: 'close-plugin'
};

// コンテンツタイプ
window.CONTENT_TYPES = {
  DEFAULT: 'default',
  ERROR: 'error',
  JSON: 'json',
  LOADING: 'loading'
};

// タブタイプ
window.TAB_TYPES = {
  MD: 'md',
  FRAME: 'frame'
}; 