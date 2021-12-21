document.querySelector('#checkout').onclick = function() {
    fetch('/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            items: [
                {
                    id: 1,
                    quantity: 2
                },
                {
                    id: 3,
                    quantity: 1
                }
            ]
        })
    })
    .then(res => res.json())
    .then(data => {
        window.location.href = data.url;
    })
    .catch(err => {
        console.log(err);
    });
}