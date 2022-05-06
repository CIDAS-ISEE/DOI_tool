// シグネチャフォーム
(function () {

})();

function initMultipleResolutionPriorityBody( content_index) {

  appendMultipleResolutionPriorityBody(content_index);

}

function appendMultipleResolutionPriorityBody(content_index) {

  // multiple_resolution_priorityの雛形準備
  const html_multiple_resolution_priority_body = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('multiple-resolution-priority')[0];
  const html_body = html_multiple_resolution_priority_body.getElementsByClassName('item-body')[0];

  // multiple_resolution_priority要素のインデックス
  const index = html_multiple_resolution_priority_body.getElementsByClassName('item-body').length - 1;

  // multiple_resolution_priorityの追加
  html_body.setAttribute('style', 'display: block;');
  html_multiple_resolution_priority_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_multiple_resolution_priority = html_multiple_resolution_priority_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('multiple_resolution_priority')[0];

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index];

  if( !xml_body.getElementsByTagName('multiple_resolution_priority')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_multiple_resolution_priority = xml.createElement('multiple_resolution_priority');

    xml_body.appendChild(x_multiple_resolution_priority);

    html_multiple_resolution_priority.addEventListener('change', (e) => {
      x_multiple_resolution_priority.textContent = e.target.value;
    });


  } else {
    // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_multiple_resolution_priority = xml_body.getElementsByTagName('multiple_resolution_priority')[index];

    // XMLの値を入力欄にセット
    html_multiple_resolution_priority.value = x_multiple_resolution_priority?.textContent;

    html_multiple_resolution_priority.addEventListener('change', (e) => {
      x_multiple_resolution_priority.textContent = e.target.value;
    });

  }

}

// 読み込んだxmlの内容をフォームに入力する関数
function xml_to_multiple_resolution_priority(xml, content_index) {

  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }

  // 既に存在しているフォームをテンプレート部分だけ残し全て削除
  var html_multiple_resolution_priority = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('multiple-resolution-priority')[0];
  while (html_multiple_resolution_priority.children[1]) {
    html_multiple_resolution_priority.children[1].remove();
  }

  appendMultipleResolutionPriorityBody(content_index); // 入力フォームの追加

}
