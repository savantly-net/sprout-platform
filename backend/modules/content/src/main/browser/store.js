import { createStore, compose } from 'redux'
import rootReducer from './rootReducer'

const initialState = {}
const enhancers = []

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  ...enhancers
)

export default createStore(
  rootReducer,
  initialState,
  composedEnhancers
)