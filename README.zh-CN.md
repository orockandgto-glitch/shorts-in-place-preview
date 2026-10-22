# Preview & Shorts Controls for YouTube — 简体中文指南

我是开发者Lenged。这是一款面向电脑端Chrome和Microsoft Edge的免费扩展：在原缩略图内持续预览Shorts，并控制预览音量和相关推荐的播放位置。所有功能免费，赞助完全自愿。

[English / 한국어](https://github.com/orockandgto-glitch/shorts-in-place-preview) · [日本語](README.ja.md) · [繁體中文](README.zh-TW.md)

## v0.6.2 更新

修复YouTube结构变化导致的首页Shorts预览失效。首页普通视频也新增当前/总时长、进度条及独立设置。保留静止3秒隐藏、移动显示控件的行为。已在Edge确认，新版本Chrome仍待单独复测。

## 主要功能

- 音量支持点击和拖动。鼠标静止3秒后只隐藏控件，移动时重新显示，播放和声音状态继续保留。首页Shorts新增当前/总时长和进度条，松开拖动后跳转，可在设置中单独关闭。

- 鼠标停留在首页Shorts缩略图上约0.4秒后，在原位置、原尺寸播放实际视频。移开鼠标后停止播放并恢复缩略图；不会同时播放多个Shorts。
- 每个新预览都以静音开始。需要声音时，使用左上角的小型音量控件。
- 观看普通视频时，右侧相关推荐预览支持音量调节，以及带当前时间/总时长的进度条。开启预览声音时暂时静音主视频；移开鼠标后恢复主视频之前的声音状态，主视频本身继续播放。
- 可选的Shorts标题/频道信息自动隐藏：鼠标进入视频时显示，离开时隐藏。
- 在扩展设置中分别开关功能、调整悬停延迟及音量。普通首页视频保留YouTube原生预览，点击卡片仍正常进入视频页面。

## 手动安装v0.6.2

1. 下载[安装ZIP](https://github.com/orockandgto-glitch/shorts-in-place-preview/raw/main/Preview-Shorts-Controls-0.6.2.zip)，解压到固定文件夹。
2. Chrome打开 `chrome://extensions`；Edge打开 `edge://extensions`，启用“开发者模式”。
3. 点击“加载已解压的扩展程序”，选择直接包含 `manifest.json` 的文件夹。
4. 若安装过旧的独立版本（Shorts In-place Preview、Preview Volume Control、Shorts Clear View），先停用，避免重复运行。
5. 刷新YouTube。点击扩展工具栏图标即可打开设置和说明。

如果下载的是GitHub自动生成的“Source code”压缩包，请选择其中的 `extension` 文件夹，而非仓库根目录。手动安装不会从GitHub自动更新；新版本需解压到安装位置，再重新加载扩展并刷新YouTube。

[19秒实际Edge演示及安装说明](https://x.com/LengedTools/status/2110974712088273407)：前段包含真实Shorts预览画面，安装部分是文字说明，并非安装过程录像。

## 支持范围

Edge电脑端已实际使用；作者于2026年10月15日在Chrome中手动测试并报告全部功能正常。当前安装包不支持Firefox、Safari或手机端YouTube；Whale尚未验证。需要能正常访问YouTube电脑网页版的环境。

扩展依赖YouTube内部播放器及页面结构，网站更新或其他扩展可能影响兼容性。它不是广告拦截工具。曾观察到预览中的广告，但没有全面验证广告、直播和受限内容。预览可能影响YouTube观看记录与推荐。尚未确认商店公开审核通过，当前提供GitHub手动安装。

## 反馈与隐私

欢迎在[首次使用反馈](https://github.com/orockandgto-glitch/shorts-in-place-preview/issues/1)中用中文告诉我：安装哪里不清楚？音量和进度控件在你的显示器上是否方便？可复现的错误请另建[Issue](https://github.com/orockandgto-glitch/shorts-in-place-preview/issues)，注明浏览器、扩展版本及复现步骤。Issue公开可见，请勿上传账户资料、私人观看记录或未打码截图。

扩展没有开发者后端、使用分析或观看记录上传功能，偏好设置保存在设备本地。YouTube仍按自身规则处理播放请求与数据。详见[隐私政策](https://github.com/orockandgto-glitch/shorts-in-place-preview/blob/main/PRIVACY.md)。

[自愿支持开发](https://buymeacoffee.com/lenged)。赞助不解锁额外功能，也不保证持续更新。源码供检查，目前未选定允许再利用、再分发的开源许可证。

本项目独立开发，与YouTube、Google、Microsoft无隶属或背书关系。中文说明使用了AI辅助翻译与编辑。


v0.6.0改动已于2026年10月18日在Edge确认。Chrome此前测试的是v0.5.2，新交互仍待单独复测。
