// contentフォーム
(function () {
  initContentBody();

})();

// フォームの初期処理
function initContentBody() {
  // 追加ボタン
  const html_add = document.getElementsByClassName('content-form-append')[0];
  html_add.addEventListener('click', appendContentBody);

  // 初期入力フォームの追加
  appendContentBody();

}


// フォームの追加処理
function appendContentBody() {

  // contentの雛形準備
  const html_content_body = document.getElementById('content');
  const html_body = html_content_body.getElementsByClassName('content-body')[0];

  // content要素のインデックス
  const index = html_content_body.getElementsByClassName('content-body').length - 1;

  html_body.setAttribute('style', 'display: block;');
  // contentの追加
  html_content_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  const html_content_sequence = html_content_body.getElementsByClassName('content-body')[index+1].getElementsByClassName('content_sequence')[0];
  const html_doi = html_content_body.getElementsByClassName('content-body')[index+1].getElementsByClassName('doi')[0];
  const html_url = html_content_body.getElementsByClassName('content-body')[index+1].getElementsByClassName('url')[0];

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0];

  if( !xml_body.getElementsByTagName('content')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_content = xml.createElement('content');
    const x_doi = xml.createElement('doi');
    const x_url = xml.createElement('url');
    xml_body.appendChild(x_content);

    x_content.appendChild(x_doi);
    x_content.appendChild(x_url);

    // 初期値をセット
    let max_seq = 0;
    const xml_contents = xml_body.getElementsByTagName('content');
    for (const xml_content of xml_contents) {
      if( Number(max_seq) < (isNaN(xml_content.getAttribute('sequence'))?0:Number(xml_content.getAttribute('sequence'))) ){
        max_seq = Number(xml_content.getAttribute('sequence'));
      }
    }
    html_content_sequence.value = max_seq+1;
    x_content.setAttribute('sequence', max_seq + 1);

    html_content_sequence.addEventListener('change', (e) => {
      x_content.setAttribute('sequence', e.target.value);
    });
    html_doi.addEventListener('change', (e) => {
      x_doi.textContent = e.target.value;
    });
    html_url.addEventListener('change', (e) => {
      x_url.textContent = e.target.value;
    });
  } else {
    // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_content = xml_body.getElementsByTagName('content')[index];
    if (x_content.getElementsByTagName('doi')[0] == null) {
      const x_doi_new = xml.createElement('doi');
      x_content.appendChild(x_doi_new);
    }
    const x_doi = x_content.getElementsByTagName('doi')[0];
    if (x_content.getElementsByTagName('url')[0] == null) {
      const x_url_new = xml.createElement('url');
      x_content.appendChild(x_url_new);
    }
    const x_url = x_content.getElementsByTagName('url')[0];

    // XMLの値を入力欄にセット
    html_content_sequence.value = x_content?.getAttribute('sequence');
    html_doi.value = x_doi?.textContent;
    html_url.value = x_url?.textContent;

    html_content_sequence.addEventListener('change', (e) => {
      x_content.setAttribute('sequence', e.target.value);
    });
    html_doi.addEventListener('change', (e) => {
      x_doi.textContent = e.target.value;
    });
    html_url.addEventListener('change', (e) => {
      x_url.textContent = e.target.value;
    });

  }

  // 削除ボタン
  const html_remove = html_content_body.getElementsByClassName('content-body')[index+1].getElementsByClassName('remove_content')[0];
  const x = xml.getElementsByTagName('content')[index];
  html_remove.addEventListener('click', (e) => {
    x.remove();
    e.target.parentElement.remove();
  })

  ////////
  // 項目の追加

  // タイトル
  initTitleListBody(index);

  // サブジェクト
  initSubjectListBody(index);

  // 作成者
  initCreatorListBody(index);

  // 発行年月日
  initPublicationDateBody(index);

  // 出版者
  initPublisherBody(index);

  // 寄与者
  initContributorListBody(index);

  // 版
  initEditionBody(index);

  // フォーマット
  initFormatListBody(index);

  // 関連するコンテンツ
  initRelationListBody(index);

  // 代替識別子
  initAlternateIdentifierListBody(index);

  // リソースの一次言語
  initContentLanguageBody(index);

  // 日付
  initDateListBody(index);

  // リソース種別
  initResourceTypeBody(index);

  // サイズ
  initSizeListBody(index);

  // 権利情報
  initRightsListBody(index);

  // 権利情報
  initAccessRightsBody(index);

  // 追加情報(内容記述)
  initDescriptionListBody(index);

  // シグネチャ
  initSignatureBody(index);

  // 位置情報
  initGeolocationListBody(index);

  // 助成機関
  initFundListBody(index);

  // リポジトリ情報を表す要素
  initRepositoryBody(index);

  // マルチプル優先度
  initMultipleResolutionPriorityBody(index);

  // isas_data_list
  initIsasDataListBody(index);

  // isas_citation
  initIsasCitationBody(index);

  // isas_metadata_date_list
  initIsasMetadataDateListBody(index);

  html_xmlDownloads = document.getElementById('content').getElementsByClassName('content-body')[index+1].getElementsByClassName('xml-download');
  for ( html_xmlDownload of html_xmlDownloads){
    html_xmlDownload.addEventListener('click', handleDownload);
  }

  // アコーディオンの初期化
  set_accordion_action();

}

// 読み込んだxmlの内容をフォームに入力する関数
function xml_to_content(xml) {
  console.log('xml_to_content');

  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_contents = xml_body.getElementsByTagName('content');
  if (!xml_contents) {
    return;
  }

  // 既に存在しているフォームをテンプレート部分だけ残し全て削除
  var html_content = document.getElementById('content');
  while (html_content.children[1]) {
    html_content.children[1].remove();
  }

  // XML読み込み
  index = 0;
  for (const xml_content of xml_contents) {
    appendContentBody(); // 入力フォームの追加

    // このブロックにXML→フォームの変換を記述していく
    xml_to_title_list(xml, index);        // タイトル
    xml_to_subject_list(xml, index);      // サブジェクト
    xml_to_creator_list(xml, index);      // 作成者
    xml_to_publication_date(xml, index);  // 発行年月日
    xml_to_publisher(xml, index);         // 出版者
    xml_to_contributor_list(xml, index);      // 寄与者
    xml_to_edition(xml, index);           // 版
    xml_to_format_list(xml, index);       // フォーマット
    xml_to_relation_list(xml, index);     // 関連するコンテンツ
    xml_to_alternate_identifier_list(xml, index); // 代替識別子
    xml_to_content_language(xml, index);          // リソースの一次言語
    xml_to_date_list(xml, index);          // 日付
    xml_to_resource_type(xml, index);          // リソース種別
    xml_to_size_list(xml, index);          // サイズ
    xml_to_rights_list(xml, index);          // 権利情報
    xml_to_access_rights(xml, index);          // アクセス権
    xml_to_description_list(xml, index);          // 追加情報
    xml_to_signature(xml, index);          // シグネチャ
    xml_to_geolocation_list(xml, index);          // 位置情報
    xml_to_fund_list(xml, index);          // 助成機関
    xml_to_fund_list(xml, index);          // 助成機関
    xml_to_repository(xml, index);          // リポジトリ情報を表す要素
    xml_to_isas_data_list(xml, index);          // isas_data_list
    xml_to_isas_citation(xml, index);          // isas_citation
    xml_to_isas_metadata_date_list(xml, index);          // isas_metadata_date_list

    index++;
  }

  // アコーディオンの初期化
  set_accordion_action();

}
