// 日付フォーム
(function () {

})();

function initIsasDataListBody( content_index) {
  // 追加ボタン
  const html_add = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('isas-data-list-form-append')[0];
  html_add.addEventListener('click', function(){appendIsasDataListBody(content_index)} );

  appendIsasDataListBody(content_index);

}

function appendIsasDataListBody(content_index) {

  // isas_data_listの雛形準備
  const html_isas_data_list_body = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('isas-data-list')[0];
  const html_body = html_isas_data_list_body.getElementsByClassName('item-body')[0];

  // isas-data-list要素のインデックス
  const index = html_isas_data_list_body.getElementsByClassName('item-body').length - 1;

  // isas-data-listの追加
  html_body.setAttribute('style', 'display: block;');
  html_isas_data_list_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_url = html_isas_data_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('url')[0];
  const html_text = html_isas_data_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('text')[0];

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index];

  if( !xml_body.getElementsByTagName('isas_data_list')[0]) {
    // 対応するXMLデータがない時はXMLに項目追加
    const x_isas_data_list = xml.createElement('isas_data_list');
    xml_body.appendChild(x_isas_data_list);
  }


  if( !xml_body.getElementsByTagName('isas_data_list')[0].getElementsByTagName('isas_data')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_isas_data = xml.createElement('isas_data');
    xml_body.getElementsByTagName('isas_data_list')[0].appendChild(x_isas_data);

    html_url.addEventListener('change', (e) => {
      x_isas_data.setAttribute('url', e.target.value);
    });
    html_text.addEventListener('change', (e) => {
      x_isas_data.textContent = e.target.value;
    });


  } else {
    // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_isas_data = xml_body.getElementsByTagName('isas_data_list')[0].getElementsByTagName('isas_data')[index];

    // XMLの値を入力欄にセット
    html_url.value = x_isas_data?.getAttribute('url');
    html_text.value = x_isas_data?.textContent;

    html_url.addEventListener('change', (e) => {
      x_isas_data.setAttribute('url', e.target.value);
    });
    html_text.addEventListener('change', (e) => {
      x_isas_data.textContent = e.target.value;
    });

  }

  // 削除ボタン
  const html_remove = html_isas_data_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('remove')[0];
  const x = xml.getElementsByTagName('content')[content_index].getElementsByTagName('isas_data_list')[0].getElementsByTagName('isas_data')[index];
  html_remove.addEventListener('click', (e) => {
    x.remove();
    e.target.parentElement.remove();
  })

}

// 読み込んだxmlの内容をフォームに入力する関数
function xml_to_isas_data_list(xml, content_index) {

  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }
  const xml_isas_datas = xml_content.getElementsByTagName('isas_data_list')[0].getElementsByTagName('isas_data');
  if (!xml_isas_datas) {
    return;
  }

  // 既に存在しているフォームをテンプレート部分だけ残し全て削除
  var html_isas_data_list = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('isas-data-list')[0];
  while (html_isas_data_list.children[1]) {
    html_isas_data_list.children[1].remove();
  }

  // XML読み込み
  for (const xml_isas_data of xml_isas_datas) {
    appendIsasDataListBody(content_index); // 入力フォームの追加
  }

}
