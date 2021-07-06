const express = require('express');
const controller = require('../controller/KeyValuePairController');
const router = express.Router();

router.get('', controller.findAll);
router.get('/:key', controller.findById);
router.delete('/:key', controller.deleteById);
router.post('', controller.save);

module.exports = router;