import Profile from '../components/Profile'
import {render, cleanup,screen} from '@testing-library/react';
import Task from "../components/Task";
import React from "react";

afterEach(cleanup) ;

describe('Profile Testing',()=>{

    test('Renders the profile component',()=>{
        render(<Profile />);
    })
})