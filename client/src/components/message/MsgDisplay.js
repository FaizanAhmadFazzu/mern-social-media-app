import React from "react";
import Avatar from "../Avatar";

const MsgDisplay = ({ user }) => {
  return (
    <>
      <div className="chat_title">
        <Avatar src={user.avatar} size="small-avatar" />
        <small>{user.username}</small>
      </div>
      <div className="chat_text">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
        quibusdam accusantium aperiam
      </div>
      <div className="chat_time">
          April, 2021
      </div>
    </>
  );
};

export default MsgDisplay;
