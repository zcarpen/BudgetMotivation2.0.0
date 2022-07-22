import {useContext} from 'react'
import TransactionContext from '../../context/transactionContext'
import UserContext from '../../context/UserContext';
import styles from 'styled-components';
import {FaCoffee, FaShoppingCart, FaGasPump, FaHamburger, FaTv, FaHome, FaMusic, FaGift, FaCandyCane, FaGamepad, FaSmile, FaPlus, FaRegStar, FaTimes } from 'react-icons/fa';

const icons: {
    [key: string]: () => JSX.Element
} = {
    'other': () => <FaPlus />, 
    'coffee':() => <FaCoffee />, 
    'grocery':() => <FaShoppingCart />, 
    'gas':() => <FaGasPump />, 
    'eat-out':() => <FaHamburger />, 
    'movie':() => <FaTv />, 
    'music':() => <FaMusic />, 
    'house':() => <FaHome />, 
    'gifts':() => <FaGift />, 
    'snack':() => <FaCandyCane />, 
    'games':() => <FaGamepad />, 
    'self-care':() => <FaSmile />,
    'newCategory':() => <FaRegStar />,
}


function Expense({category}: any) {
    const {handleModal} = useContext(UserContext)
    const {isDeleting} = useContext(TransactionContext)

    const openExpenseModal = (type: string) => {
        handleModal(type)
    }

    const deleteCategory = (category: string) => {
        if (window.confirm('are you sure you would like to perminantly delete this category?')) {
            // updates transactions in database
            console.log('DELETE!!!!')
        } else {
            return
        }
    }

  return (
    <ExpenseWrapper onClick={() => openExpenseModal(category)}>
        {isDeleting && 
        <DeleteIcon style={{color: "#fff"}}
            size={20}
            onClick={() => deleteCategory(category)} 
        />
        }
        {icons[`${category}`]()}
        <ExpenseType>{category}</ExpenseType>
    </ExpenseWrapper>
  )
}

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

const DeleteIcon = styles(FaTimes)({
    position: "absolute", 
    backgroundColor: "#000", 
    borderRadius: "50%", 
    top: 0, 
    right: 0, 
    transform: "translate(0.5rem, -0.5rem)", 
    fontSize: "1.25rem",
})

const ExpenseWrapper = styles.div({
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

export default Expense
