import * as React from 'react'
import { connect } from 'react-redux'

import { addTodo, toggleTodoDone } from 'redux/todos'
import TodoList from 'components/TodoList'
import TodoInput from 'components/TodoInput'

export const TodoApp = ({ todos, addTodo, toggleTodoDone }) => (
    <div>
        <TodoList items={todos} onItemDone={toggleTodoDone} />
        <TodoInput onAddItem={addTodo} />
    </div>
)

const mapStateToProps = (state) => ({ todos: state.todos })

const mapDispatchToProps = (dispatch) => ({
    addTodo: (item) => dispatch(addTodo({ item })),
    toggleTodoDone: (index) => dispatch(toggleTodoDone(index))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoApp)
