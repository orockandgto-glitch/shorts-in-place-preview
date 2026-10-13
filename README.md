# Shorts In-place Preview

Free Microsoft Edge extension by **Lenged**, currently being prepared for public release.

Hover over a YouTube home Shorts card or a recommendation on a watch page to play the video, muted, inside its existing thumbnail. Moving the pointer away restores the thumbnail. Clicking a card opens its normal YouTube page.

## Features

- Approximately 375 ms hover delay.
- Playback stays within the thumbnail area; no separate playback windows or floating players.
- One preview at a time, with cleanup when you leave a card or navigate.
- Full video playback rather than a short animated thumbnail, when supported by YouTube's native player.
- Regular home video cards keep YouTube's own preview. A compatibility fix restores video visibility when conflicting styles hide that preview.

## Release status

The personal development build has been tested in Microsoft Edge. The public release candidate is still undergoing packaging and compatibility checks. There is no published Edge Add-ons listing or public download yet.

## Feedback

Please use this repository's [Issues](https://github.com/orockandgto-glitch/shorts-in-place-preview/issues) for bug reports and privacy questions. Korean and English are welcome.

Include your Edge version, the affected page type (home or watch), expected behavior, actual behavior, and steps to reproduce. Do not post passwords, account identifiers, browsing history, payment details, or screenshots containing private information.

## Free use and optional support

All features are free regardless of whether you donate. An optional developer support page is being prepared. Support does not purchase extra features or guarantee ongoing updates.

## Compatibility and privacy

The extension depends on YouTube's internal native player implementation, which may change without notice. Ad playback, age-restricted videos, and regional restrictions have not yet been fully tested. YouTube playback may affect watch history or recommendations according to your account settings.

The extension has no developer analytics or developer server. It processes thumbnail links, video IDs, pointer events, and playback state within the current browser page. YouTube still handles its own playback requests and data. A detailed privacy policy will be published before the store release.

This project is independent and is not affiliated with YouTube, Google, or Microsoft.

---

## 한국어 안내

Lenged가 개발하는 무료 Edge 확장프로그램입니다. 홈 Shorts 또는 시청 페이지 추천 썸네일에 마우스를 약 0.4초 올리면 해당 썸네일 안에서 영상이 무음 재생됩니다. 마우스를 떼면 썸네일로 돌아가며, 클릭은 기존 영상 페이지로 이동합니다.

현재 공개 배포를 준비 중이며 아직 스토어에 출시하지 않았습니다. 오류 및 개인정보 관련 문의는 위 Issues에서 접수합니다. 모든 기능은 후원 여부와 관계없이 무료입니다. YouTube 내부 구조 변경으로 작동이 중단될 수 있고, 미리보기 재생이 시청 기록이나 추천에 영향을 줄 수 있습니다.
