// タイトルフォーム
(function () {

})();

function initSubjectListBody( content_index) {
  // 追加ボタン
  const html_add = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('subject-list-form-append')[0];
  html_add.addEventListener('click', function(){appendSubjectListBody(content_index)} );

  appendSubjectListBody(content_index);

}

function appendSubjectListBody(content_index) {

  // subject_listの雛形準備
  const html_subject_list_body = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('subject-list')[0];
  const html_body = html_subject_list_body.getElementsByClassName('item-body')[0];

  // subject-list要素のインデックス
  const index = html_subject_list_body.getElementsByClassName('item-body').length - 1;

  // subject-listの追加
  html_body.setAttribute('style', 'display: block;');
  html_subject_list_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_lang = html_subject_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('lang')[0];
  const html_subject = html_subject_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('subject')[0];
  const html_subject_scheme = html_subject_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('subject_scheme')[0];
  const html_scheme_uri = html_subject_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('scheme_uri')[0];

  // 言語リストの初期化
  for (const lang of languageCodeISO639) {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = lang.label;
    html_lang.appendChild(option);
  }
  html_lang.getElementsByTagName("option")[1].selected = true; // １番目の要素を初期選択する

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index];

  if( !xml_body.getElementsByTagName('subject_list')[0]) {
    // 対応するXMLデータがない時はXMLに項目追加
    const x_subject_list = xml.createElement('subject_list');
    xml_body.appendChild(x_subject_list);
  }


  if( !xml_body.getElementsByTagName('subject_list')[0].getElementsByTagName('subject')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_subject = xml.createElement('subject');
    xml_body.getElementsByTagName('subject_list')[0].appendChild(x_subject);

    x_subject.setAttribute('lang', 'en');

    html_subject.addEventListener('change', (e) => {
      x_subject.textContent = e.target.value;
    });
    html_lang.addEventListener('change', (e) => {
      x_subject.setAttribute('lang', e.target.value);
    });
    html_subject_scheme.addEventListener('change', (e) => {
      x_subject.setAttribute('subject_scheme', e.target.value);
    });
    html_scheme_uri.addEventListener('change', (e) => {
      x_subject.setAttribute('scheme_uri', e.target.value);
    });


  } else {
    // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_subject = xml_body.getElementsByTagName('subject_list')[0].getElementsByTagName('subject')[index];

    // XMLの値を入力欄にセット
    html_subject.value = x_subject?.textContent;
    html_lang.value = x_subject?.getAttribute('lang');
    html_subject_scheme.value = x_subject?.getAttribute('subject_scheme');
    html_scheme_uri.value = x_subject?.getAttribute('scheme_uri');

    html_subject.addEventListener('change', (e) => {
      x_subject.textContent = e.target.value;
    });
    html_lang.addEventListener('change', (e) => {
      x_subject.setAttribute('lang', e.target.value);
    });
    html_subject_scheme.addEventListener('change', (e) => {
      x_subject.setAttribute('subject_scheme', e.target.value);
    });
    html_scheme_uri.addEventListener('change', (e) => {
      x_subject.setAttribute('scheme_uri', e.target.value);
    });


  }

  // 削除ボタン
  const html_remove = html_subject_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('remove')[0];
  const x = xml.getElementsByTagName('content')[content_index].getElementsByTagName('subject_list')[0].getElementsByTagName('subject')[index];
  html_remove.addEventListener('click', (e) => {
    x.remove();
    e.target.parentElement.remove();
  })

}

// 読み込んだxmlの内容をフォームに入力する関数
function xml_to_subject_list(xml, content_index) {

  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }
  const xml_subjects = xml_content.getElementsByTagName('subject_list')[0].getElementsByTagName('subject');
  if (!xml_subjects) {
    return;
  }

  // 既に存在しているフォームをテンプレート部分だけ残し全て削除
  var html_subject_list = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('subject-list')[0];
  while (html_subject_list.children[1]) {
    html_subject_list.children[1].remove();
  }

  // XML読み込み
  for (const xml_subject of xml_subjects) {
    appendSubjectListBody(content_index); // 入力フォームの追加
  }

}
