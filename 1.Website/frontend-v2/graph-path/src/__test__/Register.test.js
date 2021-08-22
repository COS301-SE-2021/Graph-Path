import Register from '../components/Register';
import {render, screen} from '@testing-library/react';


describe('Register functionality', ()=>{

    test('renders the Register component', ()=>{
        render(<Register />);

        //To see it on the command line
        screen.debug();
    });
})