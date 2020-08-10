const express = require("express"),
  router = express.Router(),
  db = require("../models"),
  helpers = require("../helpers/todos");

router
  .route("/")
  //retrieve all todos
  .get(helpers.getTodos)
  //post a todo
  .post(helpers.createTodo);

//retrieve one specific todo
router
  .route("/:todoId")
  .get(helpers.getOneTodo)
  //update a todo
  .put(helpers.updateTodo)
  //delete a todo
  .delete(helpers.deleteTodo);

module.exports = router;
