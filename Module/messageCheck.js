function messageCheck(Kakao, room, msg, sender, replier, packageName) {
  //명령어 처리.
  if (msg.startsWith("/업비트")) {
    PriceUpbitStockFuntion(Kakao, room, msg, sender, replier, packageName);
    return;
  }
}

module.exports = messageCheck;
