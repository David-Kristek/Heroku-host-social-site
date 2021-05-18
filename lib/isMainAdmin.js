const isAdmin = (req, res, next) => {
    if(!req.user.admin.mainAdmin) return res.json({err : "you are main admin"}); 
    next(); 
}
module.exports = isAdmin;
