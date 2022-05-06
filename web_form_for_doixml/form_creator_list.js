// 作成者フォーム
(function () {

})();

function initCreatorListBody( content_index) {
  // 追加ボタン
  const html_add = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('creator-list-form-append')[0];
  html_add.addEventListener('click', function(){appendCreatorListBody(content_index)} );

  appendCreatorListBody(content_index);

}

function appendCreatorListBody( content_index) {

  // creator_listの雛形準備
  const html_creator_list_body = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('creator-list')[0];
  const html_body = html_creator_list_body.getElementsByClassName('item-body')[0];

  // creator-list要素のインデックス
  const index = html_creator_list_body.getElementsByClassName('item-body').length - 1;

  // creator-listの追加
  html_body.setAttribute('style', 'display: block;');
  html_creator_list_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_sequence = html_creator_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('sequence')[0];
  const html_type = html_creator_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('type')[0];

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index];

  if( !xml_body.getElementsByTagName('creator_list')[0]) {
    // 対応するXMLデータがない時はXMLに項目追加
    const x_creator_list = xml.createElement('creator_list');
    xml_body.appendChild(x_creator_list);
  }

  if( !xml_body.getElementsByTagName('creator_list')[0].getElementsByTagName('creator')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_creator = xml.createElement('creator');
    xml_body.getElementsByTagName('creator_list')[0].appendChild(x_creator);

    // 初期値をセット
    let max_seq = 0;
    const xml_creators = xml_body.getElementsByTagName('creator_list')[0].getElementsByTagName('creator');
    for (const xml_creator of xml_creators) {
      if( Number(max_seq) < (isNaN(xml_creator.getAttribute('sequence'))?0:Number(xml_creator.getAttribute('sequence'))) ){
        max_seq = Number(xml_creator.getAttribute('sequence'));
      }
    }
    html_sequence.value = max_seq + 1;
    x_creator.setAttribute('sequence', max_seq + 1);

    html_sequence.addEventListener('change', (e) => {
      x_creator.setAttribute('sequence', e.target.value);
    });
    html_type.addEventListener('change', (e) => {
      x_creator.setAttribute('type', e.target.value);
    });

  } else {
    // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_creator = xml_body.getElementsByTagName('creator_list')[0].getElementsByTagName('creator')[index];

    // XMLの値を入力欄にセット
    html_sequence.value = x_creator.getAttribute('sequence');
    html_type.value = x_creator.getAttribute('type');

    html_sequence.addEventListener('change', (e) => {
      x_creator.setAttribute('sequence', e.target.value);
    });
    html_type.addEventListener('change', (e) => {
      x_creator.setAttribute('type', e.target.value);
    });
  }

  // 削除ボタン
  const html_remove = html_creator_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('remove')[0];
  const x = xml.getElementsByTagName('content')[content_index].getElementsByTagName('creator_list')[0].getElementsByTagName('creator')[index];
  html_remove.addEventListener('click', (e) => {
    x.remove();
    e.target.parentElement.remove();
  })

  /////////////////
  // 子項目の追加
  initCreatorListNameBody(content_index, index);
  initCreatorListAffiliationBody(content_index, index);
  initCreatorListResearcherIdBody(content_index, index);


}


/////////////////
// 子項目：名前

function initCreatorListNameBody( content_index, creator_index) {
  // 追加ボタン
  const html_add = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('creator-list')[0].getElementsByClassName('item-body')[creator_index + 1].getElementsByClassName('creator-list-names-form-append')[0];
  html_add.addEventListener('click', function(){appendCreatorListNamesBody(content_index, creator_index)} );

  appendCreatorListNamesBody(content_index, creator_index );

}

