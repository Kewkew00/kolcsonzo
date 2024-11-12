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

    db.query(`SELECT * FROM items WHERE item_id=?`, [req.session.userID], (err, results) => {
        if (err){
            req.session.msg = 'Database error!';
            req.session.severity = 'danger';
            res.redirect('/newdata');
            return
        }

        if (results.length > 0){
            // update
            db.query(`UPDATE items SET title, type WHERE ID=?`, (err, results)=>{
                if (err){
                    req.session.msg = 'Database error!';
                    req.session.severity = 'danger';
                    res.redirect('/newdata');
                    return
                }
                req.session.msg = 'Rentaldata updated!';
                req.session.severity = 'success';
                res.redirect('/newdata');
                return
            });
        }else{
            // insert
            db.query(`INSERT INTO items VALUES(?,?,?,?)`, [item_id ,title, type, available], (err, results)=>{
                if (err){
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
        }
        return
    });
});

module.exports = router;