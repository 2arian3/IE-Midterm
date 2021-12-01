const URL = 'https://api.genderize.io/';

const handleRequest = (name) => {
    fetch(URL + `?name=${name}`)
    .then(response => response.json())
    .then(function(response){
        console.log(response);
    })
    .catch(error => {

    });
}

function OnSubmit(e) {
    e.preventDefault();
}

function OnSave(e) {
}