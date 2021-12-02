const URL = 'https://api.genderize.io/';

// Fetching data based on input name.
// Error are also handled in catch.
const handleRequest = (name) => {
    fetch(URL + `?name=${name}`)
    .then(response => response.json())
    .then(function(response){
        document.getElementById('modal').style.opacity = 0;
        document.getElementById('gender').innerHTML = response.gender;
        document.getElementById('probability').innerHTML = response.probability;
        response.gender === 'male' ? 
        document.getElementById('male').checked = true : 
        response.gender === 'female' ? document.getElementById('female').checked = true : '';

        const names = getNamesObject();
        // Checks if name exists in localstorage
        if (names.hasOwnProperty(name)) {
            document.getElementById('saved').innerHTML = names[name];
        } else {
            document.getElementById('saved').innerHTML = 'There is no saved data';
        }
    })
    .catch(error => {
        showMessageInModal(
            `<p class="modal-message" style="padding: 0; margin: 0; color: red">${error}</p>`,
             2000);
    });
}

// Showing input message in custom modal.
function showMessageInModal(message, duration) {
    const modal = document.getElementById('modal');
    modal.style.opacity = 1;
    // Changing content of modal.
    modal.innerHTML = message;
    setTimeout(() => {
        modal.style.opacity = 0;
    }, duration);
}

// Getting names from localstorage as a json and converting it into object.
function getNamesObject() {
    return localStorage.getItem('names') ? JSON.parse(localStorage.getItem('names')) : {};
}

// Storing names as a string in localstorage.
function setNamesObject(names) {
    localStorage.setItem('names', JSON.stringify(names));
}

// Handling form submission.
function OnSubmit(e) {
    // Preventing submit button from default action.
    e.preventDefault();
    const modal = document.getElementById('modal');
    const name = document.getElementById('name').value;
    modal.style.opacity = 1;
    modal.innerHTML = `<p class="modal-message" style="padding: 0; margin: 0;">FETCHING...</p>`;
    name ? handleRequest(name) : undefined;
}

// Handling save result.
function OnSave(e) {
    const name = document.getElementById('name').value;
    if (name !== '') {
        const names = getNamesObject();
        if (document.getElementById('male').checked) {
            names[name] = 'male';
            showMessageInModal(
                `<p class="modal-message" style="padding: 0; margin: 0">Updated local storage</p>`,
                 2000);
            document.getElementById('saved').innerHTML = 'male';
        } else if (document.getElementById('female').checked) {
            names[name] = 'female';
            showMessageInModal(
                `<p class="modal-message" style="padding: 0; margin: 0">Updated local storage</p>`,
                 2000);
            document.getElementById('saved').innerHTML = 'female';
        }
        setNamesObject(names);
    }
}

// Deleting shown name from localstorage.
function OnClear(e) {
    const name = document.getElementById('name').value;
    const names = getNamesObject();
    // Checking wheter input name is already stored or not.
    if (name !== '' && names.hasOwnProperty(name)) {
        delete names[name];
        setNamesObject(names);
        document.getElementById('saved').innerHTML = 'There is no saved data';
        showMessageInModal(
            `<p class="modal-message" style="padding: 0; margin: 0">Deleted ${name} from local storage`,
             2000);
    }
}