function appendCreatorListNamesBody( content_index, creator_index) {

  // nameの雛形準備
  const html_creator_list_names_body = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('creator-list')[0].getElementsByClassName('item-body')[creator_index + 1].getElementsByClassName('creator-list-names')[0];
  const html_body = html_creator_list_names_body.getElementsByClassName('item-name-body')[0];

  // name要素のインデックス
  const index = html_creator_list_names_body.getElementsByClassName('item-name-body').length - 1;

  // nameの追加
  html_body.setAttribute('style', 'display: block;');
  html_creator_list_names_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_names_lang = html_creator_list_names_body.getElementsByClassName('item-name-body')[index+1].getElementsByClassName('names-lang')[0];
  const html_last_name = html_creator_list_names_body.getElementsByClassName('item-name-body')[index+1].getElementsByClassName('last_name')[0];
  const html_first_name = html_creator_list_names_body.getElementsByClassName('item-name-body')[index+1].getElementsByClassName('first_name')[0];
  const html_prefix = html_creator_list_names_body.getElementsByClassName('item-name-body')[index+1].getElementsByClassName('prefix')[0];
  const html_suffix = html_creator_list_names_body.getElementsByClassName('item-name-body')[index+1].getElementsByClassName('suffix')[0];

  // 言語リストの初期化
  for (const lang of languageCodeISO639) {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = lang.label;
    html_names_lang.appendChild(option);
  }
  html_names_lang.getElementsByTagName("option")[1].selected = true; // １番目の要素を初期選択する

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index].getElementsByTagName('creator_list')[0];

  if( !xml_body.getElementsByTagName('creator')[creator_index].getElementsByTagName('names')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_names = xml.createElement('names');
    const x_lastname = xml.createElement('last_name');
    const x_firstname = xml.createElement('first_name');
    const x_prefix = xml.createElement('prefix');
    const x_suffix = xml.createElement('suffix');
    xml_body.getElementsByTagName('creator')[creator_index].appendChild(x_names);

    x_names.appendChild(x_lastname);
    x_names.appendChild(x_firstname);
    x_names.appendChild(x_prefix);
    x_names.appendChild(x_suffix);

    html_names_lang.addEventListener('change', (e) => {
      x_names.setAttribute('lang', e.target.value);
    });
    html_last_name.addEventListener('change', (e) => {
      x_lastname.textContent = e.target.value;
    });
    html_first_name.addEventListener('change', (e) => {
      x_firstname.textContent = e.target.value;
    });
    html_prefix.addEventListener('change', (e) => {
      x_prefix.textContent = e.target.value;
    });
    html_suffix.addEventListener('change', (e) => {
      x_suffix.textContent = e.target.value;
    });

  } else {
    // // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_names = xml_body.getElementsByTagName('creator')[creator_index].getElementsByTagName('names')[index];
    const x_last_name = x_names.getElementsByTagName('last_name')[0];
    const x_first_name = x_names.getElementsByTagName('first_name')[0];
    if (x_names.getElementsByTagName('prefix')[0] == null) {
      const x_prefix_new = xml.createElement('prefix');
      x_names.appendChild(x_prefix_new);
    }
    const x_prefix = x_names.getElementsByTagName('prefix')[0];
    if (x_names.getElementsByTagName('suffix')[0] == null) {
      const x_suffix_new = xml.createElement('suffix');
      x_names.appendChild(x_suffix_new);
    }
    const x_suffix = x_names.getElementsByTagName('suffix')[0];

    // XMLの値を入力欄にセット
    html_names_lang.value = x_names.getAttribute('lang');
    html_last_name.value = x_last_name.textContent;
    html_first_name.value = x_first_name.textContent;
    html_prefix.value = x_prefix?.textContent;
    html_suffix.value = x_suffix?.textContent;

    html_names_lang.addEventListener('change', (e) => {
      x_names.setAttribute('lang', e.target.value);
    });
    html_last_name.addEventListener('change', (e) => {
      x_last_name.textContent = e.target.value;
    });
    html_first_name.addEventListener('change', (e) => {
      x_first_name.textContent = e.target.value;
    });
    html_prefix.addEventListener('change', (e) => {
      x_prefix.textContent = e.target.value;
    });
    html_suffix.addEventListener('change', (e) => {
      x_suffix.textContent = e.target.value;
    });

  }

  // 削除ボタン
  const html_remove = html_creator_list_names_body.getElementsByClassName('item-name-body')[index+1].getElementsByClassName('remove_name')[0];
  const x = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index].getElementsByTagName('creator_list')[0].getElementsByTagName('creator')[creator_index].getElementsByTagName('names')[index];

  html_remove.addEventListener('click', (e) => {
    x.remove();
    e.target.parentElement.remove();
  })

}


