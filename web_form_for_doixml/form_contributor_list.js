// 寄与者フォーム
(function () {

})();

function initContributorListBody( content_index) {
  // 追加ボタン
  const html_add = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('contributor-list-form-append')[0];
  html_add.addEventListener('click', function(){appendContributorListBody(content_index)} );

  appendContributorListBody(content_index);

}

function appendContributorListBody( content_index) {

  // contributor_listの雛形準備
  const html_contributor_list_body = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('contributor-list')[0];
  const html_body = html_contributor_list_body.getElementsByClassName('item-body')[0];

  // contributor-list要素のインデックス
  const index = html_contributor_list_body.getElementsByClassName('item-body').length - 1;

  // contributor-listの追加
  html_body.setAttribute('style', 'display: block;');
  html_contributor_list_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_sequence = html_contributor_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('sequence')[0];
  const html_type = html_contributor_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('type')[0];
  const html_contributor_type = html_contributor_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('contributor_type')[0];

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index];

  if( !xml_body.getElementsByTagName('contributor_list')[0]) {
    // 対応するXMLデータがない時はXMLに項目追加
    const x_contributor_list = xml.createElement('contributor_list');
    xml_body.appendChild(x_contributor_list);
  }

  if( !xml_body.getElementsByTagName('contributor_list')[0].getElementsByTagName('contributor')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_contributor = xml.createElement('contributor');
    xml_body.getElementsByTagName('contributor_list')[0].appendChild(x_contributor);

    // 初期値をセット
    let max_seq = 0;
    const xml_contributors = xml_body.getElementsByTagName('contributor_list')[0].getElementsByTagName('contributor');
    for (const xml_contributor of xml_contributors) {
      if( Number(max_seq) < (isNaN(xml_contributor.getAttribute('sequence'))?0:Number(xml_contributor.getAttribute('sequence'))) ){
        max_seq = Number(xml_contributor.getAttribute('sequence'));
      }
    }
    html_sequence.value = max_seq+1;
    x_contributor.setAttribute('sequence', max_seq + 1);

    // イベントをセット
    html_sequence.addEventListener('change', (e) => {
      x_contributor.setAttribute('sequence', e.target.value);
    });
    html_type.addEventListener('change', (e) => {
      x_contributor.setAttribute('type', e.target.value);
    });
    html_contributor_type.addEventListener('change', (e) => {
      x_contributor.setAttribute('contributor_type', e.target.value);
    });

  } else {
    // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_contributor = xml_body.getElementsByTagName('contributor_list')[0].getElementsByTagName('contributor')[index];

    // XMLの値を入力欄にセット
    html_sequence.value = x_contributor?.getAttribute('sequence');
    html_type.value = x_contributor?.getAttribute('type');
    html_contributor_type.value = x_contributor?.getAttribute('contributor_type');

    html_sequence.addEventListener('change', (e) => {
      x_contributor.setAttribute('sequence', e.target.value);
    });
    html_type.addEventListener('change', (e) => {
      x_contributor.setAttribute('type', e.target.value);
    });
    html_contributor_type.addEventListener('change', (e) => {
      x_contributor.setAttribute('contributor_type', e.target.value);
    });

  }

  // 削除ボタン
  const html_remove = html_contributor_list_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('remove')[0];
  const x = xml.getElementsByTagName('content')[content_index].getElementsByTagName('contributor_list')[0].getElementsByTagName('contributor')[index];
  html_remove.addEventListener('click', (e) => {
    x.remove();
    e.target.parentElement.remove();
  })

  /////////////////
  // 子項目の追加
  initContributorListNameBody(content_index, index);
  initContributorListAffiliationBody(content_index, index);
  initContributorListResearcherIdBody(content_index, index);


}


/////////////////
// 子項目：名前

function initContributorListNameBody( content_index, contributor_index) {
  // 追加ボタン
  const html_add = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('contributor-list')[0].getElementsByClassName('item-body')[contributor_index + 1].getElementsByClassName('contributor-list-names-form-append')[0];
  html_add.addEventListener('click', function(){appendContributorListNamesBody(content_index, contributor_index)} );

  appendContributorListNamesBody(content_index, contributor_index );

}

