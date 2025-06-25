// Figmaプラグインのメインコード
// test.mdファイルの内容とフレームデータをUIに表示する

// プラグインが開始されたときの処理
figma.showUI(__html__, { width: 500, height: 600 });

// test.mdファイルの内容（実際のファイルから取得したものをここに記載）
const testMdContent = '表示する'

// 選択されたフレームのデータを取得する関数
function getSelectedFrameData(): any {
  const selection = figma.currentPage.selection;
  
  if (selection.length === 0) {
    return {
      error: true,
      message: "フレームが選択されていないのだ！\nフレームを選択してから「フレームデータ取得」ボタンを押してほしいのだ。"
    };
  }
  
  const selectedNode = selection[0];
  
  // フレームかどうかをチェック
  if (selectedNode.type !== 'FRAME') {
    return {
      error: true,
      message: `選択されたのは「${selectedNode.type}」タイプなのだ。\nフレーム（FRAME）を選択してほしいのだ！`
    };
  }
  
  // フレームの詳細データを取得
  const frameData = {
    // 基本情報
    name: selectedNode.name,
    type: selectedNode.type,
    id: selectedNode.id,
    
    // 位置とサイズ
    position: {
      x: selectedNode.x,
      y: selectedNode.y
    },
    size: {
      width: selectedNode.width,
      height: selectedNode.height
    },
    
    // 表示設定
    visible: selectedNode.visible,
    locked: selectedNode.locked,
    opacity: selectedNode.opacity,
    
    // 背景色（もしあれば）
    fills: Array.isArray(selectedNode.fills) && selectedNode.fills.length > 0 ? selectedNode.fills.map((fill: any) => ({
      type: fill.type,
      color: fill.type === 'SOLID' ? fill.color : null,
      opacity: fill.opacity
    })) : [],
    
    // 枠線（もしあれば）
    strokes: Array.isArray(selectedNode.strokes) && selectedNode.strokes.length > 0 ? selectedNode.strokes.map((stroke: any) => ({
      type: stroke.type,
      color: stroke.type === 'SOLID' ? stroke.color : null
    })) : [],
    strokeWeight: selectedNode.strokeWeight,
    
    // 角の丸み
    cornerRadius: selectedNode.cornerRadius,
    
    // 子要素の数
    childrenCount: selectedNode.children.length,
    
    // 子要素の概要
    children: selectedNode.children.slice(0, 5).map((child: any) => ({
      name: child.name,
      type: child.type,
      id: child.id
    })),
    
    // レイアウト設定（Auto Layout関連）
    layoutMode: selectedNode.layoutMode || 'NONE',
    primaryAxisSizingMode: selectedNode.primaryAxisSizingMode || 'AUTO',
    counterAxisSizingMode: selectedNode.counterAxisSizingMode || 'AUTO',
    
    // 取得日時
    timestamp: new Date().toISOString()
  };
  
  return {
    error: false,
    data: frameData
  };
}

// UIが準備できたときの処理
figma.ui.onmessage = (msg: any) => {
  if (msg.type === 'request-content') {
    // test.mdの内容をUIに送信
    figma.ui.postMessage({
      type: 'content-loaded',
      content: testMdContent
    });
  }
  
  if (msg.type === 'request-frame-data') {
    // 選択されたフレームのデータを取得してUIに送信
    const frameData = getSelectedFrameData();
    figma.ui.postMessage({
      type: 'frame-data-loaded',
      frameData: frameData
    });
  }
  
  if (msg.type === 'close-plugin') {
    // プラグインを閉じる
    figma.closePlugin();
  }
};

// プラグイン起動時にtest.mdの内容を自動的に読み込む
setTimeout(() => {
  figma.ui.postMessage({
    type: 'content-loaded',
    content: testMdContent
  });
}, 100);

console.log('------------------------');
console.log('起動成功');
console.log('------------------------');