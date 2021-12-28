CREATE DATABASE bookings;

USE bookings;

CREATE TABLE IF NOT EXISTS buyer(
    userid INT AUTO_INCREMENT NOT NULL,
    username varchar(255),
    lastname varchar(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (userrid)
);


CREATE TABLE IF NOT EXISTS sellers(
    sellerid INT AUTO_INCREMENT NOT NULL,
    doctorname varchar(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phoneNumber INT NOT null,
    title varchar(255) NOT NULL,
    decs varchar(255) NOT NULL,
    passwordd varchar(255)NOT NUll,
    fees INT NOT NULL,
    locationn varchar(255) NOT NULL,
    PRIMARY KEY (sellerid)
);

CREATE TABLE IF NOT EXISTS Appointments(
   id INT AUTO_INCREMENT NOT NULL,
   dates DATETIME DEFAULT CURRENT_TIMESTAMP,
   statess INT default 0,
   buyerid INT,
   sellerrid INT,
   FOREIGN KEY (buyerid) REFERENCES buyer(userid),
   FOREIGN KEY (sellerrid) REFERENCES sellers(sellerid),
   PRIMARY KEY (id)
);
