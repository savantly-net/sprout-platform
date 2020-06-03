import { ADD_NAVIGATION_ITEM, ADD_ROUTE, ADD_PLUGIN, ADD_SIDEBAR_ITEM, ADD_SCRIPT} from "./actions";
import { combineReducers } from 'redux'

function routes(state = [], action) {
    switch (action.type) {
      case ADD_ROUTE:
        return [
            ...state,
            action.payload
        ]
        default:
            return state
    }
}

function plugins(state = [], action) {
    switch (action.type) {
        case ADD_PLUGIN:
        return [
            ...state,
            action.payload
        ]
        default:
            return state
    }
}

function navigationItems(state = [], action) {
    switch (action.type) {
        case ADD_NAVIGATION_ITEM:
        return [
            ...state,
            action.payload
        ]
        default:
            return state
    }
}

function sidebarItems(state = [], action) {
    switch (action.type) {
        case ADD_SIDEBAR_ITEM:
        return [
            ...state,
            action.payload
        ]
        default:
            return state
    }
}

function scripts(state = [], action) {
    switch (action.type) {
        case ADD_SCRIPT:
        return [
            ...state,
            action.payload
        ]
        default:
            return state
    }
}

const rootReducer = combineReducers({
  routes,
  plugins,
  navigationItems,
  sidebarItems,
  scripts
})

export default rootReducer