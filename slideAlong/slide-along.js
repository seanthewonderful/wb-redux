/////  REDUX  /////


//  WHAT IS REDUX?
// It's our state manager! 

// - High level overview? 
// - Component sends a dispatch to our redux store - redux store accepts information and saves variable updates - any other component can subscribe to the redux store to grab that variable. 


/// REDUX DATAFLOW ///

//  REDUX DATAFLOW (1)


//  REDUX DATAFLOW (2)


//  ACTIONS 
// An object with at least one property/key, "type"
// Optional value, 'payload'. Perhaps your state value is not complex to update, such as a counter that can increment or decrement by one.
// If so, it can be enough to alert your state store of what 'type' of action you are taking (increment/decrement), and your state store will know how to manage the state from there. 
// If your state value is more complex, like a string value that a user can type in, then you'll need an additional property, 'payload', to alert the store that you want to change the state AND here's the new value. 
// This will make more sense in the next couple slides


//  REDUCERS (1)
// Redux comes from reduce - it reduces all of our state values into one big object
// Last bullet - because of this, the reducer function will utilize a lot of spread operators
// Q: Have we studied switch statements in JS?
// DEMO: replit
const internationalGreeter = (country, name) => {

    switch (country) {
        case 'USA':
            return `Howdy, ${name}`
        case 'Britain':
            return `Hello ${name}, old chap`
        case 'Mexico':
            return `Que pasa ${name}zito`
        case 'Ireland':
            return `Top o' the mornin' ${name}`
    }
}
console.log(internationalGreeter('USA', 'Joe'))
console.log(internationalGreeter('Britain', 'Joe'))
console.log(internationalGreeter('Mexico', 'Joe'))
console.log(internationalGreeter('Ireland', 'Joe'))


//  REDUCERS (2)
// DEMO: reducer.js
const initialState = { count: 0 }; 
// replacing our `const [count, setCount] = useState(0)`

export default function reducer(state = initialState, action) {
// set up reducer function with our action and state
// Q: What does `state = initialState` mean? --> Default argument value. "if no state is passed in, it defaults to initialState"
// This is most common - our components probably don't know what the current value of all state values and doesn't need to specify this
  switch (action.type) {

    case 'increment':
      // reassign value of "count", leave rest of state unchanged
      return { ...state, count: state.count + 1 };

    case 'decrement':
      return { ...state, count: state.count - 1 };

    case 'incrementByAmount':
      return { ...state, count: state.count + action.payload };

    default:
      return state; // return the existing state unchanged
  }
}


//  STORE 
// Before we can actually make state changes, we need to configure our Store
// DEMO: store.js


//  REACT REDUX


//  ADDING THE STORE AND REDUCER
// DEMO: main.jsx



///  SUBSCRIBING A COMPONENT

//  SUBSCRIBING A COMPONENT (1)
// useSelector() -> kind of like a Costco membership. Gives your component access to any state value inside the Store
// set up with a callback function, which can take in one parameter, 'state'
const count = useSelector((state) => state.count)
// useSelector() knows that it's retrieving state. It looks inside your store and here returns the value of the property 'count'


//  SUBSCRIBING A COMPONENT (2)
// let's look at how this works based on the example code we've seen:
<button onClick={() => dispatch({'type': 'decrement'})}>Decrement</button>
// when we call useDispatch(), we are passing in those arguments set in the reducer function, 'action', and 'payload'(optional) which can specify the new state value



//  ACTION CREATORS
// This is the same thing we just saw, except instead of writing the function in-line, which can get cluttered, we can pre-define the function and simply pass in its name


///  ASYNC OPERATIONS

//  ASYNC OPERATIONS WITH REDUX
// This may be misleading, because we can totally update redux with async functionality. But the useSelector()/useDispatch() function itself cannot be async
// So we simply need to wrap it inside of an outer, async function.


//  ASYNC THUNKS












// git clone https://github.com/suthyscott/redux-fav-color.git
// package.json - add to dependencies: "@reduxjs/toolkit": "^1.9.7",
// npm i
// npm run start
// this complex application will eventually allow us to change our favorite color AND display it!

