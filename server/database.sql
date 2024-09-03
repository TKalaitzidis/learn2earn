CREATE DATABASE learn2earn;

CREATE TABLE userbase (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_pass VARCHAR(255) NOT NULL,
    user_area VARCHAR(255) NOT NULL,
    user_ph_points INT DEFAULT 3 CHECK (user_ph_points >= 0),
    user_pdf_points INT DEFAULT 3 CHECK (user_pdf_points >= 0),
    user_points INT DEFAULT 6 CHECK (user_points >= 0),
    isAdmin BOOLEAN DEFAULT FALSE,
    banDays INT DEFAULT 0 CHECK (banDays >= 0)
);


CREATE TABLE booksentry(
    entry_id SERIAL PRIMARY KEY,
    b_id INT,
    u_id INT,
    FOREIGN KEY (b_id)
        REFERENCES books (book_id),
    FOREIGN KEY (u_id)
        REFERENCES userbase (user_id)
);

ALTER TABLE booksentry
DROP CONSTRAINT booksentry_u_id_fkey;

ALTER TABLE booksentry
ADD CONSTRAINT booksentry_u_id_fkey
FOREIGN KEY (u_id) REFERENCES userbase(user_id)
ON DELETE CASCADE;

CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    book_name VARCHAR(255) NOT NULL,
    book_author VARCHAR(255) NOT NULL,
    book_genre VARCHAR(255) NOT NULL,
    book_ph_points INT DEFAULT 1,
    book_pdf_points INT DEFAULT 1,
    book_points INT DEFAULT 1,
    book_type VARCHAR(50) CHECK (book_type IN ('Physical', 'PDF'))
);

CREATE OR REPLACE FUNCTION update_user_points()
RETURNS TRIGGER AS $$
BEGIN
    NEW.user_points := NEW.user_ph_points + NEW.user_pdf_points;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_points_trigger
BEFORE INSERT OR UPDATE ON userbase
FOR EACH ROW
EXECUTE FUNCTION update_user_points();


INSERT INTO books (book_name, book_author, book_genre, book_type) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', 'PDF'),
('To Kill a Mockingbird', 'Harper Lee', 'Fiction', 'Physical'),
('1984', 'George Orwell', 'Dystopian', 'PDF'),
('The Catcher in the Rye', 'J.D. Salinger', 'Fiction', 'PDF'),
('The Hobbit', 'J.R.R. Tolkien', 'Fantasy', 'Physical');

INSERT INTO booksentry (b_id, u_id) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 3),
(5, 4),
(1, 5),
(2, 3),
(3, 4),
(4, 5),
(5, 2);

SELECT
    books.book_name,
    books.book_author,
    books.book_genre,
    books.book_points,
    books.book_type
FROM
    booksentry
JOIN
    books ON booksentry.b_id = books.book_id;

SELECT userbase.user_name
FROM booksentry
JOIN userbase ON booksentry.u_id = userbase.user_id
JOIN books ON booksentry.b_id = books.book_id
WHERE books.book_name = 'The Great Gatsby';


SELECT * FROM booksentry JOIN userbase ON booksentry.u_id = userbase.user_id JOIN books ON booksentry.b_id = books.book_id WHERE userbase.user_name=$1;


INSERT INTO books (book_name, book_author, book_genre, book_type) VALUES ('The Old Man and the Sea', 'Ernest Hemingway', 'Adventure', "PDF");

SELECT entry_id FROM booksentry JOIN userbase ON booksentry.u_id = userbase.user_id JOIN books ON booksentry.b_id = books.book_id WHERE userbase.user_id=$1 AND book_name = $2;

