# Preview & Shorts Controls for YouTube v0.6.2

YouTube changed its preview structure; home Shorts playback is restored. Regular homepage videos now have seeking too.

## 0.6.2 — 2026-10-22

- Added seeking with current/total time to regular home-video previews, using YouTube's existing native preview player. Separate Home video preview seek slider option, enabled by default and independent of volume.
- Retained drag-on-release seeking, audio choice and 3-second idle hiding on home videos, Shorts and related previews. Finite duration required.
- Includes the 0.6.1 compatibility fix below. All features remain free; no additional permissions or developer telemetry.
- User confirmed actual Edge Shorts playback and controls after reloading 0.6.1, then confirmed the 0.6.2 home video seek addition. Local controller/media/settings/initialization regression and syntax checks passed. Chrome 0.6.2 awaits a separate retest.

## 0.6.1 — 2026-10-22

- Fixed home Shorts initialization after YouTube changed its signal-rendered preview: ytd-video-preview is no longer registered as a custom element on the observed build.
- When that registration is absent, initialize a private, uniquely identified native ytd-player inside the same thumbnail and reuse YouTube's inline preview context. Preserve the existing CoW/Polymer paths for older builds.
- Mute before loading; preserve inline sizing, full video playback and cleanup on leave, including cancellation during delayed initialization. No iframe, external window or floating player.

## Install / update

Download **Preview-Shorts-Controls-0.6.2.zip**, extract into a permanent folder and load the folder directly containing manifest.json via Developer mode → Load unpacked. Existing GitHub installs: back up the installation folder, replace its contents with the new ZIP, reload the extension, and refresh every open YouTube tab. GitHub installations do not update automatically. Source archives contain an extension subfolder instead. Disable older separate copies.

## 한국어

- YouTube 구조 변경으로 멈췄던 홈 Shorts 미리보기를 복구했습니다. 같은 썸네일에서 YouTube 자체 player를 재사용합니다.
- 홈 일반 영상에도 현재/전체 시간과 구간 조절 바를 추가했습니다. ‘홈 일반 영상 미리보기 재생 위치 슬라이더’ 옵션으로 별도 선택할 수 있습니다.
- 볼륨 드래그, 구간 선택 후 놓을 때 이동, 소리 상태 유지, 3초 정지 시 조절기 숨김과 움직일 때 복원을 유지합니다.
- 기존 설치자는 설치 폴더 백업 → 새 ZIP 내용 반영 → 확장 ↻ → 열려 있는 YouTube 탭 새로고침 순서로 업데이트하세요.

Edge 실제 사용과 로컬 회귀 검사를 마쳤습니다. Chrome의 기존 확인은 0.5.2 기준이며 0.6.2는 추가 검증이 필요합니다. 광고·라이브·제한 콘텐츠를 포괄 검증하지 않았으며 YouTube 변경으로 동작이 달라질 수 있습니다. 광고 차단 기능은 없습니다.

All features are free. [Optional support](https://buymeacoffee.com/lenged) · [Usage guide](https://github.com/orockandgto-glitch/shorts-in-place-preview/blob/main/USER-GUIDE.md) · [Report a bug](https://github.com/orockandgto-glitch/shorts-in-place-preview/issues)
