import React from 'react';
import Login from "../components/Login";

import {shallow} from 'enzyme';

describe("Login Test", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Login/>);
        //console.log(wrapper.debug());
    });

    test("wraps the login form with a div", () => {
        expect(wrapper.find(".loginScreen").length).toEqual(1);
    });

    test("there is a form", () => {
        expect(wrapper.find("form")).toBeTruthy();
    });

    test("render title", () => {
        expect(wrapper.find("h4").text()).toBe("Sign In");
    });

    test("render two input field and button of input element", () => {
        expect(wrapper.find("input").length).toEqual(3);
    });



});