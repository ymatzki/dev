# React入門 React・Reduxの導入からサーバサイドレンダリングによるUXの向上まで

- [React入門 React・Reduxの導入からサーバサイドレンダリングによるUXの向上まで（穴井宏幸 石井直矢 柴田和祈 三宮肇）｜翔泳社の本](https://www.shoeisha.co.jp/book/detail/9784798153353)

# memo

- reactとは
  - 以下の技術を使ってブラウザのレンダリングの処理を効率化したもの 
    - Virtual dom
    - jsx

- flux
  - アーキテクチャの一つ
  - Action dispatch store view という流れを取ることでデータのフローを一方向にし、複雑なアプリケーションにおいても不整合が起きづらい仕組み
    - action
        - 単なるオブジェクト
        - Action をdispatchすることでActionがstoreに渡される。
            - 「商品をカートに追加する」「商品を購入する」「モーダルを表示する」「キャッシュをしていたデータをリセットする」
    - dispatcher
        - すべてのデータのがなれを管理する
        - 単なるevent emitter
        - dispatchされたデータはStoreが受けろることができる
    - Store
        - アプリケーションの状態(state)とロジックを保持。
        - アプリケーション独自のドメインで状態を管理できる。
        - dispatcherによって渡されてくるActionを受け取り、アプリケーションの状態を変化させる。
        - Storeの内容が更新されるとそれをViewが検知して再描画画が走る。


- ReduxとはFluxアーキテクチャの一つ
  - 3つの原則がある
    - Single source of truth
      - アプリケーション内のすべての状態を一枚岩の大きなオブジェクトとして管理
      - デバッグやテストが容易になる。
      - 状態をどこからでも取り出せるため、アプリケーションの実装がシンプルになる。
    - state in read-only
      - 状態の参照はどこからでもできるが変更はできない。
      - ActionをDispatchすることが変更する唯一の方法。
      - データの流れが完全に一方こうになり余計な副作用が生まれない
    - changes are made with pure function
      - 純粋関数とは「同じ入力値を渡すたび、決まって同じ出力値が得られる関数」
  - Reducer
    - 状態を変化させる関数
      - Actionを入力値として受け取り
      - 状態を変化させ
      - 出力する 
  - object spread operator
      - `...variables` といった書き方でオブジェクトを表現するやりかた
      - 値コピーになるのでimutable

- jsx
  - jsを拡張した言語 
  - reactのサンプルコードはjsxを使って書かれている。
  - jsxを使わずにreactを使うことは可能。
    - 可読性が格段に違う。
 
 
- create-react-app
  - babelを使ってトランスパイルしている
    - jsx -> javascript

- webpack
  - モジュールハンドラー
      - ES ModuleやCommonJSのモジュール方式で記述されたソースファイルを束ねて、ブラウザで実行可能な静的なJavaScriptファイルを出力する。
  - 従来は作成したアプリケーションに必要なリブラ理をscriptタグで追加する必要があったが不要になった。
  - webpackのloaderを使ってJSXのトランスパイルを行うことで、ビルドプロセスをwebpackに統一することができる。 

- react component
    - React Element
        - `<Hello />` のようなもの
        - React コンポーネントをクラスに例えるなら、Reactエレメントはインスタンスのようなもの
    - Reactコンポーネントは単一の親からなる要素しか表現できない。
        - 以下のように2つの要素が並列にあるようなコンポーネントは作成できない。
            - ```JavaScript
              // NG
              const Hello = () => {
                return(
                  <div>こんにちは</div>
                  <div>坂本竜馬さん</div>
                );
              };
              ```
            - ```JavaScript
              // OK
              const Hello = () => {
                return(
                  <div>
                    <div>こんにちは</div>
                    <div>坂本竜馬さん</div>
                  </div>
                );
              };
              ```
  - 関数の引数にpropsという名前を付けているが、どんな変数名でも良い。propsと名付けるのが一般的。
  - bind = JavaScriptは関数を変数として引き渡すことができる。
      - しかしコンテキストは受け渡されない。(thisが何を指すのか？)
      - 変数として渡された関数は、別コンポーネントや別DOMで実行される。
          - 元のコンポーネントのstateが利用できない。
      - bindすることで元のコンポーネントのstateを参照できる。

- ライフサイクル
    - Reactコンポーネントの初回render = マウント
    - 2回目以降はアップデート
    - DOMが上からなくなったときはアンマウント
    - マウントに関するライフサイクルメソッド
        - componentWillMount
            - マウントされる直前に呼ばれる
        - componentDidMount
            - マウントされた直後に呼ばれる
        - componentWillUnmount
            - アンマウントされる直前に呼ばれる

- Reduxでアプリケーションの状態を管理
    - ReactはStateを用いてアプリケーションの状態をすべて管理している
    - コンポーネントを細かく分割するとコンポーネント間でProps経由で状態の共有が必要となる
        - よってアプリケーションが大きくなるほど共有が困難になっていく。
    - Reduxを用いてアプリks-ションの状態を管理する。
    - reactはViewライブラリ
    - アプリケーションの状態(state)とロジックを保持している
    - reducer = store が保持している状態を変化させるための関数
    - action = ユーザからの入力。APIからの情報取得など何らかの状態変化を引き起こす現象。

- react-reduxとうライブラリがある
    - これを用いることで状態の変化(dispatchなど)をReact側にバインディングすることができる
    - react-redux内でsubscribeの仕組みが隠蔽され、Storeの状態が変化するとReactのViewが更新されるというシンプルな流れになっている。
    - 実際のアプリケーションはViewが多段校オズになっていた場合にViewのみ再描画するのは骨がおれる。
    - react = viewを扱い。reduxはstoreやactrionを有する。
    - container component
        - reactのコンポーネントをラップしたコンポーネント。
        - reduxのstoreやactionを受け取り、reactコンポーネントのpropsとして渡す役割を担う。
        - reactとreduxの橋渡が責務。
        - ここでJSXを記述するのは誤り。
            - usecase層みたいなもん
    - presentational component
        - redux依存の無い純粋なreactコンポーネント。
            - controller層みたいなもん
    - `<Provider>` と connectが react-reduxライブラリの役割。

- routing
    - 本書で紹介されているreact-router-reduxはdeprecatedになっており、connected-react-routerになっている。

- redux middleware
    - redux単体は非常に軽量なアーキテクチャ。
    - redux単体では提供していない機能も多数ある。
    - reduxはmiddlewareと呼ばれる拡張機能をサポートしている。

- テスト
  - 以下の条件にマッチしたフィルをテストコードとして認識しテストを実行
      - __test__ディレクトリ内で勝つファイル名の末尾が.jsのファイル
      - ファイル名の末尾が.test.jsのファイル
      - ファイル名の末尾が.spec.jsのファイル

- Jest
    - create-react-appに標準搭載されている

- redux-mock-store
    - Reduxの非同期ActionCreatorのテストをするためのライブラリ

- jest-fetch-mock
    - jest + fetch を用いてる際にAPIリクエストのモックをかんたんに行えるようにするライブラリ

- shallow rendering
    - [Shallow Renderer – React](https://ja.reactjs.org/docs/shallow-renderer.html)
    - [Enzymeのshallowとinstanceの違いに関して - Qiita](https://qiita.com/kotaonaga/items/d71c2912d6ddc60651db)
    
- サーバレンダリング
    - SPAがブラウザ上で構築するDOM構造をサーバサイド側で予めHTMLとして生成しブラウザに返す手法。
    - メリット
        - 初期表示が早い
        - JS未対応のレガシーブラウザにコンテンツを表示できる
    - デメリット
        - サーバの負荷が高い
            - コンポーネントの数が多ければ多いほどReaｃｔElementの構造を生成する処理にCPUもメモリも消費する
                - ブラウザからリクエストごとに実行する
                - キャッシュなどの工夫が必要
        - アプリケーションが複雑になる
            - React単体ならよいが、Reduxによる状態管理やreact-routerなどのページングが絡んでくるとサーバサイドレンダリングの実装が複雑になる。
    - 以前は検索エンジンのクローラがJavaScriptを実行できなかったためSEO対策の一環としてやるめりっとはあったが今はJavaScriptを解釈できるのでその点はあまりメリットはない。


## 構成
- 説明 ｰ> 実践という流れでサンプルを作っていく。

## bad


- 誤字が多い
    - ファイル名が違うなど
- 示されているサンプルコードがスニペットなのか実際に手を動かす演習なのか分かりづらい
- 説明のコードがどこのソースなのか分かりづらい
    - action? component? reducer? store?
- deprecatedがいくつかある(これは仕方がない気がするが。。。)
    - react-router-redux
        - connected-react-routerになっている
    - material-ui
        - Reboot -> CssBaseline
        - Button -> @material-ui/core/button
- historyが動かない
    - https://qiita.com/engineer_yusuke/items/3c0e51d3f0da53c4ac3a

###### tags: `React入門 React・Reduxの導入からサーバサイドレンダリングによるUXの向上まで`