/////////////////
// 子項目：所属機関

function initCreatorListAffiliationBody( content_index, creator_index) {
  // 追加ボタン
  const html_add = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('creator-list')[0].getElementsByClassName('item-body')[creator_index + 1].getElementsByClassName('creator-list-affiliation-form-append')[0];
  html_add.addEventListener('click', function(){appendCreatorListAffiliationBody(content_index, creator_index)} );

  appendCreatorListAffiliationBody(content_index, creator_index );

}

function appendCreatorListAffiliationBody( content_index, creator_index) {

  // affiliationの雛形準備
  const html_creator_list_affiliation_body = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('creator-list')[0].getElementsByClassName('item-body')[creator_index + 1].getElementsByClassName('creator-list-affiliation')[0];
  const html_body = html_creator_list_affiliation_body.getElementsByClassName('item-affiliation-body')[0];

  // affiliation要素のインデックス
  const index = html_creator_list_affiliation_body.getElementsByClassName('item-affiliation-body').length - 1;

  // affiliationの追加
  html_body.setAttribute('style', 'display: block;');
  html_creator_list_affiliation_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_affiliation_name = html_creator_list_affiliation_body.getElementsByClassName('item-affiliation-body')[index+1].getElementsByClassName('affiliation_name')[0];
  const html_affiliation_sequence = html_creator_list_affiliation_body.getElementsByClassName('item-affiliation-body')[index+1].getElementsByClassName('affiliation_sequence')[0];
  const html_affiliation_name_lang = html_creator_list_affiliation_body.getElementsByClassName('item-affiliation-body')[index+1].getElementsByClassName('affiliation_name-lang')[0];

  // 言語リストの初期化
  for (const lang of languageCodeISO639) {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = lang.label;
    html_affiliation_name_lang.appendChild(option);
  }
  html_affiliation_name_lang.getElementsByTagName("option")[1].selected = true; // １番目の要素を初期選択する

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index].getElementsByTagName('creator_list')[0];

  if( !xml_body.getElementsByTagName('creator')[creator_index].getElementsByTagName('affiliation')[0]) {
    // 対応するXMLデータがない時はXMLに項目追加
    const x_affiliation = xml.createElement('affiliation');
    xml_body.getElementsByTagName('creator')[creator_index].appendChild(x_affiliation);
  }
  x_affiliation = xml_body.getElementsByTagName('creator')[creator_index].getElementsByTagName('affiliation')[0];

  if( !x_affiliation.getElementsByTagName('affiliation_name')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_affiliation_name = xml.createElement('affiliation_name');

    x_affiliation.appendChild(x_affiliation_name);

    html_affiliation_name_lang.addEventListener('change', (e) => {
      x_affiliation_name.setAttribute('lang', e.target.value);
    });
    html_affiliation_sequence.addEventListener('change', (e) => {
      x_affiliation_name.setAttribute('sequence', e.target.value);
    });
    html_affiliation_name.addEventListener('change', (e) => {
      x_affiliation_name.textContent = e.target.value;
    });

  } else {
    // // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_affiliation = xml_body.getElementsByTagName('creator')[creator_index].getElementsByTagName('affiliation')[0];
    if (x_affiliation.getElementsByTagName('affiliation_name')[index] == null) {
      const x_affiliation_name_new = xml.createElement('affiliation_name');
      x_affiliation.appendChild(x_affiliation_name_new);
    }
    const x_affiliation_name = x_affiliation.getElementsByTagName('affiliation_name')[index];

    // XMLの値を入力欄にセット
    html_affiliation_name_lang.value = x_affiliation_name?.getAttribute('lang');
    html_affiliation_sequence.value = x_affiliation_name?.getAttribute('sequence');
    html_affiliation_name.value = x_affiliation_name?.textContent;

    html_affiliation_name_lang.addEventListener('change', (e) => {
      x_affiliation_name.setAttribute('lang', e.target.value);
    });
    html_affiliation_sequence.addEventListener('change', (e) => {
      x_affiliation_name.setAttribute('sequence', e.target.value);
    });
    html_affiliation_name.addEventListener('change', (e) => {
      x_affiliation_name.textContent = e.target.value;
    });


  }

  // 削除ボタン
  const html_remove = html_creator_list_affiliation_body.getElementsByClassName('item-affiliation-body')[index+1].getElementsByClassName('remove_affiliation')[0];
  const x = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index].getElementsByTagName('creator_list')[0].getElementsByTagName('creator')[creator_index].getElementsByTagName('affiliation')[0].getElementsByTagName('affiliation_name')[index];

  html_remove.addEventListener('click', (e) => {
    x.remove();
    e.target.parentElement.remove();
  })

}

