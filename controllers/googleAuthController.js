const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../modules/User");
const CLIENT_ID =
  "236995755291-85hhe3gi2eaofgemhvcbv1horm067upu.apps.googleusercontent.com";

const client = new OAuth2Client(CLIENT_ID);

class GoogleAuthController {
  async login(req, res) {
    const { tokenId } = req.body.tokenId;
    var ticket;
    try {
      ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: CLIENT_ID,
      });
    } catch (err) {
      return res.statuts(400).send(err);
    }
    const payload = ticket.getPayload();
    const user = {
      name: payload.name,
      email: payload.email,
      image: payload.picture,
      password: "google-log",
    };
    const userExist = await User.findOne({ email: user.email });
    if (!userExist) {
      const userS = new User(user);
      try {
        const save = await userS.save();
      } catch (err) {
        console.log(err);
        return res.status(400).send(err);
      }
    }
    return res.json({ token: tokenId, user: {
      name: user.name,
      email: user.email,
      picture: user.image,
    } });
  }
  isLogged(req, res) {
    //protected route with google and in route checkAuth.js
    if (!req.user.email) return res.status(402).send("unauthorized");
    return res.json({ msg: "success", user: req.user });
  }
}
module.exports = GoogleAuthController;
