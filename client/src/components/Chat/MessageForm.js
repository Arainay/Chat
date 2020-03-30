import React, { useState } from 'react';

const MessageForm = ({ send }) => {
  const [message, setMessage] = useState('');

  const changeMessage = event => {
    setMessage(event.target.value);
  };

  const submit = event => {
    event.preventDefault();

    if (message.length === 0) {
      return;
    }

    send(message);

    setMessage('');
  };

  return (
    <form className="message-form" onSubmit={submit}>
      <input type="text" className="chat__message" value={message} onChange={changeMessage}/>
    </form>
  );
};

export default MessageForm;
