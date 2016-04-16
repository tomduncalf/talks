import * as React from 'react'

import TodoList from 'components/TodoList'
import TodoInput from 'components/TodoInput'

export default class TodoApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = { items: [] }
    }

    addItem(item) {
        this.setState({ items: this.state.items.concat([item]) })
    }

    removeItem(index) {
        this.setState({ items: this.state.items.slice(0, index).concat(this.state.items.slice(index + 1)) })
    }

    render() {
        return <div>
            <TodoList items={this.state.items}
                onItemDone={this.removeItem.bind(this)} />
            <TodoInput onAddItem={this.addItem.bind(this)} />
        </div>
    }
}
