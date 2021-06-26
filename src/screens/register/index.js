import React,{useState, useEffect} from 'react';
import {View,Text, Keyboard, Pressable, TouchableOpacity, ActivityIndicator} from 'react-native';
import styles from './style';
import { Input, Button} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import api from '../../api';



function Register (){
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const [passwordSecure,setPasswordSecure] = useState(true);
    const [confirmPasswordSecure,setConfirmPasswordSecure] = useState(true);
    const [loading,setLoading] = useState(false);
    const [backendError,setBackendError] = useState('');

    const [error,setError] = useState('');

    const navigation = useNavigation();

    function validate (){
        let errors = {}

        if(username === '') errors.username = 'username should not be empty'
        if(email === '') errors.email = 'email should not be empty'
        if(password === '') errors.password = 'password should not be empty'
        if(confirmPassword === '') {
            errors.confirmPassword = 'confirmPassword should not be empty'
        }
        else if(password !== '' && confirmPassword !== ''){
            if(password !== confirmPassword) errors.passwordMatch = 'Password should match'
        } 

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
                method:'POST',
                url:`${api}api/user`,
                headers:{
                    'Content-Type': 'application/json'
                },
                data:JSON.stringify({
                    username,
                    email,
                    password
                })
                
            }) .then(res=>{
                if(res.data.data){
                    AsyncStorage.setItem('usertoken',res.data.token);
                    AsyncStorage.setItem('username',res.data.data.username);
                    AsyncStorage.setItem('email',res.data.data.email);
                    setLoading(false);
                    navigation.navigate('Home')
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
            setError(errors)
        }
    }

    function Passwordsecure_ (){
        setPasswordSecure(!passwordSecure);
    }
    function ConfirmPasswordsecure_ (){
        setConfirmPasswordSecure(!confirmPasswordSecure);
    }


    return(

        <Pressable onPress={Keyboard.dismiss} style={styles.base}>
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="blue"/>
                </View>
            ): null}
            <View style={styles.container}>
                <Text style={styles.text}>Register</Text>
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
                        placeholder="email"
                        value={email}
                        onChangeText={setEmail}
                        errorMessage={error.email ? error.email : ''}
                        renderErrorMessage={true}
                        leftIcon={
                            <MaterialCommunityIcons
                              name='email'
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
                    <Input
                        placeholder="confirm password"
                        value={confirmPassword}
                        onChangeText={setconfirmPassword}
                        secureTextEntry={confirmPasswordSecure}
                        autoCapitalize={false}
                        errorMessage={error.confirmPassword ? error.confirmPassword : ''}
                        renderErrorMessage={true}
                        leftIcon={
                            <Entypo
                              name='lock'
                              size={24}
                              color='grey'
                            />
                        }
                        rightIcon={
                            <TouchableOpacity onPress={ConfirmPasswordsecure_}>
                                <Entypo
                                    name={confirmPasswordSecure ? ('eye') : ('eye-with-line')}
                                    size={24}
                                    color='grey'
                                />
                            </TouchableOpacity>
                        }
                    />
                    <Button
                        title="Register"
                        onPress={onPress}
                    />

                    {
                        Object.keys(backendError).map((key,index)=>(
                            <View style={styles.error}>
                                <Text style={styles.errorText}>{backendError[key]}</Text>
                            </View>
                        ))
                    }

                    {
                        error.passwordMatch ? (
                            <View style={styles.error}>
                                <Text style={styles.errorText}>{error.passwordMatch}</Text>
                            </View>
                        ):null
                    }

                    <Text style={styles.login} onPress={()=>navigation.navigate('Login')}>
                        Already have account? Login
                    </Text>

                </View>
            </View>
        </Pressable>
    )
}

export default Register;