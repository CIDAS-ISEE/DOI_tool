// タイトルフォーム
(function () {

})();

function initRelationListBody( content_index) {
  // 追加ボタン
  const html_add = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('relation-list-form-append')[0];
  html_add.addEventListener('click', function(){appendRelationListBody(content_index)} );

  appendRelationListBody(content_index);

}

function appendRelationListBody(content_index) {

  // relation_listの雛形準備
  const html_relation_list_body = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('relation-list')[0];
  const html_body = html_relation_list_body.getElementsByClassName('item-body')[0];

  // relation-list要素のインデックス
  const index = html_relation_list_body.getElementsByClassName('item-body').length - 1;

  // relation-listの追加
  html_body.setAttribute('style', 'display: block;');
  html_relation_list_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_related_content = html_relation_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('related_content')[0];
  const html_type = html_relation_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('type')[0];
  const html_scheme = html_relation_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('scheme')[0];
  const html_scheme_uri = html_relation_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('scheme_uri')[0];
  const html_scheme_type = html_relation_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('scheme_type')[0];
  const html_relation = html_relation_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('relation')[0];

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index];

  if( !xml_body.getElementsByTagName('relation_list')[0]) {
    // 対応するXMLデータがない時はXMLに項目追加
    const x_related_content_list = xml.createElement('relation_list');
    xml_body.appendChild(x_related_content_list);
  }


  if( !xml_body.getElementsByTagName('relation_list')[0].getElementsByTagName('related_content')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_related_content = xml.createElement('related_content');
    xml_body.getElementsByTagName('relation_list')[0].appendChild(x_related_content);

    html_related_content.addEventListener('change', (e) => {
      x_related_content.textContent = e.target.value;
    });
    html_type.addEventListener('change', (e) => {
      x_related_content.setAttribute('type', e.target.value);
    });
    html_scheme.addEventListener('change', (e) => {
      x_related_content.setAttribute('scheme', e.target.value);
    });
    html_scheme_uri.addEventListener('change', (e) => {
      x_related_content.setAttribute('scheme_uri', e.target.value);
    });
    html_scheme_type.addEventListener('change', (e) => {
      x_related_content.setAttribute('scheme_type', e.target.value);
    });
    html_relation.addEventListener('change', (e) => {
      x_related_content.setAttribute('relation', e.target.value);
    });


  } else {
    // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_related_content = xml_body.getElementsByTagName('relation_list')[0].getElementsByTagName('related_content')[index];

    // XMLの値を入力欄にセット
    html_related_content.value = x_related_content?.textContent;
    html_type.value = x_related_content?.getAttribute('type');
    html_scheme.value = x_related_content?.getAttribute('scheme');
    html_scheme_uri.value = x_related_content?.getAttribute('scheme_uri');
    html_scheme_type.value = x_related_content?.getAttribute('scheme_type');
    html_relation.value = x_related_content?.getAttribute('relation');

    html_related_content.addEventListener('change', (e) => {
      x_related_content.textContent = e.target.value;
    });
    html_type.addEventListener('change', (e) => {
      x_related_content.setAttribute('type', e.target.value);
    });
    html_scheme.addEventListener('change', (e) => {
      x_related_content.setAttribute('scheme', e.target.value);
    });
    html_scheme_uri.addEventListener('change', (e) => {
      x_related_content.setAttribute('scheme_uri', e.target.value);
    });
    html_scheme_type.addEventListener('change', (e) => {
      x_related_content.setAttribute('scheme_type', e.target.value);
    });
    html_relation.addEventListener('change', (e) => {
      x_related_content.setAttribute('relation', e.target.value);
    });

  }

  // 削除ボタン
  const html_remove = html_relation_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('remove')[0];
  const x = xml.getElementsByTagName('content')[content_index].getElementsByTagName('relation_list')[0].getElementsByTagName('related_content')[index];
  html_remove.addEventListener('click', (e) => {
    x.remove();
    e.target.parentElement.remove();
  })

}

// 読み込んだxmlの内容をフォームに入力する関数
function xml_to_relation_list(xml, content_index) {

  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }
  const xml_relations = xml_content.getElementsByTagName('relation_list')[0].getElementsByTagName('related_content');
  if (!xml_relations) {
    return;
  }

  // 既に存在しているフォームをテンプレート部分だけ残し全て削除
  var html_relation_list = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('relation-list')[0];
  while (html_relation_list.children[1]) {
    html_relation_list.children[1].remove();
  }

  // XML読み込み
  for (const xml_relation of xml_relations) {
    appendRelationListBody(content_index); // 入力フォームの追加
  }

}
