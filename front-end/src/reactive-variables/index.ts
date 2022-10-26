import { InMemoryCache, makeVar } from '@apollo/client/cache'

export const cache = new InMemoryCache()

/*
    Creating states to access throughout the App using useReactiveVar hook
    Pass the state you want to access in the hook
    const cartItems = useReactiveVar(appState.cartItemsVar)
    The above line will return the state that is [0] at the time of initialization
    To change the state you should just use appState.cartItemsVar([1])
    Above line will modify the cartItemsVar state and re render the component that is currently using it
*/

const initialStates = {
  cartItemsVar: [0]
}
const cartItemsVar = makeVar(initialStates.cartItemsVar)

export const appState = {
  cartItemsVar
}
