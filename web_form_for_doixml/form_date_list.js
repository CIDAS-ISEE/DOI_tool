// 日付フォーム
(function () {

})();

function initDateListBody( content_index) {
  // 追加ボタン
  const html_add = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('date-list-form-append')[0];
  html_add.addEventListener('click', function(){appendDateListBody(content_index)} );

  appendDateListBody(content_index);

}

function appendDateListBody(content_index) {

  // date_listの雛形準備
  const html_date_list_body = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('date-list')[0];
  const html_body = html_date_list_body.getElementsByClassName('item-body')[0];

  // date-list要素のインデックス
  const index = html_date_list_body.getElementsByClassName('item-body').length - 1;

  // date-listの追加
  html_body.setAttribute('style', 'display: block;');
  html_date_list_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_date = html_date_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('date')[0];
  const html_type = html_date_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('type')[0];

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index];

  if( !xml_body.getElementsByTagName('date_list')[0]) {
    // 対応するXMLデータがない時はXMLに項目追加
    const x_date_list = xml.createElement('date_list');
    xml_body.appendChild(x_date_list);
  }


  if( !xml_body.getElementsByTagName('date_list')[0].getElementsByTagName('date')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_date = xml.createElement('date');
    xml_body.getElementsByTagName('date_list')[0].appendChild(x_date);

    html_date.addEventListener('change', (e) => {
      x_date.textContent = e.target.value;
    });
    html_type.addEventListener('change', (e) => {
      x_date.setAttribute('type', e.target.value);
    });


  } else {
    // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_date = xml_body.getElementsByTagName('date_list')[0].getElementsByTagName('date')[index];

    // XMLの値を入力欄にセット
    html_date.value = x_date?.textContent;
    html_type.value = x_date?.getAttribute('type');

    html_date.addEventListener('change', (e) => {
      x_date.textContent = e.target.value;
    });
    html_type.addEventListener('change', (e) => {
      x_date.setAttribute('type', e.target.value);
    });

  }

  // 削除ボタン
  const html_remove = html_date_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('remove')[0];
  const x = xml.getElementsByTagName('content')[content_index].getElementsByTagName('date_list')[0].getElementsByTagName('date')[index];
  html_remove.addEventListener('click', (e) => {
    x.remove();
    e.target.parentElement.remove();
  })

}

// 読み込んだxmlの内容をフォームに入力する関数
function xml_to_date_list(xml, content_index) {

  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }
  const xml_dates = xml_content.getElementsByTagName('date_list')[0].getElementsByTagName('date');
  if (!xml_dates) {
    return;
  }

  // 既に存在しているフォームをテンプレート部分だけ残し全て削除
  var html_date_list = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('date-list')[0];
  while (html_date_list.children[1]) {
    html_date_list.children[1].remove();
  }

  // XML読み込み
  for (const xml_date of xml_dates) {
    appendDateListBody(content_index); // 入力フォームの追加
  }

}
