import { TAB_TYPES } from '../_constants/messageTypes.js';

// Tabs Component
window.Tabs = ({ currentTab, onTabChange }) => {
  return (
    <div className="flex gap-1 mb-4 justify-center">
      <button
        className={`px-4 py-2 rounded-md cursor-pointer text-xs font-bold transition-all duration-300 focus:outline-none ${
          currentTab === window.TAB_TYPES.MD
            ? 'bg-primary text-white hover:-translate-y-0.5'
            : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
        }`}
        onClick={() => onTabChange(window.TAB_TYPES.MD)}
      >
        test.md表示
      </button>
      <button
        className={`px-4 py-2 rounded-md cursor-pointer text-xs font-bold transition-all duration-300 focus:outline-none ${
          currentTab === window.TAB_TYPES.FRAME
            ? 'bg-primary text-white hover:-translate-y-0.5'
            : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
        }`}
        onClick={() => onTabChange(window.TAB_TYPES.FRAME)}
      >
        フレームデータ
      </button>
    </div>
  );
}; 