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

-- Investment_Company Table
CREATE TABLE IF NOT EXISTS Investment_Company (
    Investor TEXT,
    SOE TEXT,
    PRIMARY KEY(Investor)
);

-- Project Table
CREATE TABLE IF NOT EXISTS Project (
    Month TEXT, 
    Year TEXT, 
    Sector TEXT, 
    Country TEXT, 
    Region TEXT, 
    Greenfield TEXT, 
    Project_id TEXT
    PRIMARY KEY(Project_id)
);

-- Invest_In Table
CREATE TABLE IF NOT EXISTS Invest_In (
    Project_id TEXT,
    Investor TEXT,
    Amount TEXT,
    PRIMARY KEY(Project_id),
    FOREIGN KEY(Investor) REFERENCES Investment_Company,
    FOREIGN KEY(Project_id) REFERENCES Project
);

-- Survey Table
CREATE TABLE IF NOT EXISTS Survey (
    Survey_id TEXT, 
    List_of_Answers TEXT[], 
    List_of_Questions TEXT[],
    Answer_Date Date, 
    PRIMARY KEY(Survey_id)
):

-- Is_About Table
CREATE TABLE IF NOT EXISTS Is_About (
    Project_id TEXT,
    Survey_id TEXT,
    Proximity INT,
    PRIMARY KEY(Project_id, survey_id),
    FOREIGN KEY(Project_id) REFERENCES Project,
    FOREIGN KEY(Survey_id) REFERENCES Survey
);

