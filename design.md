# 基本要件
- チャット機能：ユーザー同士がリアルタイムでメッセージをやりとりできる機能。
- チャンネル機能：ユーザーがトピック別に分けられたチャンネルを作成し、そこでチャットをする機能。
- 通知機能：新しいメッセージやリアクションがあった際に、ユーザーに通知する機能。
- ファイル共有機能：ユーザーがファイルをアップロードし、チャンネル内で共有できる機能。
- ユーザー管理機能：ユーザーの登録、ログイン、ログアウト、パスワードリセットなどの機能。
# 応用要件
- ボット機能：APIを利用して、チャットボットを導入する機能。
- スラック連携機能：Slackとの連携機能を提供することで、Slackのメッセージを取り込んで表示する機能。
- ビデオ/音声通話機能：ビデオ/音声通話を行える機能。
- カレンダー機能：スケジュール管理機能を提供することで、予定の調整ができる機能。
- タスク管理機能：タスクの追加、完了状況の確認ができる機能。

# チャット機能のドメインモデル図

```mermaid
classDiagram
    class User {
        +int id
        +string name
        +string email
        +string password
        +List<Channel> channels
    }

    class Channel {
        +int id
        +string name
        +List<Message> messages
        +List<User> users
    }

    class Message {
        +int id
        +string text
        +User user
        +DateTime created_at
        +Channel channel
    }

    User -- Channel : participates in
    User -- Message : sends
    Channel -- Message : contains

```

# チャット機能のシーケンス図

```mermaid
sequenceDiagram
    participant User
    participant Channel
    participant Message
    participant Database

    User ->>+ Channel: join
    Channel ->>- Database: create user_channel
    User ->>+ Message: send
    Message ->>- Database: create message
    Channel ->>+ User: notify new message

```

```mermaid
sequenceDiagram
    participant User
    participant WebApp
    participant Server
    participant Database

    User ->>+ WebApp: Open Chat
    WebApp ->>+ Server: Request user channels
    Server ->>+ Database: Query user channels
    Database ->>- Server: Return user channels
    Server ->>- WebApp: Return user channels
    WebApp ->> User: Show user channels
    User ->>+ WebApp: Select channel
    WebApp ->>+ Server: Request channel messages
    Server ->>+ Database: Query channel messages
    Database ->>- Server: Return channel messages
    Server ->>- WebApp: Return channel messages
    WebApp ->> User: Show channel messages
    User ->>+ WebApp: Send message
    WebApp ->>+ Server: Send message
    Server ->>+ Database: Create message
    Database ->>- Server: Return created message
    Server ->>- WebApp: Return created message
    WebApp ->> User: Show created message

```

# ユーザ管理機能のドメインモデル図

```mermaid
classDiagram
    class User {
        +int id
        +string name
        +string email
        +string password
    }

```

# ユーザ管理機能のシーケンス図

```mermaid
sequenceDiagram
    participant User
    participant Database

    User ->>+ Database: register
    Database ->>- User: registration success/failure
    User ->>+ Database: login
    Database ->>- User: login success/failure
    User ->>+ Database: logout
    Database ->>- User: logout success/failure
    User ->>+ Database: reset password
    Database ->>- User: password reset success/failure

```
