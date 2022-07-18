import axios from 'axios';
import {createContext, useState, useEffect} from 'react';
import { UserData } from '../types/UserData';

interface IUserContext {
    userData: UserData | null,
    handleLogout: () => void,
    handleLoginUserInfo: () => void,
    isLoading: boolean,

}

const UserContext = createContext<IUserContext>({
    userData: {
        monthlyBudget: 0,
        monthlyIncome: 0,
        username: '',
        visibleExpenses: [],
        userID: '',
    },
    handleLogout: () => {},
    handleLoginUserInfo: () => {},
    isLoading: true,
})
export const UserInfoProvider = ({children}: any) => {

    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    // get JWT out of local storage using useEffect
    useEffect(() => {
        const fetchUser = async() => {
            const jwt = localStorage.getItem('accessToken') || '';
            if (!jwt) {
                setUserData(null);
                setIsLoading(false);
                return;
            }
            const result = await axios.get('http://localhost:3001/get-user', {
                headers: {
                    'Authorization': `${jwt}`
                }
            })
            if (!result.data[0]) {
                setUserData(null);
                setIsLoading(false);
                return;
            }
            const {monthlyIncome, monthlyBudget, username, visibleExpenses, _id} = result.data[0];

            setUserData((prevState: any) => ({
                ...prevState,
                monthlyBudget, 
                monthlyIncome, 
                username, 
                visibleExpenses,
                userID: _id,
            }));
            setIsLoading(false);
        }
        fetchUser();
    }, [])

    const handleLogout = () => {
        setUserData(null)
    }

    const handleLoginUserInfo = (userInfo: any) => {
        setUserData({
            monthlyBudget: userInfo.monthlyBudget,
            monthlyIncome: userInfo.monthlyIncome,
            username: userInfo.username,
            visibleExpenses: userInfo.visibleExpenses,
            userID: userInfo._id
        })
    }

    return <UserContext.Provider value={{userData, isLoading, handleLoginUserInfo, handleLogout}}>
        {children}
    </UserContext.Provider>
}

export default UserContext;
