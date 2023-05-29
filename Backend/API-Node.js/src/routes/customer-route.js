const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');
const authService = require('../services/auth-service');
const path = require("path");
const app = express();

// app.engine('html', require('ejs').renderFile);
// app.set('view engine','html');
// app.set('login', path.join(__dirname, 'pages/login'));

router.get('/', controller.get);

router.get('/:id', controller.getById);

router.post('/', controller.post);

router.patch('/:id', controller.putAll);

router.patch('/password/:id', controller.putPassword);

router.delete('/', controller.delete);


router.post('/authenticate', controller.authenticate);

router.post('/refresh-token', authService.authorize, controller.refreshToken);

router.get('/login', controller.login);

module.exports = router;