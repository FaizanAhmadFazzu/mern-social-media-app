import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { checkImage } from "../../utils/ImageUpload";

const EditProfile = ({ setOnEdit }) => {

    const initState = {
        fullname: "", mobile: "", address: "", website: "", story: "", gender: ""
    }
    const [userData, setUserData] = useState(initState);

    const { fullname, mobile, address, website, story, gender } = userData;

    const [avatar, setAvatar] = useState("");

    const { auth, theme } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
       setUserData(auth.user)
    }, [auth.user])


    const handleInput = e => {
        const { name, value } = e.target;
        setUserData({...userData, [name]: value})
    }

    const changeAvatar = e => {
        const file = e.target.files[0];
        const err = checkImage(file);
        if (err) return dispatch({
            type: GLOBALTYPES.ALERT, payload: { error: err }
        })
        setAvatar(file);
    }


    const handleSubmit = e => {
        e.preventDefault();
        console.log("handle Submit");
    }
  return (
    <div className="edit_profile">
      <button
        className="btn btn-danger btn_close"
        onClick={() => setOnEdit(false)}
      >
        Close
      </button>

      <form onSubmit={handleSubmit}>
          <div className="info_avatar">
              <img src={ avatar ? URL.createObjectURL(avatar): auth.user.avatar } alt="avatar" style={{ fliter: theme ? "invert(1)": "invert(0)" }} />
              <span>
                <i className="fas fa-camera"></i>
                  <p>change</p>
                  <input type="file" name="file" id="file_up" accept="image/*" onChange={changeAvatar} />
              </span>
          </div>

          <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <div className="position-relative">
                  <input type="text" className="form-control" name="fullname" id="fullname" value={fullname} onChange={handleInput} />
                  <small className="text-danger position-absolute" style={{ top: "50%", right: "5px", transform: "translateY(-50%)"  }}>
                      {fullname.length}/25
                  </small>
              </div>
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile</label>   
            <input type="text" className="form-control" name="mobile" id="mobile" value={mobile} onChange={handleInput} />  
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>   
            <input type="text" className="form-control" name="address" id="address" value={address} onChange={handleInput} />  
          </div>

          <div className="form-group">
            <label htmlFor="website">Website</label>   
            <input type="text" className="form-control" name="website" id="website" value={website} onChange={handleInput} />  
          </div>

          <div className="form-group">
            <label htmlFor="story">Story</label>   
            <textarea type="text" className="form-control" cols="30" rows="4" name="story" id="story" value={story} onChange={handleInput} />  

            <small className="text-danger d-block text-right">{story.length}/200</small>
          </div>

          <label htmlFor="gender">Gender</label> 
          <div className="form-group">
            
            <div className="input-group-prepend px-0 mb-4">
                <select name="gender" id="gender" value={gender} className="custom-select text-capitalize" onChange={handleInput}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">other</option>
                </select>
            </div>  
          </div>

          <button className="btn btn-info w-100" type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
