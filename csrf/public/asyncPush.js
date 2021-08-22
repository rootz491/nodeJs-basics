const form = document.forms[0];


form.onsubmit = e => {
    e.preventDefault();
    fetch(e.target.action, {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-csrf-token": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
        },
        body: JSON.stringify({
            name: e.target.name.value,
            age: e.target.age.value
        })
    }).then(res => res.text())
    .then(data => alert(data));
}