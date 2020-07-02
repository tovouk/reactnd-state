//Library code
function createStore(reducer) {
    /*
    Store should have the following
    1. A State
    2. A way to get the state
    3. A way to listen to changes to the state
    4. A way to update the state
    */

    let state
    let listeners = []

    const getState = () => state

    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l)=> l !== listener)
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener)=> listener())
    }

    return {
        getState,
        subscribe,
        dispatch
    }

}

//App code
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

//action creators
function addTodoAction (todo) {
    return {
        type: ADD_TODO,
        todo
    }
}

function removeTodoAction (id) {
    return {
        type: REMOVE_TODO,
        id
    }
}

function toggleTodoAction (id) {
    return {
        type: TOGGLE_TODO,
        id
    }
}

function addGoalAction (goal) {
    return {
        type: ADD_TODO,
        goal
    }
}

function removeGoalAction (id) {
    return {
        type: REMOVE_GOAL,
        id
    }
}

//to-dos reducer
function todos (state = [], action) { 
    switch(action.type){
        case ADD_TODO:
            return state.concat([action.todo])
        case REMOVE_TODO:
            return state.filter((todo)=> todo.id !== action.id)
        case TOGGLE_TODO:
            return state.map((todo)=> todo.id !== action.id? todo: Object.assign({},todo,{complete: !todo.complete}))
        default:
            return state
    }
}
//Goals Reducer
function goals (state = [], action){
    switch(action.type){
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter((goal)=> goal.id !== action.id)
        default:
            return state
    }
}
//reducer can handle other reducers
function app(state = {},action) {
    return {
        todos: todos(state.todos,action),
        goals: goals(state.goals, action)
    }
}


//Use the below to test this store

const store = createStore(app)
store.subscribe(()=>{
    console.log('The new state is: ', store.getState())
})
store.dispatch(addTodoAction({
    id: 0,
    name: 'Learn Redux',
    complete: false
}))
store.dispatch(addTodoAction({
    id: 1,
    name: 'Tie my shoes',
    complete: false
}))
store.dispatch(addTodoAction({
    id: 2,
    name: 'Read a book',
    complete: false
}))
store.dispatch(removeTodoAction(1))
store.dispatch(toggleTodoAction(2))
store.dispatch(addGoalAction({
    id: 0,
    name: 'Be cool'
}))
store.dispatch(addGoalAction({
    id: 1,
    name: 'Be awesome'
}))
store.dispatch(removeGoalAction(0))
