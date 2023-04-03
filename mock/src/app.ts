import express, { Request, Response } from 'express';
import { Channel, Message } from './types';
import cors from 'cors';

const app = express();
app.use(cors()); // CORSを許可する

// チャンネル一覧を返すAPI
app.get('/channels', (req: Request, res: Response) => {
  const channels: Channel[] = [
    { id: 1, name: 'general' },
    { id: 2, name: 'random' },
    { id: 3, name: 'tech' },
  ];
  res.send(channels);
});

// チャンネルに属するメッセージ一覧を返すAPI
app.get('/channels/:channelId/messages', (req: Request, res: Response) => {
  const messages: Message[] = [
    { id: 1, channelId: 1, user: { id: 1, name: 'Alice' }, text: 'Hello, world!', timestamp: 1647737699000 },
    { id: 2, channelId: 1, user: { id: 2, name: 'Bob' }, text: 'Hi, there!', timestamp: 1647737702000 },
    { id: 3, channelId: 2, user: { id: 1, name: 'Alice' }, text: 'How are you?', timestamp: 1647737712000 },
    { id: 4, channelId: 2, user: { id: 2, name: 'Bob' }, text: 'I am fine, thanks.', timestamp: 1647737715000 },
  ];
  const channelId = parseInt(req.params.channelId);
  const channelMessages = messages.filter((m) => m.channelId === channelId);
  res.send(channelMessages);
});

// メッセージを投稿するAPI
app.post('/channels/:channelId/messages', (req: Request, res: Response) => {
  const channelId = parseInt(req.params.channelId);
  const { text, userId } = req.body;
  const message: Message = {
    id: Math.floor(Math.random() * 1000) + 1,
    channelId,
    user: { id: userId, name: 'Unknown' },
    text,
    timestamp: Date.now(),
  };
  res.send(message);
});

// ユーザー一覧を返すAPI
app.get('/users', (req: Request, res: Response) => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];
  res.send(users);
});

// チャンネルに所属するユーザー一覧を返すAPI
app.get('/channels/:channelId/users', (req: Request, res: Response) => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];
  const channelId = parseInt(req.params.channelId);
  // 仮にチャンネル1にはAliceとBob、チャンネル2にはAliceとCharlieが所属しているとする
  const channelUsers = channelId === 1 ? [users[0], users[1]] : [users[0], users[2]];

  res.send(channelUsers);
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});