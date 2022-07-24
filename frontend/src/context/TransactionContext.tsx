import { createContext, useState, useEffect, useContext, useCallback } from "react";
import UserContext from "./UserContext";
import axios from 'axios';
import { Transaction } from "../types/Transaction";

interface ITransactionsContext {
    transactions: Transaction[],
    isDeleting: boolean,
    isAdding: boolean,
    handleLoginTransactions: (returnedTransactions: Transaction[]) => void,
    handleDeleteCategory: () => void,
    handleAddCategory: () => void,
    fetchTransactions: () => void,
}

const TransactionContext = createContext<ITransactionsContext>({
    transactions: [],
    isDeleting: false,
    isAdding: false,
    handleLoginTransactions: (returnedTransactions) => {},
    handleDeleteCategory: () => {},
    handleAddCategory: () => {},
    fetchTransactions: () => {},
})

export const TransactionsProvider = ({ children }: any) => {
    const { userData } = useContext(UserContext);
    const [transactions, setTransactions] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false)
    const [isAdding, setIsAdding] = useState(false)

    const fetchTransactions = useCallback(async() => {   
        if (userData) {
            const transactions: any = await axios.get(`http://localhost:3001/get-transactions?userID=${userData.userID}`); 

            setTransactions(transactions.data)
        } else {
            setTransactions([])
        }
    }, [userData?.userID])
    
    useEffect(() => {
        fetchTransactions();
    }, [userData])

    const handleLoginTransactions = (returnedTransactions: any) => {
        setTransactions(
            returnedTransactions
        )
    }

    const handleDeleteCategory = () => {
        setIsDeleting(!isDeleting)
    }

    const handleAddCategory = () => {
        setIsAdding(!isAdding)
    }

    return <TransactionContext.Provider value={{ transactions, isDeleting, isAdding, handleLoginTransactions, handleAddCategory, handleDeleteCategory, fetchTransactions }}>{children}</TransactionContext.Provider>
}

export default TransactionContext;
