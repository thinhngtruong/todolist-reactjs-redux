import * as types from './../constants/ActionTypes'
import uuidv4 from 'uuid/v4'

var data;
if (localStorage && localStorage.getItem('tasks')) {
    data = JSON.parse(localStorage.getItem('tasks'));
}
var initalState = data ? data : [];

var findIndex = (tasks, id) => {
    var value = -1;
    tasks.forEach((task, index) => {
        if (task.id === id) {
            value = index;
        }
    })
    return value;
}

var generateData = () => {
    var tasks = [
        {
            id: uuidv4(),
            name: 'Angular',
            status: true
        },
        {
            id: uuidv4(),
            name: 'Nodejs',
            status: false
        },
        {
            id: uuidv4(),
            name: 'Vue js',
            status: true
        },
    ]
    return tasks;
}

var myReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.GENERATE_DATA:
            state = generateData();
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:
            var newTask = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status === true ? true : false
            }
            if (!action.task.id) {
                newTask.id = uuidv4()
                state.push(newTask);
            }
            else {
                var index = findIndex(state, newTask.id);
                state[index] = newTask;
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.DELETE_TASK:
            var id = action.id;
            index = findIndex(state, id);
            if (index !== -1) {
                state.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(state));
            }
            return [...state];
        default: return state;
    }
}

export default myReducer