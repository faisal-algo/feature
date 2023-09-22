// This project didn't require complex state management (redux)
// Boiler Plate in form of diectory is defined here for future scaling.


import { applyMiddleware, createStore } from 'react-redux'

import reducers from './Reducers'

export const store = createStore(reducers, {}, applyMiddleware())