import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    root:{
        flexDirection:'row',
        margin:3,
        borderWidth:1,
        borderColor:'#d1d1d1',
        borderRadius:10,
        backgroundColor:'#fff',
    },
    image:{
        flex:2,
        height:150,
        resizeMode:'contain'
    },
    rightContainer:{
        padding:10,
        flex:3,
        alignItems:'center',
        justifyContent:'center'
    },
    title:{
        fontSize:18,
        width:'100%',
        textAlign:'left'
    },
    price:{
        fontSize:18,
        fontWeight:'bold',
        width:'100%',
        textAlign:'left'
    },
    author:{
        width:'100%',
        textAlign:'left'
    }
})

export default styles;