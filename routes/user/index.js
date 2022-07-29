const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../../database.js')

const router = express.Router();

router.get('/', (req, res) => {

    const email = req.query.email;
    const password = req.query.password;

    const sql = 'select `email`, `password` from `user` where `email` = ?';

    db.query(sql, email, (error, results, fields) => {

        if (error) {
            res.status(500).json({message: error.message});
            return;
        }

        if (Object.keys(results).length === 0) {
            res.status(400).json({code: 1, message: `user with email '${email}' does not exist`});
        } else {
            const isCorrect = bcrypt.compareSync(password, results[0].password);
            if (!isCorrect) {
                res.status(400).json({code: 2, message: "wrong password, please try again"});
            } else {
                res.status(200).json({code: 0, message: "login successful"});
            }
        }
    });

});

router.post('/', (req, res) => {

    const email = req.body.email;
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const hash = bcrypt.hashSync(req.body.password, 10);

    const sql = 'insert into `user`(`email`, `password`, `first_name`, `last_name`) value (?, ?, ?, ?)';
    const values = [email, hash, firstName, lastName];

    db.query(sql, values, (error, results) => {

        if (error) {
            res.status(500).json({code: 1, message: error.message});
            return;
        }

        const user = {
            id: results.insertId,
            email: email,
            first_name: firstName,
            last_name: lastName
        };

        res.status(201).json({code: 0, message: `user with email '${user.email}' created successfully`});
    });

});

module.exports = router;