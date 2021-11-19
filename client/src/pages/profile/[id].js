import React, { useEffect } from "react";
import Info from "../../components/profile/Info";
import Posts from "../../components/profile/Posts";
import { useSelector, useDispatch } from "react-redux";
import LoadIcon from "../../images/loading.gif";
import { useParams } from "react-router-dom";
import { getProfileUsers } from "../../redux/actions/profileAction";
const Profile = () => {
  const { profile, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    if(profile.ids.every(item => item !== id)){
      dispatch(getProfileUsers({id, auth}))
      console.log(profile.ids)
    }
  }, [id, auth, dispatch, profile.ids])
  return (
    <div className="profile">
      {profile.loading ? (
        <img src={LoadIcon} className="d-block mx-auto my-4" alt="loading" />
      ) : (
        <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
      )}
      <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
    </div>
  );
};

export default Profile;
