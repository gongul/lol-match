const axios = require("axios");

async function checkSocicalUserToken(url){
    try{
        const response = await axios.get(url,{headers:{'Authorization': "bearer " + ""}});

        if(response.status !== 200){
            console.log("이상한 토큰");
        }

        console.log(response.data);
    }catch(e){
        console.log(e.response.status);
    }
}


checkSocicalUserToken("https://kapi.kakao.com/v1/user/access_token_info");