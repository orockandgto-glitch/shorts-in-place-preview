# Privacy policy — Preview & Shorts Controls for YouTube

Prepared: October 14, 2026  
Developer: Lenged  
Scope: integrated version 0.5.2

## Processing in your browser

The extension reads YouTube card structure, thumbnail links, video IDs, hover events, and playback/visibility state on https://www.youtube.com/ to implement previews. It adds temporary elements, state attributes and display styles to the current page. Operational state stays in the browser document and memory and is cleaned up when playback stops, navigation occurs or the document closes. It does not create a viewing-history database or store card data on a developer server.

## Local preferences

Feature switches, hover delay and preview volume are saved in chrome.storage.local on the device. They are not transmitted to the developer and are not synced by this extension. Uninstalling the extension removes its extension storage. The Shorts information feature changes page-local metadata visibility and does not collect channel names or titles for developer use.

## Information the developer does not collect

The extension contains no developer backend, telemetry, advertising tracker or usage-analytics upload. It does not send passwords, account credentials, payment details or viewing history to the developer. The developer does not sell extension usage data or use it for advertising.

## YouTube playback requests

Previews use the native player already provided by the current YouTube page. That player may send playback and media requests to YouTube and related video servers. YouTube/Google policies and settings govern accounts, cookies, viewing history, recommendations, view counts and engagement measurements. Previews are not guaranteed to leave those records unchanged. No developer telemetry does not mean that YouTube performs no data processing.

## Permissions

YouTube site access supports page-local card and player functionality. The scripting permission inserts a fixed, packaged CSS file into the sending YouTube document when a conflicting style hides an actively playing native home-page preview. The storage permission saves local preferences. The extension does not read other websites.

## Optional external developer support

If a support link is configured, selecting it opens an external support page. The extension contains no payment form or payment SDK and attaches no video ID or viewing history to that link. The external provider may process visits, payments and support messages under its own policies. Supporter display names, contact details, messages and transaction records made available to the developer through that provider depend on its policies and settings, separate from extension telemetry. Support is optional; every feature remains free.

## Contact and updates

For privacy enquiries, use [GitHub Issues](https://github.com/orockandgto-glitch/shorts-in-place-preview/issues). Issues are public: do not include private account, payment or browsing information. Private enquiries can first request a private contact route without including sensitive details. Policy changes will be reflected in this document and its date. Disabling or uninstalling the extension stops its future page-local operation.

Developer support is provided through [Buy Me a Coffee](https://buymeacoffee.com/lenged). You can review its [privacy policy](https://buymeacoffee.com/privacy-policy) before visiting or paying. This policy is hosted on GitHub, which processes site access and submitted issue content under its own [privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).


---

# 개인정보처리방침 — Preview & Shorts Controls for YouTube

작성일: 2026년 10월 13일  
개발자: Lenged  
적용 대상: 0.3.0 등록 준비 빌드

## 브라우저 내 처리

확장은 https://www.youtube.com/ 페이지에서 Shorts·추천 카드의 DOM 구조, 썸네일 링크, 영상 ID, 마우스 진입·이탈, 재생·표시 상태를 읽어 미리보기를 구현합니다. 현재 페이지에 임시 요소와 상태 속성을 추가하고 필요한 표시 스타일을 적용합니다. 처리 상태는 브라우저 문서와 메모리에 유지되며, 미리보기 종료·페이지 이동·문서 종료 때 정리됩니다. 확장은 시청 기록 데이터베이스를 만들거나 카드 데이터를 개발자 서버에 저장하지 않습니다.

## 개발자가 수집하지 않는 정보

이 확장에는 개발자 서버, 원격 분석, 광고 추적, 사용 통계 전송 기능이 없습니다. 확장을 통해 비밀번호·계정 자격 증명·결제 정보·시청 기록을 개발자에게 보내지 않습니다. 개발자가 확장 사용 데이터를 판매하거나 광고에 이용하지 않습니다.

## YouTube 재생 요청

미리보기는 현재 YouTube 페이지의 native 플레이어를 사용합니다. 플레이어가 YouTube 및 관련 영상 서버에 재생·미디어 요청을 보낼 수 있습니다. 로그인 상태·쿠키·시청 기록·추천·조회 및 참여 측정에 대한 처리는 YouTube/Google의 정책과 설정에 따릅니다. 미리보기가 이러한 기록에 영향을 주지 않는다고 보장하지 않습니다. 개발자에게 데이터를 보내지 않는다는 설명은 YouTube가 데이터를 처리하지 않는다는 뜻이 아닙니다.

## 권한

YouTube 사이트 접근 권한은 카드와 플레이어의 페이지 내 동작에 사용합니다. scripting 권한은 재생 중인 기존 홈 미리보기의 영상이 스타일 충돌로 숨겨진 경우, 패키지에 포함된 고정 CSS를 해당 YouTube 문서에 삽입하기 위해 사용합니다. 다른 사이트의 내용을 읽는 기능은 없습니다.

## 선택적 외부 후원

후원 링크가 설정된 경우 사용자가 직접 누르면 외부 후원 페이지로 이동합니다. 확장에는 결제 양식이나 결제 SDK가 없으며, 영상 ID·시청 이력은 후원 링크에 첨부하지 않습니다. 외부 사이트는 방문·결제·후원 메시지 등을 자체 정책에 따라 처리할 수 있습니다. 후원 과정에서 개발자에게 전달되는 후원자 표시명·연락처·메시지·거래 내역은 해당 서비스의 설정과 정책에 따르며 확장 사용 원격 분석과 별개입니다. 후원하지 않아도 모든 기능을 이용할 수 있습니다.

## 문의와 변경

개인정보 관련 문의는 [GitHub Issues](https://github.com/orockandgto-glitch/shorts-in-place-preview/issues)를 이용해주세요. 문의 내용은 공개되므로 계정·결제·시청 정보 등 비공개 정보를 포함하지 마세요. 비공개 상담이 필요한 경우 민감한 내용 없이 별도의 연락 경로를 요청할 수 있습니다. 정책 변경 시 이 문서의 날짜와 내용을 갱신합니다. 확장을 끄거나 삭제하면 이후의 페이지 내 동작을 중지할 수 있습니다.

개발 후원은 [Buy Me a Coffee](https://buymeacoffee.com/lenged)에서 진행합니다. 방문·결제 전 해당 서비스의 [개인정보 정책](https://buymeacoffee.com/privacy-policy)을 확인할 수 있습니다. 이 정책을 호스팅하는 GitHub는 사이트 접속 및 문의 내용을 자체 [개인정보 정책](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement)에 따라 처리합니다.


## 통합판 0.5.2 추가 안내

기능별 스위치, 미리보기 대기 시간, 음량은 기기의 chrome.storage.local에 저장되며 개발자에게 전송되지 않습니다. 확장을 삭제하면 확장 저장소도 제거됩니다. Shorts 정보 숨김 기능은 현재 페이지의 표시만 변경합니다. 개인정보 외부 수집·전송 기능은 추가하지 않았습니다.


## Recommendation preview controls

Current time, duration, preview audio state, and the main video’s previous mute and volume state are processed temporarily in the current page to implement seeking and audio restoration. The developer receives none of this information. Main audio restoration state is not saved to extension storage.

## 우측 추천 미리보기 제어

재생 위치, 전체 길이, 미리보기 소리 상태 및 본영상의 이전 음소거·음량은 탐색과 소리 복원을 위해 현재 페이지 메모리에서 일시 처리합니다. 개발자에게 전송하지 않으며 본영상 복원 상태는 확장 저장소에 보관하지 않습니다.
