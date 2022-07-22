import axios from 'axios';
import {createContext, useState, useEffect} from 'react';
import { UserData } from '../types/UserData';

interface IUserContext {
    userData: UserData | null,
    handleLogout: () => void,
    handleModal: (catagory: string) => void,
    handleLoginUserInfo: (userInfo: any) => void,
    isLoading: boolean,
    modal: {
        isVisible: boolean,
        transaction: string
    }

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
    handleModal: () => {},
    isLoading: true,
    modal: {
        isVisible: false,
        transaction: ''
    }
})

export const UserInfoProvider = ({children}: any) => {

    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [modal, setModal] = useState({
        isVisible: false,
        transaction: '',
    })

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

    const handleModal = (category: string) => {
        setModal({
            isVisible: !modal.isVisible,
            transaction: category,
        })
    }

    return <UserContext.Provider value={{userData, modal, isLoading, handleLoginUserInfo, handleLogout, handleModal}}>
        {children}
    </UserContext.Provider>
}

export default UserContext;
