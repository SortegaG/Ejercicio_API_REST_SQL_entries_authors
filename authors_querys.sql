-- Query para ver todos los autores

SELECT *
FROM authors;

--updateAuthorByName: 

UPDATE authors
SET name = $1, surname = $2, email = $3, image = $4
WHERE name = $5
RETURNING *;

--  deleteAuthorByName: 

ALTER TABLE authors
ADD activo BOOLEAN DEFAULT true;


UPDATE authors
SET activo = false
WHERE name = $1;

