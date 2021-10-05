import React, { useState, useEffect } from 'react'
import { getDataAPI } from '../../utils/fetchData';
import { useSelector, useDispatch } from 'react-redux';
import UserCard from '../UserCard';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

const Search = () => {

    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([]);

    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();


    useEffect(() => {
        if(search && auth.token) {
            getDataAPI(`/search?username=${search}`, auth.token)
            .then(res => setUsers(res.data.users))
            .catch(err => {
                dispatch({ 
                    type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}
                 })
            }) 
        } else {
            setUsers([]);
        }
        
    }, [search, auth.token])

    

    const handleClose = async (e) => {
        setSearch("");
        setUsers([]);
    }



    return (
        <form className="search_form" >
            <input type="text" name="search" value={search} id="search" title="Enter to Search"
                onChange={(e) => setSearch(e.target.value.toLowerCase().replace(/ /g, ""))}
            /> 

            <div className="search_icon" style={{ opacity: search ? 0 : 0.3 }}>
                <span className="material-icons">search</span>
                <span>Enter to search</span>
            </div>

            <div className="close_search" onClick={handleClose} style={{ opacity: users.length === 0 ? 0 : 1 }}>
                &times;
            </div>

            <button type="submit" style={{ display: "none" }}>Search</button>
            <div className="users">
                {
                    search && users.map((user) => 
                        <UserCard
                        key={user._id}
                        user={user}
                        border="border"
                        handleClose={handleClose}
                        />
                    )
                }
            </div>
        </form>
    )
}

export default Search
