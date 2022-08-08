import { Transaction } from "./Transaction";

export interface ITransactionsContext {
    transactions: Transaction[],
    isDeleting: boolean,
    isAdding: boolean,
    handleLoginTransactions: (returnedTransactions: Transaction[]) => void,
    handleLogoutTransactions: () => void,
    handleDeleteCategory: () => void,
    handleAddCategory: () => void,
    fetchTransactions: () => void,
}