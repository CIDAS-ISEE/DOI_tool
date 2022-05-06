// リソースの一次言語フォーム
(function () {

})();

function initContentLanguageBody( content_index) {

  appendContentLanguageBody(content_index);

}

function appendContentLanguageBody(content_index) {

  // content_languageの雛形準備
  const html_content_language_body = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('content-language')[0];
  const html_body = html_content_language_body.getElementsByClassName('item-body')[0];

  // content_language要素のインデックス
  const index = html_content_language_body.getElementsByClassName('item-body').length - 1;

  // content_languageの追加
  html_body.setAttribute('style', 'display: block;');
  html_content_language_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_content_language = html_content_language_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('content_language')[0];

  // 言語リストの初期化
  for (const lang of languageCodeISO639) {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = lang.label;
    html_content_language.appendChild(option);
  }
  html_content_language.getElementsByTagName("option")[1].selected = true; // １番目の要素を初期選択する

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index];

  if( !xml_body.getElementsByTagName('content_language')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_content_language = xml.createElement('content_language');

    xml_body.appendChild(x_content_language);

    html_content_language.addEventListener('change', (e) => {
      x_content_language.textContent = e.target.value;
    });


  } else {
    // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_content_language = xml_body.getElementsByTagName('content_language')[index];

    // XMLの値を入力欄にセット
    html_content_language.value = x_content_language?.textContent;

    html_content_language.addEventListener('change', (e) => {
      x_content_language.textContent = e.target.value;
    });

  }

}

// 読み込んだxmlの内容をフォームに入力する関数
function xml_to_content_language(xml, content_index) {

  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }

  // 既に存在しているフォームをテンプレート部分だけ残し全て削除
  var html_content_language = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('content-language')[0];
  while (html_content_language.children[1]) {
    html_content_language.children[1].remove();
  }

  appendContentLanguageBody(content_index); // 入力フォームの追加

}
