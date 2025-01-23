import React, { SyntheticEvent, useState } from "react";
import { parseISO, format } from "date-fns";
import { SvgIcon } from "@mui/material";
import {
  Avatar,
  Box,
  Chip,
  Container,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
// Icon imports
import { Add, CameraAlt, MoreHoriz, Search } from "@mui/icons-material";
import TickSvg from "../../assets/icons/tick.svg?react";
import DoubleTickSvg from "../../assets/icons/doubleTick.svg?react";
import VoiceRecordSvg from "../../assets/icons/voiceRecord.svg?react";
import PhotoSvg from "../../assets/icons/photo.svg?react";

import { useGetConversations } from "../../apis/messagingAPI";
import { Message } from "./components/Message";
import { filters } from "./const";
import "./styles.css";
import DockerBar from "../../components/DockerBar/dockerBar";

const conversationsModeClass = "conversations-mode";
const messagesModeClass = "messages-mode";

export default function Conversations() {
  const { conversationsList } = useGetConversations();
  const [tabValue, setTabValue] = useState(0);
  const [isMessagesMode, setIsMessagesMode] = useState(false);
  const [selectedChat, setSelectedChat] = useState<number>(0);

  const handleTabChange = (event: SyntheticEvent, newFilter: number) => {
    setTabValue(newFilter);
  };

  const handleConversationClick = (
    event: SyntheticEvent,
    chatId: number
  ) => {
    setIsMessagesMode(true);
    setSelectedChat(chatId) 
  };

  const handleBack = () => {
    setIsMessagesMode(false);
  };

  return (
    <Container maxWidth={false} className={`chat-container ${
      isMessagesMode ? messagesModeClass : conversationsModeClass
    }`}>
        <Box className="conversations" component="section">
          {/* Chats header */}
          <Box className="chat-header">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <IconButton
                aria-label="more"
                size="small"
                className="icon-button"
              >
                <MoreHoriz fontSize="inherit" />
              </IconButton>
              <Box>
                <IconButton
                  aria-label="camera"
                  size="small"
                  className="icon-button"
                >
                  <CameraAlt fontSize="inherit" />
                </IconButton>
                <IconButton
                  aria-label="plus"
                  size="small"
                  className="icon-button plus"
                >
                  <Add fontSize="inherit" />
                </IconButton>
              </Box>
            </Stack>
            <Typography
              variant="h4"
              gutterBottom
              className="title"
            >
              Chats
            </Typography>
            <Box
              className="search-box"
            >
              <Search />
              <InputBase
                placeholder="Search"
                sx={{ ml: 1 }}
                fullWidth
              />
            </Box>
            {/* Filter */}
            <Box className={'filter-box'}>
              {filters.map((filter) => (
                <Chip
                  key={filter.value}
                  label={filter.label}
                  clickable
                  className={`filter-chip ${tabValue === filter.value && "active-filter"} ${filter.value === 0 || filter.value === 3 ? "small" : ""}`}
                  onClick={(e) => handleTabChange(e, filter.value)}
                />
              ))}
            </Box>
          </Box>
          {/* Conversation Listing */}
          <List sx={{ pb: 0 }}>
            {conversationsList.map((list, index) => (
              <ListItem
                key={index}
                onClick={(e) => handleConversationClick(e, index)}
                className="conversation"
              >
                <ListItemAvatar>
                  <Avatar alt={list.name}>{list.name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" className="primary-text">
                      {list.name}
                    </Typography>
                  }
                  secondary={
                    <Box className="secondary-box">
                      {list.type === "text" &&
                        (list.delivered && list.read ? (
                          <SvgIcon
                            component={DoubleTickSvg}
                            inheritViewBox
                            sx={{ color: "primary.main" }}
                          />
                        ) : list.read ? (
                          <SvgIcon component={TickSvg} inheritViewBox />
                        ) : null)}
                      {list.type === "text" ? (
                        list.text?.message
                      ) : list.type === "audio" ? (
                        <Box className="secondary-box">
                          <SvgIcon
                            component={VoiceRecordSvg}
                            inheritViewBox
                            className="icon"
                            sx={{ color: "success.main" }}
                          />
                          {list.audio?.length}
                        </Box>
                      ) : (
                        <Box className="secondary-box">
                          <SvgIcon
                            component={PhotoSvg}
                            inheritViewBox
                            className="icon"
                          />
                          Photo
                        </Box>
                      )}
                    </Box>
                  }
                />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  className="date"
                >
                  {format(parseISO(list.lastMessageAt), "MM/dd/yy")}
                </Typography>
              </ListItem>
            ))}
          </List>
          {/* Docker bar */}
          <DockerBar />
        </Box>
        {/* Message component */}
        <Message handleBack={handleBack} contact={conversationsList[selectedChat]?.name}/>
    </Container>
  );
}
