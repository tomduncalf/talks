export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO_DONE = 'TOGGLE_TODO_DONE'

const initialState = { todos: [] }

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            return Object.assign({}, state, { todos: state.todos.concat([action.item]) })
        case TOGGLE_TODO_DONE:
            const newTodos = state.todos.slice(0)
            newTodos[action.index].done = newTodos[action.index].done ? false : true
            return Object.assign({}, state, { todos: newTodos })
        default:
            return state
    }
}

export const addTodo = (item) => ({ type: ADD_TODO, item })
export const toggleTodoDone = (index) => ({ type: TOGGLE_TODO_DONE, index })
