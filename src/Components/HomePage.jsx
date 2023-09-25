import React, { useEffect, useState } from "react";
import { TbCircleDashed } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { ImAttachment } from "react-icons/im";
import {
  BsEmojiSmile,
  BsFilter,
  BsMicFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import ChatCard from "./ChatCard/ChatCard";
import MessageCard from "./MessageCard/MessageCard";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile/Profile";
import CreateGroup from "./Group/CreateGroup";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logoutAction, searchUser } from "../Redux/Auth/Action";
import { createChat, getUsersChat } from "../Redux/Chat/Action";
import { createMessage, getAllMessage } from "../Redux/Message/Action";

const HomePage = () => {
  const [querys, setQuerys] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState("");
  const [isProfile, setIsProfile] = useState(false);
  const navigate = useNavigate();
  const [isGroup, setIsGroup] = useState(false);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const { auth, chat, message } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    dispatch(getUsersChat({ token }));
  }, [chat.createChat, chat.CreateGroup]);

  const handleNavigate = () => {
    // navigate("/profile");
    setIsProfile(true);
  };

  const handleClickOnChatCard = (userId) => {
    dispatch(createChat({ token, data: { userId } }));
    setQuerys("");
  };
  const handleCloseOpenProfile = () => {
    setIsProfile(false);
  };

  const handleSearch = (keyword) => {
    if (keyword.trim() === "") {
      return;
    }
    dispatch(searchUser({ keyword, token }));
  };

  const handleCreateNewMessage = () => {
    dispatch(
      createMessage({
        token,
        data: { chatId: currentChat.id, content: content },
      })
    );
  };
  useEffect(() => {
    if (currentChat?.id)
      dispatch(getAllMessage({ chatId: currentChat.id, token }));
  }, [currentChat, message.newMessage]);
  const handleCreateGroup = () => {
    setIsGroup(true);
  };

  useEffect(() => {
    dispatch(currentUser(token));
  }, [token]);
  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/signup");
  };
  useEffect(() => {
    if (!auth.reqUser) {
      navigate("/signup");
    }
  }, [auth.reqUser]);

  const handleCurrentChat = (item) => {
    setCurrentChat(item);
  };
  console.log("current chat", currentChat);
  return (
    <div className="relative">
      <div className="py-14 bg-[#00a884] w-full"></div>
      <div className="flex bg-[#F8F9FB] h-[90vh] w-[96vw] left-[2vw] absolute top-[5vh]">
        <div className="left w-[30%] h-full bg-[#e8e9ec]">
          {/* profile */}
          {isProfile && (
            <div className="w-full h-full">
              <Profile handleCloseOpenProfile={handleCloseOpenProfile} />
            </div>
          )}
          {/* group */}
          {isGroup && (
            <div className="w-full h-full">
              <CreateGroup />
            </div>
          )}
          {!isProfile && !isGroup && (
            <div className="w-full">
              {/* Home */}
              <div className="flex justify-between items-center p-3">
                <div
                  onClick={handleNavigate}
                  className="flex items-center space-x-3"
                >
                  <img
                    className="rounded-full w-10 h-10 cursor-pointer "
                    src={
                      auth.reqUser?.profilePicture ||
                      "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg"
                    }
                    alt=""
                  />
                  <p>{auth.reqUser?.fullName}</p>
                </div>
                <div className="space-x-3 text-2xl flex">
                  <TbCircleDashed
                    className="cursor-pointer"
                    onClick={() => navigate("/status")}
                  />
                  <BiCommentDetail />
                  <div>
                    <BsThreeDotsVertical
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    />
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleCreateGroup}>
                        Create Group
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </div>
                </div>
              </div>
              {/* search */}
              <div className="relative flex justify-center items-center bg-white py-4 px-3">
                <input
                  className="border-none outline-none bg-slate-200 rounded-md w-[91%] pl-9 py-2"
                  type="text"
                  placeholder="Search or start new Chat"
                  onChange={(e) => {
                    setQuerys(e.target.value);
                    handleSearch(e.target.value);
                  }}
                />
                <AiOutlineSearch className="left-5 top-7 absolute" />
                <div>
                  <BsFilter className="ml-4 text-3xl" />
                </div>
              </div>
              {/* all user */}
              <div className="bg-white overflow-y-scroll h-[73.3333vh] px-3">
                {querys &&
                  auth.searchUser?.map((item) => (
                    <div onClick={() => handleClickOnChatCard(item.id)}>
                      <hr />
                      <ChatCard
                        name={item.fullName}
                        userImg={
                          item.profilePicture ||
                          "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg"
                        }
                      />
                    </div>
                  ))}

                {chat.chats.length > 0 &&
                  !querys &&
                  chat.chats?.map((item) => (
                    <div onClick={() => handleCurrentChat(item)}>
                      <hr />
                      {item.isGroup ? (
                        <ChatCard
                          name={item.chatName}
                          userImg={
                            item.chatImage ||
                            "https://lambanner.com/wp-content/uploads/2020/08/MNT-DESIGN-XAY-DUNG-CONG-DONG-TRUC-TUYEN.jpg"
                          }
                        />
                      ) : (
                        <ChatCard
                          isChat={true}
                          name={
                            auth.reqUser?.id !== item.users[0]?.id
                              ? item.users[0].fullName
                              : item.users[1].fullName
                          }
                          userImg={
                            auth.reqUser?.id !==
                            (item.users[0]?.id || item.users[1]?.id)
                              ? item.users[0]?.profilePicture ||
                                "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg"
                              : item.users[1]?.profilePicture ||
                                "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg"
                          }
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
        {/* defaults whats up page */}
        {!currentChat && (
          <div className="w-[70%] flex flex-col items-center justify-center h-full">
            <div className="max-w-[70%] text-center">
              <img
                src="https://cdn.mgig.fr/2021/07/mga-29a44220-w375-w1500-w750_accroche.jpg"
                alt=""
              />
              <h1 className="text-4xl text-gray-600 ">WhatsApp Web</h1>
              <p className="my-9">
                Send and receive messages without connecting to your phone. Use
                WhatsApp on up to 4 linked devices and 1 phone at the same time.
              </p>
            </div>
          </div>
        )}
        {/* message part */}
        {currentChat && (
          <div className="w-[70%] relative  bg-blue-200">
            <div className="header absolute top-0 w-full bg-[#f0f2f5]">
              <div className="flex justify-between">
                <div className="py-3 space-x-4 flex items-center px-3">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={
                      currentChat.isGroup
                        ? currentChat.chatImage ||
                          "https://lambanner.com/wp-content/uploads/2020/08/MNT-DESIGN-XAY-DUNG-CONG-DONG-TRUC-TUYEN.jpg"
                        : auth.reqUser?.id !==
                          (currentChat.users[0]?.id || currentChat.users[1]?.id)
                        ? currentChat.users[0]?.profilePicture ||
                          "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg"
                        : currentChat.users[1]?.profilePicture ||
                          "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg"
                    }
                    alt=""
                  />
                  <p>
                    {currentChat.isGroup
                      ? currentChat.chatName
                      : auth.reqUser?.id === currentChat.users[0].id
                      ? currentChat.users[1].fullName
                      : currentChat.users[0].fullName}
                  </p>
                </div>
                <div className="flex py-3 space-x-4 items-center px-3">
                  <AiOutlineSearch />
                  <BsThreeDotsVertical />
                </div>
              </div>
            </div>
            {/* message section */}
            <div className="px-10 h-[85vh] overflow-y-scroll">
              <div className="space-y-1 flex flex-col justify-center mt-20 py-2">
                {message.messages.length > 0 &&
                  message.messages?.map((item, i) => (
                    <MessageCard
                      isReqUserMessage={item.user.id !== auth.reqUser.id}
                      content={item.content}
                    />
                  ))}
              </div>
            </div>
            {/* footer part */}
            <div className="footer bg-[#f0f2f5] absolute bottom-0 w-full py-3 text-2xl">
              <div className="flex justify-between items-center px-5 relative">
                <BsEmojiSmile className="cursor-pointer" />
                <ImAttachment />
                <input
                  type="text"
                  className="py-2 outline-none border-none bg-white pl-4 rounded-md w-[85%]"
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Type message"
                  value={content}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleCreateNewMessage();
                      setContent("");
                    }
                  }}
                />
                <BsMicFill />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
