// 権利情報フォーム
(function () {

})();

function initRepositoryBody( content_index) {

  // 追加ボタン
  const html_add = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('repository-form-append')[0];
  html_add.addEventListener('click', function(){appendRepositoryBody(content_index)} );

  appendRepositoryBody(content_index);

}

function appendRepositoryBody(content_index) {

  // repositoryの雛形準備
  const html_repository_body = document.getElementById('content').getElementsByClassName('content-body')[content_index+1].getElementsByClassName('repository')[0];
  const html_body = html_repository_body.getElementsByClassName('item-body')[0];

  // repository要素のインデックス
  const index = html_repository_body.getElementsByClassName('item-body').length - 1;

  // repositoryの追加
  html_body.setAttribute('style', 'display: block;');
  html_repository_body.append(html_body.cloneNode(true));
  html_body.setAttribute('style', 'display: none;');

  // 入力項目のHTML参照を取得
  const html_repository_name = html_repository_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('repository_name')[0];
  const html_lang = html_repository_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('lang')[0];

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

  if( !xml_body.getElementsByTagName('repository')[0]) {
    // 対応するXMLデータがない時はXMLに項目追加
    const x_repository = xml.createElement('repository');
    const x_repository_name_list = xml.createElement('repository_name_list');
    x_repository.appendChild(x_repository_name_list);
    xml_body.appendChild(x_repository);
  }

  if( !xml_body.getElementsByTagName('repository')[0].getElementsByTagName('repository_name_list')[0].getElementsByTagName('repository_name')[index]){
    // 対応するXMLデータがない時はXMLに項目追加
    // const x_repository_name_list = xml.createElement('repository_name_list');
    const x_repository = xml_body.getElementsByTagName('repository')[0].getElementsByTagName('repository_name_list')[0];
    const x_repository_name	 = xml.createElement('repository_name');
    x_repository_name.setAttribute('lang', 'en');

    // xml_body.getElementsByTagName('repository')[0].appendChild(x_repository_name_list);
    x_repository.appendChild(x_repository_name);

    html_repository_name.addEventListener('change', (e) => {
      x_repository_name.textContent = e.target.value;
    });
    html_lang.addEventListener('change', (e) => {
      x_repository_name.setAttribute('lang', e.target.value);
    });


  } else {
    // 対応するXMLデータがある時はXMLと項目を紐付け
    const x_repository = xml_body.getElementsByTagName('repository')[0].getElementsByTagName('repository_name_list')[0];
    if (x_repository.getElementsByTagName('repository_name')[index] == null) {
      const x_repository_name_new = xml.createElement('repository_name');
      x_repository.appendChild(x_repository_name_new);
    }
    const x_repository_name = x_repository.getElementsByTagName('repository_name')[index];

    // XMLの値を入力欄にセット
    html_repository_name.value = x_repository_name?.textContent;
    html_lang.value = x_repository_name?.getAttribute('lang');

    html_repository_name.addEventListener('change', (e) => {
      x_repository_name.textContent = e.target.value;
    });
    html_lang.addEventListener('change', (e) => {
      x_repository_name.setAttribute('lang', e.target.value);
    });


  }

  // 削除ボタン
  const html_remove = html_repository_body.getElementsByClassName('item-body')[index+1].getElementsByClassName('remove')[0];
  const x = xml.getElementsByTagName('content')[content_index].getElementsByTagName('repository')[0].getElementsByTagName('repository_name_list')[0].getElementsByTagName('repository_name')[index];
  html_remove.addEventListener('click', (e) => {
    x.remove();
    e.target.parentElement.remove();
  })

}

// 読み込んだxmlの内容をフォームに入力する関数
function xml_to_repository(xml, content_index) {

  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_content = xml_body.getElementsByTagName('content')[content_index];
  if (!xml_content) {
    return;
  }
  const xml_repositories = xml_content.getElementsByTagName('repository')[0].getElementsByTagName('repository_name_list')[0].getElementsByTagName('repository_name');
  if (!xml_repositories) {
    return;
  }

  // 既に存在しているフォームをテンプレート部分だけ残し全て削除
  var html_repository = document.getElementById('content').getElementsByClassName('content-body')[content_index + 1].getElementsByClassName('repository')[0];
  while (html_repository.children[1]) {
    html_repository.children[1].remove();
  }

  // XML読み込み
  for (const xml_repository of xml_repositories) {
    appendRepositoryBody(content_index); // 入力フォームの追加
  }

}
