// Figmaプラグインのメインコード
// test.mdファイルの内容とフレームデータをUIに表示する
// プラグインが開始されたときの処理
figma.showUI(__html__, { width: 500, height: 700 });
// test.mdファイルの内容を読み込む関数
async function loadTestMdContent() {
    // 実際の実装では、ファイルシステムから読み込むか、
    // プラグイン内に埋め込んだコンテンツを返す
    return `# ずんだもんのテストファイル

こんにちは！ぼくはずんだもん！

このファイルは Figma プラグインのテスト用ファイルです。

## 機能説明

- test.md ファイルの表示
- Figma フレームデータの取得
- Claude AI による分析

## 使い方

1. Figma でフレームを選択
2. 「フレームデータ取得」ボタンを押す
3. Claude AI が分析結果を表示

頑張って開発中です！`;
}
// フレームデータを取得する関数
function getSelectedFrameData() {
    const selection = figma.currentPage.selection;
    if (selection.length === 0) {
        return {
            error: true,
            message: "エラー: フレームが選択されていません。\n\nFigma上でフレームを選択してから再度お試しください。"
        };
    }
    const selectedNode = selection[0];
    if (selectedNode.type !== 'FRAME') {
        return {
            error: true,
            message: `エラー: 選択されたオブジェクトはフレームではありません。\n\n選択されたタイプ: ${selectedNode.type}\n\nフレームを選択してから再度お試しください。`
        };
    }
    const frameNode = selectedNode;
    // フレームの詳細データを収集
    const frameData = {
        id: frameNode.id,
        name: frameNode.name,
        type: frameNode.type,
        visible: frameNode.visible,
        locked: frameNode.locked,
        // 位置とサイズ
        x: frameNode.x,
        y: frameNode.y,
        width: frameNode.width,
        height: frameNode.height,
        // スタイル
        backgroundColor: frameNode.backgrounds,
        cornerRadius: frameNode.cornerRadius,
        // 制約
        constraints: frameNode.constraints,
        // 子要素の情報
        children: frameNode.children.map(child => ({
            id: child.id,
            name: child.name,
            type: child.type,
            visible: child.visible,
            x: child.x,
            y: child.y,
            width: child.width,
            height: child.height
        })),
        // レイアウト
        layoutMode: frameNode.layoutMode,
        paddingLeft: frameNode.paddingLeft,
        paddingRight: frameNode.paddingRight,
        paddingTop: frameNode.paddingTop,
        paddingBottom: frameNode.paddingBottom,
        itemSpacing: frameNode.itemSpacing,
        // その他
        opacity: frameNode.opacity,
        blendMode: frameNode.blendMode,
        effects: frameNode.effects
    };
    return {
        error: false,
        data: frameData
    };
}
// Claude APIにリクエストを送信する関数
async function analyzeFrameWithClaude(frameData, apiKey) {
    try {
        const prompt = `あなたはUIデザインの専門家です。以下のFigmaフレームデータを分析して、デザインに関する洞察や改善提案を日本語で提供してください。

フレームデータ:
${JSON.stringify(frameData, null, 2)}

以下の観点から分析してください：
1. レイアウトとデザイン構造
2. カラーとスタイリング
3. ユーザビリティの観点
4. 改善提案
5. ベストプラクティスとの比較

回答は分かりやすく、具体的なアドバイスを含めてください。`;
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-sonnet-20240229',
                max_tokens: 2000,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            })
        });
        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Claude API Error: ${response.status} - ${errorData}`);
        }
        const data = await response.json();
        return {
            error: false,
            analysis: data.content[0].text
        };
    }
    catch (error) {
        return {
            error: true,
            message: `Claude API接続エラー: ${error.message}`
        };
    }
}
// UIからのメッセージを処理
figma.ui.onmessage = async (msg) => {
    // test.mdの内容を要求された場合
    if (msg.type === 'request-content') {
        const content = await loadTestMdContent();
        figma.ui.postMessage({
            type: 'content-loaded',
            content: content
        });
    }
    // フレームデータを要求された場合
    if (msg.type === 'request-frame-data') {
        const frameData = getSelectedFrameData();
        figma.ui.postMessage({
            type: 'frame-data-loaded',
            frameData: frameData
        });
    }
    // Claude AI分析を要求された場合
    if (msg.type === 'request-claude-analysis') {
        const frameData = getSelectedFrameData();
        if (frameData.error) {
            figma.ui.postMessage({
                type: 'claude-analysis-loaded',
                analysisData: frameData
            });
            return;
        }
        // APIキーをチェック
        if (!msg.apiKey || msg.apiKey.trim() === '') {
            figma.ui.postMessage({
                type: 'claude-analysis-loaded',
                analysisData: {
                    error: true,
                    message: "エラー: Claude API キーが設定されていません。\n\nAPI キーを入力してから再度お試しください。"
                }
            });
            return;
        }
        // Claude APIで分析
        const analysisResult = await analyzeFrameWithClaude(frameData.data, msg.apiKey);
        figma.ui.postMessage({
            type: 'claude-analysis-loaded',
            analysisData: analysisResult
        });
    }
    // プラグインを閉じる
    if (msg.type === 'close-plugin') {
        figma.closePlugin();
    }
    // その他のメッセージタイプの場合、デフォルトでコンテンツをロード
    const knownTypes = ['request-content', 'request-frame-data', 'request-claude-analysis', 'close-plugin'];
    if (!knownTypes.includes(msg.type)) {
        const content = await loadTestMdContent();
        figma.ui.postMessage({
            type: 'content-loaded',
            content: content
        });
    }
};
console.log('------------------------');
console.log('起動成功');
console.log('------------------------');
