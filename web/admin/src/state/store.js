import { createStore } from 'redux'
import rootReducer from './reducers'

// TODO: Should we get all the plugin values from the server here?
function getStateFromServer(){
    return {};
}

const store = createStore(rootReducer, getStateFromServer());

export default store;