import { View,Pressable, Text, FlatList , StyleSheet} from "react-native"
import * as color from "../../colors"
import { useEffect, useState } from "react"
import * as groupService from "../../services/group.service"
import * as SecureStore from 'expo-secure-store'
import { useNavigation } from "@react-navigation/native"
import * as serviceList from "../../services/listService"
import * as serviceUser from "../../services/user.service"

const key = "my-key"
const GroupFinance = ({user,setGroup,setLists, setUsers}) =>{
    const navigation = useNavigation()
    const [groups, setGroups] = useState()

    useEffect(()=>{
        const getGroups = async() =>{
            
            const data = await groupService.getGroupByUser(user.name, await SecureStore.getItemAsync(key))
            setGroups(data)
            
        }

        getGroups()
    },[])

    const selectGroupHandler = async (group) =>{

        const list = await serviceList.getListByGroup(group.name, await SecureStore.getItemAsync(key))
        const users = await serviceUser.getUserByGroup(group.name, await SecureStore.getItemAsync(key))
        console.log("usuarios")
        console.log(users)
        console.log("listas")
        console.log(list)
        console.log("grupo")
        console.log(group)
        setUsers(users)
        setLists(list)
        setGroup(group)
        navigation.navigate("Finances")
        
    }

    return(
        <View style={styles.container}>
            <Text style={{...styles.title, backgroundColor:color.light.primary}}>ELIGA UN GRUPO</Text>
            <View style={styles.containerSelectGroup}>
                <FlatList style={{...styles.listGroups, backgroundColor:color.light.primary}} data={groups} renderItem={(value)=>{
                    return(
                        <View style={styles.containerButton}>
                            <Pressable onPress={()=>selectGroupHandler(value.item)} style={{...styles.buttonGroup, backgroundColor:color.light.secundary}}>
                                <Text style={{...styles.textButton}}>{value.item.name}</Text>
                            </Pressable>
                        </View>
                    )
                }}/>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    containerSelectGroup:{
        width:"100%",
        height:"50%",
        justifyContent:"center",
        alignItems:"center"
    },
    listGroups:{
        height:"60%",
        width:"75%",
        borderRadius:20
    },
    container:{
        height:"100%",
        width:"100%",
        justifyContent:"flex-start",
        alignItems:"center"
    },
    containerButton:{
        width:"100%",
        alignItems:"center"
    },
    buttonGroup:{
        width:"40%",
        padding:10,
        borderRadius:10,
        marginTop:15
    },
    textButton:{
        textAlign:"center",
        fontWeight:"bold",
        fontSize:20
    },
    title:{
        padding:20,
        borderRadius:10,
        color:"white",
        fontSize:20,
        fontWeight:"bold",
        marginTop:40,
        marginBottom:40
    }
})
export default GroupFinance