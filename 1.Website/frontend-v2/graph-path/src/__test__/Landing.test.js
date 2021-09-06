import Landing from '../components/Landing';
import {render, screen} from '@testing-library/react';




describe('Landing Page functionality', ()=>{

    test('renders the Landing component', ()=>{
        render(<Landing />);
    });

    test("there is a button", () => {
        render(<Landing />);
        const element = screen.queryByTestId('landing-btn');
        expect(element).toBeDefined();
    });

    //To see it on the command line
    screen.debug();
})