import GoogleAuth from 'google-auth-library';
const {OAuth2Client} = GoogleAuth;
import dotenv from 'dotenv';
dotenv.config();
const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'postmessage',
  );
export const getToken = async(req,res) => {
    try {
        const { tokens } = await oAuth2Client.getToken(req.body); // exchange code for tokens
        console.log(tokens);
        res.json(tokens);
    } catch (error) {
        console.log(error)
    }
};
export const getRefreshToken =  async(req,res)=> {
    try {
        const user = new UserRefreshClient(
            clientId,
            clientSecret,
            req.body.refreshToken,
          );
          const { credentials } = await user.refreshAccessToken(); 
          res.json(credentials);
    } catch (error) {
        console.log(error);
    }
}