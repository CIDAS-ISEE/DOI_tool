// シグネチャフォーム
(function () {

})();

function initIsasCitationBody( content_index) {

  appendIsasCitationBody(content_index);

}

function appendIsasCitationBody(content_index) {

  // isas_citationの雛形準備
  const html_isas_citation_body = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('isas_citation')[0];
  const html_body = html_isas_citation_body.getElementsByClassName('item-body')[0];

  // isas_citation要素のインデックス
  const index = html_isas_citation_body.getElementsByClassName('item-body').length - 1;

  // isas_citationの追加
  html_body.setAttribute('style', 'display: block;');
  html_isas_citation_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_isas_citation = html_isas_citation_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('isas_citation')[0];

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index];

  if( !xml_body.getElementsByTagName('isas_citation')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_isas_citation = xml.createElement('isas_citation');

    xml_body.appendChild(x_isas_citation);

    html_isas_citation.addEventListener('change', (e) => {
      x_isas_citation.textContent = e.target.value;
    });


  } else {
    // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_isas_citation = xml_body.getElementsByTagName('isas_citation')[index];

    // XMLの値を入力欄にセット
    html_isas_citation.value = x_isas_citation?.textContent;

    html_isas_citation.addEventListener('change', (e) => {
      x_isas_citation.textContent = e.target.value;
    });

  }

}

// 読み込んだxmlの内容をフォームに入力する関数
function xml_to_isas_citation(xml, content_index) {

  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }

  // 既に存在しているフォームをテンプレート部分だけ残し全て削除
  var html_isas_citation = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('isas_citation')[0];
  while (html_isas_citation.children[1]) {
    html_isas_citation.children[1].remove();
  }

  appendIsasCitationBody(content_index); // 入力フォームの追加

}
