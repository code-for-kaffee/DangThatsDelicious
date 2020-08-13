const express = require('express');
const router = express.Router();
const {getStores, getStoreBySlug, getStoresByTag, resize, createStore, updateStore, addStore, editStore, searchStores, upload, mapStores, mapGet, heartStore, getHearts, getTopStores} = require('../controllers/storeController');
const { catchErrors } = require('../handlers/errorHandlers');
const {loginForm, userRegister, validateRegister, register, account, updateAccount} = require('../controllers/userController');
const {login, logout, isLoggedIn, forgot, reset, confirmedPassword, update} = require('../controllers/authController');
const {addReview} = require('../controllers/reviewController');
router.get('/', catchErrors(getStores));

router.get('/add', isLoggedIn, addStore);
router.post('/add',  upload, catchErrors(resize), catchErrors(createStore));
router.post('/add/:id', upload, catchErrors(resize), catchErrors(updateStore));

router.get('/stores', catchErrors(getStores));
router.get('/stores/page/:page', catchErrors(getStores));

router.get('/stores/:id/edit', catchErrors(editStore));
router.get('/store/:slug', catchErrors(getStoreBySlug));

router.get('/tags', catchErrors(getStoresByTag));
router.get('/tags/:tag', catchErrors(getStoresByTag));

router.post('/register', validateRegister, register, login);
router.get('/login', loginForm );
router.post('/login', login);
router.get('/register', userRegister);
router.get('/logout', logout); 

router.get('/account', isLoggedIn, account);
router.post('/account', catchErrors(updateAccount));
router.post('/account/forgot',  catchErrors(forgot));
router.get('/account/reset/:token', catchErrors(reset));
router.post('/account/reset/:token', confirmedPassword, catchErrors(update));

router.get('/map', catchErrors(mapGet));
router.get('/hearts', isLoggedIn, catchErrors(getHearts));
router.post('/reviews/:id', isLoggedIn, catchErrors(addReview));
router.get('/top', catchErrors(getTopStores));

router.get('/api/search', catchErrors(searchStores));
router.get('/api/stores/near', catchErrors(mapStores))
router.post('/api/stores/:id/heart', catchErrors(heartStore))
module.exports = router;
