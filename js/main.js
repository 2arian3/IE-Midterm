const URL = 'https://api.genderize.io/';

const handleRequest = (name) => {
    fetch(URL + `?name=${name}`)
    .then(response => response.json())
    .then(function(response){
        document.getElementById('gender').innerHTML = response.gender;
        document.getElementById('probability').innerHTML = response.probability;
        response.gender === 'male' ? document.getElementById('male').checked = true : document.getElementById('female').checked = true;
    })
    .catch(error => {
        document.getElementById('error-message').style.visibility = 'visible';
        document.getElementById('error').innerHTML = error;
        setTimeout(() => {
            document.getElementById('error-message').style.visibility = 'hidden';
        }, 2000);
    });
}

function getNamesObject() {
    return localStorage.getItem('names') ? localStorage.getItem('names') : [];
}

function setNamesObject(names) {
    localStorage.setItem('names', names);
}

function OnSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    name ? handleRequest(name) : undefined;
}

function OnSave(e) {
    if (document.getElementById('name') !== '') {

    }
}

function OnClear(e) {
}