import React, { useState } from 'react';
import { debounce } from '@app/helpers';
import './message-form.scss';

const MessageForm = ({ send, typeText }) => {
  const [message, setMessage] = useState('');

  const changeMessage = event => {
    const { value } = event.target;

    setMessage(value);

    if (value.length > 1) {
      debounce(typeText, 300);
    } else {
      typeText();
    }
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
      <input
        autoFocus
        type="text"
        className="message-form__input"
        value={message}
        onChange={changeMessage}
        placeholder="Type a message..."
      />
      <button
        type="submit"
        className="message-form__send-button"
      >
        Send
      </button>
    </form>
  );
};

export default MessageForm;
