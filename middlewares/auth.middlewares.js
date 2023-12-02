const debug = require("debug")("app:auth-middleware");
const middlewares = {};


//Proceso que se encarga de verificar que el usuario tenga las credenciales para entrar al sistema
middlewares.authentication = async (req, res, next) => {
    try {
        debug("User Authentication");


        //01 - Verificar el authorization
        const { authorization } = req.header;
        debug("authorization");

        if(!authorization) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        //02 - Validez del token
        //03 - Verificar usuario
        // 04 - Comparar el token con los tokens registrados 
        // 05 - Modificar la req, para anadir la info del usuario

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error"});
    }
}

module.exports = middlewares;