// Select the elements
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

// Class names
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';

// variables
let LIST, id;

// get item from localstorage
let data = localStorage.getItem('TODO');

// check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length; // set the id to last to
  loadList(LIST);
} else {
  // if data isn't empty
  LIST = [];
  id = 0;
}

// iterate and load items to the UI
function loadList(array) {
  array.forEach((item) => {
    addTodo(item.name, item.id, item.done, item.trash);
  });
}

// clear local storage when using refeshing icon
clear.addEventListener('click', function () {
  localStorage.clear();
  location.reload();
});

// show todays date and time
const options = {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
};

const date = new Date();
const today = date.toLocaleDateString('en-US', options);
const time = date.toLocaleTimeString([], { timeStyle: 'short' });

// const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
dateElement.innerHTML = `${today} &nbsp; ${time}`;

// create add to do function
function addTodo(toDo, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : '';

  const item = `
              <li class="item">
                <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                <p class="text" ${LINE}>${toDo}</p>
                <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
              </li>
              `;

  const position = 'beforeend';

  list.insertAdjacentHTML(position, item);
}

// listen for enter click event for adding a to do
document.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    const toDo = input.value;

    // if the input isn't empty
    if (toDo) {
      addTodo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });

      // add item to localstorage (adding to update the LIST array)
      localStorage.setItem('TODO', JSON.stringify(LIST));

      id++;
    }
    input.value = '';
  }
});

// complete a to do function
function completeTodo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// delete a to do function
function deleteToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

// listen for click events for items
list.addEventListener('click', function (event) {
  const element = event.target; // return the clicked element inside the list
  const elementJob = element.attributes.job.value; // complete or delete

  if (elementJob === 'complete') {
    completeTodo(element);
  } else if (elementJob === 'delete') {
    deleteToDo(element);
  }

  // add item to localstorage (adding for updating completed/deleted)
  localStorage.setItem('TODO', JSON.stringify(LIST));
});
