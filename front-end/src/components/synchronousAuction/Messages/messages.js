import React from 'react'

import Message from './Message/message'
import './messages.css'

const Messages = ({messages}) => (
    <p>
        {messages.map((message, i) => <Message message={message} key={i}/>)}
    </p>
)

export default Messages