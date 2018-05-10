const router = require('express').Router();
const { Player, Game } = require('../db/models');
module.exports = router;


router.post('/', (req, res, next) => {
  console.log('here is what got passed in', req.body);
  Game.create(req.body)
    .then(game =>
      Player.findAll()
        .then(() => {
          return Player.update(
            { gameId: game.id },
            { where: { gameId: null }}
          );
        }))
    .then(game => res.status(201).send(game))
    .catch(next);
});

// router.delete('/:id', (req, res, next) => {
//   Player.destroy({
//     where: {
//       id: req.params.id
//     }
//   })
//     .then(res.sendStatus(204))
//     .catch(next);
// });
