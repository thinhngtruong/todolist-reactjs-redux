import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from './../actions/index'

class TaskItem extends Component {
    onDelete = () => {
        this.props.onDeleteTask(this.props.task.id);
    }

    onEditTask = () => {
        this.props.onOpenForm();
        this.props.onEditTask(this.props.task);
    }

    render() {
        var { task, index } = this.props;
        return (
            <tr>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{task.name}</td>
                <td className="text-center">
                    <span className={task.status === true ? 'label label-success' : 'label label-danger'}>
                        {task.status === true ? 'Kích hoạt' : 'Ẩn'}
                    </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={this.onEditTask}>
                        <span className="fa fa-pencil mr-5" />Sửa
                        </button>
                    <button type="button" className="btn btn-danger ml-15" onClick={this.onDelete}>
                        <span className="fa fa-trash mr-5" />Xóa
                        </button>
                </td>
            </tr>

        );
    }
}

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch, props) => {
    return{
        onDeleteTask: (id) => {
            dispatch(actions.deleteTask(id))
            dispatch(actions.closeForm())
        },
        onToggleForm: () => {
            dispatch(actions.toggleForm());
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        },
        onEditTask: (task) => {
            dispatch(actions.editTask(task));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);