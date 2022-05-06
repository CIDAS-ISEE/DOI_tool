// 権利情報フォーム
(function () {

})();

function initGeolocationListBody( content_index) {
  // 追加ボタン
  const html_add = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('geolocation-list-form-append')[0];
  html_add.addEventListener('click', function(){appendGeolocationListBody(content_index)} );

  appendGeolocationListBody(content_index);

}

function appendGeolocationListBody(content_index) {

  // geolocation_listの雛形準備
  const html_geolocation_list_body = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('geolocation-list')[0];
  const html_body = html_geolocation_list_body.getElementsByClassName('item-body')[0];

  // geolocation-list要素のインデックス
  const index = html_geolocation_list_body.getElementsByClassName('item-body').length - 1;

  // geolocation-listの追加
  html_body.setAttribute('style', 'display: block;');
  html_geolocation_list_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_geolocation_point = html_geolocation_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('geolocation_point')[0];
  const html_geolocation_box = html_geolocation_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('geolocation_box')[0];
  const html_geolocation_place = html_geolocation_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('geolocation_place')[0];

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index];

  if( !xml_body.getElementsByTagName('geolocation_list')[0]) {
    // 対応するXMLデータがない時はXMLに項目追加
    const x_geolocation_list = xml.createElement('geolocation_list');
    xml_body.appendChild(x_geolocation_list);
  }


  if( !xml_body.getElementsByTagName('geolocation_list')[0].getElementsByTagName('geolocation')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_geolocation = xml.createElement('geolocation');
    const x_geolocation_point = xml.createElement('geolocation_point');
    const x_geolocation_box = xml.createElement('geolocation_box');
    const x_geolocation_place = xml.createElement('geolocation_place');
    xml_body.getElementsByTagName('geolocation_list')[0].appendChild(x_geolocation);

    x_geolocation.appendChild(x_geolocation_point);
    x_geolocation.appendChild(x_geolocation_box);
    x_geolocation.appendChild(x_geolocation_place);

    html_geolocation_point.addEventListener('change', (e) => {
      x_geolocation_point.textContent = e.target.value;
    });
    html_geolocation_box.addEventListener('change', (e) => {
      x_geolocation_box.textContent = e.target.value;
    });
    html_geolocation_place.addEventListener('change', (e) => {
      x_geolocation_place.textContent = e.target.value;
    });


  } else {
    // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_geolocation = xml_body.getElementsByTagName('geolocation_list')[0].getElementsByTagName('geolocation')[index];
    if (x_geolocation.getElementsByTagName('geolocation_point')[0] == null) {
      const x_geolocation_point_new = xml.createElement('geolocation_point');
      x_geolocation.appendChild(x_geolocation_point_new);
    }
    const x_geolocation_point = x_geolocation.getElementsByTagName('geolocation_point')[0];
    if (x_geolocation.getElementsByTagName('geolocation_box')[0] == null) {
      const x_geolocation_box_new = xml.createElement('geolocation_box');
      x_geolocation.appendChild(x_geolocation_box_new);
    }
    const x_geolocation_box = x_geolocation.getElementsByTagName('geolocation_box')[0];
    if (x_geolocation.getElementsByTagName('geolocation_place')[0] == null) {
      const x_geolocation_place_new = xml.createElement('geolocation_place');
      x_geolocation.appendChild(x_geolocation_place_new);
    }
    const x_geolocation_place = x_geolocation.getElementsByTagName('geolocation_place')[0];

    // XMLの値を入力欄にセット
    html_geolocation_point.value = x_geolocation_point?.textContent;
    html_geolocation_box.value = x_geolocation_box?.textContent;
    html_geolocation_place.value = x_geolocation_place?.textContent;

    html_geolocation_point.addEventListener('change', (e) => {
      x_geolocation_point.textContent = e.target.value;
    });
    html_geolocation_box.addEventListener('change', (e) => {
      x_geolocation_box.textContent = e.target.value;
    });
    html_geolocation_place.addEventListener('change', (e) => {
      x_geolocation_place.textContent = e.target.value;
    });

  }

  // 削除ボタン
  const html_remove = html_geolocation_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('remove')[0];
  const x = xml.getElementsByTagName('content')[content_index].getElementsByTagName('geolocation_list')[0].getElementsByTagName('geolocation')[index];
  html_remove.addEventListener('click', (e) => {
    x.remove();
    e.target.parentElement.remove();
  })

}

// 読み込んだxmlの内容をフォームに入力する関数
function xml_to_geolocation_list(xml, content_index) {

  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }
  const xml_geolocations = xml_content.getElementsByTagName('geolocation_list')[0].getElementsByTagName('geolocation');
  if (!xml_geolocations) {
    return;
  }

  // 既に存在しているフォームをテンプレート部分だけ残し全て削除
  var html_geolocation_list = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('geolocation-list')[0];
  while (html_geolocation_list.children[1]) {
    html_geolocation_list.children[1].remove();
  }

  // XML読み込み
  for (const xml_geolocation of xml_geolocations) {
    appendGeolocationListBody(content_index); // 入力フォームの追加
  }

}
