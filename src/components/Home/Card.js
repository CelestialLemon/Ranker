import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { motion } from 'framer-motion'

import { FiEdit3} from 'react-icons/fi'
import { RiShareForwardLine } from 'react-icons/ri'
import { AiOutlineDelete } from 'react-icons/ai'
import { red, pink, purple, deepPurple, indigo, blue, cyan, teal, blueGrey, lightBlue } from '@material-ui/core/colors'
import { green, lightGreen, lime, yellow, amber, orange, deepOrange, brown, grey } from '@material-ui/core/colors'
import '../../CSS/Card.css'
import DeleteListModal from './DeleteListModal'

const colors = [];
colors.push(red[600], pink.A400, pink[500], purple[600], deepPurple[600], indigo[600], blue[500]);
colors.push(lightBlue[500], cyan[500], teal[500], green[500], lightGreen[500])
colors.push(yellow[500], amber[500], orange[500], brown[500], grey[800]);

const RandomNumberGenerator = (min, max) =>
{
    return Math.floor(Math.random() * (max - min +1) + min);
}

const Card = ({title, goldItem, silverItem, bronzeItem, _id}) => {

    let history = useHistory();

    const [isDeleted, setIsDeleted] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [randomBgColor, setRandomBgColor] = useState('');
    const [fgColor, setFgColor] = useState('');
    
    const setBgAndFgColors = () =>
    {
        const rng1 = RandomNumberGenerator(1, 50);
        const rng2 = RandomNumberGenerator(51, 100);

        const rng = (rng1 * rng2) % 17;
        const randomColor = colors[rng];
        setRandomBgColor(randomColor);

        const textColor = randomColor == yellow[500] ? 'black' : 'white' 
        setFgColor(textColor);   
    }
    
    const CloseDeleteModal = () =>
    {
        setShowDeleteModal(false);
    }

    const DeleteCard = () =>
    {
        setIsDeleted(true);
    }

    const onClickEdit = () =>
    {
        history.push('/list/edit/' + _id);
    }

    const onClickShare = () =>
    {
        navigator.clipboard.writeText('https://ranker-22.herokuapp.com/list/view/' + _id);
    }
    
    if(title.length > 22)
    title = title.substring(0, 20) + '...';

    if(goldItem.length > 22)
    goldItem = goldItem.substring(0, 20) + '...';

    if(silverItem.length > 22)
    silverItem = silverItem.substring(0, 20) + '...';

    if(bronzeItem.length > 22)
    bronzeItem = bronzeItem.substring(0, 20) + '...';

    useEffect(() =>
    {
        setBgAndFgColors();
    }, [])

    if(!isDeleted)
    return (
        <div className='card-container'>
            <div className='card-header' style={{backgroundColor : randomBgColor}}>
                <h3 className='card-title' style={{color : fgColor}}>{title}</h3>
            </div>

            <div className='card-body'>
                <div className='icon-group'>
                    <AiOutlineDelete 
                    className='icon' 
                    style={{backgroundColor : randomBgColor, color : fgColor}}
                    onClick={() => setShowDeleteModal(!showDeleteModal)}>
                    </AiOutlineDelete>

                    <RiShareForwardLine 
                    className='icon' 
                    onClick={onClickShare}
                    style={{backgroundColor : randomBgColor, color : fgColor}}>
                    </RiShareForwardLine>
                    
                    <FiEdit3 
                    className='icon'
                    style={{backgroundColor : randomBgColor, color : fgColor}}
                    onClick={onClickEdit}>
                    </FiEdit3>
                    
                    <DeleteListModal 
                    showModal={showDeleteModal} 
                    closeModal={CloseDeleteModal}
                    deleteCard={DeleteCard}
                    _id={_id}></DeleteListModal>
                    </div>
                    
                        <div className='items'>
                        
                            <div className='gold-item'>
                                <h3>{goldItem}</h3>
                            </div>

                            <div className='silver-item'>
                                <h3>{silverItem}</h3>
                            </div>

                            <div className='bronze-item'>
                                <h3>{bronzeItem}</h3>
                            </div>
                    </div>
            </div>
        </div>
    )
    else
    return (<></>)
}

export default Card
