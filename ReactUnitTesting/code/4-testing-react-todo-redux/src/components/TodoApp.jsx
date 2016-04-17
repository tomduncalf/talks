import * as React from 'react'
import { connect } from 'react-redux'

import { addTodo, toggleTodoDone } from 'redux/todos'
import TodoList from 'components/TodoList'
import TodoInput from 'components/TodoInput'

export class TodoApp extends React.Component {
    render() {
        return <div>
            <TodoList items={this.props.todos} onItemDone={this.props.toggleTodoDone.bind(this)} />
            <TodoInput onAddItem={this.props.addTodo.bind(this)} />
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (item) => dispatch(addTodo({ item })),
        toggleTodoDone: (index) => dispatch(toggleTodoDone(index))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoApp)
