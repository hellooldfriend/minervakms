import React, { useState } from 'react'
import './SearchEditor.scss'

import Modal from '../Modal'
import Button from '../Button'
import Input from '../Input'
import { IconInfo } from '../../Icons'


import { connect } from 'react-redux'
import { getItems, setItems, saveToLS } from '../../redux/actions'
import { IItem, IAppState } from '../../types'
import { Dispatch } from 'redux'


type Props = {
    items: IItem[],
    setItems: (items: IItem[]) => void,
    visible: boolean,
    onClick: () => void,
}

const SearchEditor = (props: Props) => {
    const [activeItem, setActiveItem] = useState<number | null>(null)
    const { items, setItems } = props

    // functions
    const removeItem = (index: number) => {
        const updatedItems = items.filter((_, i) => i !== index)
        saveItems(updatedItems)
    }

    const saveItems = (items: IItem[]) => {
        setItems(items)
    }

    // handlers
    const handleCreateItem = (value: string | null) => {
        if(value) {
            const item = {id: items.length + 1, value}
            saveItems([item, ...items])
        }
    }

    const handleChange = (value: string | null, index: number) => {
        if(value === null) {
            removeItem(index)
            return
        }

        let updatedItems
        let item

        if(!items.length) {
            item = {id: 1, value}
            updatedItems = [item]
        } else {
            updatedItems = [...items]
            item = {...updatedItems[index], value}
            updatedItems[index] = item
        }
        saveItems(updatedItems)
    }

    const handleSubmit = () => {
        saveToLS(items)
        alert('Items saved')
    }

    const handleClearAll = () => {
        setItems([])
        saveToLS([])
        alert('Items removed')
    }
    // Main render

    return (
        <Modal {...props}>
            <div className="search_editor">
                <div className="search_editor-main">
                    <h2 title="Редактирование группы синонимов поисковых фраз">
                        Редактирование группы синонимов поисковых фраз
                    </h2>

                    <hr/>

                    <div className="search_editor-top">
                        <div className="search_editor-top-title">
                            Синонимы
                            <span className="search_editor-top-icon">
                                <IconInfo />
                            </span>
                        </div>
                        {activeItem === null &&
                            <div className="search_editor-top-input">
                                <Input
                                    mode={'add'}
                                    onChange={handleCreateItem}
                                    onClick={() => {}}
                                />
                            </div>
                        }

                    </div>

                    <div className="search_editor-list">
                        {items.map((item, index) => {
                            return (
                                <div className="search_editor-list-item" key={new Date().toString() + index}>
                                    <Input
                                        editing={activeItem !== null && activeItem === index}
                                        value={item.value}
                                        onClick={() => {
                                           if(activeItem === index) {
                                               setActiveItem(null)
                                           } else {
                                               setActiveItem(index)
                                           }
                                        }}
                                        onChange={value => handleChange(value, index)}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="search_editor-footer">
                    <hr/>
                    <div className="search_editor-buttons">
                        <Button success
                            onClick={handleSubmit}
                        >сохранить изменения</Button>
                        <Button warning
                            onClick={handleClearAll}
                        >очистить синонимы</Button>
                    </div>
                </div>

            </div>
        </Modal>

    )
}


const mapStateToProps = (state: IAppState) => {
    return {
        items: state.items,
    }
}


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getItems: (items: IItem[]) => dispatch(getItems(items)),
        setItems: (items: IItem[]) => dispatch(setItems(items)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchEditor)