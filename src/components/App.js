import React from 'react';
import {connect} from 'react-redux'
import ConnectedTodos from './Todos'
import ConnectedGoals from './Goals'
import {handleInitialData} from '../actions/shared'

function App() {
  componentDidMount(){
    const {dispatch} = this.props
    dispatch(handleInitialData())
  }

  render (){

      if(this.props.loading === true){
          return <h3>loading</h3>
      }

      return (
          <div>
              <ConnectedTodos />
              <ConnectedGoals/>
          </div>
      )
  }
}

export default connect((state)=>({
  loading: state.loading
}))(App)
