# Preview more. Click less.

By Lenged · v0.5.2 · October 16, 2026

YouTube browsing often starts with a thumbnail. I wanted to watch more before deciding what to open, and to control the sound and playback position of a recommendation without leaving the video already playing. That became **Preview & Shorts Controls for YouTube**, a free desktop extension for Chrome and Edge.

![Feature illustration, not a screen recording](media/launch-en-1280x640.png)

## Three things to try

1. **Stay on the homepage.** Hold the pointer over a Shorts thumbnail for about 0.4 seconds. The actual Short plays inside that area while you keep hovering. Move away to restore the thumbnail. Click normally to open the Short.
2. **Listen only when you choose.** Each new preview starts muted. Use the top-left speaker control or volume slider to hear it. On a watch-page recommendation, enabling preview sound temporarily mutes the main video. Leaving the thumbnail restores its previous audio state; the main video keeps playing throughout.
3. **Find the useful moment.** Related-video previews have a compact bottom seek bar and current/total time. Move the slider to preview another moment. Seeking needs a known, finite duration; live and restricted videos are not comprehensively tested.

An optional setting hides the title and channel information on a Shorts viewing page when the pointer is outside the video. Move the pointer into the video, or focus the metadata with the keyboard, to show it again. Individual features can be switched off from the extension's toolbar icon.

## Install the current release

[Download the installable v0.5.2 ZIP](https://github.com/orockandgto-glitch/shorts-in-place-preview/raw/main/Preview-Shorts-Controls-0.5.2.zip), extract it into a permanent folder, and open `chrome://extensions` or `edge://extensions`. Enable **Developer mode**, choose **Load unpacked**, and select the folder directly containing `manifest.json`. Refresh YouTube.

If you previously installed the separate Shorts, volume or Clear View extensions from this project, disable those older copies to avoid duplicate controls. The toolbar icon opens the integrated settings.

GitHub installations require manual updates. Download the new extension ZIP, update the installation folder, reload the extension, and refresh YouTube. This GitHub download is not a Chrome Web Store listing or evidence of store approval.

## Free, with optional support

Every feature is free. [Buying Lenged a coffee](https://buymeacoffee.com/lenged) is optional and does not unlock features or guarantee future updates. [Bug reports](https://github.com/orockandgto-glitch/shorts-in-place-preview/issues) are useful too: include the browser version, page type and a clear description. Remove private information from screenshots.

The package has been used in Edge, and the author manually tested the Chrome features on October 15, 2026. It depends on YouTube's page and player structure, so site changes can break it. It is not an ad blocker; ads have been observed in previews. Preview playback may affect YouTube history and recommendations. See the [privacy explanation](PRIVACY.md). Source is published for inspection; no open-source reuse license has been selected.

[Project home](README.md) · [Release](https://github.com/orockandgto-glitch/shorts-in-place-preview/releases/tag/v0.5.2) · [Official X account](https://x.com/LengedTools)

Independent project. Not affiliated with YouTube, Google or Microsoft.

## 한국어 사용 안내

클릭하기 전에 영상을 조금 더 보고 싶어서 만든 무료 확장입니다. 홈 Shorts 썸네일에 약 0.4초 마우스를 올리면 같은 자리에서 실제 영상이 계속 재생되고, 커서를 빼면 썸네일로 돌아옵니다. 클릭하면 기존처럼 Shorts 페이지로 이동합니다.

새 미리보기는 항상 무음으로 시작합니다. 좌측 상단에서 소리와 음량을 조절하세요. 영상 시청 중 우측 추천 미리보기의 소리를 켜면 본영상은 잠시 음소거되고, 커서를 빼면 이전 소리 상태로 복원됩니다. 하단의 현재·전체 시간과 탐색 바로 원하는 구간도 살펴볼 수 있습니다.

Shorts 시청 화면의 제목·채널 자동 숨김은 옵션입니다. 커서가 영상 안으로 들어오거나 정보에 키보드 초점이 있으면 다시 표시됩니다. 확장 아이콘에서 각 기능을 켜고 끌 수 있습니다.

위 ZIP을 내려받아 고정된 폴더에 압축을 풀고, `chrome://extensions` 또는 `edge://extensions`에서 **개발자 모드 → 압축 해제된 확장 로드**를 선택하세요. `manifest.json`이 바로 들어 있는 폴더를 지정한 뒤 YouTube를 새로고침하면 됩니다. 이전에 설치한 같은 프로젝트의 개별 확장은 꺼주세요. GitHub 수동 설치는 자동 업데이트되지 않습니다.

모든 기능은 무료이며 [후원](https://buymeacoffee.com/lenged)은 선택입니다. YouTube 구조 변경으로 오류가 생길 수 있으며 광고 차단 도구가 아닙니다. 미리보기 재생이 YouTube 시청 기록·추천에 영향을 줄 수 있습니다. Firefox·Safari는 이 패키지로 지원하지 않습니다.
