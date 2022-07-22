import {useState, useContext} from 'react'
import {createPortal} from 'react-dom';
import styles from 'styled-components';
import UserContext from '../context/UserContext';
import Button from '../core/button';
import {FaCoffee, FaShoppingCart, FaGasPump, FaHamburger, FaTv, FaHome, FaMusic, FaGift, FaCandyCane, FaGamepad, FaSmile, FaPlus, FaRegStar, FaRegTimesCircle } from 'react-icons/fa';

function TransactionModal() {
    const {modal, handleModal} = useContext(UserContext);
    const [amt, setAmt] = useState('')

    const submitTransaction = (e: any) => {
        e.preventDefault()
        console.log(modal.transaction)
        console.log(amt)
        // axios request to add transaction
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

    const iconSelector = (type: string) => {
        if (type === 'other') {
            return <FaPlus />
        } else if (type === 'coffee') {
            return <FaCoffee />
        } else if (type === 'grocery') {
            return <FaShoppingCart />
        } else if (type === 'gas') {
            return <FaGasPump />
        } else if (type === 'eat-out') {
            return <FaHamburger />
        } else if (type === 'movie') {
            return <FaTv />
        } else if (type === 'music') {
            return <FaMusic />
        } else if (type === 'house') {
            return <FaHome />
        } else if (type === 'gifts') {
            return <FaGift />
        } else if (type === 'snack') {
            return <FaCandyCane />
        } else if (type === 'games') {
            return <FaGamepad />
        } else if (type === 'self-care') {
            return <FaSmile />
        } else if (type === 'newCategory') {
            return <FaRegStar />
        }
    }
  return (
    <>
       {createPortal(<Backdrop onClick={() => handleModal('')}>
        </Backdrop>, document.getElementById('backdrop'))}
       {createPortal(<ModalForm onSubmit={submitTransaction}>
            <FaRegTimesCircle onClick={() => handleModal('')} style={{position: "absolute", top: 0, right: 0, transform: "translate(-50%, 50%)", fontSize: "1.5rem" }}/>
            <Category>{modal.transaction}</Category>
            {iconSelector(modal.transaction)}
            <InputContainer>
                <Input placeholder="$" onChange={handleAmountchange} value={amt}/>
            </InputContainer>
            <Button type="submit" style={{letterSpacing: "1px", fontSize: "0.9rem"}}>Create Transaction</Button>
        </ModalForm>, document.getElementById('overlay'))}
    </>
  )
}

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
