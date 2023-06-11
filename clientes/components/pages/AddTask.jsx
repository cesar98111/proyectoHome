import  {View, Text, TextInput,StyleSheet, FlatList, Pressable} from "react-native"
import * as color from "../../colors"
import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/user.service"
import * as SecureStorage from "expo-secure-store"
import { insertTask, getTaskByUser } from "../../services/task.service"
import { asingTaskToUser } from "../../services/user.service"
import { useNavigation } from "@react-navigation/native"

const key = "my-key"
const AddTask = ({user, setCurrentTask}) =>{
    const navigation = useNavigation()
    const [selectUsers, setSelectUsers] = useState([])
    const [users, setUsers] = useState([])
    const [name, setName] = useState({
        name:"",
        description:""
    })
    useEffect(()=>{
        const allUsers = async()=>{
           
            const allUsers = await getAllUsers(await SecureStorage.getItemAsync(key))

            selectUsers.forEach(async(value)=>{
                await asingTaskToUser(value)
            })
            setUsers(allUsers)
        }

        allUsers()
    },[])


    const nameHandler=(value) =>{
        return(setName({
            ...name,
            name:value
        }))
    }
    const descriptionHandler=(value)=>{
        return(setName({
            ...name,
            description:value
        }))
    }

    const addTask= async ()=>{
        const task = await insertTask(name,await SecureStorage.getItemAsync(key))

        selectUsers.forEach(async(value)=>{
            await asingTaskToUser( task.idTask ,value.name,await SecureStorage.getItemAsync(key))
        })
        
        setSelectUsers([])
        setName({
            ...name,
            name:"",
            description:""
        })
        const currentTask = await getTaskByUser(user.userID, await SecureStorage.getItemAsync(key))
        setCurrentTask(currentTask)
        navigation.navigate("Home")
        
    }
    const addUsers=(user)=>{
        console.log(selectUsers)
        if(selectUsers.includes(user)){
            setSelectUsers(selectUsers.filter((value)=>value.name!==user.name))
        }else{
            setSelectUsers([...selectUsers,user])
        }
        
    }
    return(
        <View style={styles.containerAddTask}>
            <Text style={styles.titleAddTask}>AÑADE UNA TAREA</Text>
            <View style={styles.containerInput}>
                <View style={styles.inputRow}>
                    <Text style={styles.titleInput}>Nombre</Text>
                    <TextInput style={styles.inputName} placeholder="nombre"
                        onChangeText={nameHandler}
                        value={name.name}/>
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.titleInput}>Descripcion</Text>
                    <TextInput style={{...styles.inputName, width:"60%"}} placeholder="descripcion"
                        onChangeText={descriptionHandler}
                        value={name.description}/>
                </View>
                <Pressable onPress={()=>addTask()}>
                    <Text style={styles.addButton}>añadir</Text>
                </Pressable>
            </View>
            <View style={styles.containerList}>
                <FlatList style={styles.list} data={users} renderItem={(value)=>{
                    return(
                        <Pressable onPress={()=>addUsers(value.item)}>
                            <Text style={selectUsers.includes(value.item)?styles.nameUsersSelect:styles.nameUsers}>
                                {value.item.name}
                            </Text>
                        </Pressable>
                        
                    )
                }}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerAddTask:{
        justifyContent:"center",
        alignItems:"center",
        height:"100%",
        width:"100%"
    },
    titleAddTask:{
        backgroundColor:color.light.primary,
        padding:10,
        color:"white",
        width:"80%",
        textAlign:"center",
        fontSize:20,
        fontWeight:"bold"
    },
    containerInput:{
        backgroundColor:color.light.primary,
        height:190,
        width:"80%",
        marginTop:30,
        justifyContent:"center",
        alignItems:"center"
    },
    inputName:{
        backgroundColor:color.light.secundary,
        width:"40%",
        marginLeft:10,
        textAlign:"center",
        padding:10
    },
    inputRow:{
        flexDirection:"row",
        marginTop:10,
        marginBottom:10
    },
    titleInput:{
        fontWeight:"bold",
        fontSize:20
    },
    containerList:{
        width:"80%",
        height:400,
        backgroundColor:color.light.primary,
        margin:10,
        alignItems:"center",
        
    },
    nameUsers:{
        backgroundColor:color.light.secundary,
        padding:10,
        width:"90%",
        marginTop:20,
        textAlign:"center",
        fontWeight:"bold",
        fontSize:20,
        marginRight:10,
        marginLeft:15

    },
    nameUsersSelect:{
        backgroundColor:"gray",
        padding:10,
        width:"90%",
        marginTop:20,
        textAlign:"center",
        fontWeight:"bold",
        fontSize:20,
        marginRight:10,
        marginLeft:15,
        color:"white"
    },
    list:{
       
        width:"100%"
    },
    addButton:{
        backgroundColor:color.light.secundary,
        padding:10,
        width:"40%",
        fontWeight:"bold",
        fontSize:15
    }
})
export default AddTask