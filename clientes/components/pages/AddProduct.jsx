import {View, Text, StyleSheet, TextInput, FlatList, Pressable} from "react-native"
import NumericInput from "react-native-numeric-input"
import { useState, useEffect } from "react"
import * as color from "../../colors"
import Product from "./Product"
import ModalListName from "../Modals/ModalListName"
import { Value } from "react-native-reanimated"

const AddProduct = ({group}) =>{
    const [productList, setProductList] = useState([])
    const [products, setProduct] = useState({
        name:"",
        quantity:0,
        price:0,
        status:"pendiente"

    })
    const [show, setShow] = useState(false)
   
    const nameProductHandler=(value)=>{
        return(setProduct({
            ...products,
            name:value
        }))
        
    }

    const quantityHandler=(value)=>{
        return(setProduct({
            ...products,
            quantity:value,
        }))
    }

    const priceHandler = (value)=>{
        return(setProduct({
            ...products,
            price:value
        }))
    }

    const addProductHandler=()=>{
        setProductList([...productList,products])
        setProduct({
            ...products,
            name:"",
            quantity:0,
            price:0
        })
    }
    return(
        <View style={styles.containerAddProduct} >
            <Text style={{...styles.titleProduct,backgroundColor:color.light.primary}}>AÑADA PRODUCTOS A LA LISTA</Text>
            <View style={{...styles.productInput, backgroundColor:color.light.primary}}>
                <View style={styles.rowInput}>
                    <TextInput style={{...styles.inputText,backgroundColor:color.light.secundary}}
                        placeholder="Nombre Producto"
                        onChangeText={nameProductHandler}
                        value={products.name}/>
                    <View style={styles.numericInputContainer}>
                        <Text style={styles.numericText}>Cantidad</Text>
                        <NumericInput 
                            totalWidth={80}
                            totalHeight={40}
                            rightButtonBackgroundColor={color.light.secundary}
                            leftButtonBackgroundColor={color.light.secundary}
                            borderColor={color.light.primary}
                            onChange={(value)=>quantityHandler(value)}
                            initValue={products.quantity}/>
                    </View>
                    
                </View>
                <View style={styles.rowInput}>
                  
                    <View style={styles.numericInputContainer}>
                        
                        <Text style={styles.numericText}>Precio</Text>
                        <NumericInput 
                            totalWidth={80}
                            totalHeight={40}
                            rightButtonBackgroundColor={color.light.secundary}
                            leftButtonBackgroundColor={color.light.secundary}
                            borderColor={color.light.primary}
                            onChange={(value)=>priceHandler(value)}
                            initValue={products.price}/>
                    </View>
                    <Pressable onPress={()=> addProductHandler()} style={{...styles.buttonAdd, backgroundColor:color.light.secundary}}>
                        <Text style={styles.butonText}>Añadir producto</Text>
                    </Pressable>
                </View>
            </View>
            <View style={{...styles.containerListProduct, backgroundColor:color.light.primary}}>
                <FlatList style={styles.listProduct} data={productList} renderItem={(value)=>{
                    return(
                        <Product key={value.index}
                            product={value.item}/>
                    )
                }} />
            </View>
            <ModalListName productList={productList} setProductList={setProductList} show={show} setShow={setShow} group={group}/>
            <Pressable  onPress={()=>setShow(!show)} style={{...styles.buttonList, backgroundColor:color.light.secundary}}>
                <Text style={{...styles.butonText, padding:10}}>añadir lista</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    containerAddProduct:{
        height:"100%",
        width:"100%",
        alignItems:"center",
        justifyContent:"center"
    },
    titleProduct:{
        padding:10,
        color:"white",
        fontSize:20,
        fontWeight:"bold"
    },
    productInput:{
        height:170,
        width:"80%",
        marginTop:20,
        borderRadius:20,
        
    },
    inputText:{
        width:"40%",
        padding:6,
        textAlign:"center"
    },
    rowInput:{
        height:"50%",
        alignItems:"center",
        marginTop:5,
        flexDirection:"row",
        justifyContent:"space-around",
        marginBottom:5

    },
    numericInputContainer:{
        marginTop:-30
    },
    numericText:{
        color:"white",
        fontWeight:"bold",
        marginBottom:10,
        width:"100%",
        textAlign:"center"
    },
    containerListProduct:{
        height:"50%",
        width:"80%",
        marginTop:10,
        borderRadius:20
    },
    listProduct:{
        height:"100%"
    },
    buttonAdd:{
        padding:10,

    },
    butonText:{
        fontWeight:"bold",
        fontSize:15,
        textAlign:"center"
    
    },
    buttonList:{
        width:"40%",
        marginTop:10
    }
})

export default AddProduct