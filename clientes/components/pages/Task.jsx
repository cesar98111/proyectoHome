import {View, Text, StyleSheet, FlatList, Pressable} from "react-native"
import { getAllUsers } from "../../services/user.service"
import { getAllTask } from "../../services/task.service"
import { useEffect , useState} from "react"
import * as SecureStorage from "expo-secure-store"
import * as color from "../../colors"
import { useNavigation } from "@react-navigation/native"

const key = "my-key"
const Task = ({task}) =>{
    const navigate = useNavigation()
    const [users, setUsers] = useState([])
    
    useEffect(()=>{
        console.log(task)
    },[])
    return(
        <View style={styles.containerTask}>
            <Text style={styles.titleTask}>LISTA DE TAREAS</Text>

            
                <View style={styles.containerList}>
                    <FlatList style={styles.listTask} data={task} renderItem={(value)=>{
                        const data = value.item
                        return(
                            <Pressable style={styles.itemContainer} key={value.index}>
                                    <Text style={styles.textTask}>{data.name}</Text>
                                    <Text> Descripcion: {data.description}</Text>
                            </Pressable>
                           
                        )
                    }}/>
                </View>
                <View style={styles.containerButton}>
                    <Pressable style={styles.buttonTask}>
                        <Text onPress={()=>navigate.navigate("Añadir Tareas")} style={styles.textTaskButton}>
                            añadir
                        </Text>
                    </Pressable>
                    <Pressable style={styles.buttonTask}>
                        <Text onPress={()=>navigate.navigate("Home")} style={styles.textTaskButton}>
                            Cancelar
                        </Text>
                    </Pressable>
                </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    containerTask:{
        height:"100%",
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        
    },
    titleTask:{
        backgroundColor:color.light.primary,
        padding:10,
        color:"white",
        width:"60%",
        textAlign:"center",
        fontSize:20,
        fontWeight:"bold"
    },
    containerList:{
     
        backgroundColor:color.light.primary,
        height:"50%",
        width:"90%",
        marginTop:20,
        alignItems:"center"
        
    },
    listTask:{
        height:"50%",
        width:"80%"
    },
    itemContainer:{
        width:"100%",
        backgroundColor:color.light.secundary,
        marginTop:10,
        padding:10,
        
    },
    textTask:{
        textAlign:"center",
        width:"100%",
        fontSize:20,
        fontWeight:"bold"

    },
    containerButton:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginTop:20
    },
    buttonTask:{
        backgroundColor:color.light.secundary,
        padding:10,
        width:"30%",
        marginRight:15,
        marginLeft:15

    },
    textTaskButton:{
        width:"100%",
        textAlign:"center",
        fontSize:20,
        fontWeight:"bold"
        
    }
})

export default Task