DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS password_reset_codes;
DROP TABLE IF EXISTS friendships;

 CREATE TABLE users(
     id SERIAL PRIMARY KEY,
     first VARCHAR(255) NOT NULL CHECK (first != ''),
     last VARCHAR(255) NOT NULL CHECK (last != ''),
     email VARCHAR(255) NOT NULL UNIQUE CHECK (email != ''),
     password VARCHAR(255) NOT NULL,
     img_url VARCHAR,
     bio TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

 CREATE TABLE password_reset_codes(
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL CHECK (email != ''),
      code VARCHAR(255) NOT NULL CHECK (code != ''),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE friendships(
        id SERIAL PRIMARY KEY,
        sender_id INT REFERENCES users(id) NOT NULL,
        recipient_id INT REFERENCES users(id) NOT NULL,
        accepted BOOLEAN DEFAULT false
  );


 ALTER TABLE users ADD COLUMN bio VARCHAR;


  CREATE TABLE chat_messages (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL REFERENCES users(id) ,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
