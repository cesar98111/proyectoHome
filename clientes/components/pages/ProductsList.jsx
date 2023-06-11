import { useEffect, useState } from "react"
import { View, Text , StyleSheet,FlatList, Pressable} from "react-native"
import * as color from "../../colors"

import Product from "./Product"
import { useNavigation } from "@react-navigation/native"

const Key = "my-key"
const ProductsList = ({List,product}) =>{
    const [products, setProduct] = useState([{name:"albondia",price:2.0,quantity:20, status:"comprado" }])
    const navigate= useNavigation()
    
    
    return(
       <View style={styles.containerProduct}>
            <Text style={{...styles.titleList, backgroundColor:color.light.primary}}>{List.name}</Text>
            <View style={{...styles.containerListProduct,backgroundColor:color.light.primary}}>
                <FlatList style={styles.flatList} data={product} renderItem={(value)=>{
                    const data = value.item

                        return(
                            <Product key={value.index}
                                product={data}/>
                        )
                    
                    
                }}/>
            </View>
            <Pressable onPress={()=> navigate.navigate("Finances")} style={{...styles.backButton, backgroundColor:color.light.secundary}}>
                <Text style={{...styles.textButton}}>atras</Text>
            </Pressable>
            
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
    }

})

export default ProductsList