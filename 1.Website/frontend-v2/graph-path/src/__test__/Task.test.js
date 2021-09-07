import Task from "../components/Task";
import {render, screen, getByText} from '@testing-library/react';
import React from "react";
import Landing from "../components/Landing";


describe('Task Component Testing',()=> {

    test('renders the Task component', ()=>{
        render(<Task />);
    });

    test('renders tidTask', () => {
        render(<Landing />);
        const element = screen.queryByTestId('tidTask');
        expect(element).toBeDefined();
    });



})