import { createStore,} from 'redux' ;

const initial = {
    loggedUser: {
      email:'',
      token:''
    } 
  }
//reducer
function reducer(state = initial,action){
    // console.log('Reducer to',action.type)
    switch(action.type ){
      case 'UPDATE_TOKEN':
        let auth = {
          token: action.payload.token
        }
        let newState = Object.assign(state.loggedUser,auth) ;
        console.log('after update',newState)
        return {
          loggedUser:newState} ;
      case  'CREATE_USER' :{
        return {
          loggedUser:action.payload}
      }
      default:
        return state
    }
  }
  const store = createStore(reducer)
  
export default store ; 