$(document).ready(() => {
  //retrieve data from DB and display them on page
  $.getJSON('/api/todos')
    .then(listTodosOnPage)
    .catch((err) => console.error(err))

  // create a todo JSON obj and add it on page after enter is pressed
  $('#todoInput').keypress((event) => {
    if (event.which === 13 && $('#todoInput').val() !== '') {
      makeTodo()
    }
  })

  //delete todo from DB and remove from site after X was clicked
  $('.list').on('click', 'span', function (e) {
    e.stopPropagation()
    removeTodoLi($(this).parent())
  })

  //mark the todo as done after clicked
  $('.list').on('click', '.task', function () {
    markTodoLi($(this))
  })
})

const markTodoLi = (todo) => {
  const clickedUrl = `/api/todos/${todo.data('id')}`
  const isCompleted = !todo.data('completed')
  const updateData = { completed: isCompleted }
  $.ajax({
    method: 'PUT',
    url: clickedUrl,
    data: updateData,
  }).then((updatedTodo) => {
    todo.toggleClass('done')
    todo.data('completed', isCompleted)
  })
}

const removeTodoLi = (todo) => {
  const clickedId = todo.data('id')
  const deleteUrl = `/api/todos/${clickedId}`
  // destroy from DB
  $.ajax({
    method: 'DELETE',
    url: deleteUrl,
  })
    //remove from DOM
    .then((data) => todo.remove())
    .catch((err) => console.error(err))
}

const addTodoToPage = (todo) => {
  const newTodoLi = $(`<li class='task'>${todo.name}<span>X</span></li>`)
  //copy id from DB to the DOM object
  newTodoLi.data('id', todo._id)
  newTodoLi.data('completed', todo.completed)
  todo.completed ? newTodoLi.addClass('done') : null
  $('.list').append(newTodoLi)
}

const listTodosOnPage = (todos) => {
  //add to page
  todos.forEach((todo) => addTodoToPage(todo))
}

const makeTodo = () => {
  //get the string from the input
  const usrInput = $('#todoInput').val()
  //post the value to the DB
  $.post('/api/todos', { name: usrInput })
    .then((newTodoLi) => {
      //clear the input
      $('#todoInput').val('')
      addTodoToPage(newTodoLi)
    })
    .catch((err) => console.error(err))
}
