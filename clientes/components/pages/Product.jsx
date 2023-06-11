import { View, Text, StyleSheet} from "react-native"
import * as color from "../../colors"
import { useEffect } from "react"

const Product = ({product, selectProduct}) =>{

    return(
        <View style={styles.containerProduct} >
            <View style={selectProduct.includes(product)? {...styles.viewProduct, backgroundColor:"gray" }:{...styles.viewProduct, backgroundColor:color.light.secundary }}>
                <Text style={styles.textProduct}>nombre: {product.name}</Text>
                <Text style={styles.textProduct}>precio: {product.price}</Text>
                <Text style={styles.textProduct}>cantidad: {product.quantity}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewProduct:{
        alignItems:"flex-start",
        width:"80%",
        padding:10,
    },
    containerProduct:{
        width:"100%",
        alignItems:"center",
        marginTop:10
    },
    textProduct:{
        fontSize:16,
        fontWeight:"bold",
        marginBottom:2
    }
})

export default Product