/////////////////
// 子項目：研究者ID

function initCreatorListResearcherIdBody( content_index, creator_index) {
  // 追加ボタン
  const html_add = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('creator-list')[0].getElementsByClassName('item-body')[creator_index + 1].getElementsByClassName('creator-list-researcher_id-form-append')[0];
  html_add.addEventListener('click', function(){appendCreatorListResearcherIdBody(content_index, creator_index)} );

  appendCreatorListResearcherIdBody(content_index, creator_index );

}

function appendCreatorListResearcherIdBody( content_index, creator_index) {

  // researcher-idの雛形準備
  const html_creator_list_researcher_id_body = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('creator-list')[0].getElementsByClassName('item-body')[creator_index + 1].getElementsByClassName('creator-list-researcher_id')[0];
  const html_body = html_creator_list_researcher_id_body.getElementsByClassName('item-researcher_id-body')[0];

  // researcher-id要素のインデックス
  const index = html_creator_list_researcher_id_body.getElementsByClassName('item-researcher_id-body').length - 1;

  // researcher-idの追加
  html_body.setAttribute('style', 'display: block;');
  html_creator_list_researcher_id_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_researcher_id_code = html_creator_list_researcher_id_body.getElementsByClassName('item-researcher_id-body')[index+1].getElementsByClassName('id_code')[0];
  const html_researcher_id_type = html_creator_list_researcher_id_body.getElementsByClassName('item-researcher_id-body')[index+1].getElementsByClassName('researcher_id_type')[0];

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index].getElementsByTagName('creator_list')[0];

  if( !xml_body.getElementsByTagName('creator')[creator_index].getElementsByTagName('researcher_id')[0]) {
    // 対応するXMLデータがない時はXMLに項目追加
    const x_researcher_id = xml.createElement('researcher_id');
    xml_body.getElementsByTagName('creator')[creator_index].appendChild(x_researcher_id);
  }
  x_researcher_id = xml_body.getElementsByTagName('creator')[creator_index].getElementsByTagName('researcher_id')[0];

  if( !x_researcher_id.getElementsByTagName('id_code')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_researcher_id_code = xml.createElement('id_code');

    x_researcher_id.appendChild(x_researcher_id_code);

    html_researcher_id_code.addEventListener('change', (e) => {
      x_researcher_id_code.textContent = e.target.value;
    });
    html_researcher_id_type.addEventListener('change', (e) => {
      x_researcher_id_code.setAttribute('type', e.target.value);
    });

  } else {
    // // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_researcher_id = xml_body.getElementsByTagName('creator')[creator_index].getElementsByTagName('researcher_id')[0];
    const x_researcher_id_code = x_researcher_id.getElementsByTagName('id_code')[index];

    // XMLの値を入力欄にセット
    html_researcher_id_code.value = x_researcher_id_code.textContent;
    html_researcher_id_type.value = x_researcher_id_code.getAttribute('type');

    html_researcher_id_code.addEventListener('change', (e) => {
      x_researcher_id_code.textContent = e.target.value;
    });
    html_researcher_id_type.addEventListener('change', (e) => {
      x_researcher_id_code.setAttribute('type', e.target.value);
    });

  }

  // 削除ボタン
  const html_remove = html_creator_list_researcher_id_body.getElementsByClassName('item-researcher_id-body')[index+1].getElementsByClassName('remove_resercher_id')[0];
  const x = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index].getElementsByTagName('creator_list')[0].getElementsByTagName('creator')[creator_index].getElementsByTagName('researcher_id')[0].getElementsByTagName('id_code')[index];

  html_remove.addEventListener('click', (e) => {
    x.remove();
    e.target.parentElement.remove();
  })

}


