import { database } from '../../database/index.js'
import { list, listById } from '../controllers/marcas.js'
export const routes = async(app) => {
    app.get('/', (req, res) => {
        res.status(200).send({ message: "API Ok."})
    })
    app.get('/marcas', list)
    app.get('/marcas/:id', listById)
}