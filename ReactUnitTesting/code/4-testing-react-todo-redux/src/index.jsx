import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import TodoApp from 'components/TodoApp'
import todos from 'redux/todos'

const store = createStore(todos)

ReactDOM.render(
    <Provider store={store}>
        <TodoApp />
    </Provider>,
    document.querySelector('#app')
)
