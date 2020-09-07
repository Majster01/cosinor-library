import { applyMiddleware, createStore, Store, Dispatch, Action } from 'redux'
import { combineReducers } from '@reduxjs/toolkit'
import { default as thunk, ThunkDispatch as ThunkDispatchStore } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { createBrowserHistory, History } from 'history'
import { StateType } from 'typesafe-actions'

import optionsSlice from './options_slice'
import toastSlice from './toast_slice'

type StoreType = Store & {
  dispatch: {}
}

export const rootReducer = combineReducers({
  options: optionsSlice,
  toast: toastSlice,
})

export const history: History = createBrowserHistory()

export const store = createStore(
  rootReducer,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  composeWithDevTools(applyMiddleware<Dispatch<any>>(...[
    thunk,
  ])),
)

export type RootState = StateType<typeof rootReducer>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ThunkDispatch = ThunkDispatchStore<RootState, any, Action>


