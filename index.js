function createStore() {
    /*
    Store should have the following
    1. A State
    2. A way to get the state
    3. A way to listen to changes to the state
    4. A way to update the state
    */

    let state

    const getState = () => state

    return {
        getState
    }

}