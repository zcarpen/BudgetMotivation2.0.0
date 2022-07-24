import {useContext, useState} from 'react'
import TransactionContext from '../../context/transactionContext'
import UserContext from '../../context/UserContext';
import styles from 'styled-components';
import {FaCoffee, FaShoppingCart, FaGasPump, FaHamburger, FaTv, FaHome, FaMusic, FaGift, FaCandyCane, FaGamepad, FaSmile, FaPlus, FaRegStar, FaTimes } from 'react-icons/fa';
import axios from 'axios';


function Expense({category, handleDisplayError}: any) {
    const {handleModal, fetchUser, userData} = useContext(UserContext)
    const {isDeleting, handleDeleteCategory} = useContext(TransactionContext)

    const icons: {
        [key: string]: () => JSX.Element
    } = {
        'other': () => <FaPlus onClick={() => openExpenseModal(category)}/>, 
        'coffee':() => <FaCoffee onClick={() => openExpenseModal(category)}/>, 
        'grocery':() => <FaShoppingCart onClick={() => openExpenseModal(category)}/>, 
        'gas':() => <FaGasPump onClick={() => openExpenseModal(category)}/>, 
        'eat-out':() => <FaHamburger onClick={() => openExpenseModal(category)}/>, 
        'movie':() => <FaTv onClick={() => openExpenseModal(category)}/>, 
        'music':() => <FaMusic onClick={() => openExpenseModal(category)}/>, 
        'house':() => <FaHome onClick={() => openExpenseModal(category)}/>, 
        'gifts':() => <FaGift onClick={() => openExpenseModal(category)}/>, 
        'snack':() => <FaCandyCane onClick={() => openExpenseModal(category)}/>, 
        'games':() => <FaGamepad onClick={() => openExpenseModal(category)}/>, 
        'self-care':() => <FaSmile onClick={() => openExpenseModal(category)}/>,
        'newCategory':() => <FaRegStar onClick={() => openExpenseModal(category)}/>,
    }


    const openExpenseModal = (type: string) => {
        handleModal(type)
    }

    
    const deleteCategory = async (category: string) => {
        if (category === 'other') {
            handleDisplayError('"other" is permenant');
            return;
        }

        if (window.confirm('are you sure you would like to perminantly delete this category?')) {
            // updates transactions in database
            try {
                const accessToken = localStorage.getItem('accessToken')

                await axios({
                    method: 'put',
                    url: 'http://localhost:3001/update-transaction',
                    data: {category: category, transactions: userData?.visibleExpenses},
                    headers: {
                        authorization: `${accessToken}`
                    }
                })
                // update front-end
                fetchUser()
                handleDeleteCategory()

            } catch (err) {
                // *******let user know transaction could not be changed...
                console.log(err)
            }
        } else {
            return
        }
    }

  return (
    <ExpenseWrapper>
        {isDeleting && 
        <DeleteIcon 
            style={{color: "#fff"}}
            size={20}
            onClick={() => deleteCategory(category)} 
        />
        }
        {icons[`${category}`] ? icons[`${category}`]() : <FaRegStar onClick={() => openExpenseModal(category)}/>}
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
