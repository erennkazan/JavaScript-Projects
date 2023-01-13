const form = document.querySelector("#todo-form"),
todoInput = document.querySelector("#todo"),
todoList = document.querySelector(".list-group"),
firstCardBody = document.querySelectorAll(".card-body")[0],
secondCardBody = document.querySelectorAll(".card-body")[1 ],
filter = document.querySelector("#filter"),
clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){ //tüm event listenerlar
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);

}
function clearAllTodos(e){
    if (confirm("Tümünü silmek istediğinize emin misiniz?")){
         //arayüzden todoları temizleme
         //todoList.innerHTML = ""; // yavaş yöntem
         while (todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
         }
         localStorage.removeItem("todos");
       
    }
}
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1){
            listItem.setAttribute("style","display:none !important");
        }
        else{
            listItem.setAttribute("style","display : block");
        }


    });
}
function deleteTodo(e){
    if (e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.closest('li').getElementsByTagName("span")[0].innerText);
        showAlert("success","Todo başarıyla silindi.");
    }
   
}
function deleteTodoFromStorage(deletetodo){
    var todos = getTodosFromStorage();
    todos.forEach(function(todo,index){
        if (todo === deletetodo){ 
            todos.splice(index,1); //arrayden değeri silebiliriz.
            localStorage.setItem("todos",JSON.stringify(todos));
        }
    });

}
function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function addTodo(e){
    const newTodo = todoInput.value.trim();
    if (newTodo === ""){
        showAlert("danger","Lütfen bir todo girin");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Todo başarı ile eklendi.");
    }
    e.preventDefault();
}
function getTodosFromStorage(){//storagedan todoları alma
    let todos;
    if (localStorage.getItem("todos")=== null){
        todos = [];
    }    
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
}
function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className =`alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);

    setTimeout(function(){
        alert.remove();
    },2000);
}

//list item oluşturma
function addTodoToUI(newTodo){
    const listItem = document.createElement("li");
//link oluşturma
    const link = document.createElement("a");
    link.href = "javascript:;";
    link.className ="delete-item";
    link.innerHTML = " <i class='fa fa-remove'></i>";
    listItem.className = "list-group-item d-flex justify-content-between";

    //text node ekle
    var spanTag = document.createElement("span");
    spanTag.innerHTML = newTodo;
    listItem.appendChild(spanTag);
    listItem.appendChild(link);

    //todo liste list item ekle

    todoList.appendChild(listItem);
    todoInput.value = "";


}

