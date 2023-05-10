import React, { useState, useEffect } from "react";
import { ChatState } from "../contexts/ChatProvider";
import axios from "axios";

import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  IconButton,
  Spinner,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../config/ChatLogics";

import ScrollableChat from "./ScrollableChat";
import ProfileModal from "./ProfileModal";

import "./styles.css";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

  const toast = useToast();
  const { user, selectedChat, setSelectedChat } = ChatState();
  console.log("Logged User: ", user);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [istyping, setIsTyping] = useState(true);

  const sendMessage = async(e) => {
    if(e.key === "Enter" && newMessage){
        try{
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                }
            }
            setNewMessage("");
            const {data} = await axios.post(`http://localhost:8070/api/message`,{content: newMessage, chatId: selectedChat._id},config);
            console.log(data);
             //Resets the message
            setMessages([...messages,data]);
        }catch(error){
            toast({
                title: "Error Occured!",
                description: "Failed to send the Message",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
        }
    }
  };

  const fetchMessages = async () => {
    if(!selectedChat) return;
    
    try{
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        };

        setLoading(true);

        const {data} = await axios.get(`http://localhost:8070/api/message/${selectedChat._id}`,config);
        console.log("Messages of this chat: ", messages);
        setMessages(data);
        setLoading(false);
    }catch(error){
        toast({
            title: "Error Occured!",
            description: "Failed to Load the Messages",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
    }
  }

  useEffect(()=>{
    fetchMessages();
  },[selectedChat])

  const typingHandler = (e) => {setNewMessage(e.target.value);};
    
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {messages &&
              (!selectedChat.isGroupChat && (
                <>
                  {getSender(user.user, selectedChat.users)}
                  <ProfileModal
                    user={getSenderFull(user.user, selectedChat.users)}
                  />
                </>
              ))}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl onKeyDown={sendMessage} id="first-name" isRequired>
              {/* {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )} */}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
