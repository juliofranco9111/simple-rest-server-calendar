/* 
    Rutas de usuarios:

    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, renewToken, loginUser } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { verifyToken } = require('../middlewares/verify-token');

const router = Router();

router.post('/',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validateFields,
], loginUser );

router.post('/new', [ 
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validateFields
 ] , createUser );

router.get('/renew', verifyToken ,renewToken );


module.exports = router;

