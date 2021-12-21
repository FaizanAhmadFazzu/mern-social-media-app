import React from "react";
import RightSide from "../../components/message/RightSide";
import LeftSide from "../../components/message/LeftSide";

const Conversation = () => {
  return (
    <div className="message d-flex">
      <div className="col-md-4 border-right px-0">
        <LeftSide />
      </div>
      <div className="col-md-8 px-0 right_mess">
        <RightSide />
      </div>
    </div>
  );
};

export default Conversation;
