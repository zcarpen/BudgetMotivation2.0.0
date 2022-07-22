import {useContext} from 'react';
import UserContext from '../../context/UserContext';
import TransactionContext from '../../context/transactionContext';
import styles from 'styled-components'
import TransactionModal from '../TransactionModal';
import {FaCoffee, FaShoppingCart, FaGasPump, FaHamburger, FaTv, FaHome, FaMusic, FaGift, FaCandyCane, FaGamepad, FaSmile, FaPlus, FaRegStar  } from 'react-icons/fa';

const icons = {
    'other': FaPlus, 
    'coffee': FaCoffee, 
    'grocery': FaShoppingCart, 
    'gas': FaGasPump, 
    'eat-out': FaHamburger, 
    'movie': FaTv, 
    'music': FaMusic, 
    'house': FaHome, 
    'gifts': FaGift, 
    'snack': FaCandyCane, 
    'games': FaGamepad, 
    'self-care': FaSmile,
    'newCategory': FaRegStar,
}

function Expenses() {
    const {userData, modal, handleModal} = useContext(UserContext)
    const {transactions} = useContext(TransactionContext)
    const openExpenseModal = (type: string) => {
        handleModal(type)
    }

  return (
    <>
        <ExpensesContainer>
            {userData?.visibleExpenses.map((exp, idx) => {
                if (exp === 'other') {
                    return <Expense key={idx} onClick={() => openExpenseModal(exp)} id={exp}><FaPlus /><ExpenseType>{exp}</ExpenseType></Expense>
                } else if (exp === 'coffee') {
                    return <Expense key={idx} onClick={() => openExpenseModal(exp)} id={exp}><FaCoffee /><ExpenseType>{exp}</ExpenseType></Expense>
                } else if (exp === 'grocery') {
                    return <Expense key={idx} onClick={() => openExpenseModal(exp)} id={exp}><FaShoppingCart /><ExpenseType>{exp}</ExpenseType></Expense>
                } else if (exp === 'gas') {
                    return <Expense key={idx} onClick={() => openExpenseModal(exp)} id={exp}><FaGasPump /><ExpenseType>{exp}</ExpenseType></Expense>
                } else if (exp === 'eat-out') {
                    return <Expense key={idx} onClick={() => openExpenseModal(exp)} id={exp}><FaHamburger /><ExpenseType>{exp}</ExpenseType></Expense>
                } else if (exp === 'movie') {
                    return <Expense key={idx} onClick={() => openExpenseModal(exp)} id={exp}><FaTv /><ExpenseType>{exp}</ExpenseType></Expense>
                } else if (exp === 'music') {
                    return <Expense key={idx} onClick={() => openExpenseModal(exp)} id={exp}><FaMusic /><ExpenseType>{exp}</ExpenseType></Expense>
                } else if (exp === 'house') {
                    return <Expense key={idx} onClick={() => openExpenseModal(exp)} id={exp}><FaHome /><ExpenseType>{exp}</ExpenseType></Expense>
                } else if (exp === 'gifts') {
                    return <Expense key={idx} onClick={() => openExpenseModal(exp)} id={exp}><FaGift /><ExpenseType>{exp}</ExpenseType></Expense>
                } else if (exp === 'snack') {
                    return <Expense key={idx} onClick={() => openExpenseModal(exp)} id={exp}><FaCandyCane /><ExpenseType>{exp}</ExpenseType></Expense>
                } else if (exp === 'games') {
                    return <Expense key={idx} onClick={() => openExpenseModal(exp)} id={exp}><FaGamepad /><ExpenseType>{exp}</ExpenseType></Expense>
                } else if (exp === 'self-care') {
                    return <Expense key={idx} onClick={() => openExpenseModal(exp)} id={exp}><FaSmile /><ExpenseType>{exp}</ExpenseType></Expense>
                } else if (exp === 'newCategory') {
                    return <Expense key={idx} onClick={() => openExpenseModal(exp)} id={exp}><FaRegStar style={{fontSize: ""}}/><ExpenseType>{exp}</ExpenseType></Expense>
                }
            })}
        </ExpensesContainer>
        {modal.isVisible && <TransactionModal />}
    </>
  )
}

const ExpensesContainer = styles.div({
    marginTop: "2rem",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridTemplateRows: "1fr 1fr 1fr",
    rowGap: "2.25rem",
    width: "100%",
    justifyContent: "space-evenly",
    justifyItems: "center",
    alignContent: "space-evenly",
    alignItems: "center",
})
const Expense = styles.div({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "4rem",
    height: "4rem",
    backgroundColor: "#bbb",
    borderRadius: "15px",
    boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.5)",
    position: "relative",
})
const ExpenseType = styles.p({
    margin: 0,
    position: "absolute",
    bottom: "-1.25rem",
    left: "50%",
    fontSize: "0.75rem",
    transform: "translateX(-50%)",
    width: "100%",
    textAlign: "center"
})

export default Expenses