function appendContributorListNamesBody( content_index, contributor_index) {

  // nameの雛形準備
  const html_contributor_list_names_body = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('contributor-list')[0].getElementsByClassName('item-body')[contributor_index + 1].getElementsByClassName('contributor-list-names')[0];
  const html_body = html_contributor_list_names_body.getElementsByClassName('item-name-body')[0];

  // name要素のインデックス
  const index = html_contributor_list_names_body.getElementsByClassName('item-name-body').length - 1;

  // nameの追加
  html_body.setAttribute('style', 'display: block;');
  html_contributor_list_names_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_names_lang = html_contributor_list_names_body.getElementsByClassName('item-name-body')[index+1].getElementsByClassName('names-lang')[0];
  const html_last_name = html_contributor_list_names_body.getElementsByClassName('item-name-body')[index+1].getElementsByClassName('last_name')[0];
  const html_first_name = html_contributor_list_names_body.getElementsByClassName('item-name-body')[index+1].getElementsByClassName('first_name')[0];
  const html_prefix = html_contributor_list_names_body.getElementsByClassName('item-name-body')[index+1].getElementsByClassName('prefix')[0];
  const html_suffix = html_contributor_list_names_body.getElementsByClassName('item-name-body')[index+1].getElementsByClassName('suffix')[0];

  // 言語リストの初期化
  for (const lang of languageCodeISO639) {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = lang.label;
    html_names_lang.appendChild(option);
  }
  html_names_lang.getElementsByTagName("option")[1].selected = true; // １番目の要素を初期選択する

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index].getElementsByTagName('contributor_list')[0];

  if( !xml_body.getElementsByTagName('contributor')[contributor_index].getElementsByTagName('names')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    const x_names = xml.createElement('names');
    const x_lastname = xml.createElement('last_name');
    const x_firstname = xml.createElement('first_name');
    const x_prefix = xml.createElement('prefix');
    const x_suffix = xml.createElement('suffix');
    xml_body.getElementsByTagName('contributor')[contributor_index].appendChild(x_names);

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
    const x_names = xml_body.getElementsByTagName('contributor')[contributor_index].getElementsByTagName('names')[index];
    if (x_names.getElementsByTagName('last_name')[0] == null) {
      const x_last_name_new = xml.createElement('last_name');
      x_names.appendChild(x_last_name_new);
    }
    const x_last_name = x_names.getElementsByTagName('last_name')[0];
    if (x_names.getElementsByTagName('first_name')[0] == null) {
      const x_first_name_new = xml.createElement('first_name');
      x_names.appendChild(x_first_name_new);
    }
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
    html_names_lang.value = x_names?.getAttribute('lang');
    html_last_name.value = x_last_name?.textContent;
    html_first_name.value = x_first_name?.textContent;
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
  const html_remove = html_contributor_list_names_body.getElementsByClassName('item-name-body')[index+1].getElementsByClassName('remove_name')[0];
  const x = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index].getElementsByTagName('contributor_list')[0].getElementsByTagName('contributor')[contributor_index].getElementsByTagName('names')[index];

  html_remove.addEventListener('click', (e) => {
    x.remove();
    e.target.parentElement.remove();
  })

}


/////////////////
// 子項目：所属機関

function initContributorListAffiliationBody( content_index, contributor_index) {
  // 追加ボタン
  const html_add = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('contributor-list')[0].getElementsByClassName('item-body')[contributor_index + 1].getElementsByClassName('contributor-list-affiliation-form-append')[0];
  html_add.addEventListener('click', function(){appendContributorListAffiliationBody(content_index, contributor_index)} );

  appendContributorListAffiliationBody(content_index, contributor_index );

}

