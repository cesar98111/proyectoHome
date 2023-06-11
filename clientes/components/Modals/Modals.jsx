import { View, Text, Modal, StyleSheet, Pressable } from "react-native"
import * as colors from "../../colors"

const Modals = ({show, setShow ,message}) =>{
    return(
        <Modal visible={show} transparent={true} animationType="slide">
            <View style={styles.containerModal}>
                <View style={{...styles.modalView, backgroundColor:colors.light.error}}>
                    <Text style={styles.modalText}>{message}</Text>
                    <Pressable onPress={()=>setShow(!show)} style={{...styles.buttonModal, backgroundColor:colors.light.secundary}}>
                        <Text >Confirmar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modalView:{
        height:"50%",
        width:"70%",
        borderRadius:20,
        justifyContent:"space-around",
        alignItems:"center",
    },
    containerModal:{
        height:"100%",
        width:"100%",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    modalText:{
        color:"white",
        fontSize:25,
        fontWeight:"bold",
    },
    buttonModal:{
        padding:10,
        borderRadius:10
        
    }
})

export default Modals