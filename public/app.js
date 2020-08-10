$(document).ready(() => {
  $.getJSON("/api/todos").then(addTodos);
});

const addTodos = (todos) => {
  //add to page
  todos.forEach((todo) => {
    const newTodo = $("<li class='task'>" + todo.name + "</li>");
    $(".list").append(newTodo);
  });
};
