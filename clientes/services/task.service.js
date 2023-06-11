import {ip} from "../config/ip.json"

const url = `http://${ip}:8080/task`

export const getTaskByUser =  async(id, token) =>{
    try{
        const resposne = await fetch(`${url}/get/${id}`,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        })
    
        const data = await resposne.json()
    
        return data
    }catch(err){
        console.log(err)
    }
    
}

export const getAllTask = async (token) =>{
    try{
        const response = await fetch(`${url}/get`,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        })

        const data = await response.json()

        return data
    }catch(err){
        console.log(err)
    }
}

export const insertTask = async (task, token) =>{
    try{
        const response = await fetch(`${url}/insert`,{
            method:"POST",
            body:JSON.stringify({
                name:task.name,
                description:task.description,
                status:"pendiente",
                creation:null,
                expire:null
            }),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        })

        const data = await response.json()

        return data
    }catch(err){
        console.log(err)
    }
}