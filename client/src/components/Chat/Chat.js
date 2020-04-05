import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import MessageForm from './MessageForm';
import Messages from './Messages';
import ChatInfo from './ChatInfo';
import './chat.scss';

let socket;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const { name, room } = useParams();

  if (!name || !room) {
    return <Redirect to="/login"/>;
  }

  const sendMessage = message => {
    socket.emit('sendMessage', message);
  };

  const typeText = () => {
    socket.emit('typing');
  };

  useEffect(() => {
    socket = io('localhost:5000');

    socket.emit('join', { name, room }, error => {
      if (error) {
        console.error(error);
      }
    });

    socket.on('message', (message) => {
      setMessages(messages => ([...messages, message]));
    });

    socket.on('userTyping', ({ user }) => {
      console.log(`${user} is typing...`);
    });

    socket.on('roomData', ({ room, users }) => {
      console.log({ room, users });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <article className="chat">
      <div className="chat__inner">
        <ChatInfo room={room}/>
        <Messages messages={messages}/>
        <MessageForm send={sendMessage} typeText={typeText}/>
      </div>
    </article>
  );
};

export default Chat;
