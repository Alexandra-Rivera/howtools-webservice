const User = require("../models/user.model");

const controller = {};

controller.getUser = async (req, res, next) => {
    try {
        const { email } = req.body;  
        const user = await User.findOne({ $or: [{email: email}]});

        const userInfo = [user.name, user.lastName, user.image];

        return res.status(200).json({ userInfo });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error"});
    }
}

controller.updateUserInfo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body } = req.body;

        const user = await User.findByIdAndUpdate(id, body, {
            new: true
        });

        if (!user) return res.status(404).json({ error: "User not found"}) 

        res.status(200).json({ message: "The user info has been updated!", user: user});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error"})
    }
}

controller.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params; 
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found"});
        }

        res.status(200).json({ message: "User deleted successfully!*"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error"});
    }
}

controller.findAllUsers = async (req, res, next) => {
    try {
        //Buscar a todos los users
        const users = await User.find();

        if (!users) {
            return res.status(404).json({ error: "Users Not Found"});
        }

        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error"});
    }
}

// controller.rateUser = async (req, res, next) => {
//     try {
//         //Se recibe el id y el el rating del usuario calificado 
//         const { id } = req.params;
//         const { rating } = req.rating;

//         const userReciever = await User.findById(id);
//         userReciever.stars =

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: "Internal Server Error"});
//     }
// }

module.exports = controller;