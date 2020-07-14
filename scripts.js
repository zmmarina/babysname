window.addEventListener("load", start);

var globalNames = ["Gerhard", "Ian", "Stefano"];
var inputName = null;
var currentIndex = null;
var isEditing = false;


function start(){
    preventFormSubmit();

    inputName = document.querySelector("#inputName");
    activateInput();
    render();
}

function preventFormSubmit(){
    var form = document.querySelector("form");
    form.addEventListener("submit", handleFormSubmit);

    function handleFormSubmit(event){
        event.preventDefault();
    }
}

function activateInput(){
    inputName.focus();
    inputName.addEventListener("keyup", handleTyping);

    function handleTyping(event){
        if (event.key === "Enter" && event.target.value.trim() !== ""){
            if (isEditing){
                updateName(event.target.value);
            } else{
                insertName(event.target.value);
            }                       
            isEditing = false;
            render();
            clearInput();
        }       
    }

    function insertName(newName){
        globalNames.push(newName);    
          
    }

    function updateName(newName){
        globalNames[currentIndex] = newName;        
    }
}

function render(){
    var divNames = document.querySelector("#names");
    divNames.innerHTML = "";
    var ul = document.createElement("ul");

    function createDeleteButton(index){
        var button = document.createElement("button");
        button.classList.add("deleteButton");
        button.textContent = "x";

        button.addEventListener("click", deleteName);

        function deleteName(){
            globalNames.splice(index, 1);
            render();
        }
        return button;
    }

    function createSpan(name, index){
        var span = document.createElement("span");
        span.classList.add("clickable");
        span.textContent = name;

        span.addEventListener("click", editItem);

        function editItem(){
            inputName.value = name;
            inputName.focus();
            isEditing = true;
            currentIndex = index;
        }

        return span;
    }

    for (var i = 0; i<globalNames.length; i++){
        var currentName = globalNames[i];     

        var li = document.createElement("li");        
        var button = createDeleteButton(i);  
        var span = createSpan(currentName, i);
        

        li.appendChild(button);
        li.appendChild(span);
        ul.appendChild(li);
    }

    divNames.appendChild(ul);
    clearInput();
}

function clearInput(){
    inputName.value = "";
    inputName.focus();
}