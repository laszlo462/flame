import { ActionTypes, Action } from '../actions';
import { App } from '../../interfaces/App';

export interface State {
  loading: boolean;
  apps: App[];
  errors: string | undefined;
}

const initialState: State = {
  loading: true,
  apps: [],
  errors: undefined
}

const getApps = (state: State, action: Action): State => {
  return {
    ...state,
    loading: true,
    errors: undefined
  }
}

const getAppsSuccess = (state: State, action: Action): State => {
  return {
    ...state,
    loading: false,
    apps: action.payload
  }
}

const getAppsError = (state: State, action: Action): State => {
  return {
    ...state,
    loading: false,
    errors: action.payload
  }
}

const pinApp = (state: State, action: Action): State => {
  const tmpApps = [...state.apps];
  const changedApp = tmpApps.find((app: App) => app.id === action.payload.id);
  
  if (changedApp) {
    changedApp.isPinned = action.payload.isPinned;
  }
  
  return {
    ...state,
    apps: tmpApps
  }
}

const addAppSuccess = (state: State, action: Action): State => {
  const tmpApps = [...state.apps, action.payload];

  return {
    ...state,
    apps: tmpApps
  }
}

const deleteApp = (state: State, action: Action): State => {
  const tmpApps = [...state.apps].filter((app: App) => app.id !== action.payload);

  return {
    ...state,
    apps: tmpApps
  }
}

const updateApp = (state: State, action: Action): State => {
  const tmpApps = [...state.apps];
  const appInUpdate = tmpApps.find((app: App) => app.id === action.payload.id);

  if (appInUpdate) {
    appInUpdate.name = action.payload.name;
    appInUpdate.url = action.payload.url;
    appInUpdate.icon = action.payload.icon;
  }

  return {
    ...state,
    apps: tmpApps
  }
}

const appReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.getApps: return getApps(state, action);
    case ActionTypes.getAppsSuccess: return getAppsSuccess(state, action);
    case ActionTypes.getAppsError: return getAppsError(state, action);
    case ActionTypes.pinApp: return pinApp(state, action);
    case ActionTypes.addAppSuccess: return addAppSuccess(state, action);
    case ActionTypes.deleteApp: return deleteApp(state, action);
    case ActionTypes.updateApp: return updateApp(state, action);
    default: return state;
  }
}

export default appReducer;