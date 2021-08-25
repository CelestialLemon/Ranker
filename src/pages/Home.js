import React from 'react'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router'

import ValidateLocalToken from '../functions/ValidateLocalToken';
import ValidateSessionToken from '../functions/ValidateSessionToken';

import '../CSS/Home.css'
import Card from '../components/Home/Card';
import ButtonGroupHome from '../components/Home/ButtonGroupHome';
import axios from 'axios';

const Home = () => {

    let history = useHistory();

    const [lists, setLists] = useState([]);
    const authenticateUser = async () =>
    {
        const res = await ValidateLocalToken();
        const sessionRes = await ValidateSessionToken();
        if(res == true || sessionRes == true)
        {
            //user authenticated
        }
        else
        {
            history.push('/login');
        }
    }

    const FetchListsData = async () =>
    {
        try
        {
            const res = await axios.get('https://ranker-22-api.herokuapp.com/lists/',
            {'headers' : {'authorization' : 'Bearer ' + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))}})
            
            console.log(res.data);
            setLists(res.data);
        }catch(err)
        {
            console.log(err);
        }
    }

    const onLogoutClick = () =>
    {
        localStorage.removeItem('accessToken');
        sessionStorage.removeItem('accessToken');
        history.push('/login');
    }



    useEffect(() =>
    {
        authenticateUser();
        FetchListsData();
    }, [])

    return (
        <div className='page-container-home'>
            <div className='navbar-home'>
                <h3 className='ranker'>RANKER</h3>
                <button className='logout-button' onClick={onLogoutClick}>Logout</button>
            </div> 
            <hr className='rounded'></hr>
            <ButtonGroupHome></ButtonGroupHome>
            <div style={{display : 'flex', flexWrap : 'wrap', width : '100vw', justifyContent : 'center'}}>
                {lists.map((list, index) => (
                    <Card
                    key={index}
                    _id={list._id}
                    title={list.listName}
                    goldItem={list.items[0] ? list.items[0].itemName : '-----'}
                    silverItem={list.items[1] ? list.items[1].itemName : '-----'}
                    bronzeItem={list.items[2] ? list.items[2].itemName : '-----'}>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Home
