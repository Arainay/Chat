import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

const Chat = () => {
  const { name, room } = useParams();

  if (!name || !room) {
    return <Redirect to="/login"/>;
  }

  return (
    <h1>Chat</h1>
  );
};

export default Chat;
