// タイトルフォーム
(function () {

})();

function initFormatListBody( content_index) {
  // 追加ボタン
  const html_add = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('format-list-form-append')[0];
  html_add.addEventListener('click', function(){appendFormatListBody(content_index)} );

  appendFormatListBody(content_index);

}

function appendFormatListBody(content_index) {

  // format_listの雛形準備
  const html_format_list_body = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('format-list')[0];
  const html_body = html_format_list_body.getElementsByClassName('item-body')[0];

  // format-list要素のインデックス
  const index = html_format_list_body.getElementsByClassName('item-body').length - 1;

  // format-listの追加
  html_body.setAttribute('style', 'display: block;');
  html_format_list_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_format = html_format_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('format')[0];

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index];

  if( !xml_body.getElementsByTagName('format_list')[0]) {
    // 対応するXMLデータがない時はXMLに項目追加
    const x_format_list = xml.createElement('format_list');
    xml_body.appendChild(x_format_list);
  }


  if( !xml_body.getElementsByTagName('format_list')[0].getElementsByTagName('format')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_format = xml.createElement('format');
    xml_body.getElementsByTagName('format_list')[0].appendChild(x_format);

    html_format.addEventListener('change', (e) => {
      x_format.textContent = e.target.value;
    });


  } else {
    // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_format = xml_body.getElementsByTagName('format_list')[0].getElementsByTagName('format')[index];

    // XMLの値を入力欄にセット
    html_format.value = x_format?.textContent;

    html_format.addEventListener('change', (e) => {
      x_format.textContent = e.target.value;
    });

  }

  // 削除ボタン
  const html_remove = html_format_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('remove')[0];
  const x = xml.getElementsByTagName('content')[content_index].getElementsByTagName('format_list')[0].getElementsByTagName('format')[index];
  html_remove.addEventListener('click', (e) => {
    x.remove();
    e.target.parentElement.remove();
  })

}

// 読み込んだxmlの内容をフォームに入力する関数
function xml_to_format_list(xml, content_index) {

  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }
  const xml_formats = xml_content.getElementsByTagName('format_list')[0].getElementsByTagName('format');
  if (!xml_formats) {
    return;
  }

  // 既に存在しているフォームをテンプレート部分だけ残し全て削除
  var html_format_list = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('format-list')[0];
  while (html_format_list.children[1]) {
    html_format_list.children[1].remove();
  }

  // XML読み込み
  for (const xml_format of xml_formats) {
    appendFormatListBody(content_index); // 入力フォームの追加
  }

}
