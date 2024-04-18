
import { useState } from 'react';
import styles from './chatbot.module.css';
import { PropsChatbot } from '../../types';
import { Box } from '@mui/material';
import ChatBotIcon from './ChatBotIcon';
import ModalChatBot from './ModalChatBot';

export default function ChatBot() {
  const [show, setShow] = useState(false);
  const [chatHistory, setChatHistory] = useState<PropsChatbot[] | null>([]);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <Box className={styles.chatBot}>
      {show &&
        <ModalChatBot
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
          handleClose={handleClose}
        />
      }
      <ChatBotIcon handleShow={handleShow} />
    </Box>
  );
}
