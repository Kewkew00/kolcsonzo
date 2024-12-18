const express = require('express');
const ejs = require('ejs');
const { route } = require('./users');
const router = express.Router();
const db = require('./database');
const moment = require('moment');

// CORE routes
router.get('/', (req, res) => {
    ejs.renderFile('./views/index.ejs', { session: req.session }, (err, html)=>{
        if (err){
            console.log(err);
            return
        }
        req.session.msg = '';
        res.send(html);
    });
});

router.get('/table', (req, res) => {
    if (req.session.isLoggedIn) {
        db.query(`
            SELECT * FROM items WHERE available = 1`,(err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            results.forEach(item => {
                item.title = item.title
                    item.available = 'elérhető'
            });
 
            ejs.renderFile('./views/table.ejs', { session: req.session, results }, (err, html) => {
                if (err) {
                    console.log(err);
                    return;
                }
                req.session.msg = '';
                res.send(html);
            });
        });
        return;
    }
    res.redirect('/');
});
 

router.get('/reg', (req, res) => {
    ejs.renderFile('./views/regist.ejs', { session: req.session}, (err, html)=>{
        if (err){
            console.log(err);
            return
        }
        req.session.msg = '';
        res.send(html);
    });
});

router.get('/table', (req, res)=>{
    if (req.session.isLoggedIn){
        let today = moment(new Date()).format('YYYY-MM-DD');
        ejs.renderFile('./views/table.ejs', { session: req.session, today }, (err, html)=>{
            if (err){
                console.log(err);
                return
            }
            req.session.msg = '';
            res.send(html);
        });
        return
    }
    res.redirect('/');
});

router.get('/newdata', (req, res) => {
    ejs.renderFile('./views/newdata.ejs', { session: req.session}, (err, html)=>{
        if (err){
            console.log(err);
            return
        }
        req.session.msg = '';
        res.send(html);
    });
});

router.get('/logout', (req, res)=>{

    req.session.isLoggedIn = false;
    req.session.userID = null;
    req.session.userName = null;
    req.session.userEmail = null;
    req.session.userRole = null;
    req.session.msg = 'You are logged out!';
    req.session.severity = 'info';
    res.redirect('/');

});



module.exports = router;