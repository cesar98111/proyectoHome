import {View, Text, ImageBackground, TextInput, StyleSheet, Pressable, Modal} from "react-native"
import * as colors from "../../colors"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import errors from "../../error.json"
import Modals from "../Modals/Modals"

const Register = ({register}) =>{
    const navigate = useNavigation()
    const [credentials, setCredentials] = useState({
        name:"",
        email:"",
        password:"",
        repeatPassword:""
    })

    const [error, setError] = useState(false)
    const [errorPassword, setErrorPassword]= useState(false)

    const handlerName =(data)=>{
        
        return(setCredentials({
            ...credentials,
            name:data
        }))
    }

    const handlerEmail = (data) =>{
        return(setCredentials({
            ...credentials,
            email:data
        }))
    }

    const handlerPassword=(data) =>{
        return(setCredentials({
            ...credentials,
            password:data
        }))
    }

    const handlerRepeatPassword=(data) =>{
        return(setCredentials({
            ...credentials,
            repeatPassword:data
        }))
    }

    const handlerSubmit= async() =>{
        
        if(credentials.password === credentials.repeatPassword){
            const token = await register(credentials)
            if(token === null || token === undefined){
                setError(true)
                
            }
        }else{
            setErrorPassword(true)

            setTimeout(()=>{
                setErrorPassword(false)
            },3000)
        }
        
    }
    return(
        <ImageBackground style={styles.containerRegister} source={require("../../assets/login.jpg")}>
            <Text style={{...styles.titleRegister, backgroundColor:colors.light.primary}}>Introduzca Credenciales</Text>
            <View style={{...styles.containerInput,backgroundColor:colors.light.backgroud}}>
                <Text style={styles.titleInput}>Nombre</Text>
                <TextInput 
                    placeholder="nombre"
                    style={{...styles.inputRegister, backgroundColor:colors.light.secundary}}
                    value={credentials.name}
                    onChangeText={handlerName}/>
                <Text style={styles.titleInput}>Email</Text>
                <TextInput
                    placeholder="email"
                    style={{...styles.inputRegister, backgroundColor:colors.light.secundary}}
                    value={credentials.email}
                    onChangeText={handlerEmail}/>

                <Text style={styles.titleInput}>Contraseña</Text>
                <TextInput
                    placeholder="contraseña"
                    style={!errorPassword ? {...styles.inputRegister, backgroundColor:colors.light.secundary}:{...styles.inputRegister,...errors, backgroundColor:colors.light.secundary}}
                    keyboardType="visible-password"
                    value={credentials.password}
                    onChangeText={handlerPassword}
                    />
                <Text style={styles.titleInput}>Repetir Contraseña</Text>
                <TextInput
                    placeholder="Repetir Contraseña"
                    style={!errorPassword ? {...styles.inputRegister, backgroundColor:colors.light.secundary}:{...styles.inputRegister,...errors, backgroundColor:colors.light.secundary}}
                    keyboardType="visible-password"
                    value={credentials.repeatPassword}
                    onChangeText={handlerRepeatPassword}
                />
                <View style={styles.buttoncontainer}>
                    <Pressable onPress={()=> handlerSubmit()} style={{...styles.buttonRegister, backgroundColor:colors.light.secundary}}>
                        <Text style={styles.buttonText}>
                            Registrarse
                        </Text>
                    </Pressable>
                    <Pressable onPress={()=> navigate.navigate("Login")} style={{...styles.buttonRegister, backgroundColor:colors.light.secundary}}>
                        <Text style={styles.buttonText}>
                            Cancelar
                        </Text>
                    </Pressable>
                </View>
                
            </View>
            <Modals show={error} setShow={setError} message={"El usuario ya existe"}/>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    containerRegister:{
        justifyContent:"center",
        alignItems:"center",
        height:"100%",
        width:"100%",
        
    },
    containerTranslucid:{
        position:"absolute",
        height: 500,
        width:"70%",
        borderRadius:20,
        opacity:0.7,
        zIndex:0,
        top:"25%"
    },
    containerInput:{
        justifyContent:"center",
        alignItems:"center",
        width:"70%",
        height:500,
        opacity:0.7,
        marginBottom:"15%",
        borderRadius:20
    },
    inputRegister:{
        padding:10,
        width:"80%",
        marginBottom:10
    },
    titleInput:{
        textAlign:"left",
        marginBottom:10,
        width:"80%"
    },
    titleRegister:{
        padding:15,
        marginBottom:70,
        color:"white",
        fontSize:20,
        fontWeight:"bold"

    },
    buttoncontainer:{
       width:"100%",
       flexDirection:"row",
       justifyContent:"space-around",
       marginTop:20
    },
    buttonRegister:{
        marginTop:5,
        padding:10,
        borderRadius:10,
        width:"34%",
        

    },
    buttonText:{
        fontSize:14,
        fontWeight:"bold",
        width:"100%",
        textAlign:"center"
    }

})

export default Register