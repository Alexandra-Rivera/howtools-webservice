const User = require("../models/user.model");
const { createToken, verifyToken } = require("./../utils/jwt.tools");

const controller = {};

controller.register = async (req, res, next) => {
    try {
        //Obtener la informacion
        const { name, lastName, email, password, image, stars } = req.body;


        //Verificar la existencia del correo y el usuario
        //Si no existe lo creamos

        const user = await User.findOne({ $or: [{email: email}]});

        if(user) {
            return res.status(409).json({ error: "User already exists"});
        } 

        const newUser = new User({
            name: name,
            lastName: lastName,
            email: email,
            password: password,
            image: image,
            stars: stars
        })

        await newUser.save();

        res.status(201).json({ message: "User registered!"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error})
    }
}

controller.login = async (req, res, next) => {
    try {
        //Obtener la info -> Identificador, password
        const { email, password } = req.body;

        //Verificar si el usuario existe 
        const user = await User.findOne({ $or: [{email: email}]});

        //Si no existe retornar 404
        if(!user) {
            return res.status(404).json({error: "User not found"});
        }
        //Si existe verificamos la contrasena 
        //Si la password no coincide retornar 401

        if(!user.comparePassword(password)) {
            return res.status(401).json({error: "Incorrect password"});
        }

        //Crear token
        const token = await createToken(user._id);

        //Almacenar el token
        let _tokens = [...user.tokens];
        const _verifyPromises = _tokens.map( async (_t) => {
            const status = await verifyToken(_t);

            return status ? _t: null;
        });

        _tokens = (await Promise.all(_verifyPromises))
                    .filter(_t => _t)
                    .slice(0, 4)

        _tokens = [token, ..._tokens];

        user.tokens = _tokens;

        await user.save();

        //Si la password coincide
        return res.status(200).json({ token, userId: user._id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Internal Server Error"})
    }
}

module.exports = controller;