const isAdmin = (req, res, next) => {
    if(!req.user.admin.isAdmin) return res.json({err : "you are not admin"}); 
    next(); 
}
module.exports = isAdmin;
