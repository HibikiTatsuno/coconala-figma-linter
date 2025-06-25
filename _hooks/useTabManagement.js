import { TAB_TYPES, CONTENT_TYPES } from '../_constants/messageTypes.js';
import { requestContent } from './useFigmaMessage.js';

// タブ管理用カスタムフック
window.useTabManagement = (setInstruction, setContent, setContentType) => {
  const { useState } = React;
  const [currentTab, setCurrentTab] = useState(window.TAB_TYPES.MD);

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    
    if (tab === window.TAB_TYPES.MD) {
      window.requestContent();
    } else if (tab === window.TAB_TYPES.FRAME) {
      setInstruction('フレームを選択してから「フレームデータ取得」ボタンを押してください');
      setContent('フレームが選択されていません...\n\n1. Figmaでフレームを選択する\n2. 「フレームデータ取得」ボタンを押す\n3. フレーム情報がJSONで表示される');
      setContentType(window.CONTENT_TYPES.DEFAULT);
    }
  };

  return {
    currentTab,
    handleTabChange
  };
}; 