const Users = require("../models/userModal");

const userCtrl = {
    searchUser: async (req, res) => {
        try {
            const users = await Users.find({username: {$regex: req.query.username}})
            .limit(10).select("fullname username avatar")

            res.json({users})
            
        } catch (err) {
            return res.status(500).json({ msg: error.message }) 
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id).select("-password")
            .populate("followers following", "-password");
            if(!user) return res.status(400).json({ msg: "User does not exist." });
            res.json({user})  
        } catch (err) {
            return res.status(500).json({ msg: error.message }) 
        }
    }
}

module.exports = userCtrl