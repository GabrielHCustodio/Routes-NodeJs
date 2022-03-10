const express = require('express')
const app = express()
const port = 3000
const users =[]

app.use(express.json())

app.get('/users' , ( request , response ) => {
    return response.json(users)
})

app.post('/users' , ( request , response) => {
    const { name , age } = request.body
    const user = { name , age}

    users.push(user)

    return response.json(user)
})

app.listen( port , () => {
    console.log(`Server started on port ${port}`)
})