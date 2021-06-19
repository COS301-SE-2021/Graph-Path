import { render, screen } from '@testing-library/react';
import App from '../App';
import Header from '../components/Header';

import {configure, shallow,mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

describe("Login Testing", () =>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<Header />);
        console.log(wrapper.debug());
    });



    test("render the title", () =>{
        expect(wrapper.find("h4").text()).toContain("Graph Path");
    });

    test("render log in link", () =>{

    });
})
