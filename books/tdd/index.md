Note: This document is in progress.

# テスト駆動開発  

- [テスト駆動開発](https://www.amazon.co.jp/dp/B077D2L69C/)

## memo

### まえがき

- テスト駆動開発のゴールは「動作するきれいなコード」。

- 2つのルールしか無い。
    - 自動化されたテストが失敗したときのみ、新しいコードを書く。
    - 重複を除去する。
- このルールはプログラミングにおける作業の順序と同じ。
    - レッド: 動作しない、おそらく最初のうちはコンパイルも通らないテストを一つ書く。
    - グリーン: テストを迅速に動作させる。このステップでは罪を犯しても良い。
    - リファクタリング: テストを通すために発生した重複をすべて除去する。

### 第1章 仮実装

- TDDのリズム。
    1. 小さいテストを1つ書く。
    1. すべてのテストを実行し、1つ失敗することを確認する。
    1. 小さい変更を行う。
    1. 再びテストを実行し、全て成功することを確認する。
    1. リファクタリングを行い、重複を除去する。

- コンパイラを通すだけの中身が空の実装を「空実装」と呼ぶ。

### 第2章 明白な実装

- TDDのサイクル
    - テストを書く。
        - ほしいと思うインターフェースを創作する。
    - 動かす。
        - テストがグリーンバーになる状態に素早く到達する。
        - 実装に時間がかかりそうならTODOリストに書き、まずは何でもいいからとにかく動かすようにする。
    - 正しくする。
        - 重複の排除などを行う。
- 最初に「動作する」に取り組み、そのあとで「きれいな」に取り組む。
    - アーキテクチャ駆動は真逆。

- TDDの3つの戦略
    - 仮実装
        - まずはハードコーディングして、実装していきながら徐々に変数に置き換える。
    - 明白な実装
        - 頭の中の実装をコードに落とす。
    - 三角測量
        - 次の章で解説
- 書くべきコードが明白なのであれば「明白な実装」をし、そうでなければ「仮実装」をする。
    - 2つの実装モード(「明白な実装」と「仮実装」)を行ったり来たりする。
    - 「明白な実装」のみでコードが書ける場合は、明白な実装を続ける。
    - この際もテストを動かし続け、自分が明白だと思っていることが正しいか確かめる。
    - 予期しないレッドバーを目にしたら「仮実装モード」にシフトする。

### 第3章 三角測量

- ある整数に1を足すとき、私達は元の整数が変更されるとは考えず、新しい値が得られると考えられる。
- オブジェクトの振る舞いは異なる。
    - 保険契約オブジェクトがあるとして、契約条項にもう一つ条項を加えたら、元の保険契約の契約条項が変更される。

- Value Objectパターン
    - コンストラクタで設定したインスタンス変数の値が変わってはならないという制約がある。
    - メリットは別名参照(aliasing)を気にする必要がなくなる。
        - 例えば小切手オブジェクトを作り、5ドルを代入。
        - 別の小切手オブジェクトを作り、先程と同じインスタンス(5ドル)を代入。
        - 最初の小切手オブジェクトを変更すると意図せず2つ目の値も変わってしまう。
    - Value Objectであるためには、操作はすべて新しいオブジェクトを返さなければならない。
        - immutableにする。

- TDDにおける三角測量
    - 2つ以上の実例を使ってコードを一般化する。
        - `assertTrue(new Dollar(5).equals(new Dollar(5)))`
        - `assertFalse(new Dollar(5).equals(new Dollar(6)))`

- 三角測量は少し奇妙なやり方。
    - どうやってリファクタリングしたらよいか全くわからないときにしか使わない。
    - プロダクトコードやテストコード間の重複を一般化して取り除く方法が見えているのであれば、わざわざやる必要がない。

- この章の振り返り。
    - Value Objectパターンを満たす条件がわかった。
    - その条件を満たすテストを書いた。
    - シンプルな実装を行った。
    - 2つのテストを同時に通すリファクタリングを行った。

### 第4章 意図を語るテスト

- 前章まででテストは雄弁になった。
- しかし、Dollarのtimes関数の返り値が、自身の金額と引数を掛けた値を保持するDollarオブジェクトを返すことは伝わりにくい。
  - Dollarのフィールド変数と数値を直接比較するのをやめて、Dollarオブジェクト同士を比較させる。
- オブジェクト同士を比較することで、フィールド変数をexportedをunexportedに変更できる。
    - = privateにできる。
- Dollarオブジェクト同士を比較するように変更したが、これはリスクがある。
    - 等価性能比較のテストが、等価性能比較が正確に実装されていることを検証できなければ、掛け算のテストもきちんと掛け算ができていることを検証できていないことになる。
- TDDは完璧を求めるものでない。
    - すべてのものをコードとテスト両方の視点から捉えることによって欠陥を減らし、自身を持って前にすすめるようになろうと考えている。
    - ときには自分の思慮が外れて、欠陥を見逃すこともある。
        - その時はどんなテストが書かれているべきであったかという教訓を（テストとういう）かたちにして先に進む。


- 作成したばかりの機能（Dollarオブジェクトを返すtimes関数)を使って、テストを改善した
- 正しく検証できてないテストが2つあったら、もはやお手上げだと気づいた。
    - *testMultiplicationとtestEquality両方必要ということだろうか？*
