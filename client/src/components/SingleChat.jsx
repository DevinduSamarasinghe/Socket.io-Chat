//package and hooks imports
import React, { useState, useEffect } from "react";
import axios from "axios";

//State Imports
import { ChatState } from "../contexts/ChatProvider";

//UI Imports
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
import "./styles.css";

//config imports
import { getSender, getSenderFull } from "../config/ChatLogics";

//component imports
import ScrollableChat from "./ScrollableChat";
import ProfileModal from "./ProfileModal";

//socket client import
import io from "socket.io-client";

//socket configuration 
const ENDPOINT = 'http://localhost:8070'; //For now the local variable will be 8070
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {


  const toast = useToast();


  const { user, selectedChat, setSelectedChat } = ChatState();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [istyping, setIsTyping] = useState(true);
  const [socketConnected, setSocketConnected] = useState(false);

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

        //Passing the selectedChatID for the room to be created
        socket.emit('join chat', selectedChat._id); //So the chat users can join the socket ID

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

            socket.emit("new message",data);
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

  //UseEffect to initiate the connection to the socket
  useEffect(()=>{
    socket = io(ENDPOINT);  //establishes the connection
    socket.emit("setup",user.user); //Setting up the socket by passing the user
    socket.on('connected', ()=> setSocketConnected(true));
  },[])

  useEffect(()=>{
    fetchMessages();

    selectedChatCompare = selectedChat; //Just to keep a backup of the state of selectedChat, if we are to omit or send a notification
  },[selectedChat])

  useEffect(()=>{
    socket.on("Message received", (newMessageReceived)=>{
      if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){
        //give notification
        console.log("Hello")
      }else{
        setMessages([...messages,newMessageReceived]);
      }
    })
  })

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
