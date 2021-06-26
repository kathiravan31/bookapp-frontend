import React,{useEffect} from 'react';
import {View,FlatList,ActivityIndicator,Image, RefreshControl} from 'react-native';
import styles from './style';
import BookItem from '../../components/bookItem';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { fetchBooks, fetchBooksOur } from '../../redux/action/booksAction';
import {useNavigation} from '@react-navigation/native';


function Home(props){

    const mergedArray = [...props.Books.books, ...props.Books.ourBooks];

    const navigation = useNavigation();


    const fetch = async () =>{
        const token = await AsyncStorage.getItem('usertoken')
        props.fetchBooks_(token);
        props.fetchBooksOur_(token);
    }

    useEffect(()=>{
        fetch();
    },[])


    useEffect(()=>{
        navigation.addListener('focus',()=>{
            fetch();
        })
    },[])

    if(props.Books.loading){
        return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicator size="large" color="blue"/>
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <FlatList
                data={mergedArray}
                extraData={props.Books.ourBooks}
                renderItem={({item})=>(
                    <BookItem item={item}/>
                )}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                      onRefresh={()=>fetch()}
                    />
                }
            />
        </View>
    )
}

const mapStateToProps = (store) => ({
    Books: store.bookState
})
const mapDispatchProps = (dispatch) => ({
    fetchBooks_: (token) => dispatch(fetchBooks(token)),
    fetchBooksOur_: (token) => dispatch(fetchBooksOur(token)),
});
export default connect(mapStateToProps,mapDispatchProps)(Home);