- そのようなリスクを受け入れて先に進んだ。
- テスト対象オブジェクトの新しい機能を使い、テストコードとプロダクトコード間の結合度を下げた。

### 第5章 あえて原則を破るとき

- 多国通貨の足し算に取り組みたいがすぐに実装できる自身がない。
    - DollarのテストをコピーしてFrancのテストを作る。
- コピー&ペーストによる再利用は抽象化の敗北できれいな設計を殺す。という価値観がある。
- そんなときは、フェーズを思い出す。
    1. テストを書く。
    1. コンパイラを通す。
    1. テストを走らせ、失敗を確認する。
    1. テストを通す。
    1. 重複を排除する。
- 各フェーズにはフェーズなりの目的と解決方法があり、価値観も異なっている。
    - 最初の3フェーズはなるべく早く通過して新しい機能がどの状態にあるかわかるところまで行きたい。
    - そこにたどり着くためにはどのような罪を犯しても良い。
    - その短い時間だけは、速度が設計よりも重要。
- 良い設計の原則を無視していいわけではない。
    - ステップ5番目の「重複を排除する」がなければ無意味。
        - 正しい設計を、正しいタイミングで行う。
            - 動かしてから、正しくする。

- 大きいテストに立ち向かうにはまだ早かったので、次の一歩をすすめるために小さなテストをひねり出した。
- さらに恥知らずにも、既存のモデルコードをまるごとコピー＆ペーストして、テストを通した。
- この重複を排除するまで家に帰らないと心に決めた。

### 第6章 テスト不足に気づいたら

- 「準備することこそは彼の人生そのものであった。彼は準備し、そして片付ける」
    - Wallace Stegner著 Crossing to Safety

- Moneyクラスを作りDollarとFrancはMoneyクラスを継承させるようにした。

- テストが足りないコードを発見した際には、あればよかったと思うテストを書く。

### 第7章 疑念をテストに翻訳する

- DollarクラスとFrancクラスを比較したらどうなるかという疑念に駆られたのでテストを書く。
- JavaのサンプルコードではDollarとFrancをMoneyクラスにcastして比較しているため、両者が同じものとして扱われてしまう。
    - 「ドルとフランが等しい」という結果になる。
    - 「ドルとフランは異なる」という結果が当然の期待値。
    - 余談だがgolangでは継承が無いので、書き方にもよるが期待値通りfalseになる。
        - というかコンパイルエラーになる。

- 2つのMoneyオブジェクトの金額と実クラスがともに等しいときのみ等価であると判断するように変更する。

```Java
class Money {
    protected int amount;
    public boolean equals(Object object) {
        Money money = (Money) object;
        return amount == money.amount
            && getClass().equals(money.getClass()); // ここを追加
    }
}
```

- モデルのコードにクラスが登場するのは少々不吉な匂いがする。
    - 比較はJavaオブジェクトの世界ではなく、財務の世界の言葉で行いたい。
    - しかし、まだ通貨の概念が無いし、また通貨を導入する必然性もまだないように思えるのでこのままで行きたい。

- まとめ
    - 頭の中にある悩みをテストとして表現した。
    - 完璧ではないものの、まずまずのやり方(getClass)でテストを通した。
    - さらなる設計は、本当に必要になるときまで先延ばしにすることにした。

### 第8章 実装を隠す

- FrancとDollarのtimesメソッドは似通っているためMoney型を返すように変更する。

```Java
class Franc extends Money {
    Fran(int amount) {
        this.amount = amount
    }
    Money times(int multiplier) {
        return new Franc(amount * multiplier)
    }
}
class Dollar extends Money {
    Fran(int amount) {
        this.amount = amount
    }
    Money times(int multiplier) {
        return new Franc(amount * multiplier)
    }
}
```

- Moneyの2つのサブクラス(DollarとFranc)はたいした仕事をしてないのでこの際消してしまいたい。
    - しかし一気に消すわけには行かない。
        - ステップが多すぎて、良いTDDの実例とは言えなくなっていまう。
- 一歩ずつサブクラスへの参照箇所を減らし、サブクラスを消せる状態に近づけていく。

### 第9章 歩幅の調整

- サブクラスを消すために通貨(Currency)の概念を導入する。
    - 通貨をどうテストするかから考える。
