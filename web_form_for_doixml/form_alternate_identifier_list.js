// 代替識別子フォーム
(function () {

})();

function initAlternateIdentifierListBody( content_index) {
  // 追加ボタン
  const html_add = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('alternate-identifier-list-form-append')[0];
  html_add.addEventListener('click', function(){appendAlternateIdentifierListBody(content_index)} );

  appendAlternateIdentifierListBody(content_index);

}

function appendAlternateIdentifierListBody(content_index) {

  // alternate_identifier_listの雛形準備
  const html_alternate_identifier_list_body = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('alternate-identifier-list')[0];
  const html_body = html_alternate_identifier_list_body.getElementsByClassName('item-body')[0];

  // alternate-identifier-list要素のインデックス
  const index = html_alternate_identifier_list_body.getElementsByClassName('item-body').length - 1;

  // alternate-identifier-listの追加
  html_body.setAttribute('style', 'display: block;');
  html_alternate_identifier_list_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_alternate_identifier = html_alternate_identifier_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('alternate_identifier')[0];
  const html_type = html_alternate_identifier_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('type')[0];

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index];

  if( !xml_body.getElementsByTagName('alternate_identifier_list')[0]) {
    // 対応するXMLデータがない時はXMLに項目追加
    const x_alternate_identifier_list = xml.createElement('alternate_identifier_list');
    xml_body.appendChild(x_alternate_identifier_list);
  }


  if( !xml_body.getElementsByTagName('alternate_identifier_list')[0].getElementsByTagName('alternate_identifier')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_alternate_identifier = xml.createElement('alternate_identifier');
    xml_body.getElementsByTagName('alternate_identifier_list')[0].appendChild(x_alternate_identifier);

    html_alternate_identifier.addEventListener('change', (e) => {
      x_alternate_identifier.textContent = e.target.value;
    });
    html_type.addEventListener('change', (e) => {
      x_alternate_identifier.setAttribute('type', e.target.value);
    });


  } else {
    // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_alternate_identifier = xml_body.getElementsByTagName('alternate_identifier_list')[0].getElementsByTagName('alternate_identifier')[index];

    // XMLの値を入力欄にセット
    html_alternate_identifier.value = x_alternate_identifier?.textContent;
    html_type.value = x_alternate_identifier?.getAttribute('type');

    html_alternate_identifier.addEventListener('change', (e) => {
      x_alternate_identifier.textContent = e.target.value;
    });
    html_type.addEventListener('change', (e) => {
      x_alternate_identifier.setAttribute('type', e.target.value);
    });

  }

  // 削除ボタン
  const html_remove = html_alternate_identifier_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('remove')[0];
  const x = xml.getElementsByTagName('content')[content_index].getElementsByTagName('alternate_identifier_list')[0].getElementsByTagName('alternate_identifier')[index];
  html_remove.addEventListener('click', (e) => {
    x.remove();
    e.target.parentElement.remove();
  })

}

// 読み込んだxmlの内容をフォームに入力する関数
function xml_to_alternate_identifier_list(xml, content_index) {

  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }
  const xml_alternate_identifiers = xml_content.getElementsByTagName('alternate_identifier_list')[0].getElementsByTagName('alternate_identifier');
  if (!xml_alternate_identifiers) {
    return;
  }

  // 既に存在しているフォームをテンプレート部分だけ残し全て削除
  var html_alternate_identifier_list = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('alternate-identifier-list')[0];
  while (html_alternate_identifier_list.children[1]) {
    html_alternate_identifier_list.children[1].remove();
  }

  // XML読み込み
  for (const xml_alternate_identifier of xml_alternate_identifiers) {
    appendAlternateIdentifierListBody(content_index); // 入力フォームの追加
  }

}
