const express = require('express');
const db = require('./database');
const uuid = require('uuid');
const router = express.Router();

router.post('/newdata', (req, res)=>{
     let { title, type } = req.body;

     if (!title || !type) {
        req.session.msg = 'Missing data!';
        req.session.severity = 'danger';
        res.redirect('/newdata');
        return
    }

    db.query(`INSERT INTO items (title, type, available) VALUES (?,?,?)`, [title, type, 1], (err, results)=>{
        if (err){
            console.log(err)
            req.session.msg = 'Database error!';
            req.session.severity = 'danger';
            res.redirect('/newdata');
            return
        }
        req.session.msg = 'Rentaldata inserted!';
        req.session.severity = 'success';
        res.redirect('/newdata');
        return
    });
});

module.exports = router;