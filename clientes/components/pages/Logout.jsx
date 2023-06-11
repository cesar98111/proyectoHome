import {View, Text, Pressable, StyleSheet} from "react-native"
import * as colors from "../../colors"
import { useNavigation } from "@react-navigation/native"
import * as SecureStore from 'expo-secure-store'

const Key = "my-key"
const Logout = ({setUser}) =>{

    const navigate = useNavigation()

    const handlerLogout= async ()=>{
        await SecureStore.deleteItemAsync(Key)
        setUser(null)
    }

    return(
        <View style={{...styles.logoutContainer, backgroundColor:colors.light.backgroud}}>
            <View style={{...styles.viewLogout, backgroundColor:colors.light.primary}}>
                <Text style={{...styles.titleLogin, backgroundColor:colors.light.secundary}}>
                    ¿Seguro que quiere salir de la aplicaión?
                </Text>
                <View style={styles.buttonContainer}>
                    <Pressable onPress={()=> handlerLogout()} style={{...styles.button, backgroundColor: colors.light.secundary}}>
                        <Text style={styles.textButton}>
                            Salir
                        </Text>
                    </Pressable>
                    <Pressable onPress={()=>navigate.navigate("Home")} style={{...styles.button, backgroundColor: colors.light.secundary}}>
                        <Text style={styles.textButton}>
                            Cancelar
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    logoutContainer:{
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        height:"100%",
    },
    viewLogout:{
        height:400,
        width:"80%",
        borderRadius:20,
        justifyContent:"space-around",
        alignItems:"center",

    },
    titleLogin:{
        padding:10,
        borderRadius:10,
        fontSize:20,
        textAlign:"center"
    },
    buttonContainer:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-around"
    },
    button:{
        padding:10,
        borderRadius:10,
        width:"40%"
    },
    textButton:{
        fontSize:20,
        fontWeight:"bold",
        width:"100%",
        textAlign:"center"
    }

})

export default Logout