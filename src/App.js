import React, { Component } from 'react';
import TaskForm from './Component/TaskForm';
import Control from './Component/Control';
import TaskList from './Component/TaskList';
import './App.css'
import { connect } from 'react-redux'
import * as actions from './actions/index'

class App extends Component {

  UNSAFE_componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      });
    }
  }

  onToggleForm = () => {
    if(this.props.itemEditing && this.props.itemEditing.id !== ''){
      this.props.onOpenForm();
    }
    else{
      this.props.onToggleForm();
    }
    this.props.onClearTask({
      id: '',
      name: '', 
      status: false
    });
  }

  handleGenerateData = () => {
    this.props.onGenerateData();
  }

  render() {
    var { isDisplayForm } = this.props;

    return (
      <div>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Todo List Management</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossOrigin="anonymous" />
        <div className="container">
          <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr />
          </div>
          <div className="row">
            <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
              {isDisplayForm ? <TaskForm /> : ''}
            </div>
            <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-8 col-md-8 col-lg-8'}>
              <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
                <span className="fa fa-plus" />Thêm Công Việc
              </button>
              <button type="button" className="btn btn-warning ml-15" onClick={this.handleGenerateData}>
                <span className="fa fa-plus" />Tạo Lại Data
              </button>
              <div className="row mt-15">
                <Control/>
              </div>
              <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <TaskList/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isDisplayForm: state.isDisplayForm,
    itemEditing: state.itemEditing
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm());
    },
    onGenerateData: () => {
      dispatch(actions.generateData());
    },
    onClearTask: (task) => {
      dispatch(actions.editTask(task));
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
