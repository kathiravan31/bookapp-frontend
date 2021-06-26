
import React,{useState,useEffect} from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import Login from './src/screens/login';
import Register from './src/screens/register';
import BookDetails from './src/screens/bookdetails';
import BottomTabNav from './src/routes/BottomTabNav';
import AddBook from './src/screens/addBook';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import RootReducer from './src/redux';
import thunk from 'redux-thunk'

const store = createStore(RootReducer, applyMiddleware(thunk)) 


const Stack = createStackNavigator();
const App = ({navigation}) => {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(undefined);

  const authUser = async () =>{
    const userToken = await AsyncStorage.getItem('usertoken')
    if(userToken){
      console.log('login user')
      setLoggedIn(true);
      setLoaded(true);
    }
    else{
      setLoggedIn(false);
      setLoaded(true);
    }
    
  }


  useEffect(()=>{
    authUser();
  },[])

  if(!loaded){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={ loggedIn && loggedIn ? 'HomeStack' : 'Login'}>
          <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
          <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
          <Stack.Screen name="HomeStack" component={BottomTabNav}
          options={{
            headerTitle:"BookShop",
            // headerTitleAlign:'center',
          }}
        />
          <Stack.Screen name="BookDetails" component={BookDetails}/>
          <Stack.Screen name="AddBook" component={AddBook}/>
          <Stack.Screen name="Profile" component={BookDetails}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
  

};


export default App;

