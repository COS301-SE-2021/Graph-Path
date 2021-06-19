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

    test("there is a form",()=>{
        expect(wrapper.find("form")).toBeTruthy();
    });

    test("render title",()=>{
        expect(wrapper.find("h4").text()).toBe("Sign Up");
    });

    test("render 4 input field and button of input element", ()=>{
        expect(wrapper.find("input").length).toEqual(5);
    });
})