
# 🗃️ Readme - 読んでください。本当に。

> [!NOTE] <br>
> Misskey/Firefishのアップデートで使えなくなる場合が予想されます。  
> その場合はこのページで再度インストールを行ってUserScriptをアップデートしても改善しなければ、すぐにこのUserScriptを無効化してください。  
> **誤動作の恐れがあり危険です**
  
アップデートはTempermonkeyのダッシュボードもしくはアイコンから可能です。  
自動更新がされる場合もあります。  
アップデート後は再度Tempermonkeyの設定から使用中のインスタンスのURLを指定する必要がある場合があります。[参考](https://misskey.io/notes/9blrxs48sz)

-----
## 🌟 EmojiSuggest for Misskey v13  
<div align="center"><strong>※割とやばい処理の書き方です<u>(既存のDOMに勝手に属性をつけて汚すなどをしています)。</u>注意を読んでください。※</strong></div><br>

- **Milkteaのように**、Misskeyで自分の居るインスタンスにない絵文字をクリックした際、検索欄に絵文字名を入力し類似の絵文字を検索します。  
- __ご自分のインスタンスをmatchに設定するなどしてからご利用ください__（Tempermonkyの設定を開き、利用するインスタンスのアドレスを追加）。

<br />

### ⚠️ 危険性 - とても大切です
**このReadme及び同時に提供されるemoji_suggest_GPL.user.jsなどはライセンスはGPLv3です**、***無保証***で提供されます！！！！  
 - つまり、このUserScriptを書いたIrihiは、このUserScriptを使用したことで利用者に生じた**いかなる損害に対しても一切責任を取ることができません。**  
 - 冒頭に書いたとおりかなりやばい書き方なのでソースコードを一度読んで処理内容を把握することをおすすめします。  
 - **勝手にボタンを押す機能、勝手に入力する機能があります**
   - おそらくランダム生成されるであろうタグ名を使用してDOMを取得している部分があります
   - Misskeyの仕様でこのタグのクラス名はなかなか変わらないものであるということが言われていますが、これがかわってしまった際に意図しないボタンを押すことがあるかもしれません。
 - これらの特性により、Misskey/Firefishのアップデートによって**勝手に意味不明のノート**をしてしまったり、
   - <strong>もしも今後のアップデートで課金機能が導入されたとしたら、誤動作で課金ボタンを押してしまう恐れさえあります</strong>
 - また、今後のアップデートにより簡単に動かなくなってしまう可能性が大きいです。
 - Misskeyそのものを使えなくしてしまう可能性もあります。
 - またDOMの変更があったら毎回関数を読んでいるので、必要ない処理は減らしているものの、おそらく大きなパフォーマンスの低下があります。

## 🚀 動作環境
検証はFirefoxでしか行っていません。\
Tempermonkeyのみの対応です。\
他では動作検証しておらず危険ですので使わないことを強くおすすめします。

## ✅ インストール、有効化
**このReadmeをしっかり読んだ方**は、インストール後TempermonkeyのダッシュボードからEmojiSuggestのコードを開き、変数`agree`に代入してある`false`を`true`に変更してください  
インストールは、user.jsファイルをGithub上で開き、Tempermonkeyをインストールしたブラウザで、`Raw`ボタンをクリックしてインストールしてください  
もしくは、こちらから。\
**[🐠 Firefish用](https://github.com/irhdevel/EmojiSuggest/raw/main/GPL_emoji_suggest_for_firefish.user.js)** | 
**[🌏 Misskey用](https://github.com/irhdevel/EmojiSuggest/raw/main/GPL_emoji_suggest_for_misskey.user.js)**
### ソースコード
Firefish用（このリンクを開いてビューワ上のRawボタンよりインストールすることも可能）\
[GPL_emoji_suggest_for_misskey.user.js](https://github.com/irhdevel/EmojiSuggest/blob/main/GPL_emoji_suggest_for_misskey.user.js)\
ソースコードMisskey用（このリンクを開いてビューワ上のRawボタンよりインストールすることも可能）\
[GPL_emoji_suggest_for_firefish.user.js](https://github.com/irhdevel/EmojiSuggest/blob/main/GPL_emoji_suggest_for_firefish.user.js)
## 📜 Changelog
変更履歴です。
 - 0.1 - 公開
 - 0.2 - 英語環境でしか動かなかった問題を修正  
 重くなっていた原因、クラスが何も指定されてないオブジェクトをスルーするようにした。
 - 0.2.1 - 同意しなくても同意されているとして処理されていたので修正
 - 0.2.2 - 4回行っていたforループを一回に減らして軽量化、エラーダイアログの再利用を可能にした、既存のタグの属性にリスナ付与済みかどうかを追加する際のもともとの動作に干渉する確率を減らした
 - 0.2.3 - Firefish版を追加。Firefish用に最適化したもので、このバージョンはFirefish専用です。
 - 0.2.4 - Misskey版のアップデートURLを更新しました。\
今後はこのリポジトリのものがアップデートされます。Misskey専用のバージョンです。
 - 0.2.5 - Firefish版のアップデートURLを更新しました。Firefish専用のバージョンです。
