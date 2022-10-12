import jwt from "jsonwebtoken";

class validaToken {

    static valid = (req, res, next) => {
        
        const token = req.get("x-auth-token");        

        if (!token) {
            res.status(401).json({ erro: "Token invalido" });
        }
        else {
            jwt.verify(token, 'Sen@crs', (err, payload) => {
                if (err) {
                    res.status(401).json({ erro: "Token invalido" });
                }
                else {
                    console.log("Payload: ", JSON.stringify(payload))
                    next();
                }
            })
        }
    }
}

export default validaToken