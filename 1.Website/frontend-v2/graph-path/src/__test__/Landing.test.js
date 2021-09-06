
import React, {useEffect} from 'react';
import ReactDom from 'react-dom';
import {render, cleanup, screen, fireEvent, getByText} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProjectInformation from "../components/ProjectInformation";
import * as ReactDOM from "react-dom";
import Landing from "../components/Landing";

afterEach(cleanup);

describe('Landing Page Component Testing',()=> {
    it("renders main div for component correctly", () => {
        const {queryByTestId} = render(<Landing />)
        expect(queryByTestId('main-landing-id')).toBeTruthy()

    })

    test('renders the Landing component', ()=>{
        render(<Landing />);
    });

    test("there is a button", () => {
        render(<Landing />);
        const element = screen.queryByTestId('landing-btn');
        expect(element).toBeDefined();
    });

    test('renders the Page Name', () => {
        render(<Landing />);
        const element = screen.queryByTestId('pageName');
        expect(element).toBeDefined();
    });

    screen.debug();

})
