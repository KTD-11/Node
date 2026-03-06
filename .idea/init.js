import sqlite3 from 'sqlite3';

const sql3 = sqlite3.verbose();

const db = new sql3.Database('./main.db', (err) => {
    if (err) return console.error(err.message);
    console.log("Connected to SQLite");
});

db.run(`CREATE TABLE IF NOT EXISTS members(
    members_id INTEGER PRIMARY KEY,
    members_name TEXT NOT NULL,
    members_code INTEGER NOT NULL
    )`, [], (err)=>{
    if (err)
        return console.error(err.message);

    console.log("TABLE created");
});

export { db };
