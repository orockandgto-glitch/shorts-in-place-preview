# Preview & Shorts Controls for YouTube — 日本語ガイド

Lengedが制作する、PC版Chrome・Microsoft Edge向けの無料拡張機能です。ホームのShortsをサムネイル内で見続けたり、プレビューの音量や再生位置を調整したりできます。全機能が無料で、寄付は任意です。

[English / 한국어](https://github.com/orockandgto-glitch/shorts-in-place-preview) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md)

## v0.6.2 の変更

YouTubeの構造変更で停止したホームShortsプレビューを復旧しました。ホームの通常動画にも現在時間・合計時間付きのシークバーと個別設定を追加しました。3秒間の操作なしで非表示、移動時に再表示する動作は維持します。Edgeで確認済みで、Chromeの新バージョンは追加確認が必要です。

## できること

- 音量はクリックとドラッグの両方に対応します。3秒間マウスを動かさないと操作部だけが隠れ、動かすと再表示します。再生と音声状態は維持します。ホームShortsにも現在・合計時間付きのシークバーを追加し、ドラッグを離した時に移動します。設定で個別に無効化できます。

- ホームのShortsサムネイルに約0.4秒カーソルを置くと、同じ場所・サイズで動画を再生します。カーソルを外すと停止し、サムネイルに戻ります。同時に複数のShortsを再生しません。
- 新しいプレビューはミュートで開始します。左上の小さな音量コントロールで、必要なときに音を出せます。
- 動画視聴ページの関連動画プレビューでは、音量と現在時間・合計時間付きのシークバーを使えます。プレビューの音を出すとメイン動画を一時的にミュートし、カーソルを外すと元の音声状態に戻します。メイン動画の再生自体は続きます。
- Shorts視聴画面のタイトル・チャンネル情報を自動で隠すオプションがあります。動画にカーソルを置くと表示され、外すと隠れます。
- 各機能のオン・オフ、ホバー待ち時間、音量を設定できます。通常のホーム動画にはYouTube本来のプレビューを使い、クリック時の通常のページ移動も維持します。

## 公式ストアからインストール（2026-10-29）

[Chrome ウェブストア](https://chromewebstore.google.com/detail/preview-shorts-controls-f/lcmohagmlkmnnpefcnbocfmpnaahpbik) · [Microsoft Edge アドオン](https://microsoftedge.microsoft.com/addons/detail/preview-shorts-controls/ifiankpahnbcolbcfaohlfapbplghgdk)

ブラウザーに合ったストアで追加し、YouTubeを再読み込みしてください。デベロッパーモードやZIPの展開は不要です。手動版から切り替える場合は、古いコピーを無効にして重複を避けてください。各ストアのバージョンは掲載ページで確認できます。ストア版は各ストア経由で更新されます。

## 手動インストール（v0.6.2）

1. [インストール用ZIP](https://github.com/orockandgto-glitch/shorts-in-place-preview/raw/main/Preview-Shorts-Controls-0.6.2.zip)をダウンロードして、移動・削除しないフォルダーに展開します。
2. Chromeは `chrome://extensions`、Edgeは `edge://extensions` を開き、デベロッパーモードを有効にします。
3. 「パッケージ化されていない拡張機能を読み込む」を選び、`manifest.json` が直接入っているフォルダーを指定します。
4. 古い個別版（Shorts In-place Preview / Preview Volume Control / Shorts Clear View）がある場合は無効にして、重複実行を避けます。
5. YouTubeを再読み込みします。拡張機能のツールバーアイコンから設定・使用説明を開けます。

GitHubの「Source code」ZIPを使う場合は、リポジトリ最上位ではなく `extension` フォルダーを指定してください。手動インストールはGitHubから自動更新されません。新しいZIPを同じインストール先に反映して拡張機能とYouTubeを再読み込みします。

[実際のEdge画面とインストール手順の19秒動画](https://x.com/LengedTools/status/2110974712088273407)：実際のShortsプレビュー録画と、文字によるインストール案内を含みます。インストール画面そのものの録画ではありません。

## 対応状況と注意点

PC版Edgeで実際に使用し、Chromeは2026年10月15日に作者が手動テストして全機能の動作を確認しました。Firefox・Safariはこのパッケージでは未対応です。Whaleは未検証です。スマートフォン版YouTubeには対応しません。

YouTube内部のプレーヤーとページ構造に依存します。YouTubeの変更や他の拡張機能によって動作しなくなることがあります。広告ブロッカーではありません。広告表示は確認していますが、広告・ライブ・制限付きコンテンツを網羅的には検証していません。プレビューがYouTubeの再生履歴やおすすめに影響する可能性があります。Chrome・Edge公式ストアで公開されています。上のリンクからインストールできます。

## フィードバック・プライバシー

[初回利用の感想](https://github.com/orockandgto-glitch/shorts-in-place-preview/issues/1)では、インストールで困った場所やコントロールの大きさを教えてください。日本語でも構いません。再現可能な不具合は別の[Issue](https://github.com/orockandgto-glitch/shorts-in-place-preview/issues)に、ブラウザー・拡張機能のバージョンと再現手順を記載してください。Issueは公開されるので、個人情報や非公開の履歴は含めないでください。

開発者のサーバー・利用解析・再生履歴のアップロードは含まれません。設定は端末内に保存されます。YouTube自身の通信・データ処理は別です。[プライバシーポリシー](https://github.com/orockandgto-glitch/shorts-in-place-preview/blob/main/PRIVACY.md)

[任意の開発支援](https://buymeacoffee.com/lenged)。寄付による機能制限の解除はなく、寄付は将来の更新を保証するものではありません。ソースは確認用に公開していますが、再利用・再配布のためのオープンソースライセンスは未選択です。

YouTube・Google・Microsoftとは提携していない独立したプロジェクトです。日本語案内の作成・翻訳にはAIを使用しています。


v0.6.0の変更は2026年10月18日にEdgeで動作確認しました。Chromeでの確認はv0.5.2時点で、新しい操作変更は追加テストが必要です。

