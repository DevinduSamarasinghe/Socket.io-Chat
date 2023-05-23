import React from 'react'
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from 'react-scrollable-feed'
import { isSameSender, isLastMessage, isSameSenderMargin, isSameUser } from '../config/ChatLogics'
import { ChatState } from '../contexts/ChatProvider'

const ScrollableChat = ({messages}) => {
  
    const {user} = ChatState();
  return ( 
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user.user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user.user._id),
                marginTop: isSameUser(messages, m, i, user.user._id) ? 3 : 10,
                marginBottom: isSameUser(messages, m, i, user.user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat