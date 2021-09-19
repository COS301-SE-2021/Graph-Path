import React, {useEffect} from 'react';
import {render, cleanup, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProjectInformation from "../components/ProjectInformation";
import * as ReactDOM from "react-dom";
import NewProject from "../components/NewProject";

afterEach(cleanup);

describe('New project Component Testing',()=> {
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
        render(<NewProject/>)
        const element = screen.getByTestId('modal-id-test')
        expect(element).toBeInTheDocument()

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