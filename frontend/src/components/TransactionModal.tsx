import {useState, useContext} from 'react'
import {createPortal} from 'react-dom';
import styles from 'styled-components';
import UserContext from '../context/UserContext';
import TransactionContext from '../context/transactionContext';
import Button from '../core/button';
import axios from 'axios';
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
function TransactionModal() {
    const {modal, handleModal, userData} = useContext(UserContext);
    const {fetchTransactions} = useContext(TransactionContext)
    const [amt, setAmt] = useState('')

    const submitTransaction = async (e: any) => {
        e.preventDefault()

        // axios request to add transaction
        try {
            const token = localStorage.getItem('accessToken');

            const result = await axios({
                url: 'http://localhost:3001/create-transaction',
                method: 'post',
                data: {
                    amount: Number(amt),
                    category: modal.transaction,
                    userID: userData?.userID
                },
                headers: {
                    'Authorization': `${token}`,
                }
            })
            
            fetchTransactions()
        } catch (err) {
            console.log(err)
        }

        setAmt('')
        handleModal('')
    }

    const handleAmountchange = (e: any) => {
        const curValue = e.target.value
        if(isNaN(curValue) || Number(Number(curValue).toFixed(2)) !== Number(curValue)) {
            return;
        }
        setAmt(curValue)
    }

  return (
    <>
       {createPortal(<Backdrop onClick={() => handleModal('')}>
        </Backdrop>, document.getElementById('backdrop') as Element)}
       {createPortal(<ModalForm onSubmit={submitTransaction}>
            <FaTimes onClick={() => handleModal('')} style={{position: "absolute", top: 0, right: 0, transform: "translate(-50%, 50%)", fontSize: "1.5rem" }}/>
            <Category>{modal.transaction}</Category>
            {icons[`${modal.transaction}`]()}
            <InputContainer>
                <Input placeholder="$" onChange={handleAmountchange} value={amt}/>
            </InputContainer>
            <NewButton type="submit">Create Transaction</NewButton>
        </ModalForm>, document.getElementById('overlay') as Element)}
    </>
  )
}

const NewButton = styles(Button)({
    letterSpacing: "1px",
    fontSize: "0.9rem"
})

const Backdrop = styles.div({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    zIndex: 11,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.75)",
})

const ModalForm = styles.form({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    position: "fixed",
    top: "20vh",
    left: "10%",
    width: "80%",
    borderRadius: "15px",
    minHeight: "40%",
    zIndex: 100,
    overflow: "hidden",
    backgroundColor: "#fff",
    margin: 0
})

const Input = styles.input({
    margin: 0,
    padding: "0.5rem 0",
    borderRadius: "10px",
    textAlign: "center",
    fontWeight: 500,
    fontSize: "1rem"
})

const Category = styles.h3({
    textAlign: "center",
    backgroundColor: "#aaa",
    width: "100%",
    margin: "0 0 2rem 0",
    padding: "1rem 0",
    letterSpacing: "2px",
    fontSize: "2rem",
})

const InputContainer =  styles.p({
    margin: "2rem 0 1.5rem 0"
})


export default TransactionModal
