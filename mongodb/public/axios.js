const personForm = document.forms.namedItem('person');
console.log(personForm);

document.addEventListener("submit", (e) => {
    // Store reference to form to make later code easier to read
    const form = e.target;


    var bodyFormData = new FormData(form);
    bodyFormData.append('name', 'karan');

    axios({
        method: form.method,
        url: form.action,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
    })
    .then(function (response) {
        //handle success
        console.log(response.data);
    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });

    e.preventDefault();
});

