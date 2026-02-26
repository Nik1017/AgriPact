import jwt from 'jsonwebtoken';

const isAuthenticate = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;
        
        if(!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: "Please signin - No token provided"
            });
        }

        // Extract token (remove 'Bearer ' prefix)
        const token = authHeader.split(' ')[1];
        
        if(!token) {
            return res.status(401).json({
                message: "Please signin - Invalid token format"
            });
        }

        // Verify token
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        
        if(!decode) {
            return res.status(401).json({
                message: "Invalid token"
            });
        }

        req.id = decode.id;
        req.userId = decode.id; 
        req.user = decode; 
        
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Authentication failed - Invalid or expired token"
        });
    }
}

export default isAuthenticate;