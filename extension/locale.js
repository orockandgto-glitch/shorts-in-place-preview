export const languages={ko:'한국어',en:'English',ja:'日本語','zh-CN':'简体中文','zh-TW':'繁體中文'};
export function languageFromCode(code){const value=String(code||'').toLowerCase().replaceAll('_','-');if(value.startsWith('ko'))return 'ko';if(value.startsWith('ja'))return 'ja';if(value.startsWith('zh'))return /(?:^|-)(?:tw|hk|mo|hant)(?:-|$)/.test(value)?'zh-TW':'zh-CN';return 'en';}
export function selectedLanguage(){const requested=new URL(location.href).searchParams.get('lang');return Object.hasOwn(languages,requested)?requested:languageFromCode(navigator.language);}
export function element(tag,text,className){const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(className)node.className=className;return node;}
export function safeLink(value){try{const url=new URL(value);return url.protocol==='https:'&&!url.username&&!url.password?url.href:null;}catch{return null;}}
export function languageSelector(language,onChange){const label=element('label',messages[language].language,'language-picker'),select=element('select');select.id='language';select.setAttribute('aria-label',messages[language].language);for(const [value,name]of Object.entries(languages)){const option=element('option',name);option.value=value;select.append(option);}select.value=language;select.addEventListener('change',()=>{const next=select.value,url=new URL(location.href);url.searchParams.set('lang',next);history.replaceState(null,'',url);onChange(next);});label.append(select);return label;}
export const messages={
  "ko": {
    "language": "언어",
    "free": "무료 Edge 확장프로그램",
    "headline": "미리보기와 소리를\n내가 원하는 대로.",
    "intro": "홈 Shorts와 우측 추천 영상을 썸네일 안에서 계속 재생하고, 미리보기 소리와 재생 위치를 조절하세요. Shorts 시청 화면의 제목·채널 정보도 필요할 때만 표시할 수 있습니다.",
    "usage": "사용 방법",
    "steps": [
      "썸네일에 마우스를 올리면 무음으로 미리보기가 시작됩니다.",
      "좌측 상단에서 소리와 음량을 조절하세요. 우측 추천의 하단 슬라이더로 재생 위치를 고를 수 있고, 소리를 켜면 본영상이 잠시 음소거됩니다.",
      "커서를 빼면 미리보기가 종료되고 본영상 소리는 이전 상태로 돌아갑니다. 카드 클릭은 정상 이동하며, Shorts 시청 정보는 영상 안에 커서를 두면 표시됩니다."
    ],
    "native": "기능별 사용 여부, 시작 대기 시간과 음량은 위 설정에서 선택하세요. 일반 홈 영상은 YouTube의 기존 미리보기를 사용합니다. 영상 표시 보정은 기본 적용됩니다.",
    "donateTitle": "개발에 커피 한 잔 ☕",
    "donate": "모든 기능은 무료입니다. 선택적인 개발 후원은 호환성 개선에 도움이 됩니다. 후원은 기능 구매나 지속적인 서비스 제공을 보장하는 결제가 아닙니다.",
    "donateButton": "Lenged 후원하기",
    "payment": "결제는 외부 후원 서비스에서 진행됩니다. 해당 서비스의 수수료·환불·개인정보 정책을 확인하세요.",
    "compatibilityTitle": "호환성 안내",
    "compatibility": "YouTube 내부 플레이어에 의존하므로 사이트 변경으로 작동이 중단될 수 있습니다. 광고·연령 제한·지역 제한 콘텐츠는 충분히 검증되지 않았습니다. 미리보기는 시청 기록과 추천에 영향을 줄 수 있습니다.",
    "independent": "YouTube, Google 또는 Microsoft의 공식 제품이 아닙니다.",
    "privacyTitle": "개인정보 안내",
    "contact": "개발자 문의",
    "footer": "무료 / 선택적 개발 후원",
    "back": "안내",
    "publicPolicy": "개인정보처리방침 원문 (English / 한국어)",
    "policyIntro": "아래는 개인정보처리방침의 요약입니다. 자세한 내용은 하단의 공개 정책 원문을 확인하세요.",
    "policy": [
      [
        "브라우저 내 처리",
        "카드 구조, 링크, 영상 ID, 마우스 진입·이탈과 재생 상태를 현재 문서와 메모리에서 처리합니다. 임시 요소와 상태는 재생 종료·이동·문서 종료 시 정리합니다. 개발자 서버나 시청 기록 데이터베이스에 저장하지 않습니다."
      ],
      [
        "개발자 데이터 수집",
        "개발자 서버, 분석, 광고 추적, 사용 통계 전송이 없습니다. 비밀번호·자격 증명·결제 정보·시청 기록을 개발자에게 전송하지 않으며 확장 사용 데이터를 판매하거나 광고에 이용하지 않습니다."
      ],
      [
        "YouTube와 권한",
        "YouTube 플레이어의 재생 요청과 계정·쿠키·시청 기록·추천·조회·참여 처리는 YouTube/Google 정책을 따릅니다. YouTube 접근은 카드·플레이어 동작에, scripting은 고정 로컬 CSS로 숨겨진 기존 미리보기를 복구하는 데 사용합니다. 다른 사이트는 읽지 않습니다."
      ],
      [
        "후원과 문의",
        "후원 링크는 직접 누르면 Buy Me a Coffee로 이동합니다. 결제 SDK가 없고 영상 ID·시청 이력을 링크에 첨부하지 않습니다. 외부 서비스는 방문·결제·표시명·연락처·메시지·거래 정보를 처리하고 개발자에게 제공할 수 있습니다. 문의는 GitHub Issues에 공개되므로 민감한 정보를 포함하지 마세요. 비공개 상담은 연락 경로를 먼저 요청하세요. 외부 서비스의 정책이 적용됩니다. 확장을 끄거나 삭제하면 이후 동작을 중지할 수 있으며 정책 변경 시 날짜와 내용을 갱신합니다."
      ]
    ]
  },
  "en": {
    "language": "Language",
    "free": "Free Edge extension",
    "headline": "Control your previews.\nKeep Shorts clear.",
    "intro": "Play home Shorts and watch-page recommendations inside their thumbnails, adjust preview sound and seek through recommendations. Show Shorts titles and channel information only when needed.",
    "usage": "How to use",
    "steps": [
      "Hover over a thumbnail to start a muted preview.",
      "Use the top-left sound and volume controls. Seek with the bottom slider on recommendations; enabling preview sound temporarily mutes the main video.",
      "Leaving ends the preview and restores the main video’s previous audio state. Clicking opens the normal video page. On Shorts pages, information appears while the pointer is over the video."
    ],
    "native": "Choose individual features, hover delay and volume in the settings above. Regular home videos use YouTube’s original preview. Video visibility repair is applied automatically.",
    "donateTitle": "Buy the developer a coffee ☕",
    "donate": "Every feature is free. Optional support helps improve compatibility. Support does not buy extra features or guarantee ongoing service.",
    "donateButton": "Support Lenged",
    "payment": "Payments take place on an external support service. Review its fees, refund terms and privacy policy.",
    "compatibilityTitle": "Compatibility",
    "compatibility": "This extension depends on YouTube’s internal player and may stop working after site changes. Ads, age-restricted and region-restricted content have not been comprehensively tested. Previews may affect watch history and recommendations.",
    "independent": "Not an official product of YouTube, Google or Microsoft.",
    "privacyTitle": "Privacy information",
    "contact": "Contact the developer",
    "footer": "Free / optional developer support",
    "back": "Help",
    "publicPolicy": "Full privacy policy (English / 한국어)",
    "policyIntro": "This is a summary of the privacy policy. Follow the public policy link below for the complete policy.",
    "policy": [
      [
        "Processing in your browser",
        "Card structure, links, video IDs, hover events and playback state are processed in the current document and memory. Temporary elements and state are cleaned up when previews stop, navigation occurs or the document closes. No developer server or viewing-history database stores this data."
      ],
      [
        "Developer data collection",
        "No developer backend, analytics, advertising tracker or usage-statistics upload is included. Passwords, credentials, payment details and viewing history are not sent to the developer. Extension usage data is not sold or used for advertising."
      ],
      [
        "YouTube and permissions",
        "YouTube playback requests and account, cookie, history, recommendation, view and engagement processing follow YouTube/Google policies. YouTube access supports card/player operation; scripting inserts fixed local CSS to restore a hidden native preview. Other websites are not read."
      ],
      [
        "Support and contact",
        "Following the support link opens Buy Me a Coffee. No payment SDK is included and no video IDs or viewing history are attached to links. The external provider processes visits, payments, names, contact details, messages and transaction records and may share them with the developer. GitHub Issues are public: do not include sensitive details. Request a private contact route first if needed. External providers’ policies apply. Disable or uninstall to stop future operation; policy changes update its date and content."
      ]
    ]
  },
  "ja": {
    "language": "言語",
    "free": "無料の Edge 拡張機能",
    "headline": "プレビューと音量を調節。\nShorts を見やすく。",
    "intro": "ホームの Shorts と視聴ページのおすすめ動画をサムネイル内で再生し、音量やおすすめ動画の再生位置を調節できます。Shorts のタイトルとチャンネル情報は必要なときに表示できます。",
    "usage": "使い方",
    "steps": [
      "サムネイルにマウスを合わせるとミュートでプレビューが始まります。",
      "左上で音声と音量を調節します。おすすめ動画の下部スライダーで再生位置を選べます。音声を有効にすると本編が一時ミュートされます。",
      "マウスを離すとプレビューが終了し、本編の音声状態が元に戻ります。クリックすると通常の動画ページへ移動します。Shorts の情報は動画にマウスを合わせると表示されます。"
    ],
    "native": "上の設定で各機能、待機時間、音量を選択できます。ホームの通常動画は YouTube 本来のプレビューを使用します。動画の表示補正は自動で適用されます。",
    "donateTitle": "開発者にコーヒーを一杯 ☕",
    "donate": "すべての機能は無料です。任意の支援は互換性の改善に役立ちます。支援によって追加機能を購入したり、継続的なサービス提供が保証されたりすることはありません。",
    "donateButton": "Lenged を支援する",
    "payment": "決済は外部の支援サービスで行われます。手数料、返金条件、プライバシーポリシーをご確認ください。",
    "compatibilityTitle": "互換性について",
    "compatibility": "YouTube の内部プレーヤーに依存するため、サイトの変更で動作しなくなる可能性があります。広告、年齢制限、地域制限のあるコンテンツは十分に検証されていません。プレビューが視聴履歴やおすすめに影響する場合があります。",
    "independent": "YouTube、Google、Microsoft の公式製品ではありません。",
    "privacyTitle": "プライバシーについて",
    "contact": "開発者へのお問い合わせ",
    "footer": "無料 / 任意の開発支援",
    "back": "使い方",
    "publicPolicy": "プライバシーポリシー全文（英語 / 韓国語）",
    "policyIntro": "以下はプライバシーポリシーの要約です。全文は下の公開ポリシーリンクからご確認ください。",
    "policy": [
      [
        "ブラウザー内の処理",
        "カード構造、リンク、動画 ID、マウスの出入り、再生状態を現在の文書とメモリー内で処理します。一時的な要素や状態は再生終了、移動、文書終了時に削除します。開発者サーバーや視聴履歴データベースには保存しません。"
      ],
      [
        "開発者によるデータ収集",
        "開発者サーバー、分析、広告追跡、利用統計の送信はありません。パスワード、認証情報、決済情報、視聴履歴を開発者に送信せず、利用データを販売したり広告に使用したりしません。"
      ],
      [
        "YouTube と権限",
        "YouTube の再生リクエストやアカウント、Cookie、履歴、おすすめ、再生数、エンゲージメントの処理は YouTube/Google のポリシーに従います。YouTube へのアクセスはカードとプレーヤーに、scripting は隠れた標準プレビューを復元する固定ローカル CSS に使います。他サイトは読み取りません。"
      ],
      [
        "支援とお問い合わせ",
        "支援リンクを押すと Buy Me a Coffee が開きます。決済 SDK はなく、動画 ID や視聴履歴をリンクに付加しません。外部サービスは訪問、決済、表示名、連絡先、メッセージ、取引情報を処理し、開発者に提供する場合があります。GitHub Issues は公開されるため機密情報を含めないでください。非公開の相談には先に連絡手段をお問い合わせください。外部サービスのポリシーが適用されます。無効化または削除するとその後の動作を停止でき、ポリシー変更時は日付と内容を更新します。"
      ]
    ]
  },
  "zh-CN": {
    "language": "语言",
    "free": "免费 Edge 扩展",
    "headline": "控制预览和音量。\n清晰观看 Shorts。",
    "intro": "在缩略图内持续播放首页 Shorts 和观看页推荐视频，调节预览声音并选择推荐视频的播放位置。Shorts 标题和频道信息可按需显示。",
    "usage": "使用方法",
    "steps": [
      "鼠标悬停缩略图时，预览以静音开始。",
      "使用左上角控件调节声音和音量。推荐预览下方的进度条可选择播放位置；开启预览声音会暂时静音主视频。",
      "鼠标移出后结束预览并恢复主视频之前的声音状态。点击仍正常打开视频页面。Shorts 信息在鼠标位于视频内时显示。"
    ],
    "native": "在上方设置中选择各项功能、悬停等待时间和音量。首页普通视频使用 YouTube 原有预览。视频显示修复自动应用。",
    "donateTitle": "请开发者喝杯咖啡 ☕",
    "donate": "所有功能均免费。自愿支持有助于改善兼容性。支持不会解锁额外功能，也不保证持续提供服务。",
    "donateButton": "支持 Lenged",
    "payment": "付款在外部支持平台进行。请查看该平台的费用、退款条款和隐私政策。",
    "compatibilityTitle": "兼容性说明",
    "compatibility": "本扩展依赖 YouTube 的内部播放器，网站更新后可能停止工作。广告、年龄限制和地区限制内容尚未经过充分测试。预览可能影响观看记录和推荐。",
    "independent": "本产品并非 YouTube、Google 或 Microsoft 的官方产品。",
    "privacyTitle": "隐私说明",
    "contact": "联系开发者",
    "footer": "免费 / 自愿支持开发",
    "back": "使用说明",
    "publicPolicy": "完整隐私政策（英语 / 韩语）",
    "policyIntro": "以下为隐私政策摘要。请通过下方公开政策链接查看完整政策。",
    "policy": [
      [
        "浏览器内处理",
        "在当前页面和内存中处理卡片结构、链接、视频 ID、鼠标进入或离开事件及播放状态。播放结束、跳转或文档关闭时清理临时元素和状态。不存储在开发者服务器或观看记录数据库中。"
      ],
      [
        "开发者的数据收集",
        "不包含开发者服务器、分析、广告跟踪或使用统计上传功能。不向开发者发送密码、身份验证信息、支付信息或观看记录，也不出售使用数据或将其用于广告。"
      ],
      [
        "YouTube 与权限",
        "YouTube 的播放请求和账户、Cookie、记录、推荐、播放次数与互动数据处理遵循 YouTube/Google 的政策。YouTube 权限用于卡片与播放器；scripting 用于插入固定本地 CSS，恢复被隐藏的原生预览。不读取其他网站。"
      ],
      [
        "支持与联系",
        "点击支持链接会打开 Buy Me a Coffee。没有支付 SDK，不在链接中附加视频 ID 或观看记录。外部平台处理访问、付款、显示名称、联系方式、留言和交易记录，并可能向开发者提供。GitHub Issues 内容公开，请勿填写敏感信息。私下咨询请先询问联系方式。适用外部平台的政策。禁用或卸载可停止后续操作；政策变更时会更新日期与内容。"
      ]
    ]
  },
  "zh-TW": {
    "language": "語言",
    "free": "免費 Edge 擴充功能",
    "headline": "控制預覽和音量。\n清晰觀看 Shorts。",
    "intro": "在縮圖內持續播放首頁 Shorts 和觀看頁推薦影片，調節預覽聲音並選擇推薦影片的播放位置。Shorts 標題和頻道資訊可依需要顯示。",
    "usage": "使用方式",
    "steps": [
      "滑鼠懸停縮圖時，預覽以靜音開始。",
      "使用左上角控制項調節聲音和音量。推薦預覽下方的進度條可選擇播放位置；開啟預覽聲音會暫時將主影片靜音。",
      "滑鼠移出後結束預覽並恢復主影片先前的聲音狀態。點擊仍正常開啟影片頁面。Shorts 資訊在滑鼠位於影片內時顯示。"
    ],
    "native": "在上方設定中選擇各項功能、懸停等待時間和音量。首頁一般影片使用 YouTube 原有預覽。影片顯示修復自動套用。",
    "donateTitle": "請開發者喝杯咖啡 ☕",
    "donate": "所有功能皆免費。自願支持有助於改善相容性。支持不會解鎖額外功能，也不保證持續提供服務。",
    "donateButton": "支持 Lenged",
    "payment": "付款在外部支持平台進行。請查看該平台的費用、退款條款與隱私權政策。",
    "compatibilityTitle": "相容性說明",
    "compatibility": "本擴充功能依賴 YouTube 的內部播放器，網站更新後可能停止運作。廣告、年齡限制及地區限制內容尚未經過充分測試。預覽可能影響觀看紀錄與推薦。",
    "independent": "本產品並非 YouTube、Google 或 Microsoft 的官方產品。",
    "privacyTitle": "隱私說明",
    "contact": "聯絡開發者",
    "footer": "免費 / 自願支持開發",
    "back": "使用說明",
    "publicPolicy": "完整隱私權政策（英語 / 韓語）",
    "policyIntro": "以下為隱私權政策摘要。請透過下方公開政策連結查看完整政策。",
    "policy": [
      [
        "瀏覽器內處理",
        "在目前頁面與記憶體中處理卡片結構、連結、影片 ID、滑鼠進入或離開事件與播放狀態。播放結束、跳轉或文件關閉時清理暫存元素與狀態。不儲存在開發者伺服器或觀看紀錄資料庫中。"
      ],
      [
        "開發者的資料收集",
        "不包含開發者伺服器、分析、廣告追蹤或使用統計上傳功能。不向開發者傳送密碼、驗證資訊、付款資訊或觀看紀錄，也不出售使用資料或用於廣告。"
      ],
      [
        "YouTube 與權限",
        "YouTube 的播放請求與帳戶、Cookie、紀錄、推薦、觀看次數及互動資料處理遵循 YouTube/Google 的政策。YouTube 權限用於卡片與播放器；scripting 用於插入固定本機 CSS，恢復被隱藏的原生預覽。不讀取其他網站。"
      ],
      [
        "支持與聯絡",
        "點擊支持連結會開啟 Buy Me a Coffee。沒有付款 SDK，不在連結中附加影片 ID 或觀看紀錄。外部平台處理造訪、付款、顯示名稱、聯絡資訊、留言及交易紀錄，並可能提供給開發者。GitHub Issues 內容公開，請勿填寫敏感資訊。私下諮詢請先詢問聯絡方式。適用外部平台的政策。停用或解除安裝可停止後續操作；政策變更時會更新日期與內容。"
      ]
    ]
  }
};
