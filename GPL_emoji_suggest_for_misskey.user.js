// ==UserScript==
// @name         EmojiSuggest - Misskey
// @namespace    irihi_design
// @version      0.2.4
// @description  ※割とやばい処理の書き方です※ - Misskeyで自分の居るインスタンスにない絵文字をクリックした際、検索欄に絵文字名を入力し類似の絵文字を検索します。ご自分のインスタンスをmatchに設定するなどしてからご利用ください。
// @author       Irihi_design
// @match        https://misskey.io/*
// @grant        none
// @run-at       document-idle
// @updateURL    https://github.com/irhdevel/EmojiSuggest/raw/main/GPL_emoji_suggest_for_misskey.user.js
// @downloadURL  https://github.com/irhdevel/EmojiSuggest/raw/main/GPL_emoji_suggest_for_misskey.user.js
// @supportURL   https://github.com/irhdevel/EmojiSuggest
// ==/UserScript==

(function() {
    let agree = false;
    // 表示されてるサイトでどれでも良いけど何かしらのDOMが変更されたとき毎回毎回Check関数を実行（なのですごい実行することになる、やばい実装だと思う。）
    // ただSPAだし、どのDOMを監視すべきなのか、どのDOMがいつ作成されるかわかんない問題とかあるから、どうすればいいかわかんないしこうしておく
    if(agree){(new MutationObserver(check)).observe(document, {childList: true, subtree: true})}else{alert("このダイアログはEmojiSuggestにより表示されています。\n現在EmojiSuggestは無効状態です\n無保証で提供されていること、危険性を理解した上で、Readmeに書いてある方法を読み有効化してください")};

    // すでにインスタンスに存在しない絵文字に対しリスナを設定済みかどうか確認（付与済みかどうかはset_onclick属性がついてるかどうかで判断、つまりこのUserScriptは勝手に既存のHTML要素に属性を追加してそれを後の判断材料にしまう！これってやばい？？？）
    // 確認のあと、付与されていないようであればリスナを付与
    function setOnclickAttr(info){
        // デバッグ用(必要以上にこの関数が呼ばれてないか(まあ呼ばれてるんだけど)一応チェック)
        //console.log("ノートの受信が感知されたため、別インスタンス絵文字変換用のUserScriptの関数が呼ばれました")
        let emojielems = document.querySelectorAll(".xDRXD._button:not(.xhTzr)")

        emojielems.forEach(function(e){
            let elem = e
            if (!elem.getAttribute("emojisuggest_set_onclick")) {
                elem.setAttribute("emojisuggest_set_onclick", "true")
                elem.addEventListener(
                    'click',
                    function(){
                        //alert("Hi!")
                        // 絵文字の名前取得
                        let emojiName = elem.querySelector("img[title]").title
                        console.log("selected emoji which no exist in this instance:" + emojiName)
                        // 投稿の要素全体を取得 -> その中のボタン(classにxviCyがついてて、中にti-plusクラスのついたアイコンがあるやつ)を取得
                        // そしたらそのボタンをクリックする
                        if (info == 0) {
                            elem.closest("article").querySelectorAll("._button.xviCy").forEach((e)=>{
                                if(e.querySelector("i").classList.contains("ti-plus")){
                                    e.dispatchEvent(new CustomEvent('mousedown'))
                                    // ボタン押してから絵文字ピッカーが開くまでのラグに対応するために仕方なく待たせる
                                    setTimeout(function(){
                                    inputEmojiId(emojiName)
                                    },200);

                                }
                            })
                        } else {
                            elem.closest("article").querySelectorAll("._button.button").forEach((e)=>{
                                if(e.querySelector("i").classList.contains("ti-plus")){
                                    e.dispatchEvent(new CustomEvent('mousedown'))
                                    setTimeout(function(){
                                    inputEmojiId(emojiName)
                                    },200);
                                }
                            })
                        }
                    },
                    true
                )
            }
        }
                          )
    }
    //:<絵文字ID>@<インスタンス名>:という感じになってるので、絵文字IDだけ抽出する
    function emojiIdAdjust(id){
        // "@"以降削除(split)、冒頭の:削除(slice)
        return id.split('@')[0].slice( 1 )
    }
    function inputEmojiId(name){
        let searchInput = document.querySelectorAll(".xr8AW>.omfetrab>input.search[data-prevent-emoji-insert]")
        // 一応保険でホントに絵文字セレクタなのか確認するために条件分岐しとく(これで他の場所入力されてたらやばいしね)
        if (searchInput.length == 1 && searchInput.item(0).nextElementSibling.classList.contains("emojis")) {
            searchInput.item(0).value = emojiIdAdjust(name)
            searchInput.item(0).dispatchEvent(new CustomEvent('input'))
        } else {
            errorDialog("絵文字検索欄が見つかりませんでした。")
        }
    }
    function errorDialog(msg){
        alert(msg + "バグもしくはMisskeyのアップデートによりUserScriptが壊れています。\n\n==複数回試してもこのエラーが連発する場合==\n修正のアップデートを確認し、なければ今すぐこのUserScriptを無効化してください。")
    }
    function check(MutationList, observer) {
        // 一応毎回毎回DOM変更あるたびにqueryselectorAllしてたらヤバそうだし、せっかくだから何のDOM変更なのかだけチェックする
        // ただこれもDOM変更のたびにチェックが走るのでquerySelectorAllよりは軽そうだけど絶対重い。
        MutationList.forEach(
            (m)=>{
                m.addedNodes.forEach((e)=>{
                    if(e.classList != undefined && e.classList.contains("note")){
                        // ノートを詳細表示時のDOM変更
                        setOnclickAttr(1)
                    } else if(e.classList != undefined && e.classList.contains("xcSej")) {
                        // ノートが流れてくる時のDOM変更

                        setOnclickAttr(0)
                    } else if(e.classList != undefined && e.classList.contains("xDRXD")) {
                        // ノートが流れてくる前に絵文字が追加されたとき用の、絵文字追加時のDOM変更
                        setOnclickAttr(0)
                    } else if(e.classList != undefined && e.classList.contains("xu3k3")) {
                        // 下にスクロールしてノートが流れる時のDOM変更
                        setOnclickAttr(0)
                    }
                }
                                    )
            }
        )
        //observer.disconnect();
        // デバッグ用（追加されたノードをすべてコンソールに出力する）
        //MutationList.forEach(function(m){m.addedNodes.forEach((e)=>{console.log(e)})})
    }
})();
