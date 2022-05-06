// シグネチャフォーム
(function () {

})();

function initSignatureBody( content_index) {

  appendSignatureBody(content_index);

}

function appendSignatureBody(content_index) {

  // signatureの雛形準備
  const html_signature_body = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('signature')[0];
  const html_body = html_signature_body.getElementsByClassName('item-body')[0];

  // signature要素のインデックス
  const index = html_signature_body.getElementsByClassName('item-body').length - 1;

  // signatureの追加
  html_body.setAttribute('style', 'display: block;');
  html_signature_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_signature = html_signature_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('signature')[0];

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index];

  if( !xml_body.getElementsByTagName('signature')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_signature = xml.createElement('signature');

    xml_body.appendChild(x_signature);

    html_signature.addEventListener('change', (e) => {
      x_signature.textContent = e.target.value;
    });


  } else {
    // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_signature = xml_body.getElementsByTagName('signature')[index];

    // XMLの値を入力欄にセット
    html_signature.value = x_signature?.textContent;

    html_signature.addEventListener('change', (e) => {
      x_signature.textContent = e.target.value;
    });

  }

}

// 読み込んだxmlの内容をフォームに入力する関数
function xml_to_signature(xml, content_index) {

  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }

  // 既に存在しているフォームをテンプレート部分だけ残し全て削除
  var html_signature = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('signature')[0];
  while (html_signature.children[1]) {
    html_signature.children[1].remove();
  }

  appendSignatureBody(content_index); // 入力フォームの追加

}
