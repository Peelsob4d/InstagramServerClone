const { Router } = require('express');
const fs = require('fs');

const router = Router();
router.get('/:filename', async (req, res, next) => {
  const { filename } = req.params;
  fs.readFile(`uploads/${filename}`, (err, content) => {
    res.end(content);
  });
});

module.exports = router;
