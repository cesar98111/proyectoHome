import {ip} from "../config/ip.json"

const url = `http://${ip}:8080/product`

export const getProductsByList= async(name,token) =>{
    try{
        const response  = await fetch((`${url}/getByList/${name}`),{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        })

        const data = await response.json()
        
        return data
    }catch(err){
        console.log(err)
        return null
    }
}

export const insertProduct = async(id,product,token) =>{
   
    try{
        const response = await fetch(`${url}/insert/${id}`,{
            method:"POST",
            body:JSON.stringify({
                name:product.name,
                quantity:product.quantity,
                price:product.price,
                status:product.status
            }),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        })
   
        
    }catch(err){
        console.log(err)
        return null
    }
}