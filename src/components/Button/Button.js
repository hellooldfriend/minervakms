import React from 'react'
import './Button.scss'

import { IconLoader } from '../../Icons'

const Button = (props) => {

    const cls = ['button']

    if(props.success) {
        cls.push('_success')
    } else if(props.disabled) {
        cls.push('_disabled')
    } else if(props.warning) {
        cls.push('_warning')
    } else if(props.loading) {
        cls.push('_loading')
    }

    if(props.className) {
        cls.push(props.className)
    }

    return (
        <button className={cls.join(' ')} onClick={props.onClick}>
            {props.loading ? <IconLoader /> : props.children}
        </button>
    )
}

export default Button