function appendContributorListAffiliationBody( content_index, contributor_index) {

  // affiliationの雛形準備
  const html_contributor_list_affiliation_body = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('contributor-list')[0].getElementsByClassName('item-body')[contributor_index + 1].getElementsByClassName('contributor-list-affiliation')[0];
  const html_body = html_contributor_list_affiliation_body.getElementsByClassName('item-affiliation-body')[0];

  // affiliation要素のインデックス
  const index = html_contributor_list_affiliation_body.getElementsByClassName('item-affiliation-body').length - 1;

  // affiliationの追加
  html_body.setAttribute('style', 'display: block;');
  html_contributor_list_affiliation_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_affiliation_name = html_contributor_list_affiliation_body.getElementsByClassName('item-affiliation-body')[index+1].getElementsByClassName('affiliation_name')[0];
  const html_affiliation_sequence = html_contributor_list_affiliation_body.getElementsByClassName('item-affiliation-body')[index+1].getElementsByClassName('affiliation_sequence')[0];
  const html_affiliation_name_lang = html_contributor_list_affiliation_body.getElementsByClassName('item-affiliation-body')[index+1].getElementsByClassName('affiliation_name-lang')[0];

  // 言語リストの初期化
  for (const lang of languageCodeISO639) {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = lang.label;
    html_affiliation_name_lang.appendChild(option);
  }
  html_affiliation_name_lang.getElementsByTagName("option")[1].selected = true; // １番目の要素を初期選択する

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index].getElementsByTagName('contributor_list')[0];

  if( !xml_body.getElementsByTagName('contributor')[contributor_index].getElementsByTagName('affiliation')[0]) {
    // 対応するXMLデータがない時はXMLに項目追加
    const x_affiliation = xml.createElement('affiliation');
    xml_body.getElementsByTagName('contributor')[contributor_index].appendChild(x_affiliation);
  }
  x_affiliation = xml_body.getElementsByTagName('contributor')[contributor_index].getElementsByTagName('affiliation')[0];

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
    const x_affiliation = xml_body.getElementsByTagName('contributor')[contributor_index].getElementsByTagName('affiliation')[0];
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
  const html_remove = html_contributor_list_affiliation_body.getElementsByClassName('item-affiliation-body')[index+1].getElementsByClassName('remove_affiliation')[0];
  const x = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index].getElementsByTagName('contributor_list')[0].getElementsByTagName('contributor')[contributor_index].getElementsByTagName('affiliation')[0].getElementsByTagName('affiliation_name')[index];

  html_remove.addEventListener('click', (e) => {
    x.remove();
    e.target.parentElement.remove();
  })

}

/////////////////
// 子項目：研究者ID

function initContributorListResearcherIdBody( content_index, contributor_index) {
  // 追加ボタン
  const html_add = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('contributor-list')[0].getElementsByClassName('item-body')[contributor_index + 1].getElementsByClassName('contributor-list-researcher_id-form-append')[0];
  html_add.addEventListener('click', function(){appendContributorListResearcherIdBody(content_index, contributor_index)} );

  appendContributorListResearcherIdBody(content_index, contributor_index );

}

function appendContributorListResearcherIdBody( content_index, contributor_index) {

  // researcher-idの雛形準備
  const html_contributor_list_researcher_id_body = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('contributor-list')[0].getElementsByClassName('item-body')[contributor_index + 1].getElementsByClassName('contributor-list-researcher_id')[0];
  const html_body = html_contributor_list_researcher_id_body.getElementsByClassName('item-researcher_id-body')[0];

  // researcher-id要素のインデックス
  const index = html_contributor_list_researcher_id_body.getElementsByClassName('item-researcher_id-body').length - 1;

  // researcher-idの追加
  html_body.setAttribute('style', 'display: block;');
  html_contributor_list_researcher_id_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_researcher_id_code = html_contributor_list_researcher_id_body.getElementsByClassName('item-researcher_id-body')[index+1].getElementsByClassName('id_code')[0];
  const html_researcher_id_type = html_contributor_list_researcher_id_body.getElementsByClassName('item-researcher_id-body')[index+1].getElementsByClassName('researcher_id_type')[0];

  // xmlの設定
  const xml_body = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index].getElementsByTagName('contributor_list')[0];

  if( !xml_body.getElementsByTagName('contributor')[contributor_index].getElementsByTagName('researcher_id')[0]) {
    // 対応するXMLデータがない時はXMLに項目追加
    const x_researcher_id = xml.createElement('researcher_id');
    xml_body.getElementsByTagName('contributor')[contributor_index].appendChild(x_researcher_id);
  }
  x_researcher_id = xml_body.getElementsByTagName('contributor')[contributor_index].getElementsByTagName('researcher_id')[0];

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
    const x_researcher_id = xml_body.getElementsByTagName('contributor')[contributor_index].getElementsByTagName('researcher_id')[0];
    const x_researcher_id_code = x_researcher_id.getElementsByTagName('id_code')[index];

    // XMLの値を入力欄にセット
    html_researcher_id_code.value = x_researcher_id_code?.textContent;
    html_researcher_id_type.value = x_researcher_id_code?.getAttribute('type');

    html_researcher_id_code.addEventListener('change', (e) => {
      x_researcher_id_code.textContent = e.target.value;
    });
    html_researcher_id_type.addEventListener('change', (e) => {
      x_researcher_id_code.setAttribute('type', e.target.value);
    });

  }

  // 削除ボタン
  const html_remove = html_contributor_list_researcher_id_body.getElementsByClassName('item-researcher_id-body')[index+1].getElementsByClassName('remove_resercher_id')[0];
  const x = xml.getElementsByTagName('body')[0].getElementsByTagName('content')[content_index].getElementsByTagName('contributor_list')[0].getElementsByTagName('contributor')[contributor_index].getElementsByTagName('researcher_id')[0].getElementsByTagName('id_code')[index];

  html_remove.addEventListener('click', (e) => {
    x.remove();
    e.target.parentElement.remove();
  })

}


