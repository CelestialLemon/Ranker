import React from 'react'
import { useEffect } from 'react'
import { useClickOutside } from 'react-click-outside-hook'
import { motion } from 'framer-motion'

import '../CSS/Login.css'
import axios from 'axios'

const Temp = () => {

    const [ref, hasClickedOutside] = useClickOutside();

    useEffect(() =>
    {
        console.log('click');
    }, [hasClickedOutside])
    const TestingRequest = async () =>
    {
        const res = await axios.get('https://ranker-22-api.herokuapp.com/auth/temp',
        { headers : { 'authorization' : "Authorization String by detonator22"}
        })
    }
    return (
        <div>
            <h3 style={{fontFamily :'BahnSchrIft'}}>
            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsu 
            </h3>

        </div>
    )
}

export default Temp
