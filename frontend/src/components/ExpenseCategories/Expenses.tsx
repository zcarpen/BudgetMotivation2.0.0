import {useContext, useState} from 'react';
import UserContext from '../../context/UserContext';
import TransactionContext from '../../context/transactionContext';
import styles from 'styled-components'
import TransactionModal from '../TransactionModal';
import Expense from './Expense';
import AddCategoryModal from '../AddCategoryModal';

function Expenses() {
    const {userData, modal} = useContext(UserContext)
    const {isAdding} = useContext(TransactionContext)
    const [displayError, setDisplayError] = useState({
        isVisible: false,
        errorMessage: '',
    })

    const handleDisplayError = (message: string) => {
        setDisplayError({
            isVisible: true,
            errorMessage: message
        })
    
        setTimeout(() => {
            setDisplayError({
                isVisible: false,
                errorMessage: ''
            })
        }, 1000)

    }

  return (
    <OuterContainer>  
        <Error>{displayError.errorMessage}</Error>
        <ExpensesContainer>
            {userData?.visibleExpenses.map((exp, idx) => <Expense handleDisplayError={handleDisplayError} key={idx} category={exp}/>)}
        </ExpensesContainer>
        {modal.isVisible && <TransactionModal />}
        {isAdding && <AddCategoryModal />}
    </OuterContainer>
  )
}

const OuterContainer = styles.div({
    position: "relative",
    width: "100%",
})

const Error = styles.p({
    color: 'red', 
    position: "absolute", 
    letterSpacing: "1px", 
    top: "-10%", 
    left: 0, 
    width: "100%", 
    textAlign: "center",
})

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



export default Expenses
