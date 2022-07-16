import UserContext from '../context/UserContext';
import {useContext} from 'react';
import styled from 'styled-components';
import Select from './Select';

function Nav() {
  const userCtx: any = useContext(UserContext);
  const {username, isLoggedIn} = userCtx.userData;
  
  return (
    <NavContainer>
        <Title>(logo)</Title>
        {isLoggedIn && <Select/>}
        <CurrentUser>{username}</CurrentUser>
    </NavContainer>
  )
}

const NavContainer = styled.div({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "10%",
    backgroundColor: "#bbb",
    width: "100%",
    padding: "0 1rem",
    position: "relative",
})

const Title = styled.h2({
    paddingLeft: "1rem",
    fontWeight: "700",
    color: "blue",
    boxShadow: "3px 3px 3px 0.5"
})

const CurrentUser = styled.p({
  position: "absolute",
  top: "0",
  left: "0",
  transform: "translateX(50%)",
  textDecoration: "underline",
  padding: "0 5px",
  margin: "0",
  borderRadius: "10px",
  fontSize: "12px",
})


export default Nav
