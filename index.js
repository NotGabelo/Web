// Variable global para lista de los datos del CV:
let cvData = [];

// Agregar datos del formulario al array:
document.getElementById("cvForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtener valores del formulario:
    const nombre = document.getElementById("nombreInput").value;
    const profesion = document.getElementById("profesionInput").value;
    const descripcion = document.getElementById("descripcionInput").value;
    
    const academico = [];
    document.querySelectorAll("#academicoList input").forEach(input => {
        if (input.value !== "") {
            academico.push(input.value);
        }
    });

    const laboral = [];
    document.querySelectorAll("#laboralList input").forEach(input => {
        if (input.value !== "") {
            laboral.push(input.value);
        }
    });

    const skills = [];
    document.querySelectorAll("#skillsList input").forEach(input => {
        if (input.value !== "") {
            skills.push(input.value);
        }
    });

    // Manejo de la foto:
    const fotoInput = document.getElementById("fotoInput");
    if (fotoInput.files.length > 0) {
        const lector = new FileReader();
        lector.onload = function(evento) {
            const foto = evento.target.result;
            cvData = [{ nombre, profesion, descripcion, academico, laboral, skills, foto }];
            showCV();
        };
        lector.readAsDataURL(fotoInput.files[0]);
    } else {
        const foto = (cvData.length > 0 && cvData[0].foto) ? cvData[0].foto : "";
        cvData = [{ nombre, profesion, descripcion, academico, laboral, skills, foto }];
        showCV();
    }
});

// Mostrar datos actualizados:
function showCV() {
    const cvDisplayElement = document.getElementById("cvDisplay");
    cvDisplayElement.innerHTML = "";

    if (cvData.length === 0) return;
    const data = cvData[0];

    const newItem = document.createElement("div");
    newItem.innerHTML = `
        ${data.foto ? `<img src="${data.foto}" alt="Foto de perfil" style="width: 150px; height: 150px; border-radius: 50%; margin-right: 20px;">` : ""}
        <div>
            <h2>${data.nombre}</h2>
            <h3>${data.profesion}</h3>
            <p>${data.descripcion}</p>
            <h4>Historial Académico</h4>
            <p>${data.academico.join("<br>")}</p>
            <h4>Historial Laboral</h4>
            <p>${data.laboral.join("<br>")}</p>
            <h4>Habilidades</h4>
            <p>${data.skills.join("<br>")}</p>
        </div>
    `;

    cvDisplayElement.appendChild(newItem);
}

// Eliminar la información:
function deleteCV() {
    cvData = [];
    showCV();
}
document.getElementById("deleteCV").addEventListener("click", deleteCV);

function addItem(listId) {
    const list = document.getElementById(listId);
    const input = document.createElement("input");
    input.type = "text";
    input.className = "list-item";

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.onclick = function () {
        list.removeChild(input);
        list.removeChild(removeBtn);
    };

    list.appendChild(input);
    list.appendChild(removeBtn);
}