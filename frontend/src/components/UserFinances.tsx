import styles from 'styled-components'
import {useContext} from 'react';
import UserContext from '../context/UserContext';
import TransactionContext from '../context/transactionContext';
import { calcTotalExpenses } from '../helpers';

function UserFinances() {
    const {userData} = useContext(UserContext)
    const {transactions} = useContext(TransactionContext)
    const monthlyBudget = userData?.monthlyBudget
    const totalExpenses = calcTotalExpenses(transactions);
    const left = monthlyBudget ? monthlyBudget - totalExpenses : 'unknown'
  return (
    <List>
        <DataContainer><DataType>Budget:  </DataType><DataAmount style={{color: "blue"}}>{monthlyBudget}</DataAmount></DataContainer>
        <DataContainer><DataType>Spent: </DataType><DataAmount style={{color: "red"}}>{totalExpenses}</DataAmount></DataContainer>
        <DataContainer><DataType>Left: </DataType><DataAmount style={{color: "green"}}>{left}</DataAmount></DataContainer>
    </List>
  )
}

const List = styles.div({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
})

const DataType = styles.p({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 0,
    fontSize: "0.5rem",
    letterSpacing: "1px",
    fontWeight: 600,
    minWidth: "3rem",
})

const DataAmount = styles.p({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    fontSize: "0.7rem",
    fontWeight: 600,
    letterSpacing: "0.75px"
})

const DataContainer = styles.div({
    display: "flex",
    justifyContent: "flex-start",
})

export default UserFinances
