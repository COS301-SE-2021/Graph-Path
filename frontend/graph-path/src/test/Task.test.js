import React from 'react';

import {shallow} from 'enzyme';
import Task from "../components/Task";

describe("Task Test", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Task/>);

    });

    test("Existence of a form", () => {
        expect(wrapper.find("form")).toBeTruthy();
    });

});