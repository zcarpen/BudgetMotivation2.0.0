import {useContext, useEffect} from 'react';
import UserContext from '../context/UserContext';
import {useNavigate} from 'react-router-dom';

function AuthorizedWrapper({children}: any) {
    const {userData, isLoading} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!userData && !isLoading) {
            navigate('/login', { replace: true})
        }
    } ,[userData, isLoading])
    
    if (isLoading) return null;
    return children
}

export default AuthorizedWrapper
