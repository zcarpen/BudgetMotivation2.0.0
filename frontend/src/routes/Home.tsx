import {useContext} from 'react'
import styles from 'styled-components';
import PageTitle from '../core/PageTitle';
import UserFinances from '../components/UserFinances';
import Expenses from '../components/ExpenseCategories/Expenses';
import TransactionContext from '../context/transactionContext';
import { IconContext } from 'react-icons';

function Home() {

  const {handleAddCategory, handleDeleteCategory} = useContext(TransactionContext)
  return (
    <HomeContainer>
      <PageTitle>Add An Expense</PageTitle>
      <UserData>
        <UserFinances />
        <Dial>(dial)</Dial>
      </UserData>
      <IconContext.Provider value={{style: {color: "#000", fontSize: '2.5rem'}}}>
        <Expenses />
      </IconContext.Provider>
      <ContainerForButtons>
        <CategoryButton style={{backgroundColor: "rgba(124, 252, 0, 0.2)"}} onClick={handleAddCategory}>Add Transaction</CategoryButton>
        <CategoryButton style={{backgroundColor: "rgba(255, 0, 0, 0.2)"}} onClick={handleDeleteCategory}>Delete Transaction</CategoryButton>
      </ContainerForButtons>
    </HomeContainer>
  )
}

export default Home

const HomeContainer = styles.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
})

const UserData = styles.div({
  display: "flex",
  width: "100%",
  padding: "0rem 2rem 1rem 20%",
  justifyContent: "space-between",
})

const Dial = styles.p({
  padding: "0rem 20% 1rem 2rem",
})

const ContainerForButtons = styles.div({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  marginTop: "4rem",
  width: "80%",
  gap: "2rem",
  position: "relative",
})

const CategoryButton = styles.button({
  padding: "8px 30px",
  borderRadius: "10px",
  boxShadow: "3px 3px 3px rgba(0,0,0,0.5)",
})
