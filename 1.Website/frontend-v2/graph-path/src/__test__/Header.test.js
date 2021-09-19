import { render, cleanup } from '@testing-library/react';
import Header from '../components/Header';
import ReactDOM from 'react-dom' ;
import React from 'react' ;

afterEach(cleanup) ;


it('renders without crashing', () => {
    const HeaderParent = document.createElement('div');   ; 
    // React-Dom Render test
    ReactDOM.render(<Header/>,HeaderParent) ;
    
    //testing library test
    const {getByTestId} = render(<Header/>);
    expect(getByTestId("tidHeader")).not.toBeEmptyDOMElement();
});

it('should render a sign up link',()=>{
    const {getByTestId} = render(<Header/>);
    expect(getByTestId('tidSignUpLink')).toHaveTextContent('Sign Up')
    expect(getByTestId('tidSignUpLink')).not.toBeDisabled() ;

}) ;

it('should render a log in link',()=>{

}) ;


it('should render the dashboard when the user is logged in',()=>{

}) ;

// test for the opposite condition  

it('should render nav bar for navigating when user is logged in',()=>{

}) ;

// test for the opposite condition  


it('should render The project manager',()=>{

}) ;



it('',()=>{

}) ;