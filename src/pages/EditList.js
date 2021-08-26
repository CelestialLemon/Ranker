// import axios from 'axios';
// import React from 'react'
// import { motion } from 'framer-motion'
// import { useState, useEffect } from 'react';
// import { useParams, useHistory } from 'react-router'
// import styled from 'styled-components';
// import ButtonGroupCreateList from '../components/CreateList/ButtonGroupCreateList';
// import ListItemInput from '../components/CreateList/ListItemInput';
// import List from '../components/List';

// const PageContainer = styled.div`
//     height : 'fit-content';
//     min-height : 100vh;
//     width : 100vw;

//     display : flex;
//     flex-direction : column;
//     align-items : center;
// `

// const ListTitle = styled.input`
//     width : 80%;
//     height : auto;
//     min-height : 50px;
//     margin : 20px;
//     padding : 0px 10px;

//     font-size : 30px;
//     font-weight : 500;
//     font-family : Bahnschrift;
//     border : 2px solid black;
//     border-radius : 5px;
// `

// const EditList = () => {

//     const { id } = useParams();

//     let history = useHistory();
//     const [data, setData] = useState(null);
//     const [updateState, setUpdateState] = useState(0);

//     const onChangeTitle = (updatedTitle) =>
//     {
//         const temp = data;
//         temp.listName = updatedTitle;
//         setData(temp);
//     }

//     const FetchData = async () =>
//     {
//         try
//         {
//             const res = await axios.get('https://ranker-22-api.herokuapp.com/lists/' + id,
//             { 'headers' : { 'authorization' : 'Bearer ' + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))}}
//             );
//             setData(res.data);
//         }catch(err)
//         {
//             console.log(err);
//         }
//     }

//     const onSave = async () =>
//     {
//         try
//         {
//             const res = await axios.put('https://ranker-22-api.herokuapp.com/lists/' + id,
//             data,
//             { 'headers' : {'authorization' : 'Bearer ' + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))}})
            
//             if(res.data.msg == 'updated')
//             {
//                 history.push('/');
//             }
//         }catch(err)
//         {
//             console.log(err);
//         }
//     }

//     const onShare = (canShareInput) =>
//     {
//         data.canShare = canShareInput;
//     }

//     const addItemToList = () =>
//     {
//         const index = data.items.length;
//         const temp = data;
//         temp.items.push({
//             'itemName' : '-----',
//             'rating' : 0.0
//         })

//         setData(temp);
//         setUpdateState(updateState + 1);
//     }

//     const removeLastItemFromList = () =>
//     {
//         const temp = data;
//         temp.items.pop();
//         setData(temp);
//         setUpdateState(updateState + 1);
//     }

//     useEffect(() =>
//     {
//         FetchData();
//     }, [])

//     if(data)
//     return (
//         <PageContainer>
//             <ButtonGroupCreateList 
//             onSave={onSave}
//             onShare={onShare}
//             canShare={data.canShare}></ButtonGroupCreateList>
//             <ListTitle
//             placeholder={data.listName} 
//             onChange={(e) => onChangeTitle(e.target.value)}></ListTitle>
//             <List items={data.items}></List>

//             <div style={{display : 'flex'}}>
//                 <motion.button 
//                 className='add-item-button'
//                 whileTap={{scale : 0.95}}
//                 onClick={addItemToList}>+ Add Item</motion.button>

//                 <motion.button
//                 className='remove-last-item-button'
//                 whileTap={{scale : 0.95}}
//                 onClick={removeLastItemFromList}>
//                     - Remove Last Item
//                 </motion.button>

//             </div>
//         </PageContainer>
//     )
//     else
//     return (<h3>Loading</h3>)
// }

// export default EditList


import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { motion } from 'framer-motion'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import ButtonGroupCreateList from '../components/CreateList/ButtonGroupCreateList'
import '../CSS/CreateList.css'
import ListItemInput from '../components/CreateList/ListItemInput'
import ImportItemsModal from '../components/CreateList/ImportItemsModal'
import styled from 'styled-components'

const DimBackground = styled.div`
    position : absolute;
    top : 0%;
    left : 0%;

    height : 100%;
    width : 100%;
    background : rgba(0, 0, 0, 0.3);
    z-index : 2;
`

