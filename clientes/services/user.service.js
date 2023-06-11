import {ip} from "../config/ip.json"

const url =`http://${ip}:8080/auth`
const urlUser=`http://${ip}:8080/users`
export const register = async (credentials) =>{
    try{
        
        const response = await fetch(`${url}/register`,{
            method:"POST",
            body:JSON.stringify({
                name:credentials.name,
                email:credentials.email,
                password:credentials.password
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        
        return data.token
    }catch(err){
        
        return null
    }
}

export const currentUser = async (token) =>{
    try{
        
        const response = await fetch(`${urlUser}/currentUser`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        })

        const data = await response.json()
        
        if(data.status===500){
            return null
        }else{
            return data
        }
        
    }catch(err){
        return null
    }
}

export const login = async (credentials) =>{
    try{
        const response = await fetch(`${url}/login`,{
            method:"POST",
            body:JSON.stringify({
                nombre:credentials.name,
                password:credentials.password
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        
        if(data.token === undefined){
            
            return null
        }
        return data.token
    }catch(err){
        return null
    }
}

export const getUserByGroup = async(name,token)=>{
    
    try{
        const response = await fetch(`${urlUser}/getByGroup/${name}`,{
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

export const getAllUsers = async(token) =>{
    console.log("kshd")
    try{
        const response = await fetch(`${urlUser}/get/users`,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        })
        
        const data = await response.json()
        console.log(data)
        return data
    }catch(err){
        console.log(err)
        return null
    }
}

export const asingTaskToUser = async(idTask, name, token) =>{
    try{
        const response = await fetch(`${urlUser}/insertUser/${idTask}/${name}`,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        })

        return data
        
    }catch(err){
        return null
    }
}

export const modifyUser = async(user,newBalance,token)=>{
    try{
        const response = await fetch(`${urlUser}/modify/${user.userID}`,{
            method:"PUT",
            body:JSON.stringify({
                name:user.name,
                email:user.email,
                rol:user.rol,
                password:user.password,
                balance:newBalance
            }),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        })

        const data = await response.json()

        return data
    }catch(err){
        console.log(token)
    }
}


