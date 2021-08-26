import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router'
import styled from 'styled-components';
import ListItem from '../components/ListItem';

const PageContainer = styled.div`
    height : fit-content;
    width : 100vw;
    min-height : 100vh;

    display : flex;
    flex-direction : column;
    align-items : center;
`

const ListTitle = styled.h3`
    font-family : Bahnschrift;
    font-size : 40px;

`
const ViewList = () => {
    
    const { id } = useParams();

    const [data, setData] = useState(null);

    const FetchData = async () =>
    {
        try
        {
            const res = await axios.get('https://ranker-22-api.herokuapp.com/lists/' + id,
            { 'headers' : { 'authorization' : 'Bearer ' + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))}})
            
            setData(res.data);
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
            <ListTitle>{data.creator + '\'s ' + data.listName + ' list'}</ListTitle>
            {data.items.map((item, index) =>
            <ListItem
            index={index}
            itemName={item.itemName}
            rating={item.rating}
            updateRating={() => {}}></ListItem>)
            }
        </PageContainer>
    )
    else return (<h3>Loading</h3>)
}

export default ViewList
