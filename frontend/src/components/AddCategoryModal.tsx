import {useState, useContext} from 'react'
import {createPortal} from 'react-dom';
import styles from 'styled-components';
import UserContext from '../context/UserContext';
import TransactionContext from '../context/transactionContext';
import Button from '../core/button';
import axios from 'axios';
import {FaRegStar, FaTimes } from 'react-icons/fa';

function AddCategoryModal() {
    const {userData} = useContext(UserContext);
    const {fetchTransactions, handleAddCategory} = useContext(TransactionContext)
    const [name, setName] = useState('')

    const updateCategories = async (e: any) => {
        if (userData?.visibleExpenses?.length >= 12) {
            // create error
            return
        }
        e.preventDefault()
        // axios request to add transaction
        try {
            const token = localStorage.getItem('accessToken');

            const result = await axios({
                url: 'http://localhost:3001/add-transaction',
                method: 'put',
                data: {
                    name: name,
                    transactions: userData?.visibleExpenses
                },
                headers: {
                    'Authorization': `${token}`,
                }
            })
            console.log('completed update')
            fetchTransactions()
        } catch (err) {
            console.log(err)
        }

        setName('')
        handleAddCategory()
    }

    const handleChange = (e: any) => {
        const curValue = e.target.value
        if (curValue.length < 12) {
            setName(curValue)
        }
        return
    }

  return (
    <>
       {createPortal(<Backdrop onClick={handleAddCategory}>
        </Backdrop>, document.getElementById('backdrop') as Element)}
       {createPortal(<ModalForm onSubmit={updateCategories}>
            <Close 
                onClick={handleAddCategory}                
                style={{color: "#fff"}}
                size={20}
            />
            <FaRegStar />
            <InputContainer>
                <Input placeholder="less than 12 characters" onChange={handleChange} value={name}/>
            </InputContainer>
            <NewButton type="submit">Create Category</NewButton>
        </ModalForm>, document.getElementById('overlay') as Element)}
    </>
  )
}

const NewButton = styles(Button)({
    letterSpacing: "1px",
    fontSize: "0.9rem"
})

const Close = styles(FaTimes)({
    position: "absolute", 
    top: 0, 
    right: 0, 
    transform: "translate(-50%, 50%)", 
    padding: "0.25rem",
    backgroundColor: "#000",
    borderRadius: "50%",
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
    justifyContent: "center",
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


export default AddCategoryModal