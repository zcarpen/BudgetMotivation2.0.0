import styled from 'styled-components';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignUp from './routes/SignUp';
import Login from './routes/Login';
import Nav from './components/Nav'
import Home from './routes/Home';
import Motivation from './routes/Motivation';
import Charts from './routes/Charts';
import { UserInfoProvider } from './context/UserContext';
import { TransactionsProvider } from './context/transactionContext';

function App() {
  return (
    <Router>
      <UserInfoProvider>
        <TransactionsProvider>
          <Container>
              <Nav />
              <Routes>
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Home />} />
                <Route path='/motivation' element={<Motivation />} />
                <Route path='/charts' element={<Charts />} />
              </Routes>
          </Container>
        </TransactionsProvider>
      </UserInfoProvider>
    </Router>
  )
}

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  height: "100%",
})

export default App
