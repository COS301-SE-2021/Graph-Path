import React from 'react';
import Login from "../components/Login";

import {shallow} from 'enzyme';

describe("Login Test", () =>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<Login />);
        console.log(wrapper.debug());
    });

    test("wraps the login form with a div",()=>{
        expect(wrapper.find(".loginScreen").length).toEqual(1);
    });
})