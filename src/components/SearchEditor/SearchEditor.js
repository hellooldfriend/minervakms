import React, { useState, useEffect } from 'react'
import './SearchEditor.scss'

import Modal from '../Modal'
import Button from '../Button'
import Input from '../Input'
import { IconInfo } from '../../Icons'


import { connect } from 'react-redux'
import { getItems, setItems } from '../../redux/actions'


const SearchEditor = (props) => {
    const [activeItem, setActiveItem] = useState(null)
    const { items, setItems, getItems } = props

    // functions
    const removeItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index)
        saveItems(updatedItems)
    }

    const saveItems = (items) => {
        setItems(items)
    }

    // handlers
    const handleCreateItem = (value) => {
        const item = {id: items.length + 1, value}
        saveItems([item, ...items])
    }

    const handleChange = (value, index) => {
        if(value === null) {
            removeItem(index)
            return
        }

        let updatedItems = []
        let item = null

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
        setItems(items)
        alert('Items saved')
    }

    const handleClearAll = () => {
        setItems([])
        alert('Items removed')
    }
    // Main render

    return (
        <Modal {...props}>
            <div className="search_editor">
                <div className="search_editor-main">
                    <h2 title="Редактирование группы синонимов поисковых фраз">Редактирование группы синонимов поисковых фраз</h2>

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
                                        editing={activeItem === index}
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


const mapStateToProps = state => {
    return {
        items: state.items,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getItems: (items) => dispatch(getItems(items)),
        setItems: (items) => dispatch(setItems(items)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchEditor)