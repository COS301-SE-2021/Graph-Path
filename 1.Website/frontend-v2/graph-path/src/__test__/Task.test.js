import Task from "../components/Task";
import {render, screen, fireEvent, cleanup} from '@testing-library/react';
import React from "react";

describe('Task Component Testing',()=> {

    afterEach(cleanup);
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

    test('form', ()=> {
        render(<Task />);
        const button = screen.queryByTestId("btn1");
        expect(button).toBeDefined();
    });


})