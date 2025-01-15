// アクセス権フォーム
(function () {

})();

function initAccessRightsBody( content_index) {

  appendAccessRightsBody(content_index);

}

function appendAccessRightsBody(content_index) {

  // signatureの雛形準備
  const html_access_rights_body = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('access_rights')[0];
  const html_body = html_access_rights_body.getElementsByClassName('item-body')[0];

  // signature要素のインデックス
  const index = html_access_rights_body.getElementsByClassName('item-body').length - 1;

  // signatureの追加
  html_body.setAttribute('style', 'display: block;');
  html_access_rights_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_access_rights = html_access_rights_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('access_rights')[0];
  const html_date = html_access_rights_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('date')[0];

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index];

  if( !xml_body.getElementsByTagName('access_rights')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_access_rights = xml.createElement('access_rights');

    xml_body.appendChild(x_access_rights);

    html_access_rights.addEventListener('change', (e) => {
      x_access_rights.textContent = e.target.value;
    });
    html_date.addEventListener('change', (e) => {
      x_access_rights.setAttribute('date', e.target.value);
    });


  } else {
    // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_access_rights = xml_body.getElementsByTagName('access_rights')[index];

    // XMLの値を入力欄にセット
    html_access_rights.value = x_access_rights?.textContent;
    html_date.value = x_access_rights?.getAttribute('date');

    html_access_rights.addEventListener('change', (e) => {
      x_access_rights.textContent = e.target.value;
    });
    html_date.addEventListener('change', (e) => {
      x_access_rights.setAttribute('date', e.target.value);
    });

  }

}

// 読み込んだxmlの内容をフォームに入力する関数
function xml_to_access_rights(xml, content_index) {

  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }

  // 既に存在しているフォームをテンプレート部分だけ残し全て削除
  var html_access_rights = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('access_rights')[0];
  while (html_access_rights.children[1]) {
    html_access_rights.children[1].remove();
  }

  appendAccessRightsBody(content_index); // 入力フォームの追加

}
