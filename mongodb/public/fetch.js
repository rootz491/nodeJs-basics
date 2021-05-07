const personForm = document.forms.namedItem('person');

document.addEventListener("submit", (e) => {
    // Store reference to form to make later code easier to read
    const form = e.target;
  
    // Post data using the Fetch API
    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
    })
    .then(res => res.text())
    .then(text => console.log(text))
    .catch(err => console.error(err));
  
    // Prevent the default form submit
    e.preventDefault();
});