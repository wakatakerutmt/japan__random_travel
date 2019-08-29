// 選択候補
var prefectureList = ["三重県", "岡山県", "岐阜県", "鳥取県", "香川県"];

var prefectures = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県"
];

var isStop = true;
var resultText = "";

// 効果音再生

var audioElem;

function PlaySound() {
  audioElem = new Audio();
  audioElem.src = "mp3/se.mp3";
  audioElem.play();
}
function StopSound() {
  audioElem.pause();
}

function startBingo() {
  // ボタンの表示切り替え
  document.querySelector("#start").style.display = "none";
  document.querySelector("#stop").style.display = "inline";
  isStop = false;
  roulette();
}

function stopBingo() {
  // ボタンの表示切り替え
  document.querySelector("#start").style.display = "inline";
  document.querySelector("#stop").style.display = "none";
  isStop = true;
}

function roulette() {
  var id = "";
  var rnd1 = Math.floor(Math.random() * prefectures.length);
  var rnd2 = Math.floor(Math.random() * prefectureList.length);

  // ストップボタンが押された
  if (isStop) {
    if (prefectureList[rnd2] != "三重県") {
      rnd2 = Math.floor(Math.random() * prefectureList.length);
    }
    document.querySelector("#view").style.display = "none"; // 文字を消す
    resultText = prefectureList[rnd2];
    // 遅延呼び出しを解除
    clearTimeout(id);
    starfall(); // 星降らせる
    textAppear(); // エフェクト文字を表示する

    setTimeout("PlaySound();", 2000);

    return false;
  }

  // 乱数を画面に表示
  document.querySelector("#view").innerHTML = prefectures[rnd1];
  // 100ms後に再帰的に実行するよう登録する
  id = setTimeout("roulette()", 90);
}

//-------- 星降らせる -------------------------------------------
function starfall() {
  //使用例。星を50個ふらせます。
  starMaker(50);
}

//星を作る関数。n は星の個数。多いほど星が多く振ります。
function starMaker(n) {
  var star = document.createElement("div");
  star.className = "star";
  star.textContent = "★";
  for (var i = 0; i < n; i++) {
    starSet(star);
  }
}

//星のセッティングをする関数。
function starSet(clone) {
  var starClone = clone.cloneNode(true);
  var starStyle = starClone.style;

  //星の位置（left）、アニメーションの遅延時間（animation-delay）、サイズ（font-size）をランダムで指定
  starStyle.left = 100 * Math.random() + "%";
  starStyle.animationDelay = 8 * Math.random() + "s";
  starStyle.fontSize = ~~(50 * Math.random() + 20) + "px";
  document.body.appendChild(starClone);

  //星一つのアニメーションが終わったら新しい星を生成
  starClone.addEventListener(
    "animationend",
    function() {
      this.parentNode.removeChild(this);
      var star = document.createElement("div");
      star.className = "star";
      star.textContent = "★";
      starSet(star);
    },
    false
  );
}

// ------------ 文字のアニメーション------------------------------

function textAppear() {
  var tl = new TimelineLite(),
    inter = 30,
    speed = 1,
    $text = $(".text");
  function animInfinite() {
    $(".text").each(function(index, val) {
      $(this).text(resultText);
      index = index + 1;
      TweenMax.fromTo(
        $(this),
        speed,
        { autoAlpha: 0 },
        { autoAlpha: 0 + 0.01 * index, delay: 0.1 * index }
      );
    });
    TweenMax.to($(".text:nth-child(30)"), speed, {
      autoAlpha: 1.5,
      delay: 3.5
    });
  }
  animInfinite();
}
