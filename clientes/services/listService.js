import {ip} from "../config/ip.json"

const url =`http://${ip}:8080/lists`

export const getListByGroup = async (id,token) =>{
    console.log(id)
    try{
        const response = await fetch(`${url}/list/${id}`,{
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
        console.log(err)
    }
}

export const addList = async (id,name, token)=>{
    try{
        const response = await fetch(`${url}/add/${id}`,{
            method:"POST",
            body:JSON.stringify({
                name:name
            }),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        })

        const data = response.json()

        return data
    }catch(err){
        console.log(err)
    }
}