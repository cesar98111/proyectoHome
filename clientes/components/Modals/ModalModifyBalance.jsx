import {View, Text, Modal, StyleSheet, TextInput, Pressable} from "react-native"
import * as color from "../../colors"
import { useState } from "react"
import { modifyUser } from "../../services/user.service"
import * as SecureStorage from "expo-secure-store"



const key = "my-key"
const ModalModifyBalance =({show, setShow , user, setUser})=>{


    const [balance, setBalance] = useState("")

    const balanceHandler=(value) =>{
        setBalance(value)
    }

    const addBalances = async () =>{
        
        const totalBalance = parseInt(user.balance) + parseInt(balance)
        
        const newUser = await modifyUser(user, totalBalance, await SecureStorage.getItemAsync(key))
        console.log(newUser)

        setUser(newUser)
        setBalance("")
        setShow(!show)
    }
    

    return(
        <Modal visible={show}>
            <View style={{...styles.containerModal}}>
                <View style={{...styles.viewModal, backgroundColor:color.light.primary}}>
                    <Text style={styles.modalTitle}>
                        AÑADA UNA CANTIDAD
                    </Text>
                    <TextInput style={{...styles.inputBalance, backgroundColor:color.light.secundary}}
                        placeholder="balance"
                        onChangeText={balanceHandler}
                        value={balance}
                        keyboardType="numeric"
                    />

                    <View style={styles.containerButton}>
                        <Pressable onPress={addBalances} style={{...styles.buttonModal, backgroundColor:color.light.secundary}}>
                            <Text style={styles.buttonText} >Añadir</Text>
                        </Pressable>
                        <Pressable onPress={()=>setShow(!show)} style={{...styles.buttonModal, backgroundColor:color.light.secundary}}>
                            <Text style={styles.buttonText} >Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
        
    )
}

const styles = StyleSheet.create({
    containerModal:{
        height:"100%",
        width:"100%",
        justifyContent:"center",
        alignItems:"center"
    },
    viewModal:{
        height:"45%",
        width:"70%",
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center",
    },
    modalTitle:{
        color:"white",
        fontSize:20,
        fontWeight:"bold"
    },
    inputBalance:{
        width:"80%",
        height:40,
        marginTop:20,
        textAlign:"center"
    },
    containerButton:{
        flexDirection:"row",
        marginTop:20,
        width:"80%",
        justifyContent:"space-around"
    },
    buttonModal:{
        padding:10,
        width:"40%"
    },
    buttonText:{
        width:"100%",
        textAlign:"center"
    }
})

export default ModalModifyBalance