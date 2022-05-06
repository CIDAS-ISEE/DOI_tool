// タイトルフォーム
(function () {

})();

function initEditionBody( content_index) {

  appendEditionBody(content_index);

}

function appendEditionBody(content_index) {

  // editionの雛形準備
  const html_edition_body = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('edition')[0];
  const html_body = html_edition_body.getElementsByClassName('item-body')[0];

  // edition要素のインデックス
  const index = html_edition_body.getElementsByClassName('item-body').length - 1;

  // editionの追加
  html_body.setAttribute('style', 'display: block;');
  html_edition_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_variation = html_edition_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('variation')[0];
  const html_version = html_edition_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('version')[0];

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index];

  if( !xml_body.getElementsByTagName('edition')[0]) {
    // 対応するXMLデータがない時はXMLに項目追加
    const x_edition = xml.createElement('edition');
    xml_body.appendChild(x_edition);
  }


  if( !xml_body.getElementsByTagName('edition')[0].getElementsByTagName('variation')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_variation = xml.createElement('variation');
    const x_version = xml.createElement('version');

    xml_body.getElementsByTagName('edition')[0].appendChild(x_variation);
    xml_body.getElementsByTagName('edition')[0].appendChild(x_version);

    html_variation.addEventListener('change', (e) => {
      x_variation.textContent = e.target.value;
    });
    html_version.addEventListener('change', (e) => {
      x_version.textContent = e.target.value;
    });

  } else {
    // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_variation = xml_body.getElementsByTagName('edition')[0].getElementsByTagName('variation')[index];
    if (xml_body.getElementsByTagName('edition')[0].getElementsByTagName('version')[index] == null) {
      const x_version_new = xml.createElement('version');
      xml_body.getElementsByTagName('edition')[0].appendChild(x_version_new);
    }
    const x_version = xml_body.getElementsByTagName('edition')[0].getElementsByTagName('version')[index];

    // XMLの値を入力欄にセット
    html_variation.value = x_variation.textContent;
    html_version.value = x_version.textContent;

    html_variation.addEventListener('change', (e) => {
      x_variation.textContent = e.target.value;
    });
    html_version.addEventListener('change', (e) => {
      x_version.textContent = e.target.value;
    });

  }

}

// 読み込んだxmlの内容をフォームに入力する関数
function xml_to_edition(xml, content_index) {

  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }

  // 既に存在しているフォームをテンプレート部分だけ残し全て削除
  var html_edition = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('edition')[0];
  while (html_edition.children[1]) {
    html_edition.children[1].remove();
  }

  appendEditionBody(content_index); // 入力フォームの追加

}
