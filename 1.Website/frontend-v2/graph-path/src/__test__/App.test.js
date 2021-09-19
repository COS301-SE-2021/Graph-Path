import { render, screen } from '@testing-library/react';
import App from '../components/App';

import React from 'react' ;
import ReactDOM from 'react-dom' ;

test('it renders without crashing', () => {
  const appDiv = document.createElement("div") ;
  ReactDOM.render(<App/>,appDiv) ;
});

it('has one child element inside',()=>{
  const {getByTestId} = render(<App/>) ;
  expect(getByTestId('tidApp')).not.toBeEmptyDOMElement() ;
}); 
