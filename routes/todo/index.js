const express = require('express');
const db = require('../../database.js')

const router = express.Router();

router.get('/', (req, res) => {
    const email = req.query.email;
    const sql = `select id, todo, isDone
                 from todo
                 where email = ${email}
                 order by isDone, createdOn desc`;

    db.query(sql, (error, results) => {
        if (error) {
            res.status(500).json({message: error.message});
        }
        res.status(200).json(results);
    });
});

router.post('/', (req, res) => {
    const todo = req.body.todo;
    const email = req.body.email;

    const sql = `insert into todo (todo, email) value (?, ?)`;
    db.query(sql, [todo, email], (error, results) => {
        if (error) {
            res.status(500).json({message: error.message});
        }
        res.status(201).json({id: results.insertId});
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const sql = `delete
                 from todo
                 where id = ${id}`;
    db.query(sql, (error, results) => {
        if (error) {
            res.status(500).json({message: error.message});
        }
        res.status(200).json({message: "Todo deleted successfully."});
    });
});

router.patch('/', (req, res) => {
    const id = req.body.id;
    const isDone = req.body.done;
    const sql = `update todo
                 set isDone = ${isDone}
                 where id = ${id}`;
    db.query(sql, (error, results) => {
        if (error) {
            res.status(500).json({message: error.message});
        }
        res.status(200).json({message: "Todo updated successfully."});
    });
});

router.put('/', (req, res) => {
    const id = req.body.id;
    const todo = req.body.todo;
    const sql = `update todo
                 set todo = '${todo}'
                 where id = ${id}`;
    db.query(sql, (error, results) => {
        if (error) {
            res.status(500).json({message: error.message});
        }
        res.status(200).json({message: "Todo updated successfully."});
    });
});

module.exports = router;