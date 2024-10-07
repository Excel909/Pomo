const accountForm = document.querySelector('form');

    accountForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('set-username').value;
        const email = document.getElementById('set-username').value;

        fetch('/settings/account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Account details updated');
            } else {
                alert('Error updating account');
            }
        })
        .catch(err => {
            console.log(err.message);
        });
    });