-- Users table
CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE
);

-- Posts table
CREATE TABLE IF NOT EXISTS Posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- InvestmentCompany Table
CREATE TABLE IF NOT EXISTS Investment_Company (
    Company_id REAL,
    Investor TEXT,
    SOE INTEGER,
    PRIMARY KEY(Company_id));

-- Project Table
CREATE TABLE IF NOT EXISTS Project (
    Project_id REAL,
    Country TEXT,
    Year_of_Commission DATE,
    Purpose TEXT,
    Geolocation TEXT,
    Sector TEXT,
    Region TEXT,
    PRIMARY KEY(Project_id));

-- Survey Table
CREATE TABLE IF NOT EXISTS Survey (
    id REAL,
    Respondent TEXT,
    Answer BOOL,
    Date DATE,
    PRIMARY KEY(id));

-- Invest_In Table
CREATE TABLE IF NOT EXISTS Invest_In (
    Company_id REAL,
    Project_id REAL,
    Amount INT,
    Date DATE,
    PRIMARY KEY(Project_id),
    FOREIGN KEY(Company_id) REFERENCES InvestmentCompany,
    FOREIGN KEY(Project_id) REFERENCES Project);

-- Is_About Table
CREATE TABLE IF NOT EXISTS Is_About (
    Project_id REAL,
    id INT,
    PRIMARY KEY(Project_id, id),
    FOREIGN KEY(Project_id) REFERENCES Project,
    FOREIGN KEY(id) REFERENCES Survey);

