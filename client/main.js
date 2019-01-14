$(document).ready(function () {
  let url = 'http://localhost:3000/'

  hideAllForm = function () {
    $('#formAddTodo').hide()
    $('#formEditTodo').hide()
    $('#formAddTodoProject').hide()
    $('#formInviteMember').hide()
    $('#detailsTodo').empty()
    $('#title').val('')
    $('#description').val('')
    $('#due_date').val('')
    $('#titleTodoProject').text('')
    $('#descriptionTodoProject').text('')
    $('#due_dateTodoProject').text('')
  }

  //-----------------PERSONAL TODO--------------------------//
  getDetails = function (todoId) {
    hideAllForm()
    $('#detailsTodo').show()

    $.ajax({
      type: "GET",
      url: url + `todo/${todoId}`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(todo => {
        console.log(todo)
        $('#detailsTodo').empty()
        $('#detailsTodo').append(`
          <h3>Details</h3>
          <div class="card border-primary mb-3">
            <div class="card-body">
              <p>Title: ${todo.name}</p>
              <p>Description: ${todo.description}</p>
              <p>Due_date: ${todo.due_date}</p>
              <p>Status: ${todo.status}</p>
            </div>
          </div>
        `)
      })
      .fail(error => {
        console.log(error.responseJSON.message)
      })
  }

  getTodo = function () {
    hideAllForm()
    $('#project').hide()
    $('#formAddProject').hide()
    $('#individual').show()
    $.ajax({
      type: "GET",
      url: url + 'todo',
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(todos => {
        console.log(todos)
        $('#listTodo').empty()
        todos.forEach(e => {
          if (e.status === 'uncompleted') {
            $('#listTodo').append(`
            <div class="card border-primary mb-3">
              <div class="card-header">
                <button onclick="completedTodo('${e._id}')" class="btn btn-outline-success btn-sm mr-2"><i class="fas fa-check"></i></button>
                <a href="#" onclick="getDetails('${e._id}')">${e.name}</a>
                <div class="float-right">
                  <button onclick="showEditForm('${e._id}')" type="button" class="btn btn-outline-primary btn-sm"><i class="fas fa-edit"></i></button>
                  <button onclick="deleteTodo('${e._id}')" type="button" class="btn btn-outline-danger btn-sm"><i class="fas fa-times-circle"></i></button>
                </div>
              </div>
            </div>
          `)
          } else {
            $('#listTodo').append(`
            <div class="card border-primary mb-3 bg-dark">
              <div class="card-header">
                <button onclick="uncompletedTodo('${e._id}')" class="btn btn-outline-danger btn-sm mr-2"><i class="fas fa-check"></i></button>
                <a href="#" onclick="getDetails('${e._id}')">${e.name}</a>
                <div class="float-right">
                  <button onclick="showEditForm('${e._id}')" type="button" class="btn btn-outline-primary btn-sm"><i class="fas fa-edit"></i></button>
                  <button onclick="deleteTodo('${e._id}')" type="button" class="btn btn-outline-danger btn-sm"><i class="fas fa-times-circle"></i></button>
                </div>
              </div>
            </div>
          `)
          }

        });
      })
      .fail(error => {
        console.log(error.responseJSON.message)
      })
  }

  $('#btnAddTodo').on('click', function (e) {
    e.preventDefault()
    hideAllForm()
    $('#formAddTodo').show()
  })

  addTodo = function () {
    let newTodo = {
      name: $('#title').val(),
      description: $('#description').val(),
      due_date: $('#due_date').val()
    }
    console.log('todo personal')
    console.log(newTodo)
    $.ajax({
      type: "POST",
      url: url + `todo`,
      headers: {
        token: localStorage.getItem('token')
      },
      data: newTodo
    })
      .done(todo => {
        showSuccessMessage(todo.message)
        clearTodoMessage()
      })
      .fail(error => {
        console.log(error.responseJSON.message)
        showDangerMessage(error.responseJSON.message)
        clearTodoMessage()
      })
  }

  showEditForm = function (todoId) {
    hideAllForm()
    $('#formEditTodo').empty()
    $('#formEditTodo').show()
    console.log('EDIT todo personal', todoId)
    $.ajax({
      type: "GET",
      url: url + `todo/${todoId}`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(todo => {
        console.log(todo)
        $('#formEditTodo').append(`
          <h3>Edit Todo</h3>
          <form>
            <div class="form-group">
              <label for="titleEdit">Title</label>
              <input type="text" class="form-control" id="titleEdit" placeholder="Title" value="${todo.name}">
            </div>
            <div class="form-group">
              <label for="descriptionEdit">Description</label>
              <textarea class="form-control" id="descriptionEdit" rows="3">${todo.description}</textarea>
            </div>
            <div class="form-group">
              <label for="due_dateEdit">Due date</label>
              <input id="due_dateEdit" type="date" min="2019-01-01" value="${todo.due_date.slice(0, 10)}"><br><br>
            </div>
          </form>
          <button onclick="editTodo('${todoId}')" class="btn btn-primary btn-md">Submit</button>
        `)
      })
      .fail(error => {
        console.log(error.responseJSON.message)
      })
  }

  editTodo = function (todoId) {
    let editTodo = {
      name: $('#titleEdit').val(),
      description: $('#descriptionEdit').val(),
      due_date: $('#due_dateEdit').val()
    }
    $.ajax({
      type: "PUT",
      url: url + `todo/${todoId}`,
      headers: {
        token: localStorage.getItem('token')
      },
      data: editTodo
    })
      .done(todo => {
        console.log(todo.message)
        showSuccessMessage(todo.message)
        clearTodoMessage()
      })
      .fail(error => {
        console.log(error.responseJSON.message)
        showDangerMessage(error.responseJSON.message)
        clearTodoMessage()
      })
  }

  deleteTodo = function (todoId) {
    $.ajax({
      type: "DELETE",
      url: url + `todo/${todoId}`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(todo => {
        console.log(todo.message)
        showSuccessMessage(todo.message)
        clearTodoMessage()
      })
      .fail(error => {
        console.log(error.responseJSON.message)
        showDangerMessage(error.responseJSON.message)
        clearTodoMessage()
      })
  }

  completedTodo = function (todoId) {
    $.ajax({
      type: "PUT",
      url: url + `todo/${todoId}`,
      headers: {
        token: localStorage.getItem('token')
      },
      data: {
        status: 'completed'
      }
    })
      .done(todo => {
        console.log(todo.message)
        getTodo()
      })
      .fail(error => {
        console.log(error.responseJSON.message)
      })
  }

  uncompletedTodo = function (todoId) {
    $.ajax({
      type: "PUT",
      url: url + `todo/${todoId}`,
      headers: {
        token: localStorage.getItem('token')
      },
      data: {
        status: 'uncompleted'
      }
    })
      .done(todo => {
        console.log(todo.message)
        getTodo()
      })
      .fail(error => {
        console.log(error.responseJSON.message)
      })
  }


  //----------------------PROJECT----------------------------//

  $('#btnAddProject').on('click', function (e) {
    e.preventDefault()
    hideAllForm()
    $('#individual').hide()
    $('#project').hide()
    $('#formAddProject').show()
  })

  createProject = function () {
    let name = $('#projectName').val()
    console.log(name)
    $.ajax({
      type: "POST",
      url: url + 'projects',
      headers: {
        token: localStorage.getItem('token')
      },
      data: { name }
    })
      .done(project => {
        $('#projectName').val('')
        showSuccessMessage(project.message)
        setTimeout(() => {
          $('#messageAfterLogin').empty()
          getProject()
        }, 2000);
      })
      .fail(error => {
        console.log(error.responseJSON.message)
        showDangerMessage(error.responseJSON.message)
        setTimeout(() => {
          $('#messageAfterLogin').empty()
          getProject()
        }, 4000);
      })
  }

  getProject = function () {
    $.ajax({
      type: "GET",
      url: url + 'projects',
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(projects => {
        console.log(projects);
        $('#listProjects').empty()
        projects.forEach(e => {
          $('#listProjects').append(`
            <a href="#" onclick="getDetailsProject('${e._id}')">
              <i class="fas fa-file-alt"></i>
              ${e.name}
            </a>
          `)
        })
      })
      .fail(error => {
        console.log(error.responseJSON.message)
      })
  }

  getDetailsProject = function (projectId) {
    hideAllForm()
    $('#individual').hide()
    $('#formAddProject').hide()
    $('#project').show()
    $('#detailsTodo').show()
    $.ajax({
      type: "GET",
      url: url + `projects/${projectId}`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(project => {
        console.log(project)
        $('#listTodoProject').empty()
        $('#listTodoProject').append(`
          <button id="btnAddTodoProject" onclick="showFormAddTodoProject('${project._id}')" class="btn btn-primary btn-md btn-sm"><i class="fas fa-plus"></i> Add Todo</button>
          <button id="btnInvite" onclick="showFormInvite('${project._id}')" type="button" class="btn btn-primary btn-md btn-sm"><i class="fas fa-male"></i> Invite member</button>
          <br><br>
        `)
        project.todoId.forEach(e => {
          if (e.status === 'uncompleted') {
            $('#listTodoProject').append(`
            <div class="card border-primary mb-3">
              <div class="card-header">
                <button onclick="completedTodoProject('${project._id}','${e._id}')" class="btn btn-outline-success btn-sm mr-2"><i class="fas fa-check"></i></button>
                <a href="#" onclick="getDetails('${e._id}')">${e.name}</a>
                <div class="float-right">
                  <button type="button" onclick="showEditFormTodoProject('${project._id}','${e._id}')" class="btn btn-outline-primary btn-sm"><i class="fas fa-edit"></i></button>
                  <button type="button" onclick="deleteTodoProject('${project._id}','${e._id}')" class="btn btn-outline-danger btn-sm"><i class="fas fa-times-circle"></i></button>
                </div>
              </div>
            </div>
          `)
          } else {
            $('#listTodoProject').append(`
            <div class="card border-dark mb-3 bg-dark">
              <div class="card-header">
                <button onclick="uncompletedTodoProject('${project._id}','${e._id}')" class="btn btn-outline-danger btn-sm mr-2"><i class="fas fa-check"></i></button>
                <s><a href="#" onclick="getDetails('${e._id}')">${e.name}</a><s>
                <div class="float-right">
                  <button type="button" onclick="showEditFormTodoProject('${project._id}','${e._id}')" class="btn btn-outline-primary btn-sm"><i class="fas fa-edit"></i></button>
                  <button type="button" onclick="deleteTodoProject('${project._id}','${e._id}')" class="btn btn-outline-danger btn-sm"><i class="fas fa-times-circle"></i></button>
                </div>
              </div>
            </div>
          `)
          }

        })
        $('#members').empty()
        project.members.forEach(el => {
          $('#members').append(`
            <p>${el.name} - <span>email: ${el.email}</span></p>
          `)
        })
      })
      .fail(error => {
        console.log(error.responseJSON.message)
      })
  }

  showFormAddTodoProject = function (projectId) {
    hideAllForm()
    $('#formAddTodoProject').show()
    $('#formAddTodoProject').empty()
    $('#formAddTodoProject').append(`
      <h3>Add Todo to Project</h3>
      <form>
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" class="form-control" id="titleTodoProject" placeholder="Title">
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea class="form-control" id="descriptionTodoProject" rows="3"></textarea>
        </div>
        <input id="due_dateTodoProject" type="date" min="2019-01-01"><br><br>
      </form>
      <button type="button" onclick="addTodoProject('${projectId}')" class="btn btn-primary btn-md">Submit</button>
    `)
  }

  addTodoProject = function (projectId) {
    let newTodo = {
      name: $('#titleTodoProject').val(),
      description: $('#descriptionTodoProject').val(),
      due_date: $('#due_dateTodoProject').val()
    }
    console.log('add todo project', projectId)
    console.log(newTodo)
    $.ajax({
      type: "POST",
      url: url + `projects/${projectId}`,
      headers: {
        token: localStorage.getItem('token')
      },
      data: newTodo
    })
      .done(todo => {
        showSuccessMessage(todo.message)
        clearMessage(projectId)
      })
      .fail(error => {
        console.log(error.responseJSON.message)
        showDangerMessage(error.responseJSON.message)
        clearMessage(projectId)
      })
  }

  showFormInvite = function (projectId) {
    hideAllForm()
    $('#formInviteMember').show()
    $('#formInviteMember').empty()
    $('#formInviteMember').append(`
      <h3>Invite to Project</h3>
      <form>
        <div class="form-group">
          <input type="text" class="form-control" id="emailInvite" placeholder="Enter your friend's email">
        </div>
      </form>
      <button onclick="invite('${projectId}')" type="button" class="btn btn-primary btn-md">Invite</button>
    `)
  }

  invite = function (projectId) {
    let email = $('#emailInvite').val()
    console.log('invite to project', projectId)
    console.log(email)
    $.ajax({
      type: "POST",
      url: url + `projects/${projectId}/invite`,
      headers: {
        token: localStorage.getItem('token')
      },
      dataType: 'json',
      data: { email }
    })
      .done(todo => {
        console.log(todo)
        $('#emailInvite').val('')
        showSuccessMessage(todo.message)
        clearMessage(projectId)

      })
      .fail(error => {
        // console.log(error)
        console.log(error.responseJSON.message)
        showDangerMessage(error.responseJSON.message)
        clearMessage(projectId)
      })
  }

  showEditFormTodoProject = function (projectId, todoId) {
    hideAllForm()
    $('#formEditTodo').empty()
    $('#formEditTodo').show()
    console.log('EDIT todo project', todoId)
    $.ajax({
      type: "GET",
      url: url + `todo/${todoId}`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(todo => {
        console.log(todo)
        $('#formEditTodo').append(`
          <h3>Edit Todo Project</h3>
          <form>
            <div class="form-group">
              <label for="titleEditProject">Title</label>
              <input type="text" class="form-control" id="titleEditProject" placeholder="Title" value="${todo.name}">
            </div>
            <div class="form-group">
              <label for="descriptionEditProject">Description</label>
              <textarea class="form-control" id="descriptionEditProject" rows="3">${todo.description}</textarea>
            </div>
            <div class="form-group">
              <label for="due_dateEditProject">Due date</label>
              <input id="due_dateEditProject" type="date" min="2019-01-01" value="${todo.due_date.slice(0, 10)}"><br><br>
            </div>
          </form>
          <button onclick="editTodoProject('${projectId}','${todoId}')" class="btn btn-primary btn-md">Submit</button>
        `)
      })
      .fail(error => {
        console.log(error.responseJSON.message)
      })
  }

  editTodoProject = function (projectId, todoId) {
    let editTodo = {
      name: $('#titleEditProject').val(),
      description: $('#descriptionEditProject').val(),
      due_date: $('#due_dateEditProject').val()
    }
    $.ajax({
      type: "PUT",
      url: url + `projects/${projectId}/${todoId}`,
      headers: {
        token: localStorage.getItem('token')
      },
      data: editTodo
    })
      .done(todo => {
        console.log(todo.message)
        showSuccessMessage(todo.message)
        clearMessage(projectId)
      })
      .fail(error => {
        console.log(error.responseJSON.message)
        showDangerMessage(error.responseJSON.message)
        clearMessage(projectId)
      })
  }

  deleteTodoProject = function (projectId, todoId) {
    $.ajax({
      type: "DELETE",
      url: url + `projects/${projectId}/${todoId}`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(todo => {
        console.log(todo.message)
        showSuccessMessage(todo.message)
        clearMessage(projectId)
      })
      .fail(error => {
        console.log(error.responseJSON.message)
        showDangerMessage(error.responseJSON.message)
        clearMessage(projectId)
      })
  }

  completedTodoProject = function (projectId, todoId) {
    $.ajax({
      type: "PUT",
      url: url + `projects/${projectId}/${todoId}`,
      headers: {
        token: localStorage.getItem('token')
      },
      data: {
        status: "completed"
      }
    })
      .done(todo => {
        console.log(todo.message)
        getDetailsProject(projectId)
      })
      .fail(error => {
        console.log(error.responseJSON.message)
      })
  }

  uncompletedTodoProject = function (projectId, todoId) {
    $.ajax({
      type: "PUT",
      url: url + `projects/${projectId}/${todoId}`,
      headers: {
        token: localStorage.getItem('token')
      },
      data: {
        status: "uncompleted"
      }
    })
      .done(todo => {
        console.log(todo.message)
        getDetailsProject(projectId)
      })
      .fail(error => {
        console.log(error.responseJSON.message)
      })
  }

  showDangerMessage = function(msg){
    $('#messageAfterLogin').append(`
          <div class="alert alert-dismissible alert-danger">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong>${msg}</strong>
          </div>
        `)
  }

  showSuccessMessage = function(msg){
    $('#messageAfterLogin').append(`
          <div class="alert alert-dismissible alert-success">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong>${msg}</strong>
          </div>
        `)
  }

  clearMessage = function(projectId){
    setTimeout(() => {
      $('#messageAfterLogin').empty()
      getDetailsProject(projectId)   
    }, 3000);
  }

  clearTodoMessage = function(){
    setTimeout(() => {
      $('#messageAfterLogin').empty()
      getTodo()
    }, 3000);
  }

  //-------------------------USER Auth------------------------------//

  showFormLogin = function () {
    $('.login').show()
    $('.register').hide()
    $('#inputName').val(''),
      $('#inputEmail').val(''),
      $('#inputPassword').val('')
  }

  showFormRegister = function () {
    $('.login').hide()
    $('.register').show()
    $('#inputName').val(''),
      $('#inputEmail').val(''),
      $('#inputPassword').val('')
  }

  register = function () {
    let newUser = {
      name: $('#inputName').val(),
      email: $('#inputEmail').val(),
      password: $('#inputPassword').val()
    }
    $.ajax({
      type: "POST",
      url: url + 'register',
      data: newUser
    })
      .done(user => {
        console.log(user.message)
        $('#messageBeforeLogin').append(`
          <div class="alert alert-dismissible alert-success">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong>${user.message}</strong>
          </div>
        `)
        setTimeout(() => {
          $('#messageBeforeLogin').empty()
        }, 5000);
      })
      .fail(error => {
        console.log(error.responseJSON)
        console.log(error.responseJSON.message)
        $('#messageBeforeLogin').append(`
          <div class="alert alert-dismissible alert-danger">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong>${error.responseJSON.message}</strong>
          </div>
        `)
        setTimeout(() => {
          $('#messageBeforeLogin').empty()
        }, 5000);
      })
  }

  login = function () {
    let user = {
      email: $('#inputEmail').val(),
      password: $('#inputPassword').val()
    }
    $.ajax({
      type: "POST",
      url: url + 'login',
      data: user
    })
      .done(user => {
        localStorage.setItem('token', user.token)
        console.log(user.message)
        $('#inputEmail').val(''),
        $('#inputPassword').val('')
        
        $('#messageBeforeLogin').append(`
          <div class="alert alert-dismissible alert-success">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong>${user.message}</strong>
          </div>
        `)
        setTimeout(() => {
          $('#messageBeforeLogin').empty()
          checkLogin()
        }, 2000);
      })
      .fail(error => {
        console.log(error.responseJSON.message)
        $('#messageBeforeLogin').append(`
          <div class="alert alert-dismissible alert-danger">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong>${error.responseJSON.message}</strong>
          </div>
        `)
        setTimeout(() => {
          $('#messageBeforeLogin').empty()
        }, 5000);
      })
  }

  onSignIn = function (googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token)
    $.ajax({
      type: "POST",
      url: url + 'loginGoogle',
      data: {
        token: id_token
      }
    })
      .done(user => {
        localStorage.setItem('token', user.token)
        console.log(user)
        $('#messageBeforeLogin').append(`
          <div class="alert alert-dismissible alert-success">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong>${user.message}</strong>
          </div>
        `)
        setTimeout(() => {
          $('#messageBeforeLogin').empty()
          checkLogin()
        }, 2000);
      })
      .fail(error => {
        console.log(error)
        $('#messageBeforeLogin').append(`
          <div class="alert alert-dismissible alert-danger">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong>${error.responseJSON.message}</strong>
          </div>
        `)
        setTimeout(() => {
          $('#messageBeforeLogin').empty()
        }, 5000);
      })
  }

  signOut = function () {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    localStorage.clear()
    checkLogin()
  }


  //-------------------------INITIAL------------------------------//

  checkLogin = function () {
    if (localStorage.getItem('token')) {
      $.ajax({
        type: "GET",
        url: url + 'checkLogin',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .done(user => {
          $('#beforeLogin').hide()
          $('#afterLogin').show()
          hideAllForm()
          getTodo()
          getProject()
        })
        .fail(error => {
          console.log(error.responseJSON.message)
          $('#beforeLogin').show()
          $('#afterLogin').hide()
        })

    } else {
      $('#beforeLogin').show()
      $('#afterLogin').hide()
    }
  }

  checkLogin()
  showFormLogin()

})