// タイトルフォーム
(function () {

})();

function initTitleListBody( content_index) {
  // 追加ボタン
  const html_add = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('title-list-form-append')[0];
  html_add.addEventListener('click', function(){appendTitleListBody(content_index)} );

  appendTitleListBody(content_index);

}

function appendTitleListBody(content_index) {

  // title_listの雛形準備
  const html_title_list_body = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('title-list')[0];
  const html_body = html_title_list_body.getElementsByClassName('item-body')[0];

  // title-list要素のインデックス
  const index = html_title_list_body.getElementsByClassName('item-body').length - 1;

  // title-listの追加
  html_body.setAttribute('style', 'display: block;');
  html_title_list_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_titles_lang = html_title_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('titles-lang')[0];
  const html_title = html_title_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('title')[0];
  const html_subtitle = html_title_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('subtitle')[0];

  // 言語リストの初期化
  for (const lang of languageCodeISO639) {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = lang.label;
    html_titles_lang.appendChild(option);
  }
  html_titles_lang.getElementsByTagName("option")[1].selected = true; // １番目の要素を初期選択する

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index];

  if( !xml_body.getElementsByTagName('title_list')[0]) {
    // 対応するXMLデータがない時はXMLに項目追加
    const x_title_list = xml.createElement('title_list');
    xml_body.appendChild(x_title_list);
  }


  if( !xml_body.getElementsByTagName('title_list')[0].getElementsByTagName('titles')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_titles = xml.createElement('titles');
    const x_title = xml.createElement('title');
    const x_subtitle = xml.createElement('subtitle');
    xml_body.getElementsByTagName('title_list')[0].appendChild(x_titles);

    x_titles.setAttribute('lang', 'en');
    x_titles.appendChild(x_title);
    x_titles.appendChild(x_subtitle);

    html_titles_lang.addEventListener('change', (e) => {
      x_titles.setAttribute('lang', e.target.value);
    });
    html_title.addEventListener('change', (e) => {
      x_title.textContent = e.target.value;
    });
    html_subtitle.addEventListener('change', (e) => {
      x_subtitle.textContent = e.target.value;
    });

  } else {
    // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_titles = xml_body.getElementsByTagName('title_list')[0].getElementsByTagName('titles')[index];
    if (x_titles.getElementsByTagName('title')[0] == null) {
      const x_title_new = xml.createElement('title');
      x_titles.appendChild(x_title_new);
    }
    const x_title = x_titles.getElementsByTagName('title')[0];
    if (x_titles.getElementsByTagName('subtitle')[0] == null) {
      const x_subtitle_new = xml.createElement('subtitle');
      x_titles.appendChild(x_subtitle_new);
    }
    const x_subtitle = x_titles.getElementsByTagName('subtitle')[0];

    // XMLの値を入力欄にセット
    html_titles_lang.value = x_titles.getAttribute('lang');
    html_title.value = x_title.textContent;
    html_subtitle.value = x_subtitle.textContent;

    html_titles_lang.addEventListener('change', (e) => {
      x_titles.setAttribute('lang', e.target.value);
    });
    html_title.addEventListener('change', (e) => {
      x_title.textContent = e.target.value;
    });
    html_subtitle.addEventListener('change', (e) => {
      x_subtitle.textContent = e.target.value;
    });

  }

  // 削除ボタン
  const html_remove = html_title_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('remove')[0];
  const x = xml.getElementsByTagName('content')[content_index].getElementsByTagName('title_list')[0].getElementsByTagName('titles')[index];
  html_remove.addEventListener('click', (e) => {
    x.remove();
    e.target.parentElement.remove();
  })

}

// 読み込んだxmlの内容をフォームに入力する関数
function xml_to_title_list(xml, content_index) {

  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }
  const xml_titles = xml_content.getElementsByTagName('title_list')[0].getElementsByTagName('titles');
  if (!xml_titles) {
    return;
  }

  // 既に存在しているフォームをテンプレート部分だけ残し全て削除
  var html_title_list = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('title-list')[0];
  while (html_title_list.children[1]) {
    html_title_list.children[1].remove();
  }

  // XML読み込み
  for (const xml_title of xml_titles) {
    appendTitleListBody(content_index); // 入力フォームの追加
  }

}