// mkdir src/redux
// touch src/redux/store.js:
import { configureStore } from "@reduxjs/toolkit"

export default configureStore({
  reducer: reducer
})

// touch src/redux/reducer.js

// 1st to do, set our initial state
let initialState = { 
    favColor: ''
}

const reducer = (state = initialState, action) => { // remember reducer functions take in 2 arguments: action and state
    // useDispatch() will trigger this reducer
    // reducer determines what state it is currently working with, 
    // then evaluates the action object provided by useDispatch() to know how to change state

    switch (action.type) { // if (action.type === )

        case 'SET_COLOR': // useDispatch({ type: 'SET_COLOR' })
            console.log('hit set color. color = ', action.payload)
            return

        case 'CLEAR_COLOR': 
            console.log('hit clear color')
            return

        default:
            console.log('hit default')
            return

    }
}


// index.js (this demo is older, we typically use 'main.jsx'):
import store from './redux/store.js'
import { Provider } from "react-redux"
// Provider is the high level component that allows our components access to our store. 
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)


// Temp-check?

// Now that we have our store, how can I subscribe my components to be able to use this store? Let's go

// Landing.jsx
import { useDispatch } from "react-redux"

// evaluate component a bit
const Landing = () => {
    const [color, setColor] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const submitHandler = e => {
      e.preventDefault()

      dispatch({ // Q: The argument for useDispatch is an object called the 'action'. What is the one required property I need to provide in my action object? --> type
        type: 'SET_COLOR',
        // the second, optional property is 'payload'
        payload: color // --> we are sending back our locally saved state value to update the Redux state value
      })

      navigate('/home')
    }

    return (
        <form onSubmit={e => submitHandler(e)}>
          <h2>Welcome to the favorite color setter! There's a lot of complex functionality in the app, so read carefully: <br/>Enter your favorite color in the input below and watch the magic!</h2>
            <input
                placeholder="Enter your favorite color"
                onChange={e => setColor(e.target.value)}
            />
        </form>
    )
}

// Split screen to show how this is getting sent and read -> useDispatch() triggers reducer(). reducer() knows its default state value, so the only argument it evaluates is what useDispatch() sends, which is an object with 2 properties: 'type' and 'payload'. 
// Currently, our reducer() is evaluating action.type's value. Currently, this should just console.log('hit set color')
// Demo this and see that ALL console.logs were hit! This is because our switch statements need to have returns for each condition. 
// Demo again. 
// Questions? 

// Adjust reducer():
const reducer = (action, state = initialState) => { 

    switch (action.type) { 

        case 'SET_COLOR': 
            console.log('hit set color')

            //
            let newState = {
                favColor: action.payload
            }
            return newState
            //

        case 'CLEAR_COLOR': 
            console.log('hit clear color')

        default:
            console.log('hit default')

    }
}

// To test this out, let's try to get a different component to grab this state from our store
// Home.jsx
// Q: Our Landing component used 'useDispatch()' hook to update state. What is the other hook components need to use to grab state?
import { useSelector } from "react-redux"

const Home = () => {

    const favColor = useSelector(state => state.favColor)
    // useSelector looks at your state store ('state' parameter of callback), and grabs the store's value for the property 'favColor'
    const navigate = useNavigate()
  
    const handleChangeColor = () => {
      navigate('/')
    }
    return (
      <main>
        <h2>Your favorite color is below:</h2>
        <p>{favColor}</p>
        <button onClick={handleChangeColor}>Change Color</button>
      </main>
    )
  }

// complete reducer to handle 'CLEAR_COLOR'
case 'CLEAR_COLOR':
    console.log('hit clear color')
    let clearState = {
        favColor: ''
    }
    return clearState

// Home.jsx:
const handleChangeColor = () => {
    
    dispatch({
        type: 'CLEAR_COLOR'
    })

    navigate('/')
}


// Demo sessionCheck ? 
