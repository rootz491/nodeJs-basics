fetch("/api/persons")
.then(res => res.text())
.then(data => {

    console.log(typeof(data))

    // data.find().forEach((element) => {
    //     console.log(element);
    // });
    

    // createDomElement(item);
});


let createDomElement = data => {
    data.forEach(entry => {
        console.log(entry);
        // let template = document.querySelector('template');
        // let clone = template.cloneNode(true);

        // //  put data into element
        // clone.id = entry._id;
        // clone.querySelector('#name').value = entry.name;
        // clone.querySelector('#email').value = entry.email;
        // clone.querySelector('#message').value = entry.message;

        // const display = document.querySelector('#display');
        // //  add element to DOM
        // display.appendChild(clone);
    });
}