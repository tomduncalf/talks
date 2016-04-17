export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO_DONE = 'TOGGLE_TODO_DONE'

const initialState = { todos: [] }

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            console.log(Object.assign({}, state, { todos: state.todos.concat([action.item]) }))
            return Object.assign({}, state, { todos: state.todos.concat([action.item]) })
        case TOGGLE_TODO_DONE:
            const newTodos = state.todos.slice(0)
            newTodos[action.index].done = newTodos[action.index].done ? false : true
            return Object.assign({}, state, { todos: newTodos })
        default:
            return state
    }
}

export function addTodo(item) {
    return {
        type: ADD_TODO,
        item
    }
}

export function toggleTodoDone(index) {
    return {
        type: TOGGLE_TODO_DONE,
        index
    }
}
