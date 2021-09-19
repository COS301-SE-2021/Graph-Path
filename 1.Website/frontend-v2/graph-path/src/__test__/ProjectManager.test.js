// import React from 'react';
// import ReactDOM  from 'react-dom';
// import { HashRouter as Router } from 'react-router';
// import {render,screen,cleanup} from '@testing-library/react' ;
// import ProjectManager from '../components/ProjectManager';
//
//
// afterEach(cleanup);
//
// const testDiv = document.createElement("div") ;
// it('Should render Project Manager without props',()=>{
//     ReactDOM.render(<Router><ProjectManager/></Router>,testDiv) ;
// }) ;
//
// it('should render with all required props',()=>{
//
//     const {getByTestId,getByText} = render(<ProjectManager />) ;
//     expect(getByText('Projects')).toBeInTheDocument() ;
//     expect(getByTestId("tidProjList")).toBeInTheDocument() ;
//     expect(getByTestId("tidProjectManager")).toBeInTheDocument();
//
// }) ;
//
// const projects = [{
//     projectName:"Test 1",
//     lastDateAccessed: new Date() ,
//     members:[]
// }]
//
//
// it('When given a set of projects, render at least one of the projects',()=>{
//
// }) ;
//
// it('When given a set of projects, it should render with most accessed project first',()=>{
//
// }) ;
//
//
// it('It should be able to display the projects with another sorting system available',()=>{
//
// }) ;
//
