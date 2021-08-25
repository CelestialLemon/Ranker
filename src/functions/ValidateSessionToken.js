import axios from 'axios'

const ValidateSessionToken = async () =>
{
    if(sessionStorage.getItem("accessToken") == null)
    return false;


    try
    {
        const res = await axios.post("https://ranker-22-api.herokuapp.com/auth/login", {} , {'headers': {'authorization' : 'Bearer ' + sessionStorage.getItem("accessToken")}});
        console.log("validating session token result " + res.data.msg);
        if(res.data.msg == "logged in with token")
        {
            console.log("Logged In with session token");
            return true;
        }
        else
        {
            console.log("Invalid session Token");
           
            return false;
        }
        
    }catch(err)
    {
        console.log(err);
    }
}

export default ValidateSessionToken;