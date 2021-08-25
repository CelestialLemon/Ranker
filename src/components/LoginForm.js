import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { motion } from 'framer-motion'

import ValidateLocalToken from '../functions/ValidateLocalToken'
import ValidateSessionToken from '../functions/ValidateSessionToken'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

const LoginForm = () => {
    
    let history = useHistory();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberOnDevice, setRememberOnDevice] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const AuthenticateUser = async () =>
    {
        const res = await ValidateLocalToken();
        const sessionRes = await ValidateSessionToken();

        if(res == true || sessionRes == true)
        {
            history.push('/');
        }
    }
    AuthenticateUser();

    const onTooglePasswordVisibility = () =>
    {
        setIsPasswordVisible(!isPasswordVisible);
    }

    const SendLoginRequest = async () =>
    {
        try
        {
            const res = await axios.post('https://ranker-22-api.herokuapp.com/auth/login',
            {
                'username' : username,
                'password' : password,
                'rememberOnDevice' : rememberOnDevice
            })

            console.log(res.data);

            if(res.data.msg == "User doesn't exist" || res.data.msg == "Incorrect Password")
            {
                setResponseMessage(res.data.msg);
            }
            
            else if(res.data.msg == "token created" || res.data.msg == 'logged In for session')
            {
                setResponseMessage("Login Successful");
            }

            //setting token
            if(res.data.loggedIn == true)
            {
                if(res.data.msg == "token created")
                {
                    localStorage.setItem('accessToken', res.data.accessToken);
                }

                else if(res.data.msg == "logged In for session")
                {
                    sessionStorage.setItem('accessToken', res.data.sessionToken);
                }

                history.push('/');
            }
            else if(res.data.loggedIn == false)
            {
                console.log(res.data.msg);
            }

        }catch(err)
        {
            console.log(err);
        }
    }

    return (
        <div className='sign-up-form'>
            
            <input 
            type='text'
            className='text-input-field'
            placeholder='Username' 
            onChange={e => setUsername(e.target.value)}></input>
            
            <input 
            type={isPasswordVisible ? 'text' : 'password'} 
            className='text-input-field'
            placeholder='Password' 
            onChange={e => setPassword(e.target.value)}></input>
            
            <i className='password-visible-icon'>
                {isPasswordVisible 
                    ? <BsEye onClick={onTooglePasswordVisibility}></BsEye>
                    : <BsEyeSlash onClick={onTooglePasswordVisibility}></BsEyeSlash>}
            </i>

            <div className='remember-on-device'>
                <input type='checkbox' id='remember-me-checkbox' onChange={e => setRememberOnDevice(e.target.checked)}></input>
                <label for='remember-me-checkbox'>Remember on device?</label>
            </div>
            
            {responseMessage == 'Incorrect Password' 
                ? <h3 className='error-message'>{responseMessage}</h3>
                : <></>}

            {responseMessage == "User doesn't exist" 
                ? <h3 className='error-message'>{responseMessage}</h3>
                : <></>}    

            {responseMessage == 'Login Successful' 
                ? <h3 className='success-message'>{responseMessage}</h3>
                : <></>}
            
            <motion.button
            onClick={SendLoginRequest}
            whileTap={{
                scale : 0.95
            }}>Login</motion.button>


            <h3 className='forgot-password'>Forgot Password?</h3>
        </div>
    )
}

export default LoginForm
