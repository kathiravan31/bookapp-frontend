import React,{useLayoutEffect} from 'react';
import {View,Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import Home from '../screens/home';
import Profile from '../screens/profile';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNav = () =>{

    const navigation = useNavigation();

    function logout(){
        AsyncStorage.removeItem('usertoken');
        AsyncStorage.removeItem('username');
        AsyncStorage.removeItem('email');
        navigation.navigate('Login');
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
                <AntDesign name="logout" color="black" size={20} onPress={logout} style={{marginRight:10}}/>
            )
          });
    },[navigation])

    return(
        <Tab.Navigator initialRouteName="Home" labeled={false}>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({color,size}) => <MaterialCommunityIcons name="home" color={color} size={26}/>
            }}/>

            <Tab.Screen name="AddBook_" component={()=>(<View></View>)}
            listeners={({ navigation })=>({
                tabPress: event =>{
                    event.preventDefault();
                    navigation.navigate("AddBook")
                }
            })}
            options={{
                tabBarIcon: ({color,size}) => <MaterialCommunityIcons name="plus-box" color={color} size={26}/>
            }}/>
            <Tab.Screen name="Profile" component={Profile}
            options={{
                tabBarIcon: ({color,size}) => <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
            }}/>
        </Tab.Navigator>
    )
}

export default BottomTabNav;