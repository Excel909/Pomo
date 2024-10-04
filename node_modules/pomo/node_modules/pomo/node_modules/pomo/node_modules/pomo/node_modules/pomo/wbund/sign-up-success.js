window.onload = () => {
    const userName = document.querySelector('.user');
    const profilePic = document.querySelector('.cont-img');

    fetch(`user`)
    .then(response => response.json())
    .then(data => {
        userName.innerHTML = data.user;
        profilePic.setAttribute('src',`data:${data.ptype};base64,${data.profile}`);
    })
    .catch(err => console.log(err.message));
};