/////////
// 読み込んだxmlの内容をフォームに入力する関数
//
function xml_to_contributor_list(xml, content_index) {

  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }
  const xml_contributors = xml_content.getElementsByTagName('contributor_list')[0].getElementsByTagName('contributor');
  if (!xml_contributors) {
    return;
  }

  // 既に存在しているフォームをテンプレート部分だけ残し全て削除
  var html_contributor_list = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('contributor-list')[0];

  while (html_contributor_list.children[1]) {
    html_contributor_list.children[1].remove();
  }

  // XML読み込み
  var index = 0;
  for (const xml_contributor of xml_contributors) {
    appendContributorListBody(content_index); // 入力フォームの追加

    //////
    // 子項目：名前
    const xml_names = xml_contributor.getElementsByTagName('names');
    // 既に存在しているフォームをテンプレート部分だけ残し全て削除
    var html_contributor_list_names = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('contributor-list')[0].getElementsByClassName('item-body')[index + 1].getElementsByClassName('contributor-list-names')[0];
    while (html_contributor_list_names.children[1]) {
      html_contributor_list_names.children[1].remove();
    }
    for (const xml_name of xml_names) {
      appendContributorListNamesBody(content_index, index ); // 入力フォームの追加
    }

    //////
    // 子項目：所属期間
    const xml_affiliation_names = xml_contributor.getElementsByTagName('affiliation')[0].getElementsByTagName('affiliation_name');
    // 既に存在しているフォームをテンプレート部分だけ残し全て削除
    var html_contributor_list_affiliation = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('contributor-list')[0].getElementsByClassName('item-body')[index + 1].getElementsByClassName('contributor-list-affiliation')[0];
    while (html_contributor_list_affiliation.children[1]) {
      html_contributor_list_affiliation.children[1].remove();
    }
    for (const xml_affiliation_name of xml_affiliation_names) {
      appendContributorListAffiliationBody(content_index, index ); // 入力フォームの追加
    }

    //////
    // 子項目：研究者ID
    const xml_resercher_id_codes = xml_contributor.getElementsByTagName('researcher_id')[0].getElementsByTagName('id_code');
    // 既に存在しているフォームをテンプレート部分だけ残し全て削除
    var html_contributor_list_resercher_id = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('contributor-list')[0].getElementsByClassName('item-body')[index + 1].getElementsByClassName('contributor-list-researcher_id')[0];
    while (html_contributor_list_resercher_id.children[1]) {
      html_contributor_list_resercher_id.children[1].remove();
    }
    for (const xml_resercher_id_code of xml_resercher_id_codes) {
      appendContributorListResearcherIdBody(content_index, index ); // 入力フォームの追加
    }
    index++;
  }

}

/////////
// sequenceで並び替え
//
function sort_by_sequence_contributor_list(content_index){
  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }
  const xml_contributor_list = xml_content.getElementsByTagName('contributor_list')[0];
  const xml_contributors = xml_contributor_list.children;
  const copy_contributors = xml_content.getElementsByTagName('contributor_list')[0].cloneNode(true);

  if (!xml_contributors) {
    return;
  }

  while (xml_contributor_list.children[0]) {
    xml_contributor_list.children[0].remove();
  }

  const new_contributors = sort_xml_by_sequence(copy_contributors, 'contributor_list');

  for(const cnode of new_contributors.childNodes){
    xml_contributor_list.appendChild( cnode.cloneNode(true) );
  }

}