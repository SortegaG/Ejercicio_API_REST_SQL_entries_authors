const { Pool } = require('pg');
const authorsQueries = require('../queries/authors.queries') // Queries SQL

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: '5432',
    database: 'postgres',
    password: '123456'
});

// GET
const getAuthorByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(authorsQueries.getAuthorByEmail, [email])
        result = data.rows; //devuelve las rows que corresponden al criterio email, en este caso rowcount nos devuelve 1, ya que solo hay un autor con ese email.
        
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
// GET
const getAllAuthors = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(authorsQueries.getAuthors)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// CREATE
const createAuthor = async (author) => {
    const { name, surname, email, image } = author;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(authorsQueries.createAuthor, [name, surname, email, image])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}


//UPDATE
// Función para actualizar una entrada
const updateAuthor = async (updatedAuthor, originalname) => {
    const { name, surname, email, image } = updatedAuthor;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(authorsQueries.updateAuthorByName, [name, surname, email, image, originalname]);
        result = data.rowCount; // Devuelve la fila actualizada
    } catch (err) {
        console.log('Error updating entry:', err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

// DELETE
const deleteAuthor = async (authorToDelete) => {
    const author = authorToDelete;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(authorsQueries.deleteAuthorByName, [author]);
        result = data.rowCount; // Devuelve la fila actualizada
    } catch (err) {
        console.log('Error to delete entry:', err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const entries = {
    getAuthorByEmail,
    getAllAuthors,
    createAuthor,
    deleteAuthor,
    updateAuthor
}

module.exports = entries;


// Pruebas

    // getEntriesByEmail("guillermu@thebridgeschool.es")
    // .then(data=>console.log(data)) 



// getAllEntries()
// .then(data=>console.log(data))



// let newEntry = {
//     title: "Se acabaron las mandarinas de TB",
//     content: "Corren rumores de que papa noel tenía un saco vacio y lo llenó",
//     email: "guillermu@thebridgeschool.es",
//     category: "sucesos"
// }

// createEntry(newEntry)
//     .then(data => console.log(data)) 
