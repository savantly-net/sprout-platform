import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: auth(),
  form: form({name: 'form'}),
  forms: forms({ name: 'forms', query: {type: 'form', tags: 'common'}}),
  submission: submission({name: 'submission'}),
  submissions: submissions({name: 'submissions'}),
  event: combineReducers({
    form: form({ name: 'event'}),
    submission: submission({name: 'event'}),
    submissions: submissions({name: 'event'}),
  })
})

export default rootReducer;