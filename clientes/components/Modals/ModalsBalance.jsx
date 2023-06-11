import {View, Text, Modal, StyleSheet, Pressable, FlatList} from "react-native"
import * as color from "../../colors"
import { useEffect } from "react"

const ModalsBalance = ({show,setShow,user}) =>{
    useEffect(()=>{
        console.log(user)
    },[])
    return(
        <Modal visible={show} animationType="slide">
            <View style={{...styles.containerModal}}>
                <View style={{...styles.viewModal,backgroundColor:color.light.primary}}>
                    <View style={styles.flatListContainer}>
                        <FlatList data={user} renderItem={(value)=>{
                            return(
                                <Text style={styles.textModal} key={value.index}>{value.item.name}:{value.item.balance}</Text>
                            )
                            
                        }}/>
                    </View>
                    <Pressable style={{...styles.buttonModal, backgroundColor:color.light.secundary}} onPress={()=>setShow(!show)}>
                        <Text style={{...styles.buttonText}}>
                            confirmar
                        </Text>
                    </Pressable>
                </View>
            </View>
            
            
        </Modal>
    )
}

const styles = StyleSheet.create({
    containerModal:{
        justifyContent:"center",
        alignItems:"center",
        height:"100%",
        width:"100%"
    },
    viewModal:{
        height:"50%",
        width:"70%",
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center"
    },
    textModal:{
        fontSize:20,
        fontWeight:"bold",
        marginBottom:10
    },
    buttonModal:{
        padding:10,
        borderRadius:10,
        width:"40%"
    },
    flatListContainer:{
        height:"50%"
    },
    buttonText:{
        width:"100%",
        textAlign:"center",
        fontWeight:"bold"
    }

})

export default ModalsBalance