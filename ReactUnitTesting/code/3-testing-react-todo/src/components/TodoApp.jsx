import * as React from 'react'

import TodoList from 'components/TodoList'
import TodoInput from 'components/TodoInput'

export default class TodoApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = { items: [] }
    }

    addItem(item) {
        this.setState({ items: this.state.items.concat([{ item }]) })
    }

    removeItem(index) {
        const newItems = this.state.items.slice(0)
        newItems[index].done = newItems[index].done ? false : true
        this.setState({ items: newItems })
    }

    render() {
        return <div>
            <TodoList items={this.state.items}
                onItemDone={this.removeItem.bind(this)} />
            <TodoInput onAddItem={this.addItem.bind(this)} />
        </div>
    }
}
