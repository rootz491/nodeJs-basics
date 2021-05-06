const personForm = document.forms.namedItem('person');

personForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let form = e.target;

    //  when we create new FormData object, it fires `formdata` event
    //new FormData(personForm);

    let formData = new  FormData();

    formData.append("name", "karan")

    var req = new XMLHttpRequest();
    req.open(form.method, form.action);
    // req.send(new FormData(form));
    req.send(formData);
    req.onload = ee => {
        console.log(req.response);
    }
});

/*
//  this event will be triggered when new formData object will be created,
//  and it will be created when we'll submit the form
personForm.addEventListener('formdata', (e) => {

    //  get data
    let data = e.formData;
    let form = e.target;
    for(let value in data.values())
        console.log(value);

    console.log(data);

    let request = new XMLHttpRequest();
    request.open(form.method, form.action);
    request.send(data);
    request.onload = (e)=> {
        let res = request.response;
        console.log(res);
    };
});
*/