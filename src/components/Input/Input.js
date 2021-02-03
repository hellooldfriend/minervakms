import React, { useState, useEffect } from 'react'
import './Input.scss'

import Button from '../Button'
import { IconEdit, IconTrash, IconClose, IconError } from '../../Icons'


const Input = (props) => {
    const mode = props.mode || 'edit'

    const [value, setValue] = useState(props.value || '')
    const [editing, setEditing] = useState(props.editing || false)
    const [showError, setShowError] = useState(false)


    useEffect(() => {
        if(editing !== props.editing) {
            setEditing(props.editing)
        }
    }, [props.editing])


    // Handlers
    const handleSave = () => {
        if(!value) {
            setShowError(true)
            return
        }

        props.onChange(value)
        props.onClick(null)
        setEditing(false)
        setValue('')
    }

    const handleCancel = () => {
        setEditing(false)
        setValue(props.value)
        props.onClick(null)
    }

    const handleKeyDown = (e) => {
        setShowError(false)

        if(e.keyCode === 13) {
            handleSave()
        }
        if(e.keyCode === 27) {
            handleCancel()
        }
    }


    // Other
    const cls = ['input']
    if(editing) {
        cls.push('_active')
    }

    const renderInput = () => {
        return (
            <>
                <input
                    type="text"
                    value={value}
                    placeholder={'Введите название'}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus={true}
                />
                {showError &&
                    <div className="input-error">
                        <IconError />{' '}
                        Поле не может быть пустым
                    </div>
                }
            </>
        )
    }

    const renderAddInput = () => {
        return (
            <div className="input _active">
                <div className="input-info">добавление синонима:</div>
                {renderInput()}
                <div className="buttons">
                    <Button className='_basic' onClick={handleSave}>добавить</Button>
                </div>
            </div>
        )
    }

    if(mode === 'add') {
        return renderAddInput()
    }

    // Final render
    return (
        <div className={cls.join(' ')}>
            {editing ?
                <>
                    <div className="input-info">редактирование синонима:</div>
                    {renderInput()}
                    <div className="input-buttons">
                        <Button className={'_basic'} onClick={handleSave}>сохранить</Button>
                        <button className="button-close" onClick={handleCancel}><IconClose /></button>
                    </div>
                </>
                :
                <>
                    <div className="input-value">{value}</div>
                    <span className="input-buttons _absolute _right">
                        <button
                            onClick={() => props.onClick()}
                        >
                            <IconEdit />
                        </button>
                        <button onClick={() => {
                            window.confirm('Вы уверены, что хотите удалить этот синоним?') && props.onChange(null)
                        }}>
                            <IconTrash />
                        </button>
                    </span>
                </>
            }
        </div>
    )
}


export default Input