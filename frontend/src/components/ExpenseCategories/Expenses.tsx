import {useContext} from 'react';
import UserContext from '../../context/UserContext';
import styles from 'styled-components'
import TransactionModal from '../TransactionModal';
import Expense from './Expense';

function Expenses() {
    const {userData, modal} = useContext(UserContext)

  return (
    <>
        <ExpensesContainer>
            {userData?.visibleExpenses.map((exp, idx) => <Expense key={idx} category={exp}/>)}
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



export default Expenses
