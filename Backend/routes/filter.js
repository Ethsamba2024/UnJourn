// Definição de módulos necessários
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// Definições para este arquivo
const router = express.Router();
const viewPath = path.join(__dirname, "../../frontend/views/feed/feed"); 
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const DBPATH = path.join(__dirname, "../data/ConstruMatch.db");

// Endpoint base o qual a página web pertence
router
    .route('/')
    .get((req, res) => {
		res.statusCode = 200 
		res.setHeader('Access-Control-Allow-Origin', '*');
        res.render("teste");
        
    })
 

module.exports = router; 