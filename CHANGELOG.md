# Changelog

## 0.6.0 — 2026-10-18

- Fixed volume dragging on home video, Shorts and related-video previews using pointer capture and explicit drag tracking. Drag boundary events no longer revoke audio consent; releasing outside ends the preview.
- Prevented the trailing drag click from opening the video; ordinary card clicks still work.
- Added 3-second idle hiding and movement-based reveal for preview controls, preserving playback and sound. Controls stay visible while dragging or using keyboard focus.
- Added home Shorts seeking with current/total time and an independent setting. Seek commits on release, avoiding repeated buffering while dragging. Finite duration required.
- Kept related-preview controls at 14px and retained the main video's prior audio-state restoration. No additional permissions or developer telemetry.
- Checked controller/media regression tests and JS syntax. Author/user confirmed actual Edge behavior; agent observed a 52-second Shorts preview continuing while both controls were hidden. Chrome 0.6.0 needs a separate retest.


## 0.5.2

- Published name: Preview & Shorts Controls for YouTube.
- Integrated home Shorts and recommendation previews, preview audio controls and Shorts information auto-hide.
- Added watch-page recommendation seeking with current/total time and temporary main-video muting while preview sound is enabled.
- Retained preview audio choice through seek buffering; committed drag seeking on release to avoid repeated seek requests.
- Reduced watch-preview controls to 14px each; kept home controls unchanged.
- Added per-feature options and local preferences; five-language settings/help UI.
- Actual Edge use confirmed by the developer/user. Other browsers remain unverified.
