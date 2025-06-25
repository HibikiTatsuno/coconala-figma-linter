import { MESSAGE_TYPES, CONTENT_TYPES } from '../_constants/messageTypes.js';

// Figmaプラグインメッセージ処理用カスタムフック
window.useFigmaMessage = (setContent, setContentType, setInstruction) => {
  const { useEffect } = React;

  useEffect(() => {
    const handleMessage = (event) => {
      const msg = event.data.pluginMessage;
      
      if (msg.type === window.MESSAGE_TYPES.CONTENT_LOADED) {
        setContent(msg.content);
        setContentType(window.CONTENT_TYPES.DEFAULT);
        setInstruction('test.mdファイルの内容を表示中です');
      }
      
      if (msg.type === window.MESSAGE_TYPES.FRAME_DATA_LOADED) {
        const frameData = msg.frameData;
        
        if (frameData.error) {
          setContent(frameData.message);
          setContentType(window.CONTENT_TYPES.ERROR);
        } else {
          const jsonString = JSON.stringify(frameData.data, null, 2);
          setContent(jsonString);
          setContentType(window.CONTENT_TYPES.JSON);
          setInstruction(`フレーム「${frameData.data.name}」のデータを表示中です`);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [setContent, setContentType, setInstruction]);
};

// プラグインメッセージ送信用のヘルパー関数
window.sendPluginMessage = (type, data = {}) => {
  parent.postMessage({ pluginMessage: { type, ...data } }, '*');
};

// 個別のメッセージ送信関数
window.requestContent = () => {
  window.sendPluginMessage(window.MESSAGE_TYPES.REQUEST_CONTENT);
};

window.requestFrameData = () => {
  window.sendPluginMessage(window.MESSAGE_TYPES.REQUEST_FRAME_DATA);
};

window.closePlugin = () => {
  window.sendPluginMessage(window.MESSAGE_TYPES.CLOSE_PLUGIN);
}; 