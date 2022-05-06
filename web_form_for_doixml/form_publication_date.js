// タイトルフォーム
(function () {

})();

function initPublicationDateBody( content_index) {

  appendPublicationDateBody(content_index);

}

function appendPublicationDateBody(content_index) {

  // publication_dateの雛形準備
  const html_publication_date_body = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('publication-date')[0];
  const html_body = html_publication_date_body.getElementsByClassName('item-body')[0];

  // publication-date要素のインデックス
  const index = html_publication_date_body.getElementsByClassName('item-body').length - 1;

  // publication-dateの追加
  html_body.setAttribute('style', 'display: block;');
  html_publication_date_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_year = html_publication_date_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('year')[0];
  const html_month = html_publication_date_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('month')[0];
  const html_day = html_publication_date_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('day')[0];


  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index];

  if( !xml_body.getElementsByTagName('publication_date')[0]) {
    // 対応するXMLデータがない時はXMLに項目追加
    const x_publication_date = xml.createElement('publication_date');
    xml_body.appendChild(x_publication_date);
  }


  if( !xml_body.getElementsByTagName('publication_date')[0].getElementsByTagName('month')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_year = xml.createElement('year');
    const x_month = xml.createElement('month');
    const x_day = xml.createElement('day');

    xml_body.getElementsByTagName('publication_date')[0].appendChild(x_year);
    xml_body.getElementsByTagName('publication_date')[0].appendChild(x_month);
    xml_body.getElementsByTagName('publication_date')[0].appendChild(x_day);

    html_year.addEventListener('change', (e) => {
      x_year.textContent = e.target.value;
    });
    html_month.addEventListener('change', (e) => {
      x_month.textContent = e.target.value;
    });
    html_day.addEventListener('change', (e) => {
      x_day.textContent = e.target.value;
    });

  } else {
    // 対応するXMLデータがある時はXMLと項目を紐付け
    if (xml_body.getElementsByTagName('publication_date')[0].getElementsByTagName('year')[index] == null) {
      const x_year_new = xml.createElement('year');
      xml_body.getElementsByTagName('publication_date')[0].appendChild(x_year_new);
    }
    const x_year = xml_body.getElementsByTagName('publication_date')[0].getElementsByTagName('year')[index];
    if (xml_body.getElementsByTagName('publication_date')[0].getElementsByTagName('month')[index] == null) {
      const x_month_new = xml.createElement('month');
      xml_body.getElementsByTagName('publication_date')[0].appendChild(x_month_new);
    }
    const x_month = xml_body.getElementsByTagName('publication_date')[0].getElementsByTagName('month')[index];
    if (xml_body.getElementsByTagName('publication_date')[0].getElementsByTagName('day')[index] == null) {
      const x_day_new = xml.createElement('day');
      xml_body.getElementsByTagName('publication_date')[0].appendChild(x_day_new);
    }
    const x_day = xml_body.getElementsByTagName('publication_date')[0].getElementsByTagName('day')[index];

    // XMLの値を入力欄にセット
    html_year.value = x_year?.textContent;
    html_month.value = x_month?.textContent;
    html_day.value = x_day?.textContent;

    html_year.addEventListener('change', (e) => {
      x_year.textContent = e.target.value;
    });
    html_month.addEventListener('change', (e) => {
      x_month.textContent = e.target.value;
    });
    html_day.addEventListener('change', (e) => {
      x_day.textContent = e.target.value;
    });

  }

}

// 読み込んだxmlの内容をフォームに入力する関数
function xml_to_publication_date(xml, content_index) {

  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }


  // 既に存在しているフォームをテンプレート部分だけ残し全て削除
  var html_publication_date = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('publication-date')[0];
  while (html_publication_date.children[1]) {
    html_publication_date.children[1].remove();
  }

  appendPublicationDateBody(content_index); // 入力フォームの追加

}
