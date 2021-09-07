import Kanban from '../components/Kanban';
import {render, screen, getByTestId} from '@testing-library/react';



describe('Kanban functionality', ()=>{

    test('renders the Kanban component', ()=>{
        render(<Kanban />);
    });

    test('Check that the Kanban exists', ()=>{
        const {getByTestId}=render(<Kanban />);
        const idcheck=getByTestId('kanban');
        expect(idcheck).toBeInTheDocument()
    });

    //To see it on the command line
    screen.debug();
})