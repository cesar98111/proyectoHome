import {View, Text, Pressable ,StyleSheet, FlatList} from "react-native"
import * as color from "../../colors"
import { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import * as serviceProduct from "../../services/product.service"
import * as SecureStore from 'expo-secure-store'
import ModalsBalance from "../Modals/ModalsBalance"

const key = "my-key"
const Finances = ({group, setLists,setList, lists, users, setProducts}) =>{
    const navigate = useNavigation()
  
    const [balance, setBalance] = useState(0)
    const [show, setShow] = useState(false)

   

    useEffect(()=>{
        const renderBalance = () =>{
            
            let aux=0
            users.forEach((value)=>{
                aux+=value.balance
            })
    
            setBalance(aux)
            
        }

        renderBalance()
    },[users])

    const handlerSelectList = async (value) =>{
        
        setProducts(await serviceProduct.getProductsByList(value.name, await SecureStore.getItemAsync(key)))
        setList(value)
        navigate.navigate("Products")
    }

    return(
        <View style={styles.containerFinance}>

            <View style={{...styles.groupBudget, backgroundColor:color.light.primary}}>
                <Pressable onPress={()=>setShow(!show)}>
                    <Text style={styles.budgetText}>
                        presupuesto grupal: {balance}
                    </Text>
                </Pressable>
                
            </View>
            <Pressable onPress={()=>navigate.navigate("Añadir productos")} style={{...styles.buttonList, backgroundColor:color.light.secundary}}>
                <Text style={styles.buttonText}>
                    Añadir Lista
                </Text>
            </Pressable>
            <FlatList style={{...styles.listOfList, backgroundColor:color.light.primary}} data={lists} renderItem={(value) =>{

                return(
                    
                    <View style={styles.lists}>
                        <Pressable onPress={()=>handlerSelectList(value.item)} style={{...styles.buttonList, backgroundColor:color.light.secundary}} key={value.index} >
                            <Text style={{...styles.buttonText, color:"white"}}>
                                {value.item.name}
                            </Text>
                        </Pressable>
                    </View>
                    
                )
            }}/>
            {
                users&&
                <ModalsBalance show={show} setShow={setShow} user={users}/>
            }
            
        </View>
    )
}


const styles = StyleSheet.create({
    containerFinance:{
        height:"100%",
        justifyContent:"flex-start",
        alignItems:"center"
    },
    containerCost:{
        width:"80%",
        height:200,
        borderRadius:20,
        marginTop:20,
        alignItems:"center",
        justifyContent:"space-around"
    },
    financeText:{
        color:"white",
        fontSize:20,
        fontWeight:"bold",
        padding:10,
        width:"50%",
        textAlign:"center",
        borderRadius:10
    },
    groupBudget:{
        marginTop:20,
        height:130,
        width:"80%",
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center"

    },
    budgetText:{
        fontSize:20,
        fontWeight:"bold",
        color:"white"
    },
    buttonList:{
        marginTop:20,
        width:"80%",
        height:60,
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center"
    },
    buttonText:{
        fontSize:20,
        fontWeight:"bold"
    },
    listOfList:{
        marginTop:10,
        width:"80%",
        height:90,
        borderRadius:20
        
    },
    lists:{
        width:"100%",
        alignItems:"center"
    }
})

export default Finances