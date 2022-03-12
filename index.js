const express = require('express')
const uuid = require('uuid')
const app = express()
const port = 3000
const users =[]

const checkUser = ( request , response , next ) => {
    const { id } = request.params 
    const index = users.findIndex( user => user.id === id)

    if( index < 0 ){
        return response.status(404).json( { error : "User not found" } )
    }

    request.index = index
    request.id = id

    next()
}

app.use(express.json())

app.get('/users' , ( request , response ) => {
    return response.json(users)
})

app.post('/users' , ( request , response) => {
    const { name , age } = request.body
    const user = {id:uuid.v4() ,name , age }

    users.push(user)

    return response.json(user)
})

app.put('/users/:id' , checkUser , ( request , response) => {
    const { name , age } = request.body
    const index = request.index
    const id = request.id

    const updateUser = { id , name , age }

    users[index] = updateUser
    return response.json(updateUser)
})

app.delete('/users/:id' , checkUser , ( request , response ) => {
    const index = request.index
    users.splice(index , 1)

    return response.status(204).json()
})

app.listen( port , () => {
    console.log(`Server started on port ${port}`)
})