/////////
// 読み込んだxmlの内容をフォームに入力する関数
//
function xml_to_creator_list(xml, content_index) {

  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }
  const xml_creators = xml_content.getElementsByTagName('creator_list')[0].getElementsByTagName('creator');
  if (!xml_creators) {
    return;
  }

  // 既に存在しているフォームをテンプレート部分だけ残し全て削除
  var html_creator_list = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('creator-list')[0];

  while (html_creator_list.children[1]) {
    html_creator_list.children[1].remove();
  }

  // XML読み込み
  var index = 0;
  for (const xml_creator of xml_creators) {
    appendCreatorListBody(content_index); // 入力フォームの追加

    //////
    // 子項目：名前
    const xml_names = xml_creator.getElementsByTagName('names');
    // 既に存在しているフォームをテンプレート部分だけ残し全て削除
    var html_creator_list_names = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('creator-list')[0].getElementsByClassName('item-body')[index + 1].getElementsByClassName('creator-list-names')[0];
    while (html_creator_list_names.children[1]) {
      html_creator_list_names.children[1].remove();
    }
    for (const xml_name of xml_names) {
      appendCreatorListNamesBody(content_index, index ); // 入力フォームの追加
    }

    //////
    // 子項目：所属期間
    const xml_affiliation_names = xml_creator.getElementsByTagName('affiliation')[0].getElementsByTagName('affiliation_name');
    // 既に存在しているフォームをテンプレート部分だけ残し全て削除
    var html_creator_list_affiliation = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('creator-list')[0].getElementsByClassName('item-body')[index + 1].getElementsByClassName('creator-list-affiliation')[0];
    while (html_creator_list_affiliation.children[1]) {
      html_creator_list_affiliation.children[1].remove();
    }
    for (const xml_affiliation_name of xml_affiliation_names) {
      appendCreatorListAffiliationBody(content_index, index ); // 入力フォームの追加
    }

    //////
    // 子項目：研究者ID
    const xml_resercher_id_codes = xml_creator.getElementsByTagName('researcher_id')[0].getElementsByTagName('id_code');
    // 既に存在しているフォームをテンプレート部分だけ残し全て削除
    var html_creator_list_resercher_id = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('creator-list')[0].getElementsByClassName('item-body')[index + 1].getElementsByClassName('creator-list-researcher_id')[0];
    while (html_creator_list_resercher_id.children[1]) {
      html_creator_list_resercher_id.children[1].remove();
    }
    for (const xml_resercher_id_code of xml_resercher_id_codes) {
      appendCreatorListResearcherIdBody(content_index, index ); // 入力フォームの追加
    }
    index++;
  }

}

/////////
// sequenceで並び替え
//
function sort_by_sequence_creator_list(content_index){
  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }
  const xml_creator_list = xml_content.getElementsByTagName('creator_list')[0];
  const xml_creators = xml_creator_list.children;
  const copy_creators = xml_content.getElementsByTagName('creator_list')[0].cloneNode(true);

  if (!xml_creators) {
    return;
  }

  while (xml_creator_list.children[0]) {
    xml_creator_list.children[0].remove();
  }

  const new_creators = sort_xml_by_sequence(copy_creators, 'creator_list');

  for(const cnode of new_creators.childNodes){
    xml_creator_list.appendChild( cnode.cloneNode(true) );
  }

}
