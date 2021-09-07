import React from 'react';
import ReactDom from 'react-dom';
import {render, cleanup,screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Modal from "../components/Modal";

afterEach(cleanup)

it("render calender",()=>{
    const {queryByTestId} = render(<Modal/>)
    expect(queryByTestId('calendar-div-id')).toBeTruthy()
})