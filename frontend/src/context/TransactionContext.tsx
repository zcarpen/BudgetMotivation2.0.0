import { createContext, useState, useEffect, useContext } from "react";
import {useNavigate} from 'react-router-dom'
import UserContext from "./UserContext";
import axios from 'axios';



const TransactionContext = createContext([]);

export const TransactionsProvider = ({children}: any) => {
    const userCtx: any = useContext(UserContext);
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate()


    useEffect(() => {
        const fetchTransactions = async() => {    
            try {
                const transactions: any = await axios.get('http://localhost:3001/get-transactions', {
                    headers: {
                        'userID': `${userCtx.userData.userID}`
                    }
                }); 
                setTransactions(transactions.data)
            } catch {
                navigate('/login', { replace: true})
            }
        }
        fetchTransactions();
    }, [userCtx])



    return <TransactionContext.Provider value={transactions}>{children}</TransactionContext.Provider>
}