import React from 'react';
import './messages.scss';

const Messages = ({ messages }) => console.log(messages) || (
  <section className="messages">
    {messages.map(item => (
      <section key={item.id} className="messages__item">{item.text}</section>
    ))}
  </section>
);

export default Messages;
