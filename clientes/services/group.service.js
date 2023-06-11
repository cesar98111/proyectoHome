import {ip} from "../config/ip.json"
const url =`http://${ip}:8080/group`

export const getGroupByUser= async(name, token)=>{
    try{
        const response = await fetch(`${url}/getGroupByUserName/${name}`,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        })

        const data = await response.json()
        
        if(data === undefined){
            return null
        }
        return data
    }catch(err){
        console.log("da")
        return null
    }
}