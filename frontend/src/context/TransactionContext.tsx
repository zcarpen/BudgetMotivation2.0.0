import { createContext, useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import axios from 'axios';
import { Transaction } from "../types/Transaction";

interface ITransactionsContext {
    transactions: Transaction[],
    handleLoginTransactions: () => void,
}

const TransactionContext = createContext<ITransactionsContext>({
    transactions: [],
    handleLoginTransactions: () => {},
})

export const TransactionsProvider = ({ children }: any) => {
    const { userData } = useContext(UserContext);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async() => {   
            if (userData) {
                const transactions: any = await axios.get(`http://localhost:3001/get-transactions?userID=${userData.userID}`); 
                setTransactions(transactions.data)
            } else {
                setTransactions([])
            }
        }
        fetchTransactions();
    }, [userData])

    const handleLoginTransactions = (returnedTransactions: any) => {
        setTransactions({
            ...returnedTransactions
        })
    }

    return <TransactionContext.Provider value={{ transactions, handleLoginTransactions }}>{children}</TransactionContext.Provider>
}

export default TransactionContext;
