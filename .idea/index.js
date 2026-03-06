import sqlite3 from "sqlite3";
import express, {response} from "express";
import { db } from './init.js';

const app = express();
let sql;

app.use(express.json());

app.post('/add',  (req, res)=>{
    sql = `INSERT INTO members (members_name, members_code) VALUES (?, ?)`;

    db.run(sql, [req.body.name, req.body.code], function (err){
        if (err){
            return res.status(400).json({
                status: 400,
                message: err.message
            });
        }

        res.status(200).json({
            status: 200,
            message: `Added user with ID ${this.lastID}`
        });
    });
});

app.get('/me/:id', (req, res)=>{
    sql = `SELECT * FROM members WHERE members_code = ?`;

    db.get(sql, [req.params.id], (err, row)=>{
        if (err)
            return res.status(500).json({ error: err.message });
        if (!row)
            return res.status(404).json({ message: "No member found with that code" });

        res.status(200).json(row);
    });
});

app.listen(process.env.PORT || 2001, (err)=>{
    if (err) return console.error()

    console.log("running");
});
