import Register from '../components/Register';
import {render} from '@testing-library/react';

describe('Register functionality', ()=>{

    test('renders the Register component', ()=>{
        render(<Register />);
    });
})