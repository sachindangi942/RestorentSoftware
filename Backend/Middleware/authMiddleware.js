const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const create_token = ({ data }) => {
    return jwt.sign(data, SECRET_KEY, {})
};
const check_token = (req,res,next) => {
const token = req.headers["authorization"]?.split(" ")[1];
if(!token)res.send({msg:"access denay"});
else{
    jwt.verify(token,SECRET_KEY,(err)=>{
        if(err){
            res.status(401).send(err)
        }else{
            next();
        }
    })
    
    
}
}

module.exports = { create_token ,check_token};