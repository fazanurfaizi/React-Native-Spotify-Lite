import { createSlice } from '@reduxjs/toolkit'
import { ofType } from 'redux-observable'
import { from, Observable } from 'rxjs'
import { map, switchMap, withLatestFrom } from 'rxjs/operators'
import { Action, RootStoreType } from '@/redux/rootReducer'

type GlobalReducerType = {
    actionQueue: Action<any>[]
}

const initialState: GlobalReducerType = {
    actionQueue: []
}

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        pushActionToRestart: (state, action) => ({
            ...state,
            actionQueue: [...state.actionQueue, action.payload]
        }),
        clearActionToRestart: state => ({
            ...state,
            actionQueue: initialState.actionQueue
        }),
        hydrate: state => state
    }
})

/**
 * After restarting actions in queue, this epic will clear the actions to restart
 */
const restartActionEpic = (
    actions$: Observable<Action<null>>,
    state$: Observable<RootStoreType>
) => 
    actions$.pipe(
        ofType(hydrate.type),
        withLatestFrom(state$),
        switchMap(([, state]) => 
            from([...state.globalReducer.actionQueue, clearActionToRestart()]),
        ),
        map(action => action)
    )

export const globalEpics = [restartActionEpic]

export const {
    clearActionToRestart,
    pushActionToRestart,
    hydrate
} = globalSlice.actions

export default globalSlice.reducer