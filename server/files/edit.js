// Variable zum Zwischenspeichern der Originaldaten (Poster, Rating etc.)
let currentMovieData = {};

function setMovie(movie) {
    for (const element of document.forms[0].elements) {
        const name = element.id;
        const value = movie[name];

        if (value === undefined) continue;

        if (name === "Genres") {
            const options = element.options;
            for (let index = 0; index < options.length; index++) {
                const option = options[index];
                option.selected = value.indexOf(option.value) >= 0;
            }
        } else if (Array.isArray(value)) {
            // Arrays (Directors, Actors) für das Textfeld mit Komma trennen
            element.value = value.join(", ");
        } else {
            element.value = value;
        }
    }
}

function getMovie() {
    const movie = {};
    const elements = Array.from(document.forms[0].elements).filter(
        (element) => element.id
    );

    for (const element of elements) {
        const name = element.id;
        let value;

        if (name === "Genres") {
            value = [];
            const options = element.options;
            for (let index = 0; index < options.length; index++) {
                const option = options[index];
                if (option.selected) value.push(option.value);
            }
        } else if (name === "Runtime" || name === "Metascore" || name === "imdbRating") {
            value = Number(element.value);
        } else if (name === "Actors" || name === "Directors" || name === "Writers") {
            // Text wieder in ein Array umwandeln
            value = element.value.split(",").map((item) => item.trim());
        } else {
            value = element.value;
        }
        movie[name] = value;
    }
    return movie;
}

function putMovie() {
    // 1. Daten aus dem Formular holen
    const formData = getMovie();

    // 2. Mit Originaldaten mischen (damit Poster & Ratings nicht verloren gehen)
    const finalData = Object.assign({}, currentMovieData, formData);

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "/movies/" + finalData.imdbID);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
            console.log("Erfolgreich gespeichert!");
            location.href = "index.html";
        } else {
            alert("Fehler beim Speichern: " + xhr.status);
        }
    };
    
    xhr.send(JSON.stringify(finalData));
}

// Laden der Daten, wenn die Seite aufgerufen wird
window.onload = function () {
    const imdbID = new URLSearchParams(window.location.search).get("imdbID");

    if (imdbID) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "/movies/" + imdbID);
        xhr.onload = function () {
            if (xhr.status === 200) {
                currentMovieData = JSON.parse(xhr.responseText);
                setMovie(currentMovieData);
            } else {
                alert("Fehler beim Laden der Filmdaten.");
            }
        };
        xhr.send();
    }
};