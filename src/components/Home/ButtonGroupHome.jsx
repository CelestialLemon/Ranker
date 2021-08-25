import React from 'react'
import { useHistory } from 'react-router'
import { motion } from 'framer-motion'

import { CgPlayListAdd } from 'react-icons/cg'
import '../../CSS/Home.css'
const ButtonGroupHome = () => {

    let history = useHistory();
    const onCreateClick = () =>
    {
        history.push('/list/create');
    }
    return (
        <div className='button-group-home'>
            <motion.button className='create-button'
            whileTap={{
                scale : 0.95
            }}
            onClick={onCreateClick}>
                <CgPlayListAdd className='create-icon'></CgPlayListAdd>
                Create new list</motion.button>
        </div>
    )
}

export default ButtonGroupHome
