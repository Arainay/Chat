import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { useParams } from 'react-router-dom';
import ReactEmoji from 'react-emoji';
import classnames from 'classnames';
import './messages.scss';

const Messages = ({ messages }) => {
  const { name } = useParams();

  return (
    <ScrollToBottom className="messages">
      {messages.map(item => {
        const isSelf = name.toLowerCase() === item.user.toLowerCase();

        return (
          <section
            key={item.id}
            className={classnames('messages__item', { 'messages__item--self': isSelf })}
          >
            <span className={classnames('messages__item-username', { 'messages__item-username--self': isSelf })}>
              {item.user}
            </span>
            <span className={classnames('messages__item-text', { 'messages__item-text--self': isSelf })}>
              {ReactEmoji.emojify(item.text)}
            </span>
          </section>
        );
      })}
    </ScrollToBottom>
  );
};

export default Messages;