- Flyweightパターンを使って実装したくなるが、今のところは文字列で対応する
    - [デザインパターン ～Flyweight～ - Qiita](https://qiita.com/i-tanaka730/items/ed32b9a7c3f9f72b59ef)
    - [デザインパターン入門（Flyweight） - Qiita](https://qiita.com/kaikusakari/items/7d6b0e403e96b4c1bd69)

- Moneyクラスのテストとして、currencyメソッドのテストを追加。 
- Moneyクラスにcurrencyメソッドを抽象メソッドとして定義し、サブクラスにcurrencyメソッドを実装。
    - サブクラスのcurrencyメソッドは`USD`や`CHF`を返すだけ
- 2つのサブクラスの実装を近づけるためにcurrencyというインスタンス変数を設け、currencyメソッドも親クラスに引き上げる。
- `USD`や`CHF`をMoneyのFactory Methodであるdollarメソッドやfrancメソッドに移動し、2つサブクラスのコンストラクタを一致させ共通実装に導く。
- FrancのtimesメソッドがMoneyのFactory Method(francメソッド)ではなく、自分のコンストラクタを呼び出しているので、Factory Methodを使うように修正を行う。
    - これは割り込み作業にあたり、教科書的な答えはやるべきでは無い。
    - 筆者としてはちょっとした割り込み、かつ1つの割り込みはやっても良いと考えている。
        - 「割り込みに更に割り込みことはしない」
- コンストラクタが完全に一致したので親クラスに引き上げる。
    - timesメソッドを親クラスに引き上げて、サブクラスを削除する準備はほぼ整った。

- 小さい手順を踏んできたが、これは必須ではない。
    - ステップを小さくできるということが重要。
    - 数分で終わる小さな変更に分解し、ローギアにシフトして小さい歩幅で変更を行っていった。
- TDDを行う際は常にこのような微調整を行う。
    - 細かいステップを窮屈に感じるならば、歩幅を大きく。
    - 不安を感じるなら歩幅を小さく。

- まとめ
    - 大きな設計変更にのめり込みそうになったので、その前に手前にある小さな変更に着手した。
    - 差異を呼び出し側(Factory Method側)に移動することによって、2つのサブクラスのコンストラクタを近づけていった。
    - リファクタリングの途中で少し寄り道をして、timesメソッドの中でFactory Methodを使うように変更した。
    - Francに行ったリファクタリングをDollarにも同様に、今度は大きい歩幅で一気に適用した。
    - 完全に同じ内容になった2つのコンストラクタを親クラスに引き上げた。

### 第10章 テストに聞いてみる

- Moneyを表現するクラスを1つにする
    - sub classであるDollarとFrancを消す。
- 前章でtimesメソッドでFactory Methodを呼び出すように変更したばかりだが、再度コンストラクタを呼ぶように変更する。
```java
class Franc extends Money {
    Franc(int amount, String currency) {
        super(amount, currency);
    }
    Money times(int multiplier) {
        // return Money.franc(amount * multiplier);    // ★ 再度もどす
        return new Franc(amount * multiplier, "CHF");
    } 
}
```
- Francのインスタンス変数currencyは常に"CHF"なのでそれを使う。
```java
class Franc extends Money {
    Franc(int amount, String currency) {
        super(amount, currency);
    }
    Money times(int multiplier) {
        // return Money.franc(amount * multiplier);    // ★ 再度もどす
        return new Franc(amount * multiplier, currency);
    } 
}
```
- FrancとMoneyの区別は必要が不明瞭だが、テストを実行することで自身を持って変更ができる。
    - テストを実行することですぐに正しいかどうかを判断できる。

```java
// abstract class Money {     // ★ 具象クラスにする   
class Money {
    protected int amount;
    protected String currency;
    Money(int amount, String currency) {
        this.amount = amount; this.currency = currency;
    }
    // abstract Money times(int multiplier); Money times(int multiplier) {    // ★ 具象クラスにする   
    Money times(int multiplier); Money times(int multiplier) {
        return null; 
    }
    String currency() { return currency;
    }
    public boolean equals(Object object) {
        Money money = (Money) object; return amount == money.amount
        && getClass().equals(money.getClass());
    }
    
    static Money dollar(int amount) {
        return new Dollar(amount, "USD");
    }
    
    static Money franc(int amount) {
        return new Franc(amount, "CHF");
    }
}
```
- テストを実行するとエラーが発生するが、エラーメッセージが分かりづらいので修正する。
    - 掟破りにもテストを書かずコードを書いてしまったが、以下の例外的な理由からコードだけ書いた。
        - 画面への出力をすぐに見たかった。
        - toStringはデバッグ出力のためにだけに利用されるので、バグが混入してもリスクは少ない。
        - 既にテストはレッドバーの状態だったので、新たにテストを作るのは避けたい。

### 第11章 不要になったら消す

- DollarとFrancにはコンストラクタしか残っていないため消したい。

```Java
class Money {
    ...
    static Money dollar(int amount){
        return new Dollar(amount, "USD");
    }
    static Money franc(int amount){
        // FrancではなくMoneyをnewするように変更
        // return new Franc(amount, "CHF");     
        return new Money(amount, "CHF");
    }
}
```

- Dollarも同様に変更する。

```Java
class Money {
    ...
    static Money dollar(int amount){
        // DollarではなくMoneyをnewするように変更
        // return new Dollar(amount, "USD");     
        return new Money(amount, "USD");
    }
    static Money franc(int amount){
        return new Money(amount, "CHF");
    }
}
```

- Dollarクラスは削除できるが、Francはテストが残っている。

```Java
@Test
public void testDifferentClassEquality() {
    assertTrue(new Money(10, "CHF").equals(new Franc(10, "CHF")));
}
```

- 上記のテストが消せるかどうかを判断するために、等価性比較に関する別のテストを確認する。
- テスト内容を確認すると、等価性比較は十分にテストされている。
    - むしろ過剰なテストになっているので削除できる。

```Java
@Test
public void testEquality() {
    assertTrue(Money.dollar(5).equals(Money.dollar(5)));
    assertFalse(Money.dollar(5).equals(Money.dollar(6)));
    // 上記と内容が重複しているので削除する
    // assertTrue(Money.franc(5).equals(Money.franc(5)));
    // assertFalse(Money.franc(5).equals(Money.franc(6)));
    assertFalse(Money.franc(5).equals(Money.dollar(5)));
}
```

- 前章で書いたテストは、複数のクラスがある状況でしか意味をなさないテストなので、先述したtestDifferentClassEqualityは削除する。
- よってFrancクラスも削除できる

```Java
public class MoneyTest{
    ...
    // 等価性比較は別のテストで担保されているので削除
    // @Test
    // public void testDifferentClassEquality() {
    //     assertTrue(new Money(10, "CHF").equals(new Franc(10, "CHF")));
    // }
}
```
```Java
// Francクラスも不要になったので削除する
// package money;
// class Franc extends Money {
//     Franc(int amount, String currency) {
//         super(amount, currency);
//     }
// }
```

- 同様に、ドルとフランそれぞれの掛け算も別のテストになっている。
- プロダクトコードでは現在のロジックは差異がなくなっている。
    - 2つのクラスが存在していたときはロジックに差異があった。
- よってtestFrancMultiplicationメソッドも削除できる。

```java
public class MoneyTest {
    // testMultiplicationで担保できているので削除
    // @Test
    // public void testFrancMultiplication() {
    //     Money five = Money.franc(5);
    //     assertEquals(Money.franc(10), five.times(2));
    //     assertEquals(Money.franc(15), five.times(3));
    // }
}
```

- まとめ
    - サブクラスの仕事を減らし続け、とうとう消すところまでたどり着いた。
    - サブクラス削除前の構造では意味があるものの、削除後は冗長になってしまうテストたちを消した。

### 第12章 設計とメタファー

- `$5 + $5 = $10` の足し算を追加する。


```java
public class MoneyTest{
    ...
    @Test
    public boid testSimpleAddition(){
        Money sum = Money.dollar(5).plus(Money.dollar(5))
        assertEquals(Money.dollar(10),sum);
    }
}
```

- 実装が明白なので仮実装なしでプロダクトコードを書く。

```java
class Money {
    protected int amount;
    protected String currency;
    Money(int amount, String currency){
        this.amount = amount;
        this.currency = currency;
    }
    Money times(int multiplier){
        return new Money(amount * multiplier, currency);
    }
    Money plus(Money addend){
        return new Money(amount + addend.amount, currency);
    }
    ...
}
```

- 多国通貨間の計算をどう表現するかという問いは、明らかに熟考を要する。
- 複数の通貨を扱っていることをほとんど意識させないコードにしたいという設計上の制約が問題を難しくしている。
- 一つの戦略としてすべてのお金を基準通貨に変換してしまうことが考えられるが、このやり方では為替レートの変更をうまく扱うことができない。
- あるオブジェクトが望むように振る舞えないのならば、同じ外部プロトコルを備える新たなオブジェクトを実装し、仕事をさせれば良い
    - imposterパターン
- TDDは設計のひらめきが、正しい瞬間に訪れることを保証するもではない。
    - しかし、自信を与えてくれるテストときちんと手入れされたコードは、ひらめきへの備えになり、いざひらめいたときにそれを具現化するための備えにもなる。
- Moneyのように振る舞うが、2つのMoneyの合計を表現するようなオブジェクトを作る。
    - 最初は財布をイメージした。
    - 「式」というメタファーも思いついた。
        - `(2+3) * 5`のようなもの
            - 今回で言えば`($2+3CHF) * 5`など
        - 式のメタファーにおいてMoneyとは式の最小構成要素であり、様々な操作の結果はExpressionオブジェクトの形になる。
            - 例えば手持ちの有価証券を足し合わせていくといった処理が終わったら、結果のExpressionオブジェクトは為替レートによって1つの通貨に変換できる。
```java
    @Test
    public void testSimpleAddition(){
        assertEquals(Money.dollar(10), reduced);
    }
```

- ローカル変数reducedはExpressionに為替レートを適用することによって得られる換算結果。
    - 現実世界においては銀行がこの処理を司る。

```java
    @Test
    public void testSimpleAddition(){
        Money reduced = bank.reduce(sum, "USD");
        assertEquals(Money.dollar(10), reduced);
    }
```

wip...

### 第13章 実装を導くテスト

### 第14章 学習用テストと回帰テスト

### 第15章 テスト任せとコンパイラ任せ

- `$5 + 10CHF`のテストをかける段階までやってきた。
    - まずはテストを書く。
- だが、残念ながらこのテストコードはたくさんのコンパイルエラーが発生する。
    - MoneyからExpressionへの一般化を行ったときに多くの事柄を先送りにしたため。
- 今こそ先送りにしていたものを直すタイミングであるため修正する。

```java
public class MoneyTest {
    ...
    @Test
    public void testMixedAddition() {
        Expression fiveBucks = Money.dollar(5);
        Expression tenFrancs = Money.fran(10);
        Bank bank = new Bank();
        bank.addRate("CHF", "USD", 2);
        Money result = bank.reduce(fiveBucks.plus(tenFrancs), "USD");
        assertEquals(Money.dollar(10), result);
    }
}
```

- 先程のテストをコンパイルできるところまで進めるのは難しい。
    - 1つ修正すると、連鎖的に他の箇所も修正が必要になるため。
- 修正方針は以下の2つがある。
    - 抽象度を落とし、より具体的なテストを書いてまず動作させ、着実に一般化を開始する道。
    - コンパイラを信頼し、自分がミスをしたら必ず教えてくれると考えてこのまま突き進む道。
- 今回は前者を選ぶが、実際の開発現場では後者を選ぶこともある。

```java
    @Test
    public void testMixedAddition() {
        // ★ 一旦ExpressionをMoneyにする
        // Expression fiveBucks = Money.dollar(5);
        // Expression tenFrancs = Money.fran(10);
        Money fiveBucks = Money.dollar(5);
        Money tenFrancs = Money.fran(10);
        Bank bank = new Bank();
        bank.addRate("CHF", "USD", 2);
        Money result = bank.reduce(fiveBucks.plus(tenFrancs), "USD");
        assertEquals(Money.dollar(10), result);
    }    
```

- コンパイルが通るがテストは通らない。
    - 15USDが帰ってきてしまう。
    - Sumのreduceメソッドが引数を変換していないため。

```java
    public Money reduce(Bank bank, String to) {
        int amount = augend.amount + addend.amount;
        return new Money(amount, to);
    }
```

- 通貨の足し算の被加算数(augend)と加数(addend)の療法を換算すればテストが通るはず。

```java
class Sum implements Expression {
    Money augend;
    Money addend;
    Sum(Money augend, Money addend) {
        this.augend = augend;
        this.addend = addend;
    }
    public Money reduce(Bank bank, String to){
        int amount = augend.reduce(bank, to).amount + addend.reduce(bank, to). amount;
        return new Money(amount, to);
    }
}
```

- テストは通る。
- ここからMoneyをExpressionに置き換えていく。
    - 連鎖的な修正を避けるために依存の終端から修正を始め、段々とテストに近づいていくことにする。
    - 変更ごとにテストを動かし、グリーンであることを確かめながら進む。
- まずはSumのaugendとaddendはExpressionに変える。
    - Sumは[Compositeパターン](https://qiita.com/i-tanaka730/items/577ca124f05bfe172248)を使うのが良いと思ったが、sumが2つ以上の引数を必要とする時が来たら変更を行うことにした。

```java
class Sum implements Expression {
    // ★ MoneyをExpressionに変更する
    // Money augend;
    // Money addend;
    // Sum(Money augend, Money addend) {
    Expression augend;
    Expression addend;
    Sum(Expression augend, Expression addend) {
        this.augend = augend;
        this.addend = addend;
    }
    public Money reduce(Bank bank, String to){
        int amount = augend.reduce(bank, to).amount + addend.reduce(bank, to). amount;
        return new Money(amount, to);
    }
}
```

- sumの変更が終わったのでMoneyクラスの変更をする
    - plusメソッドの引数をExpressionに変更する
    - timesメソッドの戻り値をExpressionに変更する

```java
class Money implements Expression {
    protected int amount;
    protected String currency;
    Money(int amount, String currency) {
        this.amount = amount;
        this.currency = currency;
    }
    // ★ MoneyをExpressionに変更する
    // Money times(int multiplier){
    Expression times(int multiplier){
        return new Money(amount * multiplier, currency);
    }
    // ★ MoneyをExpressionに変更する
    // Expression plus(Money addend){
    Expression plus(Expression addend){
        return new Sum(this, addend);
    }
    public Money reduce(Bank bank, String to) {
        int rate = bank.rate(currency, to);
        return new Money(amount / rate, to);
    }
    ...
}
```

- テストケースplusに渡している引数の型をExpressionに変更できる。
- fiveBucksをExpressionに変更するとコンパイルエラーが発生する。
    - コンパイラがTODOリストのように目の前のコンパイルエラー修正に集中させてくれるため、今度はコンパイラに任せて進んでみる。

```java
    @Test
    public void testMixedAddition() {
        // ★ MoneyをExpressionにするが、fiveBucksはコンパイルエラーになってしまう
        // Money fiveBucks = Money.dollar(5);
        // Money tenFrancs = Money.fran(10);
        Expression fiveBucks = Money.dollar(5);
        Expression tenFrancs = Money.fran(10);
        Bank bank = new Bank();
        bank.addRate("CHF", "USD", 2);
        Money result = bank.reduce(fiveBucks.plus(tenFrancs), "USD");
        assertEquals(Money.dollar(10), result);
    }
```

- コンパイラがExpressionにplusメソッドが未定義であることを教えてくれるので定義する。

```java
interface Expression {
    Expression plus(Expression addend);
    Money reduce(Bank bank, String to);
}
```

- MoneyクラスとSumクラスにplusメソッドを定義しろとコンパイルに指摘される。
    - 既に定義済みだがprivateなのでpublicに変更する。

```java
class Money implements Expression {
    protected int amount;
    protected String currency;
    Money(int amount, String currency) {
        this.amount = amount;
        this.currency = currency;
    }
    Expression times(int multiplier){
        return new Money(amount * multiplier, currency);
    }
    // ★ publicにする
    public Expression plus(Expression addend){
        return new Sum(this, addend);
    }
    public Money reduce(Bank bank, String to) {
        int rate = bank.rate(currency, to);
        return new Money(amount / rate, to);
    }
    ...
}
```

- Sumは空実装してTODOリストに入れておく。

```java
class Sum implements Expression {
    Expression augend;
    Expression addend;
    Sum(Expression augend, Expression addend) {
        this.augend = augend;
        this.addend = addend;
    }
    // ★ 空実装で追加
    public Expression plus(Expression addend) {
        return null;
    }
    public Money reduce(Bank bank, String to){
        int amount = augend.reduce(bank, to).amount + addend.reduce(bank, to). amount;
        return new Money(amount, to);
    }
}
```

- 再びコンパイルが通るようになったのですべてのテストを動かし、グリーンバーを確認した。
- MoneyからExpressionへの一般化を終えられそうなところまでやってきたのでふりかえる。

まとめ
- こうなったら良いというテストを書き、次にまず一歩で動かせるところまでそのテストを少し後退させた。
- 一般化(より抽象度の高い型で宣言する)作業を、末端から開始して頂点(テストケース)まで到達させた。
- 変更の際にコンパイラに従い(fiveBucks変数のExpression型への変更)、変更の連鎖を1つずつ仕留めた(Expressionインターフェースへのplusメソッドの追加など)。

### 第11章 不要になったら消す

### 第12章 設計とメタファー

### 第13章 実装を導くテスト

### 第14章 学習用テストと回帰テスト

### 第15章 テスト任せとコンパイラ任せ

### 第16章 将来の読み手を考えたテスト

### 第17章 多国籍通貨の全体ふりかえり

## 第二部 xUnit
 
### 第18章 xUnitへ向かう小さな一歩

### 第19章 前準備

- テストを書くときには以下の基本パターンがある。
    1. 準備(Arrange): オブジェクトを作る
    1. 実行(Act): そのオブジェクトに対して操作を行う
    1. アサート(Assert): 結果の検証を行う
- 準備はテスト感で重複しがち。
- 繰り返しが様々な大きさで発生するときには、テスト使うオブジェクトを何回くらい作成しなければならないかという疑問が生まれ、2つの相反する制約が現れる。
    - パフォーマンス
        - テストは可能な限り早く動作してほしい。
        - 同じようなオブジェクトを別々のテストで作成している際には、生成オブジェクトを使いましたい。
    - 独立性
        - テストの成功・失敗は他のテストの結果に影響しないでほしい（またされないでほしい）。
        - テスト感で共有されているオブジェクトが、あるテストで変更されたら皇族のテスト結果は変わってしまう。
- テスト間の依存関係は明らかな害悪。
    - 1つのテストが失敗したら、コードが正しくても後続のテストが失敗するなど。
    - また、テストの実行順序が影響するなど見えない害悪もある。
        - 実行順序がA->Bのときは両方成功するが、B->Aになると失敗するなど。
- テスト間には絶対に依存関係を作ってはならない。
    - 今回はテスト用オブジェクトの生成が十分に早いと仮定し、テスト毎に新しいオブジェクトを作成する

```python
class TestCaseTest(TestCase):
    def testRunning(self):
        test = WasRun("testMethod")
        assert(not test.wasRun)
        test.run()
        assert(test.wasRun)
    # ★ testSetUpを追加する
    def testSetUp(self):
        test = WasRun("testMethod")
        test.run()
        assert(test.wasSetUp)

TestCaseTest("testRunning").run()
TestCaseTest("testSetUp").run() # ★ 追加する
```

- wasSetUpがないので実装する。

```python
class WasRun(TestCase):
    def __init__(self, name):
        self.wasRun = None
        super().__init__(name)
    # ★ setUpを追加する
    def setUp(self):
        self.wasSetUp = 1
    def testMethod(self):
        self.wasRun = 1
```

- setUpメソッドを呼ぶ責務はTestCaseクラスにあるべきなので追加する
```python
class TestCase:
    def __init__(self, name):
        self.name = name
    # ★ setUpを追加する
    def setUp(self):
        pass
    def run(self):
        self.setUp() # ★ 追加する
        method = getattr(self, self.name)
        method()
```

- テストケースを動かせるようになったが、2ステップ必要だった。
    - 今触っている壊れやすい環境では2ステップは多すぎると感じる。
    - 何かを学びながら開発するときは1度に一つのメソッドだけを変えながらテストがどうなるかを逐次確かめると良い。

- 今作成したばかりの機能を使ってテスト記述を短くできる。
    - wasRunフラグをsetUpに移動し、不要になったコンストラクタを消す。
    - ※ この時点ではtestRunningにassert(not test.wasRun)が残っているためテストは失敗する。

```python
class WasRun(TestCase):
    # ★ 削除する
    # def __init__(self, name):
    #     self.wasRun = None 
    #     super().__init__(name)
    def setUp(self):
        self.wasSetUp = 1
    def testMethod(self):
        self.wasRun = 1
```

- testRunningもシンプルにするため、実行前にフラグチェックをやめる。
    - コードに対する自信が揺らぐか疑問に思ったが、testSetUpがあるので問題ないと判断した。
    - きちんと動作している他のテストがあるときは、テストをシンプルにできる。

```python
class TestCaseTest(TestCase):
    def testRunning(self):
        test = WasRun("testMethod")
        # assert(not test.wasRun) # ★ 削除する
        test.run()
        assert(test.wasRun)
    def testSetUp(self):
        test = WasRun("testMethod")
        test.run()
        assert(test.wasSetUp)
```

- 今回はさらにtestRunningとtestSetUpをシンプルにできる。
    - フィクスチャーを使ってシンプルにする。
    - setUpメソッドの中でWasRunインスタンスを作成し、各テストはsetUpが作成したインスタンスを使う。
    - 各々のテストメソッドはそれぞれ別のTestCaseTestインスタンスで動いているため、2つのテストメソッド間には依存関係は一切発生しない。
        - ただしグローバル変数を使っていないという前提。
```python
class TestCaseTest(TestCase):
    # ★ フィクスチャーを追加
    def setUp(self):
        self.test = WasRun("testMethod")
    def testRunning(self):
        # test = WasRun("testMethod") # ★ フィクスチャーが担うので削除
        self.test.run() # ★ selfを追加
        assert(self.test.wasRun) # ★ selfを追加
    def testSetUp(self):
        # test = WasRun("testMethod") # ★ フィクスチャーが担うので削除
        self.test.run() # ★ selfを追加
        assert(self.test.wasSetUp) # ★ selfを追加
```

ふりかえり
- テストをシンプルに書けるほうがパフォー0万すよりも大事だという意思決定を行った。
- setUpメソッドのテストと実装を行った。
- setUpメソッドを使ってテスト対象コードであるサンプルテストケース(WasRun)をシンプルにした。
- setUpメソッドを使ってサンプルテストケースのチェックを省き、テストコード(TestCaseTest)をシンプルにした。

### 第20章 後片付け

### 第21章 数え上げ

### 第22章 失敗の扱い

### 第23章 スイートにまとめる

- TestSuiteを扱う。
    - `print`と`run().summary()`が重複している。
- 重複は常に悪だが、設計に関する気づきを与えてくれる。
    - テストをまとめて実行する機能が欲しくなってきた。
- Compositeパターンによく馴染むというのもTestSuiteを実装する一つの理由。
- TestSuiteオブジェクトを作成し、いくつかのテストを登録し、収集された実行結果を取得するテストを書く。

```python
class TestCaseTest(TestCase):
    ...
    # ★ 追加
    def testSite(self):
        suite = TestSuite()
        suite.add(WasRun("testMethod"))
        suite.add(WasRun("testBrokenMethod"))
        result = suite.run()
        assert("2 run, 1 failed" == result.summary())

...
# ★ 追加
print(TestCaseTest("testSuite").run().summary())
```

- 新しくTestSuiteクラスを作る。
    - addメソッドはテストをリストへ追加する単純な実装にする。

```python
class TestSuite:
    def __init__(self):
        self.tests = []
    def add(self, test):
        self.tests.append(test)
```

- runメソッドの実装は少しむずかしい。
    - TestResultインスタンスをすべての実行対象に対して使いたいから。

```python
class TestSuite:
    def __init__(self):
        self.tests = []
    def add(self, test):
        self.tests.append(test)
    # ★ 追加
    def run(self):
        result = TestResult()
        for test in self.test:
            test.run(result)
        return result
```

- Compositeパターンを実現するためには個別の要素とコレクションが同じメッセージに応えられなければならない。
    - 同じシグニチャのメソッドが定義されていなければならない。
- つまりTestCaseのrunメソッドにパラメータを足した場合、TestSuiteのrunメソッドにも同様にたさなければならない。
- 実現には3つの方法が考えられる。
    - Pythonのデフォルト引数機能を使う。
        - デフォルト引数は実行時ではなくコンパイル時に評価される。
        - 唯一のTestResultを使いまわしたいわけではないので不都合。
        - ★ よく意味がわからなかった
    - TestResultを作成するメソッドとそのTestResultを使ってテストを実行するメソッドの2つに分割する。
        - それぞれに対する名前が思いつかない。
        - 良い設計の方向ではない。
    - 呼び出し側でTestResultを作成する。
        - CollectingParameterパターン。
- 今回はCollectionParameterパターンを使う。
    - CompositeパターンとCollectionParameterパターンを使って、TestCaseとTestSuiteのrunメソッドの引数をあわせる。

```python
class TestCaseTest(TestCase):
    def testSite(self):
        suite = TestSuite()
        suite.add(WasRun("testMethod"))
        suite.add(WasRun("testBrokenMethod"))
        # result = suite.run() # ★ 削除
        result = TestResult() # ★ 追加
        suite.run(result) # ★ 追加
        assert("2 run, 1 failed" == result.summary())
```

- TestSuiteのrunメソッドから明示的な戻り値が不要になる。
- 

```python
class TestSuite:
    # def run(self): # ★　resultを追加する形に変更
    def run(self, result):
        # result = TestResult() # ★ 削除
        for test in self.test:
            test.run(result)
        # return result # ★ 削除

class TestCase:
    ...
    # def run(self): # ★　resultを追加する形に変更
    def run(self, result):
        # result = TestResult() # ★ 削除
        result.testStarted()
        self.setUp()
        try:
            method = getattr(self, self.name)
            method()
        except:
            result.testFailed()
        self.tearDown()
        # return result # ★ 削除
```

- テストの実行部分を書き直す。
    - この時点で実行してもpassしない。

```python
# ★ 削除
# print(TestCaseTest("testTemplateMethod").run().summary())
# print(TestCaseTest("testResult").run().summary())
# print(TestCaseTest("testFailedResult").run().summary())
# print(TestCaseTest("testFailedResultFormatting").run().summary())
# print(TestCaseTest("testSuite").run().summary())

# ★ 追加
suite = TestSuite()
suite.add(TestCaseTest("testTemplateMethod"))
suite.add(TestCaseTest("testResult"))
suite.add(TestCaseTest("testFailedResult"))
suite.add(TestCaseTest("testFailedResultFormatting"))
suite.add(TestCaseTest("testSuite"))
result = TestResult()
suite.run(result)
print(result.summary())
```

- 重複が発生しており、解決方法も自明（テストクラスを渡すときにテストスイートを自動的に構築できる機能）
- だがまずは失敗している3つのテストを修正する。

```python
class TestCaseTest(TestCase):
    def testTemplateMethod(self):
        test = WasRun("testMethod")
        # test.run() # ★ 削除
        result = TestResult() # ★ 追加
        test.run(result) # ★ 追加
        assert("setUp testMethod tearDown " == test.log)

    def testResult(self):
        test = WasRun("testMethod")
        # result = test.run() # ★ 削除
        result = TestResult() # ★ 追加
        test.run(result) # ★ 追加
        assert("1 run, 0 failed" == result.summary())

    def testFailedResult(self):
        test = WasRun("testBrokenMethod")
        # result = test.run() # ★ 削除
        result = TestResult() # ★ 追加
        test.run(result) # ★ 追加
        assert("1 run, 1 failed" == result.summary())
```

- 各々のテストメソッドでTestResultを作成しているが、setUpメソッドで重複を排除できる。
    - ただしテストが若干読みにくくなる。

```python
class TestCaseTest(TestCase):
    # ★ 追加
    def setUp(self):
        self.result = TestResult()

    def testTemplateMethod(self):
        test = WasRun("testMethod")
        # result = TestResult() # ★ 削除
        test.run(self.result) # ★ 変更
        assert("setUp testMethod tearDown " == test.log)

    def testResult(self):
        test = WasRun("testMethod")
        # result = TestResult() # ★ 削除
        test.run(self.result) # ★ 変更
        assert("1 run, 0 failed" == self.result.summary()) # ★ 変更

    def testFailedResult(self):
        test = WasRun("testBrokenMethod")
        # result = TestResult() # ★ 削除
        test.run(self.result)
        assert("1 run, 1 failed" == self.result.summary()) # ★ 変更

    def testFailedResultFormatting(self):
        # result = TestResult() # ★ 削除
        self.result.testStarted() # ★ 変更
        self.result.testFailed() # ★ 変更
        assert("1 run, 1 failed" == self.result.summary()) # ★ 変更

    def testSite(self):
        suite = TestSuite()
        suite.add(WasRun("testMethod"))
        suite.add(WasRun("testBrokenMethod"))
        # result = TestResult() # ★ 削除
        suite.run(self.result) # ★ 変更
        assert("2 run, 1 failed" == self.result.summary()) # ★ 変更
```

ふりかえり

- TestSuiteのテストを書いた。
- 実装の一部を、テストが失敗したままで作成した。
    - これは明らかにルール違反だった。
    - そのときに気づくことができたなら、手持ちのコードから2つのテストケースをピックアップしただろう。
    - そしてシンプルな仮実装でテストケースを通し、グリーンのママリファクタリングができただろう。
    - ただ、私はその時には気づけなかった。
- runメソッドのインターフェース変更を行い、個別の要素と要素の集合が同じ動作をするようにした結果、テストは再び通りだした。
- 重複している前準備のコードをsetUpに抽出した。

## Review

- 
