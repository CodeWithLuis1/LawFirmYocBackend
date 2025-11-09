import server from './server.js'
import colors from 'colors'

const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(colors.bgCyan.bold(`🚀 REST API corriendo en el puerto ${port}`))
})
