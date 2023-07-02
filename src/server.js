import express from 'express'

const app = express()

app.get('/message/:id/:user', (request, response) => {
  const { id, user } = request.params

  response.send(
    `<h1>Mensagem ID: ${id}.
     Para o usuário: ${user} </h1>`
  )
})

app.get('/users', (request, response) => {
  const { page, limit } = request.query

  response.send(`<h1>Página: ${page}. Mostrar: ${limit}</h1>`)
})

const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))
