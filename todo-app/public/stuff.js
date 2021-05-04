const task = document.querySelector("form");
const url = '/todo'

//  trigger to make POST req to create new task
task.addEventListener("submit", ee => {
    ee.preventDefault();

    const value = document.querySelector('#item').value;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.onload = function(e) {
        let res = xhr.response;
        console.log(value)
        console.log(res);
    }
    xhr.send(JSON.stringify(value, value));


    // axios.post('/todo', ("item" = value))
    // .then(res => {
    //     console.log(res.data);
    // })

    //  making dom element for newly created element
    createNewTask(value);
});

let createNewTask = data => {
    //  create dom element
    const keeper = document.querySelector('#taskKeeper');

    let template = document.querySelector('template');
    let clone = template.content.cloneNode(true);

    let thing = clone.querySelector('#string');
    thing.innerText = data;

    keeper.appendChild(clone);
}

/*
    make a handler so user can DELETE tasks
*/