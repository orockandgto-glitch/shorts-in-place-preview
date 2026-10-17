# Preview & Shorts Controls for YouTube v0.6.0

Smooth volume dragging, controls that get out of the way after three seconds, and seeking inside home Shorts thumbnails. All features remain free; donations are optional.

## 0.6.0 — 2026-10-18

- Fixed volume dragging on home video, Shorts and related-video previews using pointer capture and explicit drag tracking. Drag boundary events no longer revoke audio consent; releasing outside ends the preview.
- Prevented the trailing drag click from opening the video; ordinary card clicks still work.
- Added 3-second idle hiding and movement-based reveal for preview controls, preserving playback and sound. Controls stay visible while dragging or using keyboard focus.
- Added home Shorts seeking with current/total time and an independent setting. Seek commits on release, avoiding repeated buffering while dragging. Finite duration required.
- Kept related-preview controls at 14px and retained the main video's prior audio-state restoration. No additional permissions or developer telemetry.
- Checked controller/media regression tests and JS syntax. Author/user confirmed actual Edge behavior; agent observed a 52-second Shorts preview continuing while both controls were hidden. Chrome 0.6.0 needs a separate retest.


## Install / update

Download **Preview-Shorts-Controls-0.6.0.zip**, extract it, and use Developer mode → Load unpacked in Edge or Chrome. Select the folder directly containing manifest.json. For an existing manual install, back up the folder, replace its contents with the new ZIP contents, reload the extension and refresh YouTube. No automatic GitHub updates.

If downloading GitHub's generated source archive, load its extension subfolder. Disable the older separate preview/volume/Clear View extensions to avoid conflicts. Store approval is not implied.

## 한국어

- 볼륨 드래그 중 음소거되거나 미리보기가 종료되는 문제를 수정했습니다. 일반 클릭 이동은 유지됩니다.
- 커서가 3초간 멈추면 조절기만 숨기고, 다시 움직이면 표시합니다. 영상·소리는 계속 재생하며 드래그·키보드 조작 중에는 숨기지 않습니다.
- 홈 Shorts 하단에도 현재/전체 시간과 구간 조절을 추가했습니다. 드래그를 놓을 때 탐색하며 별도 옵션으로 끌 수 있습니다.
- 기존 설치 폴더 백업 → 새 ZIP 내용 반영 → 확장 ↻ → YouTube 새로고침 순서로 업데이트하세요.

Edge 실제 사용 확인과 로컬 회귀 검사를 마쳤습니다. Chrome은 0.5.2 사용 확인 이력이 있으며, 이번 0.6.0 변경은 추가 검증이 필요합니다. YouTube 구조 변경이나 다른 확장에 의해 영향을 받을 수 있습니다. 광고·라이브·제한 콘텐츠를 모두 검증한 것은 아닙니다. 광고 차단 도구가 아닙니다.

[Instructions](https://github.com/orockandgto-glitch/shorts-in-place-preview#readme) · [Report a bug](https://github.com/orockandgto-glitch/shorts-in-place-preview/issues) · [Optional support](https://buymeacoffee.com/lenged)
