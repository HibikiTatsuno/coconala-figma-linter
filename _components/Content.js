// Content Component
window.Content = ({ content, contentType }) => {
  const getContentClassName = () => {
    const baseClass = "rounded-lg p-4 my-4 leading-relaxed whitespace-pre-wrap font-mono text-xs max-h-80 overflow-y-auto border-2 border-primary";
    
    switch (contentType) {
      case window.CONTENT_TYPES.ERROR:
        return `bg-error text-white ${baseClass} text-center font-bold`;
      case window.CONTENT_TYPES.JSON:
        return `bg-info text-white ${baseClass}`;
      case window.CONTENT_TYPES.LOADING:
        return `bg-content-bg ${baseClass}`;
      default:
        return `bg-content-bg ${baseClass}`;
    }
  };

  return (
    <div className={getContentClassName()}>
      {contentType === window.CONTENT_TYPES.LOADING ? (
        <div className="text-center text-text-gray italic">{content}</div>
      ) : (
        content
      )}
    </div>
  );
}; 