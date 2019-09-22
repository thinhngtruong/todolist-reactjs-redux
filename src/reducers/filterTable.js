import * as types from '../constants/ActionTypes'

var initalState = {
    name: '',
    status: -1
};
var myReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.FILTER_TABLE:
            return{
                name: action.filter.name,
                status: parseInt(action.filter.status, 10)
            }
        default: return state;
    }
}

export default myReducer