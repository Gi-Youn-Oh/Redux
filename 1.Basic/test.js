const initialState = {
    user: null,
    posts: [],
}
const nextState = {
    ...initialState,
    posts: ['test']
}
console.log(nextState)

const next2State = {
    ...initialState,
    posts: [...initialState.posts, 'again'] //intialState가 아니라 nextState가 아닌가요??  
}
console.log(next2State)
