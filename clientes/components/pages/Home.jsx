import {View, Text , StyleSheet, Image, FlatList, Pressable} from "react-native"
import * as color from "../../colors"
import { useState } from "react"
import ModalModifyBalance from "../Modals/ModalModifyBalance"

const Home = ({user, setUser, tasks}) =>{
    const [show, setShow] = useState(false)


    return(
        <View style={styles.containerHome}>
            <View style={styles.containerProfile}>
                <Image source={require("../../assets/profile.jpg")} style={styles.image}/>
                <Text style={styles.textProfile}>{user.name}</Text>
            </View>
            <View style={{...styles.containerBalance,backgroundColor:color.light.primary}}>
                <Text style={styles.balanceText}>Balance:</Text>
                <Pressable onPress={()=>setShow(!show)}>
                    <Text style={{...styles.balance, backgroundColor:color.light.secundary}}>{user.balance} €</Text>
                </Pressable>
                
            </View>
            <View style={{...styles.containerList, backgroundColor:color.light.primary}}>
                <FlatList style={{...styles.listTask}} data={tasks} renderItem={(value)=>{
                    return(
                        <Text style={{...styles.taskTitle, backgroundColor:color.light.secundary}} key={value.index}>{value.item.name}</Text>
                    )
                }}/>
            </View>
            <ModalModifyBalance show={show} setShow={setShow} user={user} setUser={setUser}/>
        </View>
    )
}

const styles = StyleSheet.create({
    containerHome:{
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        height:"100%"
    },
    containerProfile:{
        flexDirection:"row",
        justifyContent:"center"
    },
    image:{
        width:100,
        height:100,
        borderRadius:100,
        marginRight:20
    },
    textProfile:{
        fontSize:20,
        height:"100%",
        textAlignVertical:"center",
        fontWeight:"bold",
        
    },
    containerBalance:{
        marginTop:50,
        height:150,
        width:"70%",
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center"
    },
    balanceText:{
        marginBottom:20,
        fontWeight:"bold",
        fontSize:20
    },
    balance:{
        padding:10,
        borderRadius:10,
        width:"40%",
        textAlign:"center",
        fontSize:18,
        fontWeight:"bold"
    },
    containerList:{
        height:"40%",
        margin:10,
        width:"70%",
        alignItems:"center",
        borderRadius:20
    },
    taskTitle:{
        padding:10,
        textAlign:"center",
        marginTop:20
    },
    listTask:{
        width:"80%"
    }
})

export default Home