import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { motion } from 'framer-motion'

import { BsEye, BsEyeSlash } from 'react-icons/bs'

const SignupForm = () => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [errorResponse, setErrorResponse] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onTooglePasswordVisibility = () =>
    {
        setIsPasswordVisible(!isPasswordVisible);
    }

    const SendSignupRequest = async () =>
    {
        try
        {
            const res = await axios.post('https://ranker-22-api.herokuapp.com/auth/signup',
            {
                'username' : username,
                'password' : password
            })

            if(res.data.msg == 'user already exists')
            {
                setErrorResponse('User already Exists!');
            }
            else if(res.data.msg == 'Signed Up successfully')
            {
                setErrorResponse('Sign-Up Successful');
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
            onChange={(e) => setUsername(e.target.value)}></input>
            <input 
            type={isPasswordVisible ? 'text' : 'password'} 
            className='text-input-field'
            placeholder='Password'
            onChange = {(e) => setPassword(e.target.value)}
            ></input>
            
            <i className='password-visible-icon'>
                {isPasswordVisible 
                    ? <BsEye onClick={onTooglePasswordVisibility}></BsEye>
                    : <BsEyeSlash onClick={onTooglePasswordVisibility}></BsEyeSlash>}
            </i>

            {errorResponse == 'User already Exists!' 
                ? <h3 className='error-message'>{errorResponse}</h3>
                : <></>}
            {errorResponse == 'Sign-Up Successful' 
                ? <h3 className='success-message'>{errorResponse}</h3>
                : <></>}

            {/* <h3 className='forgot-password' style={{minHeight : '23px'}}></h3> */}
            
            <motion.button
            onClick={SendSignupRequest}
            whileTap={{
                scale : 0.95
            }}>Sign-Up</motion.button>
                
        </div>
    )
}

export default SignupForm
