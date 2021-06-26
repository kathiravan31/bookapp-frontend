import React,{useState} from 'react';
import {View,Text, Keyboard, Pressable, TouchableOpacity,ActivityIndicator} from 'react-native';
import styles from './style';
import { Input, Button} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import api from '../../api';

function Login (){
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('');
    const [backendError,setBackendError] = useState('');
    const [passwordSecure,setPasswordSecure] = useState(true);
    const [loading,setLoading] = useState(false);

    const navigation = useNavigation();

    function validate (){
        let errors = {}

        if(username === '') errors.username = 'username should not be empty'
        if(password === '') errors.password = 'password should not be empty'

        return{
            errors,
            valid: Object.keys(errors).length <= 0
        }
    }

    async function onPress () {
        const {errors,valid} = validate();

        if(valid){
            setLoading(true);
            await axios({
                method:'GET',
                url:`${api}api/user?username=${username}&password=${password}`
            }) .then(res=>{
                if(res.data.data){
                    AsyncStorage.setItem('usertoken',res.data.token);
                    AsyncStorage.setItem('username',res.data.data.username);
                    AsyncStorage.setItem('email',res.data.data.email);
                    setLoading(false);
                    navigation.navigate('HomeStack')
                }
                else if(res.data.error){
                    setBackendError(res.data.error)
                    setLoading(false);
                }
            })
            .catch(()=>{
                setLoading(false);
                setBackendError({'error':'somethink went wrong'})
            })
        }
        else{
            setError(errors)
        }
    }

    function Passwordsecure_ (){
        setPasswordSecure(!passwordSecure);
    }


    return(
        
        <Pressable onPress={Keyboard.dismiss} style={styles.base}>
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="blue"/>
                </View>
            ): null}
            <View style={styles.container}>
                <Text style={styles.text}>Login</Text>
                <View style={styles.inputContainer}>
                    <Input
                        placeholder="username"
                        value={username}
                        onChangeText={setUserName}
                        errorMessage={error.username ? error.username : ''}
                        renderErrorMessage={true}
                        leftIcon={
                            <FontAwesome
                              name='user'
                              size={24}
                              color='grey'
                            />
                        }
                    />
                    <Input
                        placeholder="password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={passwordSecure}
                        autoCapitalize={false}
                        errorMessage={error.password ? error.password : ''}
                        renderErrorMessage={true}
                        leftIcon={
                            <Entypo
                              name='lock'
                              size={24}
                              color='grey'
                            />
                        }
                        rightIcon={
                            <TouchableOpacity onPress={Passwordsecure_}>
                                <Entypo
                                    name={passwordSecure ? ('eye') : ('eye-with-line')}
                                    size={24}
                                    color='grey'
                                />
                            </TouchableOpacity>
                        }
                    />
                    <Button
                        title="Login"
                        onPress={onPress}
                    />
                    {
                        Object.keys(backendError).map((key,index)=>(
                            <View style={styles.error}>
                                <Text style={styles.errorText}>{backendError[key]}</Text>
                            </View>
                        ))
                    }

                    <Text style={styles.register} onPress={()=>navigation.navigate('Register')}>
                        Don't have account? Register
                    </Text>
                    
                </View>
            </View>
        </Pressable>
    )
}

export default Login;