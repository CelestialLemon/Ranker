import React from 'react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import { BsLock, BsUnlock } from 'react-icons/bs'
import { AiOutlineSave } from 'react-icons/ai'
import { CgImport } from 'react-icons/cg'
import '../../CSS/CreateList.css'
const ButtonGroupCreateList = ({onSave, onImport, onShare, canShare}) => {

    const [sharingEnabled, setSharingEnabled] = useState(canShare);
    const [sharingButtonCSS, setSharingButtonCSS] = useState({});

    const ToogleSharing = () =>
    {
        setSharingEnabled(!sharingEnabled);
    }

    const onClickSaveChanges = () =>
    {
        onSave();
    }

    const onClickImportItems = () =>
    {
        onImport();
    }


    useEffect(() =>
    {
        onShare(sharingEnabled);
        if(sharingEnabled)
        {
            setSharingButtonCSS({
                'background' : '#3FC5EB'
            })
        }
        else
        {
            setSharingButtonCSS({
                'background' : 'rgb(168, 168, 168)',
                'boxShadow' : 'none'
            })
        }
        return;
    }, [sharingEnabled])
    return (
        <div className='button-group-create-list'>
            <motion.button whileTap={{scale : 0.95}}
            onClick={onClickImportItems}>
                <CgImport size={25} style={{marginBottom : '5px', marginRight : '10px'}}></CgImport>
                Import Items
            </motion.button>

            <motion.button 
            whileTap={{scale : 0.95}} 
            style={sharingButtonCSS}
            onClick={ToogleSharing}>
                {sharingEnabled ? 
                <BsUnlock size={25} style={{marginBottom : '5px', marginRight : '10px'}}></BsUnlock> :
                <BsLock size={25} style={{marginBottom :'5px', marginRight : '10px'}}></BsLock>}
                {sharingEnabled ? 'Sharing is enabled' : 'Sharing is disabled'}
            </motion.button>

            <motion.button whileTap={{scale : 0.95}}
            onClick={onClickSaveChanges}>
                <AiOutlineSave size={28}  style={{marginBottom :'5px', marginRight : '10px'}}></AiOutlineSave>
                Save
            </motion.button>
        </div>
    )
}

export default ButtonGroupCreateList
