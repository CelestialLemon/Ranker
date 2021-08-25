import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router'
import styled from 'styled-components';
import ButtonGroupCreateList from '../components/CreateList/ButtonGroupCreateList';
import ListItemInput from '../components/CreateList/ListItemInput';
import List from '../components/List';

const PageContainer = styled.div`
    height : 'fit-content';
    min-height : 100vh;
    width : 100vw;

    display : flex;
    flex-direction : column;
    align-items : center;
`

const ListTitle = styled.input`
    width : 80%;
    height : auto;
    min-height : 50px;
    margin : 20px;
    padding : 0px 10px;

    font-size : 30px;
    font-weight : 500;
    font-family : Bahnschrift;
    border : 2px solid black;
    border-radius : 5px;
`

const EditList = () => {

    const { id } = useParams();

    let history = useHistory();
    const [data, setData] = useState(null);

    const onChangeTitle = (updatedTitle) =>
    {
        const temp = data;
        temp.listName = updatedTitle;
        setData(temp);
    }

    const FetchData = async () =>
    {
        try
        {
            const res = await axios.get('https://ranker-22-api.herokuapp.com/lists/' + id,
            { 'headers' : { 'authorization' : 'Bearer ' + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))}}
            );
            setData(res.data);
        }catch(err)
        {
            console.log(err);
        }
    }

    const onSave = async () =>
    {
        try
        {
            const res = await axios.put('https://ranker-22-api.herokuapp.com/lists/' + id,
            data,
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

    useEffect(() =>
    {
        FetchData();
    }, [])

    if(data)
    return (
        <PageContainer>
            <ButtonGroupCreateList onSave={onSave}></ButtonGroupCreateList>
            <ListTitle
            placeholder={data.listName} 
            onChange={(e) => onChangeTitle(e.target.value)}></ListTitle>
            <List items={data.items}></List>
        </PageContainer>
    )
    else
    return (<h3>Loading</h3>)
}

export default EditList
