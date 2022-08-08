import {useState} from 'react'
import styles from 'styled-components';
import {Link} from 'react-router-dom';
import {useContext} from 'react';
import UserContext from '../context/UserContext';
import TransactionContext from '../context/transactionContext';

function Select() {
    const userCtx: any = useContext(UserContext);
    const transactionCtx: any = useContext(TransactionContext);
    const [openSelect, setOpenSelect] = useState(false);
    const [selected, setSelected] = useState('Home');

    const toggleSelect = () => {
        setOpenSelect(!openSelect)
    }

    const handleLogout = () => {
        localStorage.removeItem("accessToken")
        userCtx.handleLogout()
        transactionCtx?.handleLogout()
        // also, reset the global state
    }
  return (
    <Container>
        <Selected onClick={toggleSelect}>{selected}
            {openSelect && <Ul>
                <Link to="/" style={{textDecoration: 'none'}}>
                    <ListItem id="home">Home</ListItem>
                </Link>
                <Link to="/motivation" style={{textDecoration: 'none'}}>
                    <ListItem id="motivation">Motivation</ListItem>
                </Link>
                <Link to="/charts" style={{textDecoration: 'none'}}>
                    <ListItem id="charts">Charts</ListItem>
                </Link>
                <Link to="/login" style={{textDecoration: 'none'}}>
                    <ListItem id="logout" onClick={handleLogout} style={{color: "red"}}>logout</ListItem>
                </Link>
            </Ul>}
        </Selected>
    </Container>
  )
}
const Container = styles.div({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "25%",
    paddingRight: "1rem"
})

const Ul = styles.ul({
    display: "flex",
    flexDirection: "column",
    padding: "0",
    margin: "0",
    listStyle: "none",
    backgroundColor: "#aaa",
    width: "100%",
    position: "absolute",
    bottom: "0",
    left: "50%",
    transform: "translate(-50%, 100%)"
})

const ListItem = styles.li({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.3rem 0.2rem", 
    color: "green",   
    zIndex: 10,
})

const Selected = styles.div({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "#aaa",
    color: "green",
    width: "100%",
    borderRadius: "2px",
    padding: "0.2rem 0",
    zIndex: 10,
})

export default Select
