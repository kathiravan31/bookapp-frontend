import React,{useState, useLayoutEffect, useEffect} from 'react';
import {View,Text,Image,FlatList, TouchableOpacity,Linking} from 'react-native';
import { useRoute, useNavigation} from '@react-navigation/native';
import styles from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../api';



function BookDetails(){
    const route = useRoute();
    const data = route.params.book || ''

    const navigation = useNavigation();

    useLayoutEffect(()=>{
        const auth = async ()=>{
            const user = await AsyncStorage.getItem('username')
            if(data.username === user){
                navigation.setOptions({
                    headerRight: () => (
                        <AntDesign name="delete" color="black" size={20} onPress={()=> deleteFunction()} style={{marginRight:10}}/>
                    )
                  });
            }
        }
        auth();
    },[navigation])


    const deleteFunction = async () =>{
        const token = await AsyncStorage.getItem('usertoken')

        await axios({
            method:'DELETE',
            headers:{
                'Authorization': `Bearer ${token}`
            },
            url:`${api}api/books?id=${data._id}`,
    
        }) .then(res=>{
            if(res.data.data){
                navigation.navigate('Home')

            }
            else if(res.data.error){
                console.log('error')
            }
        })
        .catch((error)=>{
            console.log('error', error)
        })
    }


    function openUrl(url){
        Linking.openURL(url)
    }

    return(
        <View style={styles.container}>
            <View style={styles.detailsContainer}>
                <View style={styles.image_container}>
                    <Image
                        style={styles.image}
                        source={{uri: data.book_image}}
                    />
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            {data.title}
                        </Text>
                        <Text style={styles.author}>
                            Author: {data.author}
                        </Text>
                    </View>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionTitle}>Description</Text>
                    <Text style={styles.descriptionText}>{data.description}</Text>
                </View>
            </View>
            <View style={styles.linkContainer}>
                <Text style={styles.Booksavailable}>Book Available On</Text>
                <FlatList
                    data={data.buy_links}
                    renderItem={({item}) => (
                        <View style={styles.buyContainer}>
                            <Text style={styles.buylinkText}>{item.name}</Text>
                            <TouchableOpacity style={styles.buylinkButton} onPress={()=>openUrl(item.url)}>
                                <Text style={styles.buyButtonText}>Buy</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default BookDetails;