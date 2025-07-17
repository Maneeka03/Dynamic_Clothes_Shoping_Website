const express = require('express');
const { AddCloths, AllClothsDetails, 
    SearchClothByName, SearchClothByDetail, SearchClothByCategory, SearchClothByProductCategory, 
    FetchClothById, UpdateClothById, BuyProduct } = require('../Controller/clothController');

const router = express.Router();

router.post('/addCloth', AddCloths);
router.post('/updateClothById', UpdateClothById);
router.post('/buyProduct', BuyProduct);
router.get('/fetchClothById', FetchClothById);
router.get('/getCloth', AllClothsDetails);
router.get('/searchCloths', SearchClothByName);
router.get('/searchClothsByDetail', SearchClothByDetail);
router.get('/searchClothsByCategory', SearchClothByCategory);
router.get('/searchClothsByProductCategory', SearchClothByProductCategory);

module.exports = router;