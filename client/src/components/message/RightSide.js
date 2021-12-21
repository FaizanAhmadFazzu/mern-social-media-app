import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import UserCard from "../UserCard";
import MsgDisplay from "./MsgDisplay";
const RightSide = () => {
  const { auth, message } = useSelector((state) => state);
  const { id } = useParams();

  const [user, setUser] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const newUser = message.users.find((user) => user._id === id);
    if (newUser) {
      setUser(newUser);
    }
  }, [message.users, id]);

  return (
    <>
      <div className="message_header" style={{ cursor: "pointer" }}>
        <UserCard user={user}>
          <i className="fas fa-trash text-danger" />
        </UserCard>
      </div>
      <div className="chat_container">
        <div className="chat_display">
          <div className="chat_row other_message">
            <MsgDisplay user={user} />
          </div>

          <div className="chat_row you_message">
            <MsgDisplay user={user} />
          </div>
        </div>
      </div>
      <form className="chat_input">
        <input
          type="text"
          placeholder="Enter your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="material-icons" disabled={text ? false : true}>
          near_me
        </button>
      </form>
    </>
  );
};

export default RightSide;