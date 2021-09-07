import Task from "../components/Task";
import {render, screen, getByText} from '@testing-library/react';
import React from "react";

describe('Task Component Testing',()=> {

    test('renders the Task component', ()=>{
        render(<Task />);
    });

    test('renders tidTask', () => {
        render(<Task />);
        const element = screen.queryByTestId('tidTask');
        expect(element).toBeDefined();
    });

    test('check button existence', ()=> {
        render(<Task />);
        const button = screen.queryByTestId("btn1");
        expect(button).toBeDefined();
    });


})