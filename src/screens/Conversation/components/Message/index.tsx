import { useCallback } from "react";
import {
  Avatar,
  Box,
  IconButton,
  InputBase,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useGetMessage } from "../../../../apis/messagingAPI";
// Import Icon
import {
  ArrowBackIos,
  LocalPhoneOutlined,
  VideocamOutlined,
  AddOutlined,
  MicNoneOutlined,
  CameraAltOutlined,
  StickyNote2Outlined,
} from "@mui/icons-material";
import DoubleTickSvg from "../../../../assets/icons/doubleTick.svg?react";
import photoIconPng from "../../../../assets/icons/photoIcon.png";
import chatBackground from "../../../../assets/icons/chatBackground.png";
import {
  generateRandomByte,
  generateRandomCode,
} from "../../../../utils/number";
import { format, parseISO } from "date-fns";
import "./styles.css";

export const Message = ({
  handleBack,
  contact = "",
}: {
  handleBack: () => void;
  contact: string;
}) => {
  const { contactName, messages } = useGetMessage();

  const isLastMessage = useCallback(
    (index: number) =>
      index === messages.length - 1 ||
      messages[index + 1].sentBy !== messages[index].sentBy,
    [messages]
  );

  return (
    <Box className="message-container" component="section">
      {/* Header */}
      <Stack
        className="message-header"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton
          className="go-back"
          id="back-button"
          onClick={() => handleBack()}
          sx={{ color: "primary.main" }}
        >
          <ArrowBackIos />
        </IconButton>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={contact}>{contact[0] ?? contactName}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              // Dynamic contact name
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {contact}
              </Typography>
            }
            secondary="tap here for contact info"
          />
        </ListItem>
        <IconButton>
          <VideocamOutlined sx={{ color: "primary.main" }} />
        </IconButton>
        <IconButton>
          <LocalPhoneOutlined sx={{ color: "primary.main" }} />
        </IconButton>
      </Stack>
      {/* Chat content */}
      <Box
        className="messages chat-content"
        sx={{
          backgroundImage: `url(${chatBackground})`,
        }}
      >
        {messages.map((message, index) => {
          const isSelf = message.sentBy === "self";
          const isLast = isLastMessage(index);
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: isSelf ? "flex-end" : "flex-start",
                marginBottom: "8px",
              }}
            >
              <Box
                sx={{
                  maxWidth: "70%",
                  padding: "5px 8px",
                  borderRadius: isLast
                    ? isSelf
                      ? "8px 8px 0 8px"
                      : "8px 8px 8px 0"
                    : "8px",
                  backgroundColor: isSelf ? "#dcf8c6" : "#fff",
                  position: "relative",
                }}
              >
                {message.type === "text" && (
                  <Typography
                    variant="body2"
                    color="textPrimary"
                    sx={{ display: "flex", alignItems: "center", pr: 8 }}
                  >
                    {message.text}
                    <Typography
                      className="message-secondary "
                      variant="caption"
                      color="textSecondary"
                    >
                      {format(parseISO(message.sentAt), "hh:mm")}
                      {isSelf && (
                        <SvgIcon
                          component={DoubleTickSvg}
                          inheritViewBox
                          sx={{ color: "primary.main", fontSize: 16, ml: 0.5 }}
                        />
                      )}
                    </Typography>
                  </Typography>
                )}
                {message.type === "photo" && (
                  <>
                    <Box className="message-photo">
                      <img
                        src={photoIconPng}
                        alt="photo"
                        style={{ marginRight: "8px" }}
                      />
                      <Typography variant="body2">
                        IMG_{generateRandomCode()}
                      </Typography>
                    </Box>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ mt: 1, justifyContent: "space-between" }}
                    >
                      <Typography variant="caption" color="textSecondary">
                        {generateRandomByte()} · png
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          sx={{ mr: 0.5 }}
                        >
                          {format(parseISO(message.sentAt), "hh:mm")}
                        </Typography>
                        <SvgIcon
                          component={DoubleTickSvg}
                          inheritViewBox
                          sx={{ color: "primary.main", fontSize: 16 }}
                        />
                      </Box>
                    </Stack>
                  </>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
      {/* Input Box */}
      <Stack
        className="input-box"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          backgroundColor: "#F4F5F7",
          p: 0.8,
        }}
      >
        <IconButton id="add-button" sx={{ color: "primary.main" }}>
          <AddOutlined />
        </IconButton>
        <Box className="input-bar">
          <InputBase />
          <StickyNote2Outlined sx={{ color: "primary.main" }} />
        </Box>
        <IconButton sx={{ color: "primary.main" }}>
          <CameraAltOutlined />
        </IconButton>
        <IconButton sx={{ color: "primary.main" }}>
          <MicNoneOutlined />
        </IconButton>
      </Stack>
    </Box>
  );
};
