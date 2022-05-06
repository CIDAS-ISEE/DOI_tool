// リソース種別フォーム
(function () {

})();

function initResourceTypeBody( content_index) {

  appendResourceTypeBody(content_index);

}

function appendResourceTypeBody(content_index) {

  // resource_typeの雛形準備
  const html_resource_type_body = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('resource-type')[0];
  const html_body = html_resource_type_body.getElementsByClassName('item-body')[0];

  // resource_type要素のインデックス
  const index = html_resource_type_body.getElementsByClassName('item-body').length - 1;

  // resource_typeの追加
  html_body.setAttribute('style', 'display: block;');
  html_resource_type_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_resource_type = html_resource_type_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('resource_type')[0];
  const html_type = html_resource_type_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('type')[0];

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index];

  if( !xml_body.getElementsByTagName('resource_type')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_resource_type = xml.createElement('resource_type');

    xml_body.appendChild(x_resource_type);

    html_resource_type.addEventListener('change', (e) => {
      x_resource_type.textContent = e.target.value;
    });
    html_type.addEventListener('change', (e) => {
      x_resource_type.setAttribute('type', e.target.value);
    });

  } else {
    // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_resource_type = xml_body.getElementsByTagName('resource_type')[index];

    // XMLの値を入力欄にセット
    html_resource_type.value = x_resource_type?.textContent;
    html_type.value = x_resource_type?.getAttribute('type');

    html_resource_type.addEventListener('change', (e) => {
      x_resource_type.textContent = e.target.value;
    });
    html_type.addEventListener('change', (e) => {
      x_resource_type.setAttribute('type', e.target.value);
    });

  }

}

// 読み込んだxmlの内容をフォームに入力する関数
function xml_to_resource_type(xml, content_index) {

  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }

  // 既に存在しているフォームをテンプレート部分だけ残し全て削除
  var html_resource_type = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('resource-type')[0];
  while (html_resource_type.children[1]) {
    html_resource_type.children[1].remove();
  }

  appendResourceTypeBody(content_index); // 入力フォームの追加

}
