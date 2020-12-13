import { ADD_DATA, DELETE_DATA, UPDATE_DATA, SEARCH } from '../action';
import { priorityLevel } from '../helpers/contants'
const initialState = {
    jobList: [],
    filteredJobList: []
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_DATA:
            const newData = [...state.jobList, action.payload]
            .sort((a,b) => (priorityLevel[a.priority] > priorityLevel[b.priority]) ? 1 : ((priorityLevel[b.priority] > priorityLevel[a.priority]) ? -1 : 0));
            return {
                ...state,
                jobList: newData
            }
        case DELETE_DATA:
            return {
                ...state,
                jobList: state.jobList.filter((item) => 
                    item.id !== action.payload
                )
            }
        case UPDATE_DATA:
            const elementsIndex = state.jobList.findIndex(element => element.id == action.payload.id );
            let newArray = [...state.jobList];
            newArray[elementsIndex] = {...newArray[elementsIndex], priority: action.payload.value};
            newArray.sort((a,b) => (priorityLevel[a.priority] > priorityLevel[b.priority]) ? 1 : ((priorityLevel[b.priority] > priorityLevel[a.priority]) ? -1 : 0));
            return {
                ...state,
                jobList: newArray,
            };
        case SEARCH:
            return {
                ...state,
                filteredJobList: action.payload ? state.jobList.filter((item) => item.jobName.includes(action.payload)) : []
            }
        default:
            return state;
    }
};

export default rootReducer;