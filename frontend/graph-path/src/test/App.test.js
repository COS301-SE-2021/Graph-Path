import { render, screen } from '@testing-library/react';
import App from '../App';
import Header from '../components/Header';

import {shallow} from "enzyme";

describe("Login Testing", () =>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<Header />);
       // console.log(wrapper.debug());
    });



    test("render the title", () =>{
        expect(wrapper.find("h4").text()).toContain("Graph Path");
    });

    test("render log in link", () =>{
        expect(wrapper.find(".App-Link").length).toEqual(0);
    });

   /* test("render sign up link", () =>{
        expect(wrapper.find(".App-Link").text()).toBe("SignUp");
    });*/
})
