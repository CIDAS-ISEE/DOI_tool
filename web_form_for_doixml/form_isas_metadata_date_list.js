// 日付フォーム
(function () {

})();

function initIsasMetadataDateListBody( content_index) {
  // 追加ボタン
  const html_add = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('isas-metadata-date-list-form-append')[0];
  html_add.addEventListener('click', function(){appendIsasMetadataDateListBody(content_index)} );

  appendIsasMetadataDateListBody(content_index);

}

function appendIsasMetadataDateListBody(content_index) {

  // isas_metadata_date_listの雛形準備
  const html_isas_metadata_date_list_body = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('isas-metadata-date-list')[0];
  const html_body = html_isas_metadata_date_list_body.getElementsByClassName('item-body')[0];

  // isas-metadata-date-list要素のインデックス
  const index = html_isas_metadata_date_list_body.getElementsByClassName('item-body').length - 1;

  // isas-metadata-date-listの追加
  html_body.setAttribute('style', 'display: block;');
  html_isas_metadata_date_list_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_type = html_isas_metadata_date_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('type')[0];
  const html_date = html_isas_metadata_date_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('date')[0];

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index];

  if( !xml_body.getElementsByTagName('isas_metadata_date_list')[0]) {
    // 対応するXMLデータがない時はXMLに項目追加
    const x_isas_metadata_date_list = xml.createElement('isas_metadata_date_list');
    xml_body.appendChild(x_isas_metadata_date_list);
  }


  if( !xml_body.getElementsByTagName('isas_metadata_date_list')[0].getElementsByTagName('isas_metadata_date')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_isas_metadata_date = xml.createElement('isas_metadata_date');
    xml_body.getElementsByTagName('isas_metadata_date_list')[0].appendChild(x_isas_metadata_date);

    html_type.addEventListener('change', (e) => {
      x_isas_metadata_date.setAttribute('type', e.target.value);
    });
    html_date.addEventListener('change', (e) => {
      x_isas_metadata_date.textContent = e.target.value;
    });


  } else {
    // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_isas_metadata_date = xml_body.getElementsByTagName('isas_metadata_date_list')[0].getElementsByTagName('isas_metadata_date')[index];

    // XMLの値を入力欄にセット
    html_type.value = x_isas_metadata_date?.getAttribute('type');
    html_date.value = x_isas_metadata_date?.textContent;

    html_type.addEventListener('change', (e) => {
      x_isas_metadata_date.setAttribute('type', e.target.value);
    });
    html_date.addEventListener('change', (e) => {
      x_isas_metadata_date.textContent = e.target.value;
    });

  }

  // 削除ボタン
  const html_remove = html_isas_metadata_date_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('remove')[0];
  const x = xml.getElementsByTagName('content')[content_index].getElementsByTagName('isas_metadata_date_list')[0].getElementsByTagName('isas_metadata_date')[index];
  html_remove.addEventListener('click', (e) => {
    x.remove();
    e.target.parentElement.remove();
  })

}

// 読み込んだxmlの内容をフォームに入力する関数
function xml_to_isas_metadata_date_list(xml, content_index) {

  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }
  const xml_isas_metadata_dates = xml_content.getElementsByTagName('isas_metadata_date_list')[0].getElementsByTagName('isas_metadata_date');
  if (!xml_isas_metadata_dates) {
    return;
  }

  // 既に存在しているフォームをテンプレート部分だけ残し全て削除
  var html_isas_metadata_date_list = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('isas-metadata-date-list')[0];
  while (html_isas_metadata_date_list.children[1]) {
    html_isas_metadata_date_list.children[1].remove();
  }

  // XML読み込み
  for (const xml_isas_metadata_date of xml_isas_metadata_dates) {
    appendIsasMetadataDateListBody(content_index); // 入力フォームの追加
  }

}
