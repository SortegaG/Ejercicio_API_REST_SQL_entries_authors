const authorsQueries = {
    getAuthorByEmail: `
    SELECT name,surname,image,email
    FROM authors
    WHERE email=$1;`,
    createAuthor: `INSERT INTO authors(name, surname, email, image) 
    VALUES ($1,$2,$3,$4)`,
    updateAuthorByName: `
    UPDATE authors
    SET name = $1, surname = $2, email = $3, image = $4
    WHERE name = $5
    RETURNING *;`,
    deleteAuthorByName: `
    UPDATE authors
    SET activo = false
    WHERE name = $1;
    `,
    getAuthors: `
    SELECT *
    FROM authors;
    `
}
module.exports = authorsQueries;