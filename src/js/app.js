document.addEventListener('DOMContentLoaded', function () {
    crearGaleria();
    resaltarEnlace();
});

let i = 0; // Índice global de la imagen actual

function crearGaleria() {
    const CANTIDAD_IMAGENES = 16;
    const galeria = document.querySelector('.galeria-imagenes');

    for (let index = 1; index <= CANTIDAD_IMAGENES; index++) {
        const imagen = document.createElement('IMG');
        imagen.src = `src/img/gallery/full/${index}.jpg`;
        imagen.alt = 'Imagen Galería';

        galeria.appendChild(imagen);

        // Evento para abrir modal con imagen seleccionada
        imagen.onclick = function () {
            i = index; // Actualiza el índice global
            mostrarImagen(i);
        };
    }
}

function mostrarImagen(index) {
    i = index; // Asegurar que el índice global se actualiza correctamente
    const imagen = document.createElement('IMG');
    imagen.src = `src/img/gallery/full/${i}.jpg`;
    imagen.alt = 'Imagen Galería';

    // Crear modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal');
    modal.onclick = cerrarModal;

    // Botón cerrar Modal
    const cerrarModalBtn = document.createElement('BUTTON');
    cerrarModalBtn.textContent = 'X';
    cerrarModalBtn.classList.add('btn-cerrar');
    cerrarModalBtn.onclick = cerrarModal;

    // Botón Anterior
    const btnAnterior = document.createElement('BUTTON');
    btnAnterior.textContent = '<';
    btnAnterior.classList.add('btn-navegacion', 'btn-anterior');
    btnAnterior.onclick = function (event) {
        event.stopPropagation();
        cambiarImagen(i - 1);
    };

    // Botón Siguiente
    const btnSiguiente = document.createElement('BUTTON');
    btnSiguiente.textContent = '>';
    btnSiguiente.classList.add('btn-navegacion', 'btn-siguiente');
    btnSiguiente.onclick = function (event) {
        event.stopPropagation();
        cambiarImagen(i + 1);
    };

    modal.appendChild(imagen);
    modal.appendChild(cerrarModalBtn);
    modal.appendChild(btnAnterior);
    modal.appendChild(btnSiguiente);

    // Agregar modal al HTML
    const body = document.querySelector('body');
    body.classList.add('overflow-hidden');
    body.appendChild(modal);
}

function cambiarImagen(index) {
    const totalImagenes = 16; // Cantidad total de imágenes

    if (index < 1) {
        index = totalImagenes; // Si está en la primera imagen, ir a la última
    } else if (index > totalImagenes) {
        index = 1; // Si está en la última imagen, ir a la primera
    }

    i = index; // Actualiza el índice global
    const modalImg = document.querySelector('.modal img');
    if (modalImg) {
        modalImg.src = `src/img/gallery/full/${i}.jpg`;
    }
}

function cerrarModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out');

    setTimeout(() => {
        modal?.remove();
        document.querySelector('body').classList.remove('overflow-hidden');
    }, 500);
}

function resaltarEnlace() {
    document.addEventListener('scroll', function(){
        const sections = document.querySelectorAll('section')
        const navLinks = document.querySelectorAll('.navegacion-principal a')

        let actual = '';

        sections.forEach( section => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight
            if (window.scrollY >=(sectionTop - sectionHeight / 3)) {
                actual = section.id
            }
        })

        navLinks.forEach(link => {
            link.classList.remove('active')

            if (link.getAttribute ('href') === '#' + actual) {
                link.classList.add('active')
            }
        })
    })
}

document.addEventListener('DOMContentLoaded', function () {
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offset = 80; // Ajusta según la altura de la barra de navegación
                const targetPosition = targetSection.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
