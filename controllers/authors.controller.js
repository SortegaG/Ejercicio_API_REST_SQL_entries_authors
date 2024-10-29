const author = require('../models/authors.model'); // Importar el modelo de la BBDD

//getEntries
// if(hay email)
//     busca por mail
// else
//     busca todo


// GET http://localhost:3000/authors --> ALL

const getAuthors = async (req, res) => {
    let authors = await author.getAllAuthors(req.query);
    res.status(200).json(authors); // [] con las entries encontradas
}

const getAuthorByEmail = async (req, res) => {
    const { email } = req.query;
    try {
        const authorData = await author.getAuthorByEmail(email);
        if (authorData) {
            res.status(200).json(authorData);
        } else {
            res.status(404).json({ error: 'Autor no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener autor por email:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}


const createAuthor = async (req, res) => {
    const newEntry = req.body; // {name, surname, email, image}
    const response = await author.createAuthor(newEntry);
    res.status(201).json({
        "items_created": response,
        data: newEntry
    });
}

//createAuthor
// POST http://localhost:3000/api/entries
// let newEntry = {
//     "name": "Alejandru",
//     "surname": "Regex",
//     "email": "alejandru@thebridgeschool.es",
//     "image": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
// }

 // UPDATE
const updateAuthor = async (req, res) => {
    const updatedAuthor = req.body; // {name, surname, email, image}
    const originalName = req.body.originalName; // nombre original a buscar
    try {
        const response = await author.updateAuthor(updatedAuthor, originalName);
        if (response) {
            res.status(200).json({
                message: 'Entry updated successfully',
                data: response
            });
        } else {
            res.status(404).json({ error: 'Entry not found' });
        }
    } catch (error) {
        console.error('Error updating entry:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// UPDATE --- Hay que escoger el campo nombre
// {
//     "name": "Alejandruki5",
//     "surname": "Regexki",
//     "email": "alejandruki5@thebridgeschool.es",
//     "image": "https://randomuser.me/api/portraits/thumb/men/78.jpg",
//     "originalName" : "Alejandruki4"
// }

 // DELETE

const deleteAuthor = async (req, res) => {
    const authorToDelete = req.body.name; // {name, surname, email, image}
    try {
        const response = await author.deleteAuthor(authorToDelete);
        if (response) {
            res.status(200).json({
                message: `Se ha borrado el autor ${authorToDelete} `,
                data: response
            });
        } else {
            res.status(404).json({ error: 'Entry no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar entry:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    getAuthorByEmail,
    getAuthors,
    createAuthor,
    deleteAuthor, //--> DELETE
    updateAuthor, //--> PUT
}