import styled from 'styled-components';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Button from "./core/button";
import SignUp from './routes/SignUp';


function App() {
  return (
    // <Container>
    //   <Button onClick={(e: any) => {console.log("CLICKED!")}}>Test Button</Button>
    //   <Button secondary onClick={(e: any) => {console.log("CLICKED!")}}>Test Button</Button>
    // </Container>
    <Container>
      <Router>
        <Routes>
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </Router>
    </Container>
  )
}

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
})

export default App
