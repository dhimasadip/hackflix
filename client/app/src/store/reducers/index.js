import { combineReducers } from 'redux'
import movieReducer from './movieReducer'
import tvReducer from './tvReducer'

const reducers = combineReducers({
    movieReducer, tvReducer
})

export default reducers