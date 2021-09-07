import React from 'react';
import ReactDom from 'react-dom';
import {render, cleanup, screen, configure} from '@testing-library/react';
import {Provider} from "react-redux";
import '@testing-library/jest-dom/extend-expect';
import Dashboard from "../components/Dashboard";
import configureStore from 'redux-mock-store'
import {BrowserRouter, HashRouter, Route, withRouter} from 'react-router-dom' ;

afterEach(cleanup)

describe('Dashboard Testing',()=>{
    // const initialState = {output:10}
    // const mockStore = configureStore()
    // let store,wrapper
    //
    // it("renders correctly",()=>{
    //     store= mockStore(initialState)
    //     let picture;
    //     const {queryByTestId} = render(<HashRouter><Provider store={store}><Dashboard picture={picture}/></Provider></HashRouter>)
    //     // expect(queryByTestId('main-container-id')).toBeTruthy()
    // })
})

