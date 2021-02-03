import React from 'react'
import './Modal.scss'

import { IconClose } from '../../Icons'

/*

type Props = {
    children: node,
    visible: boolean,
    onClick: () => void,
}
 */

const Modal = ({ children, visible, onClick }) => {
    const cls = ['modal']

    if(!visible) {
        cls.push('_hidden')
    }

    return (
        <div className={cls.join(' ')} onClick={onClick}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close"
                    onClick={onClick}
                ><IconClose /></button>
                {children}
            </div>
        </div>
    )
}




export default Modal