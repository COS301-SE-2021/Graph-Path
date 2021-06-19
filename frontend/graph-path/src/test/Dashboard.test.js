import React from 'react';

import {shallow} from 'enzyme';
import Dashboard from "../components/Dashboard";

describe("Dashboard Test", () =>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<Dashboard />);
        //console.log(wrapper.debug());
    });

    test("wraps the login form with a div",()=>{
        //expect(wrapper.find("#registerscreen").length).toEqual(1);
    });
})