// xmlオブジェクトを初期化する
const parser = new DOMParser();
let xml = parser.parseFromString(`<root>
    <head>
        <!--error_processの値を0から１に変更 by A. Shinbori-->
        <error_process>1</error_process>
        <!-- 継続 -->
        <result_method>0</result_method>
        <!-- オンライン -->
        <content_classification>03</content_classification>
        <!-- 研究データ -->
        <request_kind>01</request_kind>
        <!-- 登録・更新 -->
    </head>
    <!--site_idの中身をSI/JST.JaLCからSI/THERS.ISEEに変更 by A. Shinbori-->
    <body>
        <site_id>SI/THERS.ISEE</site_id>
    </body>
</root>
`, "application/xml");
const xml_content = xml.getElementsByTagName('content')[0];

// xml読み込み用のスコープ
(function () {
  const input = document.getElementById("xml-upload");

  // xmlの形式が妥当では無い(XMLとして構文エラーがある場合)はエラーメッセージを出す
  // xmlの構文が妥当でもタグ名や属性名が誤っている場合は無視する
  input.addEventListener("change", (e) => {
    const [file] = e.target.files;
    const filenameFormElement = document.getElementById("xml-filename");

    // 読み込んだXMLのファイル名をフォームに入力
    filenameFormElement.value = file.name;

    file.text()
      .then((text) => xml = parser.parseFromString(text, "application/xml"))
      .then((xml) => {

        xml_to_content(xml);

      });
    input.value = '';
  });
})();

function prettifyXml(sourceXml)
{
  var xmlDoc = new DOMParser().parseFromString(sourceXml, 'application/xml');
  var xsltDoc = new DOMParser().parseFromString([
    // describes how we want to modify the XML - indent everything
    '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
    '  <xsl:strip-space elements="*"/>',
    '  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
    '    <xsl:value-of select="normalize-space(.)"/>',
    '  </xsl:template>',
    '  <xsl:template match="node()|@*">',
    '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
    '  </xsl:template>',
    '  <xsl:output indent="yes"/>',
    '</xsl:stylesheet>',
  ].join('\n'), 'application/xml');

  var xsltProcessor = new XSLTProcessor();
  xsltProcessor.importStylesheet(xsltDoc);
  var resultDoc = xsltProcessor.transformToDocument(xmlDoc);
  var resultXml = new XMLSerializer().serializeToString(resultDoc);
  return resultXml;
};

// ファイルダウンロード用の関数
function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// 最終的に成果物となるXMLを書き出す関数
function xmlToBlob(xml) {
  const serializer = new XMLSerializer();
  const string = prettifyXml(serializer.serializeToString(xml));
  return new Blob([string.replace(/<(.*)\/>/g, '<$1></$1>').replace(/<\/(.*) (.*) (.*) (.*) (.*) (.*) (.*) (.*) (.*) (.*)>/g, '</$1>').replace(/<\/(.*) (.*) (.*) (.*) (.*) (.*) (.*) (.*) (.*)>/g, '</$1>').replace(/<\/(.*) (.*) (.*) (.*) (.*) (.*) (.*) (.*)>/g, '</$1>').replace(/<\/(.*) (.*) (.*) (.*) (.*) (.*) (.*)>/g, '</$1>').replace(/<\/(.*) (.*) (.*) (.*) (.*) (.*)>/g, '</$1>').replace(/<\/(.*) (.*) (.*) (.*) (.*)>/g, '</$1>').replace(/<\/(.*) (.*) (.*) (.*)>/g, '</$1>').replace(/<\/(.*) (.*) (.*)>/g, '</$1>').replace(/<\/(.*) (.*)>/g, '</$1>')], { type: "application/xml" });
}

function downloadXML(xml, filename) {
  const blob = xmlToBlob(xml);
  download(blob, filename);
}

// ダウンロードを実行
function handleDownload() {
  sort_by_sequence(); // データの並び替え

  const filenameFormElement = document.getElementById("xml-filename");
  const filename = window.prompt("出力するXMLのファイル名を入力してください", filenameFormElement.value);
  if (filename === null) {
    return;
  }
  if (filename.length === 0) {
    window.alert('ファイル名を入力してください');
    return;
  }
  downloadXML(xml, filename);
}

const $xmlDownload = document.getElementById('xml-download');
$xmlDownload.addEventListener('click', handleDownload);

// sequenceで並び替え
function sort_by_sequence(){
  // sort_by_sequence_content(); // メタデータ
  const xml_body = xml.getElementsByTagName('body')[0];
  if (!xml_body) {
    return;
  }
  const xml_contents = xml_body.getElementsByTagName('content');
  if (!xml_contents) {
    return;
  }

  index = 0;
  for (const xml_content of xml_contents) {
    sort_by_sequence_creator_list(index); // 作成者
    sort_by_sequence_contributor_list(index); // 寄与者

    index++;
  }
  xml_to_content(xml);

}

