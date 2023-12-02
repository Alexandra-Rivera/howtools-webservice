const { SignJWT, jwtVerify } = require("jose");
//Variables de entorno
const secret = new TextEncoder().encode(process.env.TOKEN_SECRET ||  "super secret value");
const expTime = process.env.TOKEN_EXP || '15d'; 

const tools = {};


//Recibimos el id del usuario
tools.createToken = async (id) => {
    //Retorna una promesa que devuelve un string
    return await new SignJWT()
        .setProtectedHeader({alg: "HS256"}) //Algoritmo de codificacion
        .setSubject(id) //El subject al que le pertenece el token
        .setExpirationTime(expTime) //Tiempo de expiracion
        .setIssuedAt()
        .sign(secret)
}

tools.verifyToken = async (token) => {
    try {
        const { payload } = await jwtVerify(
            token, 
            secret
        )

        return payload;
    } catch (error) {
        return false;
    }
}

module.exports = tools;