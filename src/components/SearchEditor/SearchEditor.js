import React, { useState } from 'react'
import './SearchEditor.scss'

import Modal from '../Modal'
import Button from '../Button'
import Input from '../Input'
import { IconInfo } from '../../Icons'


const ITEMS_LOCAL_STORAGE_URL = '__MINERVA/ITEMS__'

const SearchEditor = (props) => {
    const [activeItem, setActiveItem] = useState(null)
    const [items, setItems] = useState(JSON.parse(localStorage.getItem(ITEMS_LOCAL_STORAGE_URL)) || [])

    // functions
    const removeItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index)
        saveItems(updatedItems)
    }

    const saveItems = (items) => {
        setItems(items)
        // localStorage.setItem(ITEMS_LOCAL_STORAGE_URL, JSON.stringify(items))
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
        localStorage.setItem(ITEMS_LOCAL_STORAGE_URL, JSON.stringify(items))
        alert('Items saved')
    }

    const handleClearAll = () => {
        setItems([])
        localStorage.setItem(ITEMS_LOCAL_STORAGE_URL, JSON.stringify([]))
    }
    // Main render

    return (
        <Modal {...props}>
            <div className="search_editor">
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
                        <Input
                            mode={'add'}
                            onChange={handleCreateItem}
                            onClick={() => {}}
                        />
                    }

                </div>

                <div className="search_editor-list">
                    {items.map((item, index) => {
                        return (
                            <Input key={new Date().toString() + index}
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
                        )
                    })}
                </div>




                <hr/>

                <div className="search_editor-buttons">
                    <Button success
                        onClick={handleSubmit}
                    >Сохранить изменения</Button>
                    <Button warning
                        onClick={handleClearAll}
                    >Очистить синонимы</Button>
                </div>
            </div>
        </Modal>

    )
}

export default SearchEditor