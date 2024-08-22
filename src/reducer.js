const initialState = { 
  count: 0,
  name: 'Joe' 
}; // an object of all state values

export default function reducer(action, state = initialState) {

  switch (action.type) { // if action.type === ...

    case 'increment':
      // reassign value of "count", leave rest of state unchanged
      return { 
        ...state, 
        count: state.count + 1 
      };
      // the return value of the reducer is an entirely new state object
      // Redux will take this return and replace the old state object with it

    case 'decrement':
      return { 
        ...state, 
        count: state.count - 1 
      };

    case 'incrementByAmount':
      return { 
        ...state, 
        count: state.count + action.payload 
      };

    default:
      return state; // return the existing state unchanged
  }
}

// FROM A COMPONENT:
reducer({ 
  type: 'incrementByAmount', 
  payload: 5 
}) // { type: 'increment' } --> action object