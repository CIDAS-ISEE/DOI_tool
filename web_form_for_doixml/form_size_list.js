// サイズフォーム
(function () {

})();

function initSizeListBody( content_index) {
  // 追加ボタン
  const html_add = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('size-list-form-append')[0];
  html_add.addEventListener('click', function(){appendSizeListBody(content_index)} );

  appendSizeListBody(content_index);

}

function appendSizeListBody(content_index) {

  // size_listの雛形準備
  const html_size_list_body = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('size-list')[0];
  const html_body = html_size_list_body.getElementsByClassName('item-body')[0];

  // size-list要素のインデックス
  const index = html_size_list_body.getElementsByClassName('item-body').length - 1;

  // size-listの追加
  html_body.setAttribute('style', 'display: block;');
  html_size_list_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_size = html_size_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('size')[0];

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index];

  if( !xml_body.getElementsByTagName('size_list')[0]) {
    // 対応するXMLデータがない時はXMLに項目追加
    const x_size_list = xml.createElement('size_list');
    xml_body.appendChild(x_size_list);
  }


  if( !xml_body.getElementsByTagName('size_list')[0].getElementsByTagName('size')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_size = xml.createElement('size');
    xml_body.getElementsByTagName('size_list')[0].appendChild(x_size);

    html_size.addEventListener('change', (e) => {
      x_size.textContent = e.target.value;
    });

  } else {
    // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_size = xml_body.getElementsByTagName('size_list')[0].getElementsByTagName('size')[index];

    // XMLの値を入力欄にセット
    html_size.value = x_size?.textContent;

    html_size.addEventListener('change', (e) => {
      x_size.textContent = e.target.value;
    });

  }

  // 削除ボタン
  const html_remove = html_size_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('remove')[0];
  const x = xml.getElementsByTagName('content')[content_index].getElementsByTagName('size_list')[0].getElementsByTagName('size')[index];
  html_remove.addEventListener('click', (e) => {
    x.remove();
    e.target.parentElement.remove();
  })

}

// 読み込んだxmlの内容をフォームに入力する関数
function xml_to_size_list(xml, content_index) {

  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }
  const xml_sizes = xml_content.getElementsByTagName('size_list')[0].getElementsByTagName('size');
  if (!xml_sizes) {
    return;
  }

  // 既に存在しているフォームをテンプレート部分だけ残し全て削除
  var html_size_list = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('size-list')[0];
  while (html_size_list.children[1]) {
    html_size_list.children[1].remove();
  }

  // XML読み込み
  for (const xml_size of xml_sizes) {
    appendSizeListBody(content_index); // 入力フォームの追加
  }

}
