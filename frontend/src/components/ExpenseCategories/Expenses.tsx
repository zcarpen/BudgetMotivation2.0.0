import {useContext} from 'react';
import UserContext from '../../context/UserContext';
import TransactionContext from '../../context/transactionContext';
import styles from 'styled-components'
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
    const {userData} = useContext(UserContext)
    const {transactions} = useContext(TransactionContext)

  return (
    <ExpensesContainer>
        {userData?.visibleExpenses.map((e, idx) => {
            if (e === 'other') {
                return <Expense key={idx}><FaPlus /><ExpenseType>{e}</ExpenseType></Expense>
            } else if (e === 'coffee') {
                return <Expense key={idx}><FaCoffee /><ExpenseType>{e}</ExpenseType></Expense>
            } else if (e === 'grocery') {
                return <Expense key={idx}><FaShoppingCart /><ExpenseType>{e}</ExpenseType></Expense>
            } else if (e === 'gas') {
                return <Expense key={idx}><FaGasPump /><ExpenseType>{e}</ExpenseType></Expense>
            } else if (e === 'eat-out') {
                return <Expense key={idx}><FaHamburger /><ExpenseType>{e}</ExpenseType></Expense>
            } else if (e === 'movie') {
                return <Expense key={idx}><FaTv /><ExpenseType>{e}</ExpenseType></Expense>
            } else if (e === 'music') {
                return <Expense key={idx}><FaMusic /><ExpenseType>{e}</ExpenseType></Expense>
            } else if (e === 'house') {
                return <Expense key={idx}><FaHome /><ExpenseType>{e}</ExpenseType></Expense>
            } else if (e === 'gifts') {
                return <Expense key={idx}><FaGift /><ExpenseType>{e}</ExpenseType></Expense>
            } else if (e === 'snack') {
                return <Expense key={idx}><FaCandyCane /><ExpenseType>{e}</ExpenseType></Expense>
            } else if (e === 'games') {
                return <Expense key={idx}><FaGamepad /><ExpenseType>{e}</ExpenseType></Expense>
            } else if (e === 'self-care') {
                return <Expense key={idx}><FaSmile /><ExpenseType>{e}</ExpenseType></Expense>
            } else if (e === 'newCategory') {
                return <Expense key={idx}><FaRegStar style={{fontSize: ""}}/><ExpenseType>{e}</ExpenseType></Expense>
            }
        })}
    </ExpensesContainer>
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
