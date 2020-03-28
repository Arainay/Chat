import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import io from 'socket.io-client';

let socket;

const Chat = () => {
  const { name, room } = useParams();

  if (!name || !room) {
    return <Redirect to="/login"/>;
  }

  useEffect(() => {
    socket = io('localhost:5000');

    socket.emit('join', { name, room }, (msg) => {
      // eslint-disable-next-line no-console
      console.log(msg);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <h1>Chat</h1>
  );
};

export default Chat;
