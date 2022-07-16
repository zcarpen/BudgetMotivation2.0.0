import axios from 'axios';
import {createContext, useState, useEffect} from 'react';
import { UserData } from '../types/UserData';

const UserContext: any = createContext({
    monthlyBudget: 0,
    monthlyIncome: 0,
    username: '',
    visibleExpenses: [],
    isLoggedIn: false,
    selectedRoute: 'home',
})
export const UserInfoProvider = ({children}: any) => {

    const [userData, setUserData]: any = useState({
        monthlyBudget: 0,
        monthlyIncome: 0,
        username: '',
        visibleExpenses: [],
        isLoggedIn: false,
        selectedRoute: 'home',
    })
    const [isLoading, setIsLoading] = useState(true)

    // get JWT out of local storage using useEffect
    useEffect(() => {
        const fetchUser = async() => {
            const jwt = localStorage.getItem('accessToken');
            const result = await axios.get('http://localhost:3001/get-user', {
                headers: {
                    'Authorization': `${jwt}`
                }
            })
            if (!result.data[0]) return;
            const {monthlyIncome, monthlyBudget, username, visibleExpenses, _id} = result.data[0];

            setUserData((prevState: any) => ({
                ...prevState,
                monthlyBudget, 
                monthlyIncome, 
                username, 
                visibleExpenses,
                userID: _id,
                isLoggedIn: true,
            }))
        }
        fetchUser();
    }, [])
        // setIsLoading to false

    const handleLoggedIn = () => {
        console.log('handlingLogin')
        setUserData({
            ...userData,
            isLoggedIn: !userData.isLoggedIn
        })

    }

    const handleRedirect = (e: any) => {
        console.log('redirecting')
        debugger;
        setUserData({
            ...userData,
            selectedRoute: e.target.id
        })
    }

    return <UserContext.Provider value={{userData, handleRedirect, handleLoggedIn}}>
        {children}
    </UserContext.Provider>
}

export default UserContext;
