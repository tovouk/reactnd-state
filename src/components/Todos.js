import React from 'react'
import List from './List'
import {connect} from 'react-redux'
import {handleAddTodo,handleDeleteTodo,handleToggle} from '../actions/todos'

class Todos extends React.Component {
    addItem = (e) => {
        e.preventDefault()

        this.props.dispatch(handleAddTodo(
            this.input.value,
            ()=> this.input.value = ''
        ))
    }

    removeItem = (todo) => {
        this.props.dispatch(handleDeleteTodo(todo))
    }

    toggleItem = (id) => {
        this.props.dispatch(handleToggle(id))
    }

    render(){
        return (
            <div>
                <h1>Todos</h1>
                <input type="text"
                    placeholder="Add Todo"
                    ref={(input)=> this.input = input } />
                <button onClick={this.addItem}>Add Todo</button>
                <List toggle={this.toggleItem} remove={this.removeItem} items={this.props.todos} />
            </div>
        )
    }
}

export default connect((state)=> ({
    todos: state.todos
}))(Todos)