// sequence AttribudteによるXMLデータの並び替え
function sort_xml_by_sequence(old_xml, root_name){
  let new_xml = xml.createElement(root_name);

  while( old_xml.children[0]){
    let min_sequence = old_xml.children[0].getAttribute('sequence');
    for( const cnode of old_xml.children) {
      if( min_sequence > cnode.getAttribute('sequence')){
        min_sequence = cnode.getAttribute('sequence');
      }
    }
    for( const cnode of old_xml.children) {
      if( min_sequence == cnode.getAttribute('sequence')){
        new_xml.append(cnode.cloneNode(true));
        cnode.remove();
      }
    }
  }

  return new_xml;
}



/* =================================================== */
// slideUp, slideDown, slideToggle関数を定義
/* =================================================== */

// 要素をスライドしながら非表示にする関数(jQueryのslideUpと同じ)
const slideUp = (el, duration = 300) => {
  el.style.height = el.offsetHeight + "px";
  el.offsetHeight;
  el.style.transitionProperty = "height, margin, padding";
  el.style.transitionDuration = duration + "ms";
  el.style.transitionTimingFunction = "ease";
  el.style.overflow = "hidden";
  el.style.height = 0;
  el.style.paddingTop = 0;
  el.style.paddingBottom = 0;
  el.style.marginTop = 0;
  el.style.marginBottom = 0;
  setTimeout(() => {
    el.style.display = "none";
    el.style.removeProperty("height");
    el.style.removeProperty("padding-top");
    el.style.removeProperty("padding-bottom");
    el.style.removeProperty("margin-top");
    el.style.removeProperty("margin-bottom");
    el.style.removeProperty("overflow");
    el.style.removeProperty("transition-duration");
    el.style.removeProperty("transition-property");
    el.style.removeProperty("transition-timing-function");
    el.classList.remove("is-open");
  }, duration);
};

// 要素をスライドしながら表示する関数(jQueryのslideDownと同じ)
const slideDown = (el, duration = 300) => {
  el.classList.add("is-open");
  el.style.removeProperty("display");
  let display = window.getComputedStyle(el).display;
  if (display === "none") {
    display = "block";
  }
  el.style.display = display;
  let height = el.offsetHeight;
  el.style.overflow = "hidden";
  el.style.height = 0;
  el.style.paddingTop = 0;
  el.style.paddingBottom = 0;
  el.style.marginTop = 0;
  el.style.marginBottom = 0;
  el.offsetHeight;
  el.style.transitionProperty = "height, margin, padding";
  el.style.transitionDuration = duration + "ms";
  el.style.transitionTimingFunction = "ease";
  el.style.height = height + "px";
  el.style.removeProperty("padding-top");
  el.style.removeProperty("padding-bottom");
  el.style.removeProperty("margin-top");
  el.style.removeProperty("margin-bottom");
  setTimeout(() => {
    el.style.removeProperty("height");
    el.style.removeProperty("overflow");
    el.style.removeProperty("transition-duration");
    el.style.removeProperty("transition-property");
    el.style.removeProperty("transition-timing-function");
  }, duration);
};

// 要素をスライドしながら交互に表示/非表示にする関数(jQueryのslideToggleと同じ)
const slideToggle = (el, duration = 300) => {
  if (window.getComputedStyle(el).display === "none") {
    return slideDown(el, duration);
  } else {
    return slideUp(el, duration);
  }
};

/* =================================================== */
// DOM操作
/* =================================================== */

// アコーディオンを全て取得
const accordions = document.querySelectorAll(".js-accordion");
// 取得したアコーディオンをArrayに変換(IE対策)
const accordionsArr = Array.prototype.slice.call(accordions);

function set_accordion_action(){
  accordionsArr.forEach((accordion) => {
    // Triggerを全て取得
    const accordionTriggers = accordion.querySelectorAll(".js-accordion-trigger");
    // TriggerをArrayに変換(IE対策)
    const accordionTriggersArr = Array.prototype.slice.call(accordionTriggers);

    accordionTriggersArr.forEach((trigger) => {
      // Triggerにクリックイベントを付与
      trigger.removeEventListener("click", accordionHandler);
      trigger.addEventListener("click", accordionHandler);
    });
  });
}

function accordionHandler(event){
  // '.is-active'クラスを付与or削除
  this.classList.toggle("is-active");
  // 開閉させる要素を取得
  const content = this.parentElement.querySelector(".accordion__content");
  // 要素を展開or閉じる
  slideToggle(content);

}