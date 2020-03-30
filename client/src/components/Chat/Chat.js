import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import MessageForm from './MessageForm';
import Messages from './Messages';
import ChatInfo from './ChatInfo';

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

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <article className="chat">
      <ChatInfo room={room}/>
      <Messages messages={messages}/>
      <MessageForm send={sendMessage}/>
    </article>
  );
};

export default Chat;
