Note: This document is in progress.

# Google Cloud Platform 実践 ビッグデータ分析基盤開発ストーリーで学ぶGoogle BigQuery

[Google Cloud Platform 実践 ビッグデータ分析基盤開発ストーリーで学ぶGoogle BigQuery](https://www.amazon.co.jp/dp/B0824F8ZZD/)

- [サンプルファイルのダウンロード](https://www.shuwasystem.co.jp/support/7980html/5956.html)

## BigQueryを使ってみよう

- クエリ履歴は一定期間及び一定件数を超えると履歴から消えてく。
    - 6ヶ月
    - 1000エントリ
- 消したくない場合クエリを保存しておくのが良い。

- Quota設定が可能。
    - Query usage / 日
    - Query usage / 日 / ユーザ
- 1TB/日などを設定しておくとUSリージョン換算で$5のあたりで上限になる。

- 対応形式。
    - CSV
    - JSON
    - Avro
    - Parquet
    - ORC

- エンコードはUTF-8。
    - ISO-8859-1形式も指定可能だが内部でUTF-8へ変換される。

- データセット
    - リソースをグルーピングして管理する機能
        - テーブル
        - ビュー
        - ファンクション
    - 必ず1つのプロジェクトに属する。
    - ラベルにはKey valueで値を設定できる
        - リソースの検索枠でラベル単位で絞り込みできる
            - 開発と本番
            - データセットの分類
    - デフォルトのテーブルの有効期限も設定できる
        - 指定した日すを経過すると自動で削除
        - 設定を変更しても既存のテーブルには影響しない
            - 設定以降に作成したテーブルのみ適用される

- データセットのロケーション。
    - データセット作成後にロケーション変更はできない。
    - 1つのクエリは必ず同じロケーションにあるテーブルを参照する必要がある。

- テーブル内のデータが90日間編集されていなければそのテーブルのストレージ料金が50%近く自動で値引きされる

- select 結果を新たなテーブルとして保存できる
    - 方法は以下の2つ
        - destination table
        - create table as select

- 標準SQLとレガシーSQL
    - BigQuery SQLという非標準SQL言語を使用してクエリを実行していた。
    - BigQuery 2.0のリリースに伴い標準SQLのサポートが開始。
        - その際にBigQuery SQLはレガシーSQLと改名された。
    - 公式ドキュメントにレガシーSQLと標準SQLがあるので注意が必要。

- プロジェクトIDにハイフンを含む場合バッククォートで囲む必要がある。

- Google スプレッドシートにBigQueryコネクタという機能がある。
    - 以下のプランで使える
        - G Suite Business
        - G Suite Enterprise
        - G Suite for Education
    - 2019/11時点で最大10,000行までしか読み込めないように制限されている。

- Google データポータルを見るとわかる。

- Google Cloud Storage
    - GCSからBigQueryへの読み込みはリージョンの注意が必要。
    - 同じリージョンにしたほうが良い。

- 複数ファイルのでデータ読み込みはいくつかやり方がある
    - bq loadコマンドを使う
    - BigQuery Data Transfer Serviceを使う
    - 外部ソースに対するクエリを使う

- bq loadコマンドでgcsからデータをロードする

- BigQuery Data Transfer Service
    - Google広告やアドマネージャからのデータの移動を自動化。
    - Scheduled queriesを使って定期的にデータの読み込み、加工、テーブル生成、更新ができる
    - AWSのS3やRedshiftからの読み込みも可能。
    - GCSからの読み込みは以下の注意点がある
        - バケット内のファイルが処理対象になるには、そのファイルがバケットに置かれてから1時間以上経過すること
        - 転送を設定する前に宛先テーブルが作成されていること
        - GCS上の対象ファイルと宛先テーブルのスキーマが一致していること
        - 書き込み設定はテーブルに追加(WRITE_APPEND)のみ指定可能であり、殻の場合に書き込み(WRITE_EMPTY)や上書きは指定(WRITE_TRUNCATE)できない。

- BigQueryはフェデレーションデータリソースと呼ばれる、外部データソースを参照してクエリを実行できる。
    - 注意点がある。
        - クエリ中にモドデータを操作するとデータの整合性が保証されない
        - クエリ結果はキャッシュされない
        - BigQueryのデータセットと外部データソースは同じロケーションに配置する必要がある。

- `bq load` は同じスキーマのデータソースをimportできる
```
$ bq load --autodetect import.sales_from_bq_load "gs://example-import/sales/*csv"
```