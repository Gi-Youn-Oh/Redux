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
    posts: [...nextState.posts, 'again'] 
}
console.log(next2State)
