var express = require('express');
var FacebookStrategy = require('passport-facebook');
//var db = require('../../db');
const mysql = require('mysql');

module.exports = function (passport) {
    const db = mysql.createConnection({
        host: 'your_host',
        user: 'your_user',
        password: 'your_db_password',
        database: 'social_media_auth'
      });
      
      db.connect();

    passport.use(new FacebookStrategy({
        clientID: process.env['FACEBOOK_CLIENT_ID'],
        clientSecret: process.env['FACEBOOK_CLIENT_SECRET'],
        callbackURL: '/oauth2/redirect/facebook',
        state: true
    }, function verify(accessToken, refreshToken, profile, cb) {
        console.log(profile);
        const sql1 = "SELECT * FROM federated_credentials WHERE user_id="+profile.id;
        const sql2 = 'INSERT INTO federated_credentials (user_id, name, provider) VALUES ("'+profile.id+'", "'+profile.displayName+'", "facebook")';
        
        db.query(sql1, function (err, row,fields) {
            if (err) { return cb(err); }
            if (row.length==0) {
                db.query(sql2, function (err, row,fields) {
                    if (err) { return cb(err); }
                    return cb(null, row);
                });
            } else {
                const sql3 = "SELECT * FROM federated_credentials WHERE user_id=" + row[0].user_id;
                db.query(sql3, function (err, row,fields) {
                    if (err) { return cb(err); }
                    if (!row) { return cb(null, false); }
                    //console.log(row);
                    return cb(null, row);
                });
            }
        });
    }));

    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
            console.log(user);
          cb(null, { id: user.id, username: user.username, name: user.name });
        });
      });
      
      passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
            console.log(user);
          return cb(null, user);
        });
      });
      db.end();  
}