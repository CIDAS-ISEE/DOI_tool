// 追加情報フォーム
(function () {

})();

function initDescriptionListBody( content_index) {
  // 追加ボタン
  const html_add = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('description-list-form-append')[0];
  html_add.addEventListener('click', function(){appendDescriptionListBody(content_index)} );

  appendDescriptionListBody(content_index);

}

function appendDescriptionListBody(content_index) {

  // description_listの雛形準備
  const html_description_list_body = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('description-list')[0];
  const html_body = html_description_list_body.getElementsByClassName('item-body')[0];

  // description-list要素のインデックス
  const index = html_description_list_body.getElementsByClassName('item-body').length - 1;

  // description-listの追加
  html_body.setAttribute('style', 'display: block;');
  html_description_list_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_description = html_description_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('description')[0];
  const html_type = html_description_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('type')[0];
  const html_lang = html_description_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('lang')[0];

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

  if( !xml_body.getElementsByTagName('description_list')[0]) {
    // 対応するXMLデータがない時はXMLに項目追加
    const x_description_list = xml.createElement('description_list');
    xml_body.appendChild(x_description_list);
  }


  if( !xml_body.getElementsByTagName('description_list')[0].getElementsByTagName('description')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_description = xml.createElement('description');
    xml_body.getElementsByTagName('description_list')[0].appendChild(x_description);

    html_description.addEventListener('change', (e) => {
      x_description.textContent = e.target.value;
    });
    html_type.addEventListener('change', (e) => {
      x_description.setAttribute('type', e.target.value);
    });
    html_lang.addEventListener('change', (e) => {
      x_description.setAttribute('lang', e.target.value);
    });


  } else {
    // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_description = xml_body.getElementsByTagName('description_list')[0].getElementsByTagName('description')[index];

    // XMLの値を入力欄にセット
    html_description.value = x_description?.textContent;
    html_type.value = x_description?.getAttribute('type');
    html_lang.value = x_description?.getAttribute('lang');

    html_description.addEventListener('change', (e) => {
      x_description.textContent = e.target.value;
    });
    html_type.addEventListener('change', (e) => {
      x_description.setAttribute('type', e.target.value);
    });
    html_lang.addEventListener('change', (e) => {
      x_description.setAttribute('lang', e.target.value);
    });

  }

  // 削除ボタン
  const html_remove = html_description_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('remove')[0];
  const x = xml.getElementsByTagName('content')[content_index].getElementsByTagName('description_list')[0].getElementsByTagName('description')[index];
  html_remove.addEventListener('click', (e) => {
    x.remove();
    e.target.parentElement.remove();
  })

}

// 読み込んだxmlの内容をフォームに入力する関数
function xml_to_description_list(xml, content_index) {

  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }
  const xml_descriptions = xml_content.getElementsByTagName('description_list')[0].getElementsByTagName('description');
  if (!xml_descriptions) {
    return;
  }

  // 既に存在しているフォームをテンプレート部分だけ残し全て削除
  var html_description_list = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('description-list')[0];
  while (html_description_list.children[1]) {
    html_description_list.children[1].remove();
  }

  // XML読み込み
  for (const xml_description of xml_descriptions) {
    appendDescriptionListBody(content_index); // 入力フォームの追加
  }

}
