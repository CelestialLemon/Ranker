import React from 'react'
import { useEffect } from 'react';
import { motion } from 'framer-motion'
import { useClickOutside } from 'react-click-outside-hook';
import styled from 'styled-components';
import axios from 'axios';

const ModalContainer = styled.div`
    margin : 10px 0px;
    padding : 15px;
    position : absolute;
    
    width : 240px;
    height : auto;
    min-height : 60px;

    display : flex;
    flex-direction : column;
    
    background-color : white;
    border: 1px solid black;
    border-radius : 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    
    z-index : 10;
    `

const ModalTitle = styled.h3`
    margin : 5px 0px;
    font-size : 20px;
    font-family : Bahnschrift
`

const ModalDescription = styled.h3`
    margin : 5px 0px;
    font-size : 16px;
    font-weight : 100;
    font-family : Bahnschrift;
`

const DeleteButton = styled(motion.button)`
    width : 100%;
    height : 40px;
    
    color : white;
    background-color : red;
    border : none;
    border-radius : 5px;

    font-size : 18px;
    font-family : Bahnschrift;
`

const DeleteListModal = ({showModal, closeModal, _id, deleteCard}) => {

    const [ref, hasClickedOutside] = useClickOutside();
    
    const onDeleteClick = async () =>
    {
        try
        {
            const res = await axios.post('https://ranker-22-api.herokuapp.com/lists/deletelist',
            {
                '_id' : _id
            },
            { headers : { 'authorization' : 'Bearer ' + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))}})
            
            console.log(res.data);
            if(res.data.msg == 'deleted')
            {
                deleteCard();
            }
        }catch(err)
        {
            console.log(err);
        }
    }

    const Modal = (
        <ModalContainer ref={ref}>
            <ModalTitle>Confirm Deltete?</ModalTitle>
            <ModalDescription>Are you sure you want to delete list someList?</ModalDescription>
            <DeleteButton 
            onClick={onDeleteClick}
            whileTap={{
                scale : 0.95
            }}>Delete</DeleteButton>
        </ModalContainer>
    )

    useEffect(() =>
    {
        if(hasClickedOutside)
        closeModal();
    }, [hasClickedOutside])
    return (
        <div>
           {showModal ? Modal : <></>}
        </div>
    )
}

export default DeleteListModal
