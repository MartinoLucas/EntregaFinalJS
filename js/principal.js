const cardsContainer = document.querySelector("#cardsContainer");

fetch("../datos/principal.json")
    .then( (res) => res.json())
    .then((datos)=>{
        datos.forEach(dato => {
            const div = document.createElement("div");
            div.innerHTML=`
            <div class="card m-2" style="width: 18rem;">
                <img src="${dato.imgSrc}" class="card-img-top" alt="${dato.alt}">
                <div class="card-body">
                    <h5 class="card-title">${dato.alt}</h5>
                    <p class="card-text">${dato.description}</p>
                    <a href="${dato.url}" class="btn btn-primary">Empezar</a>
                </div>
            </div>`
            cardsContainer.append(div)
        });
    });