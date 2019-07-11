import Axios, { AxiosRequestConfig } from "axios";

export async function checkSocicalUserToken(url:string,config:AxiosRequestConfig){
    
    try{
        const response = await Axios.get(url,config);

        if(response.status !== 200){
            
        }
    }catch(e){
        throw e;
    }
}
