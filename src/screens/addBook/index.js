import React,{useState} from 'react';
import {View,ScrollView,TouchableOpacity,ActivityIndicator,Text} from 'react-native';
import { Input, Button} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { useNavigation} from '@react-navigation/native';
import { connect } from 'react-redux';
import { fetchBooks, fetchBooksOur } from '../../redux/action/booksAction';


import styles from './style';
import api from '../../api';

const AddBook = (props) =>{
    const [title,setTitle] = useState('');
    const [author,setAuthor] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');
    const [sellername,setSellerName] = useState('');
    const [link,setLink] = useState('');
    const [image,setImage] = useState('');

    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const [backendError,setBackendError] = useState('');

    const navigation = useNavigation();


    function validate (){
        let errors = {}

        if(title === '') errors.title = 'title should not be empty'
        if(author === '') errors.author = 'author should not be empty'
        if(description === '') errors.description = 'description should not be empty'
        if(price === '') errors.price = 'price should not be empty'
        if(sellername === '') errors.sellername = 'sellername should not be empty'
        if(link === '') errors.link = 'link should not be empty'
        if(image === '') errors.image = 'image should not be empty'

        return{
            errors,
            valid: Object.keys(errors).length <= 0
        }
    }


    async function Submit () {
        const {errors,valid} = validate();
        if(valid){
            
            const token = await AsyncStorage.getItem('usertoken')
            
            setLoading(true);
            await axios({
                method:'POST',
                url:`${api}api/books`,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                data: JSON.stringify({
                    title,
                    author,      
                    price,       
                    description,
                    buylink : {
                        name: sellername,
                        url :link
                    },
                    book_image: image
                })
                
            }) .then(res=>{
                if(res.data.data){
                    setLoading(false);
                    const fetch = async () =>{
                        navigation.navigate('Home');
                    }
                    fetch();
                }
                else if(res.data.error){
                    setBackendError(res.data.error)
                    setLoading(false);
                }
            }).catch(()=>{
                setLoading(false);
                setBackendError({'error':'somethink went wrong'})
            })
        }
        else{
            setLoading(false);
            setError(errors)
        }
    }

    return(
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="blue"/>
                </View>
            ): null}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.ScrollView}>
                <View style={styles.inputContainer}>
                    <Input
                        value={title}
                        placeholder="Title"
                        onChangeText={setTitle}
                        errorMessage={error.title ? error.title : ''}
                        renderErrorMessage={true}
                    />
                    <Input
                        value={author}
                        placeholder="Author"
                        onChangeText={setAuthor}
                        errorMessage={error.author ? error.author : ''}
                        renderErrorMessage={true}
                    />
                    <Input
                        value={price}
                        placeholder="Price in $"
                        onChangeText={setPrice}
                        errorMessage={error.price ? error.price : ''}
                        renderErrorMessage={true}
                    />
                    <Input
                        value={description}
                        placeholder="Description"
                        onChangeText={setDescription}
                        errorMessage={error.description ? error.description : ''}
                        renderErrorMessage={true}
                    />
                    <Input
                        value={sellername}
                        placeholder="Seller Name"
                        onChangeText={setSellerName}
                        errorMessage={error.sellername ? error.sellername : ''}
                        renderErrorMessage={true}
                    />
                    <Input
                        value={link}
                        placeholder="Buy Link"
                        onChangeText={setLink}
                        errorMessage={error.link ? error.link : ''}
                        renderErrorMessage={true}
                    />
                    <Input
                        value={image}
                        placeholder="Image UrL"
                        onChangeText={setImage}
                        errorMessage={error.image ? error.image : ''}
                        renderErrorMessage={true}
                    />

                    <Button
                        title="submit"
                        onPress={()=>Submit()}
                    />

                    {
                        Object.keys(backendError).map((key,index)=>(
                            <View style={styles.error}>
                                <Text style={styles.errorText}>{backendError[key]}</Text>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
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

export default connect(mapStateToProps,mapDispatchProps)(AddBook);