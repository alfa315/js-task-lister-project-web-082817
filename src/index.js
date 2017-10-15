document.addEventListener("DOMContentLoaded", () => {
  const app = new App()
  app.render()
})

const listForm = document.getElementById('create-list-form')
const listInput = document.getElementById('new-list-title');
const lists = document.getElementById('lists')
const select = document.getElementById('parent-list')
const taskForm = document.getElementById('create-task-form')
const priorities = document.getElementById('new-task-priority')
const description = document.getElementById('new-task-description')
let listDivs



listForm.addEventListener('submit', function(ev){
  ev.preventDefault();
  const option = document.createElement('option')
  const newList = new List(listInput.value)
  const div = document.createElement('div')
  div.setAttribute('id', `${newList.id}`)
  div.innerHTML = `<h1>${listInput.value}</h1><li><button class="delete list">Delete List</li>`
  lists.appendChild(div);
  option.text = listInput.value
  select.add(option)
  listInput.value = ''
  listDivs = document.querySelectorAll('#lists div')
})

taskForm.addEventListener('submit', function(ev){
  ev.preventDefault();
  const newTask = new Task (description.value, priorities.value)
  const div = document.createElement('div')
  div.innerHTML = `<ul><li> Description: ${newTask.description} </li><li> Priority: ${newTask.priority} </li><li><button class="delete task">Delete Task</li><ul>`
  const selectedOption = select.options[select.options.selectedIndex].innerText
  const selectedDiv = List.all.find(function(d) {
    return d.title === selectedOption
  })
  const parent = document.getElementById(selectedDiv.id)
  parent.appendChild(div)
})

lists.addEventListener('click', function(event) {
  event.preventDefault()
  const clicked = event.target
  if(clicked.className === 'delete task'){
    clicked.parentElement.parentElement.parentElement.remove()
  } else if (clicked.className === 'delete list') {
    for (let i = 0; i < select.options.length; i++){
      if (event.target.parentElement.parentElement.innerText.includes(select.options[i].innerText)) {
        select.options[i].remove()
      }
    }
    List.all.splice(parseInt(clicked.parentElement.parentElement.id, 10) - 1, 1)
    clicked.parentElement.parentElement.remove()
  }
} )
