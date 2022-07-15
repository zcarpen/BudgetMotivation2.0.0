import {createContext, useState} from 'react';

type UserData = {
    monthlyBudget: number,
    monthlyIncome: number,
    password: 'string',
    username: 'string',
    visibleExpenses: string[],
}

const UserContext= createContext()
export const UserInfoProvider = ({children}: any) => {

    const [userData, setUserData] = useState({
        userInfo: {
            monthlyBudget: 0,
            monthlyIncome: 0,
            password: '',
            username: '',
            visibleExpenses: [],
        },
        transactions: [],
        isLoggedIn: false,
        selectedRoute: 'home',

    })

    const handleLoggedIn = () => {
        setUserData({
            ...userData,
            isLoggedIn: !userData.isLoggedIn
        })

    }

    const handleRedirect = (e: any) => {
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
