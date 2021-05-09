document.forms[0].addEventListener('submit', e => {
    e.preventDefault();
    let form = e.target;

    fetch(`${form.action}?name=${form.name.value}`)
    .then(res => res.json())
    .then(data => {
        data.forEach((element) => {
            createDomElement(element);
        });
    });

    form.name.value = null;
});
    
let createDomElement = data => {
    let template = document.querySelector('template');
    let clone = template.content.cloneNode(true);

    //  put data into element
    clone.id = data._id;
    let name = clone.querySelector('#name');
    name.innerText = data.name;
    let email = clone.querySelector('#email');
    email.innerText = data.email;
    let msg = clone.querySelector('#message');
    msg.innerText = data.message;
    let del = clone.querySelector('#del');
    // del.href = `${data._id}/delete`;
    let edit = clone.querySelector('#edit');
    // edit.href = `${data._id}/edit`;

    console.log(del, edit);

    const display = document.querySelector('#display');
    //  add element to DOM
    display.appendChild(clone);
}