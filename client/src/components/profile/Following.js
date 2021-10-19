import React from "react";
import { useSelector } from 'react-redux';
import UserCard from '../UserCard';
import FollowBtn from '../FollowBtn';

const Following = ({users, setShowFollowing}) => {
    const { auth } = useSelector(state => state)
  return (
    <div className="follow">
      <div className="follow_box">
        <h5 className="text-center">Followers</h5>
        <div className="follow_content">
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              setShowFollowing={setShowFollowing}
            >
              {auth.user._id !== user._id && <FollowBtn user={user} />}
            </UserCard>
          ))}
        </div>

        <div className="close" onClick={() => setShowFollowing()}>
          &times;
        </div>
      </div>
    </div>
  );
};

export default Following;