// 権利情報フォーム
(function () {

})();

function initRightsListBody( content_index) {
  // 追加ボタン
  const html_add = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('rights-list-form-append')[0];
  html_add.addEventListener('click', function(){appendRightsListBody(content_index)} );

  appendRightsListBody(content_index);

}

function appendRightsListBody(content_index) {

  // rights_listの雛形準備
  const html_rights_list_body = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('rights-list')[0];
  const html_body = html_rights_list_body.getElementsByClassName('item-body')[0];

  // rights-list要素のインデックス
  const index = html_rights_list_body.getElementsByClassName('item-body').length - 1;

  // rights-listの追加
  html_body.setAttribute('style', 'display: block;');
  html_rights_list_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_rights = html_rights_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('rights')[0];
  const html_uri = html_rights_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('uri')[0];

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index];

  if( !xml_body.getElementsByTagName('rights_list')[0]) {
    // 対応するXMLデータがない時はXMLに項目追加
    const x_rights_list = xml.createElement('rights_list');
    xml_body.appendChild(x_rights_list);
  }


  if( !xml_body.getElementsByTagName('rights_list')[0].getElementsByTagName('rights')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_rights = xml.createElement('rights');
    xml_body.getElementsByTagName('rights_list')[0].appendChild(x_rights);

    html_rights.addEventListener('change', (e) => {
      x_rights.textContent = e.target.value;
    });
    html_uri.addEventListener('change', (e) => {
      x_rights.setAttribute('uri', e.target.value);
    });


  } else {
    // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_rights = xml_body.getElementsByTagName('rights_list')[0].getElementsByTagName('rights')[index];

    // XMLの値を入力欄にセット
    html_rights.value = x_rights?.textContent;
    html_uri.value = x_rights?.getAttribute('uri');

    html_rights.addEventListener('change', (e) => {
      x_rights.textContent = e.target.value;
    });
    html_uri.addEventListener('change', (e) => {
      x_rights.setAttribute('uri', e.target.value);
    });

  }

  // 削除ボタン
  const html_remove = html_rights_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('remove')[0];
  const x = xml.getElementsByTagName('content')[content_index].getElementsByTagName('rights_list')[0].getElementsByTagName('rights')[index];
  html_remove.addEventListener('click', (e) => {
    x.remove();
    e.target.parentElement.remove();
  })

}

// 読み込んだxmlの内容をフォームに入力する関数
function xml_to_rights_list(xml, content_index) {

  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }
  const xml_rights = xml_content.getElementsByTagName('rights_list')[0].getElementsByTagName('rights');
  if (!xml_rights) {
    return;
  }

  // 既に存在しているフォームをテンプレート部分だけ残し全て削除
  var html_rights_list = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('rights-list')[0];
  while (html_rights_list.children[1]) {
    html_rights_list.children[1].remove();
  }

  // XML読み込み
  for (const xml_right of xml_rights) {
    appendRightsListBody(content_index); // 入力フォームの追加
  }

}
