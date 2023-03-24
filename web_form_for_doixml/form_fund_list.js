// 助成機関フォーム
(function () {

})();

function initFundListBody( content_index) {
  // 追加ボタン
  const html_add = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('fund-list-form-append')[0];
  html_add.addEventListener('click', function(){appendFundListBody(content_index)} );

  appendFundListBody(content_index);

}

function appendFundListBody(content_index) {

  // fund_listの雛形準備
  const html_fund_list_body = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('fund-list')[0];
  const html_body = html_fund_list_body.getElementsByClassName('item-body')[0];

  // fund-list要素のインデックス
  const index = html_fund_list_body.getElementsByClassName('item-body').length - 1;

  // fund-listの追加
  html_body.setAttribute('style', 'display: block;');
  html_fund_list_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_funder_name = html_fund_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('funder_name')[0];
  const html_lang = html_fund_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('lang')[0];
  const html_funder_identifier = html_fund_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('funder_identifier')[0];
  const html_type = html_fund_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('type')[0];
  const html_award_number = html_fund_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('award_number')[0];

  // 言語リストの初期化
  for (const lang of languageCodeISO639) {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = lang.label;
    html_lang.appendChild(option);
  }
  html_lang.getElementsByTagName("option")[1].selected = true; // １番目の要素を初期選択する

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index];

  if( !xml_body.getElementsByTagName('fund_list')[0]) {
    // 対応するXMLデータがない時はXMLに項目追加
    const x_fund_list = xml.createElement('fund_list');
    xml_body.appendChild(x_fund_list);
  }


  if( !xml_body.getElementsByTagName('fund_list')[0].getElementsByTagName('fund')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_fund = xml.createElement('fund');
    const x_funder_name = xml.createElement('funder_name');
    const x_funder_identifier = xml.createElement('funder_identifier');
    const x_award_number = xml.createElement('award_number');

    xml_body.getElementsByTagName('fund_list')[0].appendChild(x_fund);

    x_fund.appendChild(x_funder_name);
    x_fund.appendChild(x_funder_identifier);
    x_fund.appendChild(x_award_number);

    x_funder_name.setAttribute('lang', 'en');

    html_funder_name.addEventListener('change', (e) => {
      x_funder_name.textContent = e.target.value;
    });
    html_lang.addEventListener('change', (e) => {
      x_funder_name.setAttribute('lang', e.target.value);
    });
    html_funder_identifier.addEventListener('change', (e) => {
      x_funder_identifier.textContent = e.target.value;
    });
    html_type.addEventListener('change', (e) => {
      x_funder_identifier.setAttribute('type', e.target.value);
    });
    html_award_number.addEventListener('change', (e) => {
      x_award_number.textContent = e.target.value;
    });


  } else {
    // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_fund = xml_body.getElementsByTagName('fund_list')[0].getElementsByTagName('fund')[index];
    if (x_fund.getElementsByTagName('funder_name')[0] == null) {
      const x_funder_name_new = xml.createElement('funder_name');
      x_fund.appendChild(x_funder_name_new);
    }
    const x_funder_name = x_fund.getElementsByTagName('funder_name')[0];
    if (x_fund.getElementsByTagName('funder_identifier')[0] == null) {
      const x_funder_identifier_new = xml.createElement('funder_identifier');
      x_fund.appendChild(x_funder_identifier_new);
    }
    const x_funder_identifier = x_fund.getElementsByTagName('funder_identifier')[0];
    if (x_fund.getElementsByTagName('award_number')[0] == null) {
      const x_award_number_new = xml.createElement('award_number');
      x_fund.appendChild(x_award_number_new);
    }
    const x_award_number = x_fund.getElementsByTagName('award_number')[0];

    // XMLの値を入力欄にセット
    html_funder_name.value = x_funder_name?.textContent;
    html_lang.value = x_funder_name?.getAttribute('lang');
    html_funder_identifier.value = x_funder_identifier?.textContent;
    html_type.value = x_funder_identifier?.getAttribute('type');
    html_award_number.value = x_award_number?.textContent;

    html_funder_name.addEventListener('change', (e) => {
      x_funder_name.textContent = e.target.value;
    });
    html_lang.addEventListener('change', (e) => {
      x_funder_name.setAttribute('lang', e.target.value);
    });
    html_funder_identifier.addEventListener('change', (e) => {
      x_funder_identifier.textContent = e.target.value;
    });
    html_type.addEventListener('change', (e) => {
      x_funder_identifier.setAttribute('type', e.target.value);
    });
    html_award_number.addEventListener('change', (e) => {
      x_award_number.textContent = e.target.value;
    });

  }

  // 削除ボタン
  const html_remove = html_fund_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('remove')[0];
  const x = xml.getElementsByTagName('content')[content_index].getElementsByTagName('fund_list')[0].getElementsByTagName('fund')[index];
  html_remove.addEventListener('click', (e) => {
    x.remove();
    e.target.parentElement.remove();
  })

}

// 読み込んだxmlの内容をフォームに入力する関数
function xml_to_fund_list(xml, content_index) {

  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }
  const xml_funds = xml_content.getElementsByTagName('fund_list')[0].getElementsByTagName('fund');
  if (!xml_funds) {
    return;
  }

  // 既に存在しているフォームをテンプレート部分だけ残し全て削除
  var html_fund_list = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('fund-list')[0];
  while (html_fund_list.children[1]) {
    html_fund_list.children[1].remove();
  }

  // XML読み込み
  for (const xml_fund of xml_funds) {
    appendFundListBody(content_index); // 入力フォームの追加
  }

}
