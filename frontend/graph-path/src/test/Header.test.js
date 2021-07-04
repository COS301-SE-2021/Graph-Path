import React from 'react';
import {Link, MemoryRouter as Router} from 'react-router-dom'
import {shallow} from 'enzyme';
import Header from "../components/Header";

describe("Header Test", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Header/>);
    });

    test("Existence of a link", () => {
        expect(wrapper.find("link")).toBeTruthy();
    });


});
