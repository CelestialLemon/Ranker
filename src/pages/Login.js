import React from 'react'
import { useState } from 'react'
import { motion} from 'framer-motion'

import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'

import '../CSS/Login.css'

const activeTabCSS = {
    'background' : 'linear-gradient(to right, #5E139E, #3FC5EB)',
    'color' : 'white'
}

const inactiveTabCSS = {
    'background' : 'rgb(230, 230, 230)',
    'color' : 'black'
}

const Login = () => {

    const [activeTab, setActiveTab] = useState('login')
    
    const toogleToSignUpTab = () =>
    {
        setActiveTab('sign-up');
    }

    const toogleToLoginTab = () =>
    {
        setActiveTab('login');
    }


    return (
        <div className='login-page-container'>
           <div className='login-card-container'>
               <h1 className='header'>Sign-In</h1>
               <div className='button-group'>
                    
                    <motion.button 
                    className='signup-button'
                    style={activeTab == 'sign-up' ? activeTabCSS : inactiveTabCSS}
                    onClick={toogleToSignUpTab}
                    whileTap={{
                        scale : 0.95
                    }}
                    >Sign-Up</motion.button>
                    
                    <motion.button 
                    className='login-button'
                    style={activeTab == 'login' ? activeTabCSS : inactiveTabCSS}
                    onClick={toogleToLoginTab}
                    whileTap={{
                        scale : 0.95
                    }}
                    >Login</motion.button>

               </div>

               {activeTab == 'sign-up' ? <SignupForm></SignupForm> : <LoginForm></LoginForm>}
           </div>
        </div>
    )
}

export default Login