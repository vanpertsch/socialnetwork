DROP TABLE IF EXISTS users;

 CREATE TABLE users(
     id SERIAL PRIMARY KEY,
     first VARCHAR(255) NOT NULL CHECK (first != ''),
     last VARCHAR(255) NOT NULL CHECK (last != ''),
     email VARCHAR(255) NOT NULL UNIQUE CHECK (email != ''),
     password VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );
  CREATE TABLE password_reset_codes(
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE CHECK (email != ''),
      code VARCHAR(255) NOT NULL CHECK (code != ''),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
