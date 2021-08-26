import React from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useClickOutside } from 'react-click-outside-hook'
import styled from 'styled-components'

const ModalContainer = styled.div`
    position : absolute;
    left : 50%;
    top : 50%;
    transform : translate(-50%, -50%);

    width : 50%;
    height : auto;
    min-width : 480px;
    padding : 20px;

    background-color : white;
    border-radius : 5px;

    display : flex;
    flex-direction : column;
    align-items : center;
    z-index : 10;

`

const Header = styled.h2`
    font-family : Bahnschrift;
`

const LinkInput = styled(motion.input)`
    width : 80%;
    height : 40px;
    padding : 0px 15px;
    margin : 10px;
    text-align : center;

    font-family : Bahnschrift;
    font-size : 22px;
    font-weight: 100;
    color : #5E139E;

    border : none;
    border-radius : 5px;
    border-bottom : 2px solid #3FC5EB;
    outline : none;
    background : rgba(0, 0, 0, 0.13)
`

const ButtonGroup = styled.div`
    display : flex;
    align-items : center;
`

const ImportButton = styled(motion.button)`

    width : auto;
    height : auto;
    min-height : 50px;
    padding : 5px 20px;
    margin : 10px;

    background-color : #3FC5EB;
    color : black;

    font-family : Bahnschrift;
    font-size : 25px;
    border: none;
    border-radius : 5px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.12);

`

const CancelButton = styled(motion.button)`

    width : auto;
    height : auto;
    min-height : 50px;
    padding : 5px 20px;
    margin : 10px;

    background : #e53935;
    color : white;

    font-family : Bahnschrift;
    font-size : 25px;
    border: none;
    border-radius : 5px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.12);

`

const ErrorMessage = styled.h3`
    font-family : Bahnschrift;
    color: red;
`

const ImportItemsModal = ({onModalClose, onImportSuccess}) => {

    const [ref, hasClickedOutside] = useClickOutside();
    const [listLink, setListLink] = useState('');
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState('');

    const onClickImport = async () =>
    {
        if(!listLink.startsWith('https://ranker-22.herokuapp.com/list/view/'))
        {
            setError('Error : Invalid link!');
            setShowError(true);

            setTimeout(() =>
            {
                setShowError(false);
            }, 5000);
        }
        else
        {
            try
            {
                //a link is in the form https://ranker-22.herokuapp.com/list/view/6127189cff45f23fa85f97b6, so to get id we split by / and get last element
                const listId = listLink.split('/').pop();
                const res = await axios.get('https://ranker-22-api.herokuapp.com/lists/' + listId,
                {'headers' : { 'authorization' : 'Bearer ' + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))}})
                
                if(res.data.msg == 'not your list')
                {
                    setShowError(true);
                    setError('Failed to import. The Creator needs to enable sharing for this list.');
                    setTimeout(() =>
                    {
                        setShowError(false);
                    }, 5000);
                }
                else
                {
                    onImportSuccess(res.data.items);
                    onModalClose();
                }
            }catch(err)
            {
                console.log(err);
            }
        }
    }

    
    useEffect(() =>
    {
        if(hasClickedOutside)
        onModalClose();
    }, [hasClickedOutside])
    return (
        <div ref={ref}>
            <ModalContainer>
                <Header>Enter the link of list to import items from :</Header>
                
                <LinkInput type='text'
                onChange={(e) => setListLink(e.target.value)}
                animate={{
                }}
                initial={{
                    borderBottom : '2px solid #3FC5EB',
                }}
                whileFocus={{
                    borderBottom : '2px solid #5E139E',
                    transition : {duration : 0.25}
                }}></LinkInput>
                <ButtonGroup>
                    <ImportButton
                    onClick={onClickImport}
                    whileTap={{scale : 0.95}}>Import</ImportButton>

                    <CancelButton
                    onClick={onModalClose}
                    whileTap={{scale : 0.95}}>Cancel</CancelButton>
                </ButtonGroup>

                {showError ? <ErrorMessage>
                    {error}
                </ErrorMessage> : <></>}
            </ModalContainer>

        </div>
    )
}

export default ImportItemsModal
