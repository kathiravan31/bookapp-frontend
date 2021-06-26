import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    base:{
        flex:1
    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:20
    },
    text:{
        fontSize:30,
        fontWeight:'700',
        fontFamily:'sans-serif'
    },
    inputContainer:{
        width:'100%',
        padding:10
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
    login:{
        width:'100%',
        marginTop:20,
        textAlign:'center'
    },
    loader:{
        position:'absolute',
        flex:1,
        backgroundColor:'rgba(0,0,0,0.1)',
        alignItems:'center',
        justifyContent:'center',
        height:'100%',
        width:'100%'
    }
})

export default styles;