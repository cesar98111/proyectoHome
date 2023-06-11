import {View, Text, Pressable, StyleSheet, Modal, TextInput} from "react-native"
import * as color from "../../colors"
import { useState } from "react"
import * as productService from "../../services/product.service"
import * as listService from "../../services/listService"
import * as SecureStore from 'expo-secure-store'
import { useNavigation } from "@react-navigation/native"
const key = "my-key"
const ModalListName= ({setProductList,productList, show, setShow, group}) =>{
    const navigation = useNavigation()
    const [name, setName] = useState("")


    const nameHandler= (value) =>{
        setName(value)
    }

    const addList = async () =>{

        console.log(productList[0])
        const list = await listService.addList(group.idgroup,name,await SecureStore.getItemAsync(key))
        console.log(list.idList)
        productList.forEach(async(element) => {
            await productService.insertProduct(list.idList,element,await SecureStore.getItemAsync(key)) 
        });
        
        setProductList([])
        setName("")
        setShow(!show)
        navigation.navigate("GroupFinance")
    }

    return(
        <Modal visible={show} >
            <View style={styles.containerModal}>
                <Text style={{...styles.titleModal, backgroundColor:color.light.primary}}>INTRODUCE EL NOMBRE DE LA LISTA</Text>
                <View style={{...styles.viewModal, backgroundColor:color.light.primary}}>
                    <TextInput style={{...styles.inputName, backgroundColor:color.light.secundary}}
                        placeholder="nombre de lista"
                        onChangeText={nameHandler}
                        value={name}/>
                    <View style={styles.containerButton}>
                        <Pressable onPress={()=>addList()} style={{...styles.buttonAdd, backgroundColor:color.light.secundary}}>
                            <Text style={styles.textButton}>Añadir</Text>
                        </Pressable>
                        <Pressable onPress={()=> setShow(!show)} style={{...styles.buttonAdd, backgroundColor:color.light.secundary}}>
                            <Text style={styles.textButton}>Cancelar</Text>
                        </Pressable>
                    </View>
                    
                </View>
                
            </View>
        </Modal>
        
    )
}

const styles= StyleSheet.create({
    titleModal:{
        marginBottom:30,

    },
    containerModal:{
        height:"100%",
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
    },
    viewModal:{
        height:200,
        width:"80%",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:20
    },
    inputName:{
        width:"80%",
        textAlign:"center",
        padding:10,
        marginBottom:20

    },
    buttonAdd:{
        padding:10,
        width:"40%"
    },
    textButton:{
        textAlign:"center",
        fontSize:20,
        fontWeight:"bold"
    },
    containerButton:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-around"
    },
    titleModal:{
        padding:10,
        color:"white",
        marginBottom:20,
        fontSize:20,
        fontWeight:"bold"
    }

})

export default ModalListName