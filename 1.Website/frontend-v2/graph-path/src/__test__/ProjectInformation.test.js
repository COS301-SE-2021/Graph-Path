import React, {useEffect} from 'react';
import {render, cleanup, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProjectInformation from "../components/ProjectInformation";
import * as ReactDOM from "react-dom";

afterEach(cleanup);

describe('Project Information Component Testing',()=> {
    let mock;
    const mockCallback = jest.fn();
    mock = {
        projectName: "COS 301",
        groupMembers: [],
        showModal:mockCallback
    }

    const modalRoot = document.createElement('div')
    modalRoot.setAttribute('id', 'modal-root')
    document.body.appendChild(modalRoot)

    const Modal = ({onClose, children}) => {
        const el = document.createElement('div')

        useEffect(() => {
            modalRoot.appendChild(el)

            return () => modalRoot.removeChild(el)
        })

        return ReactDOM.createPortal(
            <div onClick={onClose}>
                <div onClick={e => e.stopPropagation()}>
                    {children}
                    <hr />
                    <button onClick={onClose}>Close</button>
                </div>
            </div>,
            el,
        )
    }



    it("renders main div for component correctly", () => {
        render(<ProjectInformation project={mock}/>)
        const element = screen.getByTestId('main-div-id')
        expect(element).toBeInTheDocument()

    })

    it("renders view members button correctly", () => {
        const {queryByTestId} = render(<ProjectInformation project={mock}/>)
        expect(queryByTestId('view-btn')).toHaveTextContent("View Members")
    })

    it("renders add members button correctly", () => {
        const {queryByTestId} = render(<ProjectInformation project={mock}/>)
        expect(queryByTestId('add-btn')).toHaveTextContent("Add Members")
    })

    it("renders cancel button correctly", () => {
        const {queryByTestId} = render(<ProjectInformation project={mock}/>)
        expect(queryByTestId('cancel-id')).toBeTruthy()
    })


    it("renders project information form",()=>{
        const {queryByTestId} = render(<ProjectInformation project={mock}/>)
        expect(queryByTestId('form-test-id')).toBeTruthy()

    })

    it("renders modal onclick",()=>{
        // const {queryByTestId} = render(<ProjectInformation project={mock}/>)
        // fireEvent.click(queryByTestId('add-btn'))
        // expect(mockCallback).toHaveBeenCalled()

        const handleClose = jest.fn()
        const {getByText} = render(
            <Modal onClose={handleClose}>
                <div>test</div>
            </Modal>,
        )
        expect(getByText('test')).toBeTruthy()
        fireEvent.click(getByText(/close/i))
        expect(handleClose).toHaveBeenCalledTimes(1)
    })

})