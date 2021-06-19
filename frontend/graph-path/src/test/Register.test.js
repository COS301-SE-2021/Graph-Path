import React from 'react';

import {shallow} from 'enzyme';
import Register from "../components/Register";

describe("Register Test", () =>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<Register />);
        //console.log(wrapper.debug());
    });

    test("wraps the login form with a div",()=>{
        expect(wrapper.find("#registerscreen").length).toEqual(1);
    });
})