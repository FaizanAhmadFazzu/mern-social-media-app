import React, { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { follow, unFollow } from "../redux/actions/profileAction";

const FollowBtn =  ({user}) => {
  const [followed, setFollowed] = useState(false);
  
  const dispatch = useDispatch();
  const { auth, profile } = useSelector(state => state)

  const handleFollow = async () => {
      setFollowed(true);
        await dispatch(follow({users: profile.users, user, auth}))
  }

  const handleUnFollow = async () => {
    setFollowed(false);
      await dispatch(unFollow({users: profile.users, user, auth}))
}
  return (
    <>
      {followed ? (
        <button className="btn btn-outline-danger" onClick={handleUnFollow}>Unfollow</button>
      ) : (
        <button className="btn btn-outline-info" onClick={handleFollow}>Follow</button>
      )}
    </>
  );
};

export default FollowBtn;
