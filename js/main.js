const URL = 'https://api.genderize.io/';

const handleRequest = (name) => {
    fetch(URL + `?name=${name}`)
    .then(response => response.json())
    .then(function(response){
        document.getElementById('gender').innerHTML = response.gender;
        document.getElementById('probability').innerHTML = response.probability;
        response.gender === 'male' ? 
        document.getElementById('male').checked = true : 
        response.gender === 'female' ? document.getElementById('female').checked = true : '';

        const names = getNamesObject();
        if (names.hasOwnProperty(name)) {
            document.getElementById('saved').innerHTML = names[name];
        } else {
            document.getElementById('saved').innerHTML = '';
        }
    })
    .catch(error => {
        showMessageInModal(
            `<div style="color: red">ERROR</div>
             <p class="info">${error}</p>`,
             2000);
    });
}

function showMessageInModal(message, duration) {
    document.getElementById('modal').style.visibility = 'visible';
    document.getElementById('modal-message').innerHTML = message;
    setTimeout(() => {
        document.getElementById('modal').style.visibility = 'hidden';
    }, duration);
}

function getNamesObject() {
    return localStorage.getItem('names') ? JSON.parse(localStorage.getItem('names')) : {};
}

function setNamesObject(names) {
    localStorage.setItem('names', JSON.stringify(names));
}

function OnSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    name ? handleRequest(name) : undefined;
}

function OnSave(e) {
    const name = document.getElementById('name').value;
    if (name !== '') {
        const names = getNamesObject();
        if (document.getElementById('male').checked) {
            names[name] = 'male';
            showMessageInModal(
                `<p class="info">Updated saved data for <p style="color: teal">${name}</p> successfully</p>`,
                 2000);
        } else if (document.getElementById('female').checked) {
            names[name] = 'female';
            showMessageInModal(
                `<p class="info">Updated saved data for <p style="color: teal">${name}</p> successfully</p>`,
                 2000);
        }
        setNamesObject(names);
    }
}

function OnClear(e) {
    const name = document.getElementById('name').value;
    const names = getNamesObject();
    if (name !== '' && names.hasOwnProperty(name)) {
        delete names[name];
        setNamesObject(names);
        document.getElementById('saved').innerHTML = '';
        showMessageInModal(
            `<p class="info">Successfully deleted <p style="color: teal">${name}</p> entry from storage</p>`,
             2000);
    }
}