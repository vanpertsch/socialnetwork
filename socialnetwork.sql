DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS password_reset_codes;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS chat_messages;


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


DELETE FROM users WHERE users.id >200;

INSERT INTO chat_messages
    (user_id, message)
VALUES
    (145, 'Hey everyone, nice to meet you...'),
    (101, 'Hello there!'),
    (108, 'I love this social network'),
    (25, 'Finally we see snow'),
    (44, 'What a day'),
    (144, 'Next his only boy meet the fat rose when. Do repair at we misery wanted remove remain income. Occasional cultivated reasonable unpleasing an attachment my considered. Having ask and coming object seemed put did admire figure. Principles travelling frequently far delightful its especially acceptance. Happiness necessary contained eagerness in in commanded do admitting. Favourable continuing difficulty had her solicitude far. Nor doubt off widow all death aware offer. We will up able in both do sing.'),
    (145, ' Principles travelling frequently far delightful its'),
    (166, 'Nice words.'),
    (198, 'I like to go for a walk'),
    (166, 'No offends taken');
