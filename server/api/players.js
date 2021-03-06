const router = require('express').Router();
const { Player, Game } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Player.findAll({
    include: [Game]
  })
    .then(players => res.json(players))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Player.create(req.body)
    .then(player => res.status(201).send(player))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Player.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(() => Player.findOne({
      where: {
        id: req.params.id
      }
    }))
    .then((player) => res.json(player))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Player.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(res.sendStatus(204))
    .catch(next);
});
