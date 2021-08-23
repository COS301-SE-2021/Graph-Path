import { useHistory } from "react-router";

const NotFound = ()  =>{
    const history = useHistory() ;
    console.log('Not FOund ',history)
    
    return(
        <h1>
            404 Not Found {history.location.pathname}
        </h1>
    )
}

export default NotFound ; 