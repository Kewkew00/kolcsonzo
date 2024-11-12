const express = require('express');
const db = require('./database');
const uuid = require('uuid');
const router = express.Router();

router.post('/newdata', (req, res)=>{
     let { date, stepcount } = req.body;

     if (!date || !stepcount) {
        req.session.msg = 'Missing data!';
        req.session.severity = 'danger';
        res.redirect('/newdata');
        return
    }

    db.query(`SELECT * FROM rentals WHERE user_id=? AND date=?`, [req.session.userID, date], (err, results) => {
        if (err){
            req.session.msg = 'Database error!';
            req.session.severity = 'danger';
            res.redirect('/newdata');
            return
        }

        if (results.length > 0){
            // update
            db.query(`UPDATE rentals SET count = count + ? WHERE ID=?`, (err, results)=>{
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
            db.query(`INSERT INTO rentals VALUES(?,?,?,?)`, [uuid.v4(), req.session.userID, item_id, rental_date, return_date], (err, results)=>{
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