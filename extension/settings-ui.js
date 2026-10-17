const defaults={homeShorts:true,watchRelated:true,homeVolume:true,shortsVolume:true,shortsSeek:true,shortsInfoHidden:true,relatedVolume:true,relatedSeek:true,hoverDelay:375,volume:0.25};
const labels={
  ko:['기능 설정','홈 Shorts 전체 미리보기','우측 추천 영상 전체 미리보기','홈 일반 영상 볼륨 조절기','홈 Shorts 볼륨 조절기','미리보기 시작 대기 시간 (ms)','소리를 켤 때 사용할 음량 (%)','새 카드는 항상 무음으로 시작합니다. 좌측 상단 조절기로 소리를 켜세요. 설정은 열린 YouTube 탭에 바로 적용됩니다.','저장됨','저장 실패. 다시 시도해주세요.','Shorts 전체 미리보기를 켜면 사용할 수 있습니다.','설정을 불러오지 못했습니다.'],
  en:['Feature settings','Full home Shorts previews','Full watch-page recommendation previews','Home video volume controls','Home Shorts volume controls','Hover delay (ms)','Volume when enabling sound (%)','Each new card starts muted. Use its top-left controls to enable sound. Changes apply to open YouTube tabs immediately.','Saved','Could not save. Please try again.','Enable full home Shorts previews to use this control.','Could not load settings.'],
  ja:['機能設定','ホームの Shorts 全体プレビュー','視聴ページのおすすめ動画プレビュー','ホーム動画の音量調節','ホーム Shorts の音量調節','ホバー待機時間 (ms)','音声を有効にするときの音量 (%)','新しいカードは常にミュートで開始します。左上のコントロールで音声を有効にします。設定は開いている YouTube タブにすぐ反映されます。','保存しました','保存できませんでした。再試行してください。','ホームの Shorts 全体プレビューを有効にしてください。','設定を読み込めませんでした。'],
  'zh-CN':['功能设置','首页 Shorts 完整预览','观看页推荐视频完整预览','首页视频音量控制','首页 Shorts 音量控制','悬停等待时间 (ms)','开启声音时的音量 (%)','每个新卡片均静音开始。使用左上角控件开启声音。设置会立即应用到已打开的 YouTube 标签页。','已保存','保存失败，请重试。','请先启用首页 Shorts 完整预览。','无法加载设置。'],
  'zh-TW':['功能設定','首頁 Shorts 完整預覽','觀看頁推薦影片完整預覽','首頁影片音量控制','首頁 Shorts 音量控制','懸停等待時間 (ms)','開啟聲音時的音量 (%)','每個新卡片均以靜音開始。使用左上角控制項開啟聲音。設定會立即套用到已開啟的 YouTube 分頁。','已儲存','儲存失敗，請重試。','請先啟用首頁 Shorts 完整預覽。','無法載入設定。']
};
export function settingsSection(language) {
  const t=labels[language]||labels.en;
  const section=document.createElement('section');section.id='feature-settings';
  const title=document.createElement('h2');title.textContent=t[0];section.append(title);
  const form=document.createElement('form');form.className='feature-settings';
  const fields={};
  ['homeShorts','watchRelated','homeVolume','shortsVolume','hoverDelay','volume'].forEach((key,index)=>{
    const row=document.createElement('label');row.className='setting-row';
    const input=document.createElement('input');input.id='setting-'+key;input.name=key;
    input.type=index<4?'checkbox':'number';
    if(index>=4){input.min=key==='volume'?'0':'150';input.max=key==='volume'?'100':'1500';input.step='1';}
    input.disabled=true;
    const label=document.createElement('span');label.textContent=t[index+1];row.append(input,label);form.append(row);fields[key]=input;
  });
  const infoText={ko:['Shorts 재생 화면의 제목·채널 자동 숨김','Shorts 영상 안에 마우스를 두면 정보가 표시되고, 밖으로 옮기면 숨겨집니다. 키보드로 정보에 포커스해도 표시됩니다.'],en:['Auto-hide title and channel on Shorts pages','Information appears while the pointer is over the Shorts video and hides when it leaves. Keyboard focus on information also reveals it.'],ja:['Shorts 再生画面のタイトルとチャンネルを自動非表示','Shorts 動画にマウスを合わせると情報が表示され、外に移動すると非表示になります。情報へのキーボードフォーカスでも表示されます。'],'zh-CN':['自动隐藏 Shorts 播放页的标题和频道','鼠标移入 Shorts 视频时显示信息，移出时隐藏。键盘聚焦信息时也会显示。'],'zh-TW':['自動隱藏 Shorts 播放頁的標題和頻道','滑鼠移入 Shorts 影片時顯示資訊，移出時隱藏。鍵盤聚焦資訊時也會顯示。']};
  const info=infoText[language]||infoText.en;
  const infoRow=document.createElement('label');infoRow.className='setting-row';
  const infoInput=document.createElement('input');infoInput.type='checkbox';infoInput.id='setting-shortsInfoHidden';infoInput.name='shortsInfoHidden';infoInput.disabled=true;
  const infoLabel=document.createElement('span');infoLabel.textContent=info[0];infoRow.append(infoInput,infoLabel);form.append(infoRow);fields.shortsInfoHidden=infoInput;
  const infoNote=document.createElement('p');infoNote.className='small';infoNote.textContent=info[1];form.append(infoNote);
  const relatedText={ko:['우측 추천 미리보기 볼륨 조절기','우측 추천 미리보기 재생 위치 슬라이더','미리보기 소리를 켜면 본영상이 잠시 음소거되고, 커서가 빠지면 이전 소리 상태로 돌아갑니다.'],en:['Recommendation preview volume controls','Recommendation preview seek slider','Enabling preview sound temporarily mutes the main video. Leaving restores its previous audio state.'],ja:['おすすめプレビューの音量調節','おすすめプレビューの再生位置スライダー','プレビューの音声を有効にすると本編を一時ミュートし、マウスを離すと以前の音声状態に戻します。'],'zh-CN':['推荐预览音量控制','推荐预览进度条','开启预览声音时暂时静音主视频，鼠标移出后恢复之前的声音状态。'],'zh-TW':['推薦預覽音量控制','推薦預覽進度條','開啟預覽聲音時暫時將主影片靜音，滑鼠移出後恢復先前的聲音狀態。']};
  const related=relatedText[language]||relatedText.en;
  ['relatedVolume','relatedSeek'].forEach((key,index)=>{const row=document.createElement('label');row.className='setting-row';const input=document.createElement('input');input.type='checkbox';input.name=key;input.id='setting-'+key;input.disabled=true;const label=document.createElement('span');label.textContent=related[index];row.append(input,label);form.append(row);fields[key]=input;});
  const relatedNote=document.createElement('p');relatedNote.className='small';relatedNote.textContent=related[2];form.append(relatedNote);
  const dependency=document.createElement('p');dependency.className='small';dependency.textContent=t[10];form.append(dependency);
  const seekText={ko:['홈 Shorts 미리보기 재생 위치 슬라이더','미리보기 조절기는 마우스가 3초간 멈추면 숨겨지고, 다시 움직이면 나타납니다.'],en:['Home Shorts preview seek slider','Preview controls hide after 3 seconds without pointer movement and reappear when you move it.'],ja:['ホーム Shorts の再生位置スライダー','マウスを3秒間動かさないと操作部を非表示にし、動かすと再表示します。'],'zh-CN':['首页 Shorts 预览进度条','鼠标静止3秒后隐藏预览控件，移动时重新显示。'],'zh-TW':['首頁 Shorts 預覽進度條','滑鼠靜止3秒後隱藏預覽控制項，移動時重新顯示。']};
  const seekLabels=seekText[language]||seekText.en;
  const seekRow=document.createElement('label');seekRow.className='setting-row';const seekInput=document.createElement('input');seekInput.type='checkbox';seekInput.name='shortsSeek';seekInput.id='setting-shortsSeek';seekInput.disabled=true;const seekLabel=document.createElement('span');seekLabel.textContent=seekLabels[0];seekRow.append(seekInput,seekLabel);form.append(seekRow);fields.shortsSeek=seekInput;
  const idleNote=document.createElement('p');idleNote.className='small';idleNote.textContent=seekLabels[1];form.append(idleNote);
  const note=document.createElement('p');note.textContent=t[7];
  const status=document.createElement('p');status.setAttribute('role','status');status.className='small';
  section.append(form,note,status);
  let loaded=false, queue=Promise.resolve();
  function syncDependency(){fields.shortsVolume.disabled=!loaded || !fields.homeShorts.checked;fields.shortsSeek.disabled=!loaded || !fields.homeShorts.checked;fields.relatedVolume.disabled=!loaded || !fields.watchRelated.checked;fields.relatedSeek.disabled=!loaded || !fields.watchRelated.checked;dependency.hidden=fields.homeShorts.checked;}
  chrome.storage.local.get({sipSettings:defaults}).then(result=>{
    const settings={...defaults,...result.sipSettings};
    for(const [key,input] of Object.entries(fields)){if(input.type==='checkbox')input.checked=settings[key]!==false;else input.value=String(key==='volume'?Math.round(settings[key]*100):settings[key]);input.disabled=false;}
    loaded=true;syncDependency();
  }).catch(()=>{status.textContent=t[11];});
  form.addEventListener('submit',event=>event.preventDefault());
  form.addEventListener('change',()=>{
    if(!loaded || !form.reportValidity())return;
    syncDependency();
    const settings={};for(const [key,input] of Object.entries(fields))settings[key]=input.type==='checkbox'?input.checked:Number(input.value)/(key==='volume'?100:1);
    queue=queue.catch(()=>{}).then(()=>chrome.storage.local.set({sipSettings:settings})).then(()=>{status.textContent=t[8];}).catch(()=>{status.textContent=t[9];});
  });
  return section;
}
