import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { useParams } from 'react-router-dom';
import './messages.scss';

const Messages = ({ messages }) => {
	const { name } = useParams();

	return (
		<ScrollToBottom className="messages">
			{messages.map(item => (
				<section key={item.id} className="messages__item">
					<span className="messages__username">{name}: </span>
					{item.text}
				</section>
			))}
		</ScrollToBottom>
	);
};

export default Messages;