const CreateList = () => {

    const { id } = useParams();
    let history = useHistory();

    const [items, setItems] = useState([]);
    const [updateState, setUpdateState] = useState(0);
    const [listName, setListName] = useState('');
    const [data, setData] = useState(null);
    const [canShare, setCanShare] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);


    const addItemToList = () =>
    {
        const index = items.length;
        const temp = items;
        temp.push({
            'itemName' : '-----',
            'rating' : 0.0
        })

        setItems(temp);
        setUpdateState(updateState + 1);
    }

    const removeLastItemFromList = () =>
    {
        const temp = items;
        temp.pop();
        setItems(temp);
        setUpdateState(updateState + 1);
    }

    const onDataChange = (itemName, rating, index) =>
    {
        const temp = items;
        temp[index].itemName = itemName;
        temp[index].rating = rating;

        setItems(temp);
        setUpdateState(updateState + 1);
    }

    const FetchData = async () =>
    {
        try
        {
            const res = await axios.get('https://ranker-22-api.herokuapp.com/lists/' + id,
            { 'headers' : { 'authorization' : 'Bearer ' + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))}}
            );
            setItems(res.data.items);
            setListName(res.data.listName);
            setCanShare(res.data.canShare);
            setData(res.data);
        }catch(err)
        {
            console.log(err);
        }
    }

    const onDragEndFuntion = (result) =>
    {
        //rearrange state
        if(result.source != null && result.destination!= null)
        {
            const replacedItem = items[result.source.index];
            const tempState = items;
    
            if(result.source.index > result.destination.index)
            {
                for(var i=result.source.index - 1; i >= result.destination.index; i--)
                {
                    tempState[i + 1] = tempState[i];
                    console.log('moving' + i + ' down');
                }

                tempState[result.destination.index] = replacedItem;

                setItems(tempState);
                setUpdateState(updateState + 1);
            }
            else if(result.source.index < result.destination.index)
            {
                for(var j=result.source.index + 1; j<=result.destination.index; j++)
                {
                    tempState[j - 1] = tempState[j];
                    console.log('moving' + j + ' up');
                }

                tempState[result.destination.index] = replacedItem;

                setItems(tempState);
                setUpdateState(updateState + 1);
            }
        }
    }

    const onSave = async () =>
    {
        try
        {
            const res = await axios.put('https://ranker-22-api.herokuapp.com/lists/' + id,
            {
                'listName' : listName,
                'creator' : data.creator,
                'canShare' : canShare,
                'items' : items
            },
            { 'headers' : {'authorization' : 'Bearer ' + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))}})
            
            if(res.data.msg == 'updated')
            {
                history.push('/');
            }
        }catch(err)
        {
            console.log(err);
        }
    }


    const onShare = (canShareInput) =>
    {
        setCanShare(canShareInput);
    }

    const onImport = () =>
    {
        setShowImportModal(!showImportModal);
    }

    const onImportSuccess = (importedItems) =>
    {
        const temp = items.concat(importedItems);
        setItems(temp);
    }

    useEffect(() =>
    {
        FetchData();
    }, []);

    if(data)
    return (
        <div className='page-container-create-list' style={{}}>
            <ButtonGroupCreateList
            onSave={onSave}
            onImport={onImport}
            onShare={onShare}
            canShare={canShare}></ButtonGroupCreateList>
            
            <input className='listname-input' placeholder='Enter a name for the list'
            onChange={e => setListName(e.target.value)}
            value={listName}></input>
            
            <DragDropContext onDragEnd={onDragEndFuntion}>
                <Droppable
                    droppableId='createList'>
                        {(provided, snapshot) =>
                        (
                            <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                                {items.map((item, index) =>
                                (
                                    <Draggable draggableId={index.toString()}
                                    key={index}
                                    index={index}>
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                                <ListItemInput 
                                                itemName={item.itemName} 
                                                index={index} 
                                                rating={item.rating}
                                                onDataChange={onDataChange}></ListItemInput>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
            </DragDropContext>
        
            <div style={{display : 'flex'}}>
                <motion.button 
                className='add-item-button'
                whileTap={{scale : 0.95}}
                onClick={addItemToList}>+ Add Item</motion.button>

                <motion.button
                className='remove-last-item-button'
                whileTap={{scale : 0.95}}
                onClick={removeLastItemFromList}>
                    - Remove Last Item
                </motion.button>

            </div>
            {showImportModal ? <DimBackground></DimBackground> : <></>}
            {showImportModal ? <ImportItemsModal
                                onModalClose={() => setShowImportModal(false)}
                                onImportSuccess={onImportSuccess}></ImportItemsModal> : <></>}
        </div>
    )
    else return (<h3>Loading</h3>)
}

export default CreateList
