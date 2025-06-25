import { Header } from '../_components/Header.js';
import { Tabs } from '../_components/Tabs.js';
import { Instruction } from '../_components/Instruction.js';
import { Content } from '../_components/Content.js';
import { Buttons } from '../_components/Buttons.js';
import { Footer } from '../_components/Footer.js';
import { useFigmaMessage, requestContent, requestFrameData, closePlugin } from '../_hooks/useFigmaMessage.js';
import { useTabManagement } from '../_hooks/useTabManagement.js';
import { CONTENT_TYPES } from '../_constants/messageTypes.js';

// Main App Component
window.App = () => {
  const { useState, useEffect } = React;
  
  // State管理
  const [content, setContent] = useState('読み込み中...');
  const [contentType, setContentType] = useState(window.CONTENT_TYPES.LOADING);
  const [instruction, setInstruction] = useState('test.mdファイルの内容を表示中');

  // カスタムフック使用
  const { currentTab, handleTabChange } = window.useTabManagement(setInstruction, setContent, setContentType);
  
  // Figmaメッセージ処理
  window.useFigmaMessage(setContent, setContentType, setInstruction);

  // 初期化
  useEffect(() => {
    setTimeout(() => {
      window.requestContent();
    }, 300);
  }, []);

  return (
    <div className="max-w-full bg-white rounded-2xl p-5 shadow-2xl mb-5">
      <window.Header />
      <window.Tabs currentTab={currentTab} onTabChange={handleTabChange} />
      <window.Instruction message={instruction} />
      <window.Content content={content} contentType={contentType} />
      <window.Buttons
        onRequestContent={window.requestContent}
        onRequestFrameData={window.requestFrameData}
        onClose={window.closePlugin}
      />
      <window.Footer />
    </div>
  );
}; 