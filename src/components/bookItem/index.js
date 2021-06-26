import React from 'react'
import {View,Text,Image,Pressable} from 'react-native'
import styles from './style'
import {useNavigation} from '@react-navigation/native'

const BookItem = ({item}) => {
    const navigation = useNavigation();
    const onPress = () =>{
        navigation.navigate('BookDetails',{book:item})
    }
    return (
        <Pressable onPress={onPress} style={styles.root}>
            <Image style={styles.image} source={{uri:item.book_image}}/>

            <View style={styles.rightContainer}>
                <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
                <Text style={styles.author}>Author: {item.author}</Text>
                <Text style={styles.price}>from ${item.price} {item.oldPrice && (<Text style={styles.oldPrice}>${item.oldPrice.toFixed(2)}</Text>)}</Text> 
            </View>
        </Pressable>
    )
}



export default BookItem;
