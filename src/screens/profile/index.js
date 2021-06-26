import React,{useEffect, useState} from 'react';
import { View, Text, ScrollView,FlatList,Image,TouchableOpacity} from 'react-native';
import styles from './style';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchBooks, fetchBooksOur } from '../../redux/action/booksAction';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';


const Profile = (props) =>{
    const navigation = useNavigation();
    const [user,setUser] = useState('');
    const [email,setEmail] = useState('');



    const auth = async () => {
        const user_ = await AsyncStorage.getItem('username');
        const email = await AsyncStorage.getItem('email');

        if(user_){
            setUser(user_)
        }
        if(email){
            setEmail(email)
        }
    }

    useEffect(()=>{
        auth();
    },[])

    const fetch = async () =>{
        const token = await AsyncStorage.getItem('usertoken')
        props.fetchBooks_(token);
        props.fetchBooksOur_(token);
    }

    useEffect(()=>{
        navigation.addListener('focus',()=>{
            auth();
            fetch();
        })
    },[])

    return(
        <View style={styles.container}>
            <FlatList
                numColumns={3}
                data={props.Books.ourBooks}
                showsVerticalScrollIndicator={false}
                renderItem={({item})=>{
                    if(item.username === user){

                        return (
                            <View style={{flex:1/3}}>
                                <TouchableOpacity onPress={()=> navigation.navigate('BookDetails',{book:item})}>
                                    <Image style={styles.book} source={{uri: item.book_image }}/>
                                </TouchableOpacity>
                            </View>
                        ) 
                    }
                }}

                ListHeaderComponent={()=>(
                    <View style={styles.headerContainer}>
                        <Avatar
                            rounded
                            source={{
                                uri:
                                'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
                            }}
                            size={100}
                        />
                        <View style={styles.TextContainer}>
                            <Text style={styles.name}>{user}</Text>
                            <Text style={styles.email}>{email}</Text>
                        </View>
                    </View>
                )}
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
export default connect(mapStateToProps,mapDispatchProps)(Profile);