const { KakaoLinkClient } = require("kakaolink");
const InfoPath = "sdcard/msgbot/Bots/HyoungminBot/Info.json";
const infojson = JSON.parse(FileStream.read(InfoPath));

const kakaoapikey = infojson["AccountInfo"]["KaKao_APIKey"];
const KaKao_Email = infojson["AccountInfo"]["Kakao_Email"];
const KaKao_Email_PassWord = infojson["AccountInfo"]["KaKao_Email_PassWord"];
const Kakao = new KakaoLinkClient(kakaoapikey, "http://naver.com");

const ImageDB = com.xfl.msgbot.script.api.legacy.ImageDB;
const Replier = com.xfl.msgbot.script.api.legacy.SessionCacheReplier;

Kakao.login(KaKao_Email, KaKao_Email_PassWord);
const scriptName = "CoinBot";
const PriceBinanceFutureFuntion = require("CoinModule/Price.biance.future");
const PriceBinanceStockFuntion = require("CoinModule/Price.binance.stock");
const PriceUpbitStockFuntion = require("CoinModule/Price.upbit.stock");
const TradingBinanceFutureFuntion = require("CoinModule/Trading.binance.future");
const TradingBinanceStockFuntion = require("CoinModule/Trading.binance.stock");
const TradingUpbitStockFuntion = require("CoinModule/Trading.upbit.stock");

Device.acquireWakeLock(android.os.PowerManager.PARTIAL_WAKE_LOCK, "");

function responseFix(
  room,
  msg,
  sender,
  isGroupChat,
  replier,
  imageDB,
  packageName
) {
  if (sender != "김형민") return;

  if (isGroupChat == false) {
    room = sender; //개인톡은 room이 null로들어와서 변경.
  }
  if (msg.startsWith("/")) {
    messageCheck(Kakao, room, msg, sender, replier, packageName);
  }
}

const H = 22;
const M = 40;
const room = "김형민";
const msg = "타이머테스트";

let Timer = setInterval(() => {
  date = new Date();
  if (date.getHours() == H && date.getMinutes() == M && date.getSeconds() == 0)
    Api.replyRoom(room, msg);
}, 600);

function onStartCompile() {
  clearInterval(Timer);
}

function onNotificationPosted(sbn, sm) {
  var packageName = sbn.getPackageName();
  if (!packageName.startsWith("com.kakao.tal")) return;
  var actions = sbn.getNotification().actions;
  if (actions == null) return;
  var act = actions[actions.length - 1];
  var bundle = sbn.getNotification().extras;

  var msg = bundle.get("android.text").toString();
  var sender = bundle.getString("android.title");
  var room = bundle.getString("android.subText");
  if (room == null) room = bundle.getString("android.summaryText");
  var isGroupChat = room != null;
  var replier = new com.xfl.msgbot.script.api.legacy.SessionCacheReplier(
    packageName,
    act,
    room,
    false,
    ""
  );
  var icon = bundle
    .getParcelable("android.messagingUser")
    .getIcon()
    .getBitmap();
  var image = bundle.getBundle("android.wearable.EXTENSIONS");
  if (image != null) image = image.getParcelable("background");
  var imageDB = new com.xfl.msgbot.script.api.legacy.ImageDB(icon, image);
  com.xfl.msgbot.application.service.NotificationListener.e.put(room, act);
  responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName);
}
