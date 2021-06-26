import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:10
    },
    ScrollView:{
        width:'100%',
    },
    loader:{
        position:'absolute',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        height:'100%',
        width:'100%'
    },
    error:{
        width:'100%',
        color:'red',
        padding:15,
        alignItems:'center',
        backgroundColor:'#fad0cd',
        marginTop:10,
        borderRadius:10
    },
    errorText:{
        color:'red'
    },
})

export default styles;