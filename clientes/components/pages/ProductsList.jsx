import { useEffect, useState } from "react"
import { View, Text , StyleSheet,FlatList, Pressable} from "react-native"
import * as color from "../../colors"
import * as SecureStorage from "expo-secure-store"
import Product from "./Product"
import { useNavigation } from "@react-navigation/native"
import { modifyUser } from "../../services/user.service"

const Key = "my-key"
const ProductsList = ({user, setUser, List,product}) =>{
    const [selectProduct , setSelectProduct] = useState([])

    const navigate= useNavigation()
    
    const selectProductAdd = (value) =>{
        if(selectProduct.includes(value)){
            setSelectProduct(selectProduct.filter((product)=> product.idProduct !== value.idProduct))
        }else{
            setSelectProduct([...selectProduct,value])
            
        }
    }   

    const buyProduct = async () =>{
        let totalCost = 0
        selectProduct.forEach((data)=>{
            totalCost += parseFloat(data.price)* parseFloat(data.quantity)
        })
        const totalBalance = parseFloat(user.balance) - totalCost 

        const newUser = await modifyUser(user, totalBalance, await SecureStorage.getItemAsync(Key))

        setUser(newUser)

        navigate.navigate("Finances")
    }
    return(
       <View style={styles.containerProduct}>
            <Text style={{...styles.titleList, backgroundColor:color.light.primary}}>{List.name}</Text>
            <View style={{...styles.containerListProduct,backgroundColor:color.light.primary}}>
                <FlatList style={styles.flatList} data={product} renderItem={(value)=>{
                    const data = value.item

                        return(
                            <Pressable key={value.index} onPress={()=>selectProductAdd(data)}>
                                <Product 
                                selectProduct={selectProduct}
                                product={data}/>
                            </Pressable>
                            
                        )
                    
                    
                }}/>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable onPress={()=> navigate.navigate("Finances")} style={{...styles.backButton, backgroundColor:color.light.secundary}}>
                    <Text style={{...styles.textButton}}>Cancelar</Text>
                </Pressable>
                <Pressable onPress={() => buyProduct()} style={{...styles.backButton, backgroundColor:color.light.secundary}}>
                    <Text style={{...styles.textButton}}>Comprar</Text>
                </Pressable>
            </View>
            
            
       </View>
    )
}

const styles = StyleSheet.create({
    containerProduct:{
        justifyContent:"center",
        alignItems:"center",
        height:"100%",
        width:"100%"
    },
    titleList:{
        fontSize:30,
        fontWeight:"bold",
        marginBottom:20,
        padding:10,
        color:"white"
    },
    containerListProduct:{
        height:"50%",
        borderRadius:20,
        width:"70%",
        justifyContent:"center",
        alignItems:"center"
        
    },
    flatList:{
        width:"80%",
    },
    backButton:{
        width:"40%",
        marginTop:20,
        padding:10,
        borderRadius:10
    },
    textButton:{
        width:"100%",
        textAlign:"center",
        fontWeight:"bold",
        fontSize:15
    },
    buttonContainer:{
        flexDirection:"row",
        justifyContent:"space-around",
        width:"80%"
    }

})

export default ProductsList