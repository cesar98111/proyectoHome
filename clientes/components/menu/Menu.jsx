import { DrawerContentScrollView } from "@react-navigation/drawer"

import { StyleSheet, View,Text, Pressable, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/user.service"
import { getAllTask } from "../../services/task.service"

import * as colors from "../../colors"
import * as SecureStorage from 'expo-secure-store'


const key = "my-key"
const Menu = ({setTasks,user, setUsers}) =>{
    const navigate = useNavigation()

    const renderTasks = async() =>{
        const allUsers = await getAllUsers(await SecureStorage.getItemAsync(key))
        const allTasks = await getAllTask(await SecureStorage.getItemAsync(key))
        setUsers(allUsers)
        setTasks(allTasks)
        console.log(allTasks)
        navigate.navigate("Tareas")
    }
    return(
        <DrawerContentScrollView style={{backgroundColor:colors.light.primary}}>
            
            {
                user===null?
                <Pressable style={{...styles.menuOption, backgroundColor:colors.light.secundary}}>
                    <Text style={styles.optionText}>Login</Text>
                </Pressable>
                :
                <View style={styles.menuContainer}>
                    <View style={styles.headerMenu}>
                        <Image source={require("../../assets/profile.jpg")} style={styles.image}/>
                        <Text style={styles.titleUser}>{user.name}</Text>
                    </View>
                    <Pressable onPress={()=>navigate.navigate("Home")} style={{...styles.menuOption, backgroundColor:colors.light.secundary}}>
                        <Text style={styles.optionText}>Home</Text>
                    </Pressable>
                    <Pressable onPress={()=>navigate.navigate("GroupFinance")} style={{...styles.menuOption, backgroundColor:colors.light.secundary}}>
                        <Text style={styles.optionText}>
                            Finanzas
                        </Text>
                    </Pressable>
                    {
                        user.rol === "admin"?
                        <Pressable onPress={()=>renderTasks()} style={{...styles.menuOption, backgroundColor:colors.light.secundary}}>
                            <Text style={styles.optionText}>
                                Tareas
                            </Text>
                        </Pressable>
                        :null
                    }
                    
                    <Pressable onPress={()=>navigate.navigate("Logout")} style={{...styles.menuOption, backgroundColor:colors.light.secundary}}>
                        <Text style={styles.optionText}>
                            Logout
                        </Text>
                    </Pressable>
                    
                    
                </View>
            }
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    menuContainer:{
       justifyContent:"center",
       alignItems:"center"
       
    },
    headerMenu:{
        flexDirection:"row",
        width:"100%",
        justifyContent:"space-around",
        marginTop:20
    },
    menuOption:{
        padding:10,
        width:"80%",
        marginTop:20,
        borderRadius:10
    },
    optionText:{
        textAlign:"center",
        fontSize:20,
        fontWeight:"bold"
    },
    image:{
        height:100,
        width:100,
        borderRadius:100
    },
    titleUser:{
        height:"100%",
        textAlignVertical:"center",
        fontSize:30,
        fontWeight:"bold",
        color:"white"
    }
})

export default Menu