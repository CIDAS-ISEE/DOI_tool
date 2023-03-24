// タイトルフォーム
(function () {

})();

function initPublisherBody( content_index) {

  appendPublisherBody(content_index);

}

function appendPublisherBody(content_index) {

  // publisherの雛形準備
  const html_publisher_body = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('publisher')[0];
  const html_body = html_publisher_body.getElementsByClassName('item-body')[0];

  // publisher要素のインデックス
  const index = html_publisher_body.getElementsByClassName('item-body').length - 1;

  // publisherの追加
  html_body.setAttribute('style', 'display: block;');
  html_publisher_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_publisher_name = html_publisher_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('publisher_name')[0];
  const html_lang = html_publisher_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('lang')[0];
  const html_location = html_publisher_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('location')[0];

  // 言語リストの初期化
  for (const lang of languageCodeISO639) {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = lang.label;
    html_lang.appendChild(option);
  }
  html_lang.getElementsByTagName("option")[1].selected = true; // １番目の要素を初期選択する

  // 国名リストの初期化
  for (const lang of countryCodeISO3166) {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = lang.label;
    html_location.appendChild(option);
  }

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index];

  if( !xml_body.getElementsByTagName('publisher')[0]) {
    // 対応するXMLデータがない時はXMLに項目追加
    const x_publisher = xml.createElement('publisher');
    xml_body.appendChild(x_publisher);
  }


  if( !xml_body.getElementsByTagName('publisher')[0].getElementsByTagName('publisher_name')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_publisher_name = xml.createElement('publisher_name');
    const x_location = xml.createElement('location');

    xml_body.getElementsByTagName('publisher')[0].appendChild(x_publisher_name);
    xml_body.getElementsByTagName('publisher')[0].appendChild(x_location);

    x_publisher_name.setAttribute('lang', 'en');

    html_publisher_name.addEventListener('change', (e) => {
      x_publisher_name.textContent = e.target.value;
    });
    html_lang.addEventListener('change', (e) => {
      x_publisher_name.setAttribute('lang', e.target.value);
    });
    html_location.addEventListener('change', (e) => {
      x_location.textContent = e.target.value;
    });

  } else {
    // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_publisher_name = xml_body.getElementsByTagName('publisher')[0].getElementsByTagName('publisher_name')[index];
    if (xml_body.getElementsByTagName('publisher')[0].getElementsByTagName('location')[index] == null) {
      const x_location_new = xml.createElement('location');
      xml_body.getElementsByTagName('publisher')[0].appendChild(x_location_new);
    }
    const x_location = xml_body.getElementsByTagName('publisher')[0].getElementsByTagName('location')[index];

    // XMLの値を入力欄にセット
    html_publisher_name.value = x_publisher_name?.textContent;
    html_lang.value = x_publisher_name?.getAttribute('lang');
    html_location.value = x_location?.textContent;

    html_publisher_name.addEventListener('change', (e) => {
      x_publisher_name.textContent = e.target.value;
    });
    html_lang.addEventListener('change', (e) => {
      x_publisher_name.setAttribute('lang', e.target.value);
    });
    html_location.addEventListener('change', (e) => {
      x_location.textContent = e.target.value;
    });

  }

}

// 読み込んだxmlの内容をフォームに入力する関数
function xml_to_publisher(xml, content_index) {

  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }


  // 既に存在しているフォームをテンプレート部分だけ残し全て削除
  var html_publisher = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('publisher')[0];
  while (html_publisher.children[1]) {
    html_publisher.children[1].remove();
  }

  appendPublisherBody(content_index); // 入力フォームの追加

}
