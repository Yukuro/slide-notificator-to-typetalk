# How to setup

1. 通知したいスライドと同じディレクトリに適当な名前でGAS(Google Apps script)を作成する

![同じディレクトリに置く](./image/put_to_same_directory.png)

2. Typetalkのボットの設定を画像のように設定をする

![Typetalkの設定](./image/type_talk_settings.png)

- Typetalk Tokenとメッセージ取得と投稿のURLは後で使うのでメモしておく

3. GoogleスライドのIDを取得する(赤線の箇所)

![GoogleスライドID](./image/google_slideid2.png)

4. 作成したGASに../notificator.jsの中身をコピペする

5. 各種情報を../notificator.jsに記述する
- `[[YOUR_BOT_TOKEN]]`
    - Typetalk Tokenの値
- `[[YOUR_CHANNEL_ID_URL]]`
    - メッセージ取得と投稿のURL
- `[[YOUR_SLIDE_ID]]`
    - GoogleスライドのIDの値
- `[[YOUR_NAME]]`
    - Typetalkに投稿されるメッセージでの表示名

6. GASの時計ボタン(現在のプロジェクトのトリガー)を押して定期実行の設定をする

![定期実行ボタン](./image/gas_period_button.png)
![定期実行の設定](./image/period_settings.png)

