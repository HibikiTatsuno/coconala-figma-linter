// Buttons Component
window.Buttons = ({ onRequestContent, onRequestFrameData, onClose }) => {
  return (
    <div className="flex gap-2 justify-center mt-4 flex-wrap">
      <button
        onClick={onRequestContent}
        className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer text-xs font-bold transition-all duration-300 hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-lg focus:outline-none"
      >
        test.md再読込
      </button>
      <button
        onClick={onRequestFrameData}
        className="bg-success text-white px-4 py-2 rounded-md cursor-pointer text-xs font-bold transition-all duration-300 hover:bg-success-dark hover:-translate-y-0.5 hover:shadow-lg focus:outline-none"
      >
        フレームデータ取得
      </button>
      <button
        onClick={onClose}
        className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer text-xs font-bold transition-all duration-300 hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-lg focus:outline-none"
      >
        閉じる
      </button>
    </div>
  );
}; 