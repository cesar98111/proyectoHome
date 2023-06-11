import {View, Text, StyleSheet, ImageBackground, TextInput, Pressable} from "react-native"
import * as colors from "../../colors"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import Modals from "../Modals/Modals"


const SigIn = ({login, error, setError}) =>{
    const navigate = useNavigation()

    const [credentials, setCredentials] = useState({
        name:"",
        password:""
    })

    

    const handlerName = (data) =>{
        return(setCredentials({
            ...credentials,
            name:data
        }))
    }

    const handlerPassword = (data) =>{
        return(setCredentials({
            ...credentials,
            password:data
        }))
    }

    const handlerSubmitCredentials = async ()=>{
        if(credentials.login === "" || credentials.password === ""){
            setError(!error)
        }else{
           await login(credentials)
           
        }
    }
    return(
        <ImageBackground style={styles.containerLogin} source={require("../../assets/login.jpg")}>
            <Text style={{...styles.titleLogin, backgroundColor:colors.light.primary}}>INTRODUZCA CREDENCIALES</Text>
            <View style={{...styles.containerInput, backgroundColor:colors.light.backgroud}}>
                <Text style={styles.titleInput}>Nombre</Text>
                <TextInput placeholder="nombre"
                    style={{...styles.inputLogin, backgroundColor:colors.light.secundary}}
                    value={credentials.name}
                    onChangeText={handlerName}/>
                <Text style={styles.titleInput}>Contraseña</Text>
                <TextInput placeholder="contraseñaa"
                    style={{...styles.inputLogin, backgroundColor:colors.light.secundary}}
                    onChangeText={handlerPassword}
                    value={credentials.password}/>

                <View style={styles.containerButton}>
                    <Pressable onPress={()=>navigate.navigate("Login")} style={{...styles.buttonLogin, backgroundColor:colors.light.secundary}}>
                        <Text style={styles.buttonText}>
                            Cancelar
                        </Text>
                    </Pressable>
                    <Pressable onPress={()=>handlerSubmitCredentials()} style={{...styles.buttonLogin, backgroundColor:colors.light.secundary}}>
                        <Text style={styles.buttonText}>
                            Logearse
                        </Text>
                    </Pressable>
                </View>
                <Modals show={error} setShow={setError} message={"Credenciales no validas"}/>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    containerLogin:{
        height:"100%",
        width:"100%",
        justifyContent:"center",
        alignItems:"center"
    },
    titleLogin:{
        padding:15,
        color:"white",
        fontSize:20,
        fontWeight:"bold",
        marginBottom:40

    },
    containerInput:{
        height:400,
        width:"70%",
        borderRadius:20,
        opacity:0.7,
        justifyContent:"center",
        alignItems:"center"
    },
    titleInput:{
        marginLeft:"-40%",
        marginBottom:10
    },
    inputLogin:{
        textAlign:"center",
        width:"60%",
        padding:10,
        marginBottom:40
    },
    containerButton:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-around",
        
    },
    buttonLogin:{
        padding:10,
        borderRadius:10
        
    },
    buttonText:{
        fontSize:15,
        fontWeight:"bold"
    }
})

export default SigIn