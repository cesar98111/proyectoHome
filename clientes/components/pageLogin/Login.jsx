import {View, Text, Pressable, StyleSheet, ImageBackground } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Modals from "../Modals/Modals"
import * as colors from "../../colors"
const Login = ({register}) =>{
    const navigate = useNavigation()
    return(
        <ImageBackground source={require("../../assets/login.jpg")}>
            <View style={styles.containerLogin} >
                
                    <Text style={{...styles.titleLogin, backgroundColor:colors.light.primary}}>
                        BIENVENIDO USUARIO
                    </Text>
                    
                        <View style={{...styles.buttonContainer, backgroundColor:colors.light.surface }}>
                            <Pressable onPress={() => navigate.navigate("SigIn")} style={{...styles.loginInput, backgroundColor:colors.light.secundary}}>
                                <Text style={styles.textButton}>Login</Text>
                            </Pressable>
                            <Pressable onPress={()=>navigate.navigate("Register")}  style={{...styles.loginInput, backgroundColor:colors.light.secundary}}>
                                <Text style={styles.textButton}>Registro</Text>
                            </Pressable>
                        </View>
                        
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    containerLogin:{
        width:"100%",
        height:"100%",
        justifyContent:"flex-start",
        alignItems:"center",
        
        
    },
    buttonContainer:{
        
        width:"70%",
        height:300,
        justifyContent:"space-around",
        alignItems:"center",
        borderRadius:20,
        opacity: 0.7,
        
    },
    titleLogin:{
        padding:20,
        marginTop:50,
        marginBottom:50
    },
    textButton:{
        fontSize:15,
        fontWeight:"bold"
    },
    loginInput:{
        justifyContent:"center",
        alignItems:"center",
        width:"50%",
        color:"white",
        padding:15,
        opacity:1
        
    },
})

export default Login