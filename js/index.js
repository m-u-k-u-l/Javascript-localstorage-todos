let form = document.getElementById("todoform");
let title = document.getElementById("title");
let date = document.getElementById("date");
let description = document.getElementById("description");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

let formValidation = () => {
    let msg = document.getElementById("msg");
    let add = document.getElementById("addnew");

    if (title.value === "") {
        console.log("err");
        msg.innerHTML = "Task title cannot be empty";
    } else {
        console.log("success");
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })();
    }
};

let data = [{}];

let acceptData = () => {
    data.push({
        title: title.value,
        date: date.value,
        description: description.value,
    });

    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
    createTasks();
};

let createTasks = () => {
    let tasklist = document.getElementById("tasklist");
    tasklist.innerHTML = "";
    data.map((elem, i) => {
        return (tasklist.innerHTML +=
            `
                    <div id=${i}>
                        <span class="fw-bold">${elem.title}</span>
                        <span class="small teelemt-secondary">${elem.date}</span>
                        <p class="desc">${elem.description}</p>
                        <span class="options">
                            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class=" edit fas fa-edit">Edit</i>
                            <i onClick ="deleteTask(this);createTasks()" class="del fas fa-trash-alt">Delete</i>
                        </span>
                    </div>
                    <hr>
                    `
        );
    });

    title.value = "";
    date.value = "";
    description.value = "";
};

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
};

let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
    title.value = selectedTask.children[0].innerHTML;
    date.value = selectedTask.children[1].innerHTML;
    description.value = selectedTask.children[2].innerHTML;
    deleteTask(e);
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || []
    console.log(data);
    createTasks();
})();
