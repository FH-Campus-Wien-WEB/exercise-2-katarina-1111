window.onload = function () {
  const xhr = new XMLHttpRequest();
            
  xhr.onload = function () {
    if (xhr.status === 200) {
      const movies = JSON.parse(xhr.responseText);
      const container = document.getElementById("movie-container"); 

      movies.forEach(movie => {
      const movieArticle = document.createElement("article");
      movieArticle.className = "movie-card";

      movieArticle.id = movie.imdbID;

      const title = document.createElement("h2");
      title.textContent = movie.Title; 
      movieArticle.appendChild(title);

      const img = document.createElement("img");
      img.src = movie.Poster; 
      img.alt = `Poster of ${movie.Title}`; 
      movieArticle.appendChild(img); 

      const infoList = document.createElement("ul");
      infoList.innerHTML = `
        <li><strong>Released:</strong> ${movie.Released}</li>
        <li><strong>Runtime:</strong> ${movie.Runtime} Min.</li>
        <li><strong>Directors:</strong> ${movie.Directors.join(", ")}</li>
        <li><strong>Writers:</strong> ${movie.Writers.join(", ")}</li>
        <li><strong>Actors:</strong> ${movie.Actors.join(", ")}</li>
        <li><strong>IMDb-Rating:</strong> ⭐ ${movie.imdbRating} / 10</li>
        <li><strong>Plot:</strong> ${movie.Plot}</li>
        `;
        movieArticle.appendChild(infoList);

        const footerDiv = document.createElement("div");
        footerDiv.className = "card-footer";

        const genreDiv = document.createElement("div");
        movie.Genres.forEach(genre => {
          const span = document.createElement("span");
          span.className = "genre-tag"; 
          span.textContent = genre;
          genreDiv.appendChild(span);
          });

        footerDiv.appendChild(genreDiv);
        
      const editButton = document.createElement("button");
      editButton.className = "edit-btn";
      editButton.textContent = "Edit";  

      editButton.onclick = function() {
        location.href = "edit.html?imdbID=" + movie.imdbID;
      };

      footerDiv.appendChild(editButton);

      movieArticle.appendChild(footerDiv);

      container.appendChild(movieArticle);
      });

      } else {
        console.error("Error accured while loading data.");
      }
    };

    xhr.open("GET", "/movies");
    xhr.send();
};

