import {React,Component} from "react";
import { Container, Header, Content, Footer, Sidebar } from 'rsuite';
import "rsuite/dist/styles/rsuite-default.css" ;

class CustomHeader extends Component{
    render(){
        return (
        <div>   
             <Container>
             Landing Page 
             <br />
                Log In | Register 

                <Header>Header</Header>
                <Content>Content</Content>
                <Footer>Footer</Footer>
             </Container>            
        </div>      

        )
    }
}


export default CustomHeader ;