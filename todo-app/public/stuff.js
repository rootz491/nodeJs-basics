const task = document.querySelector("form");
const url = '/todo'

task.addEventListener("submit", ee => {
    ee.preventDefault();

    const item = {item: document.querySelector('#item').value};


    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function(e) {
        let res = xhr.response;
        console.log(res);
    };
    xhr.send(JSON.stringify(item));

    console.log(item);
});

let createNewTask = data => {

}