document.addEventListener('DOMContentLoaded', function() {
    // Agrega un evento de clic al botón "Entrar"
    document.getElementById('entrarBtn').addEventListener('click', login);
    
    // Escucha la tecla 'Enter' en el campo de contraseña
    document.getElementById('password').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            login();
        }
    });

    // Agrega un evento de clic al botón "Buscar"
    document.getElementById('buscarBtn').addEventListener('click', buscarPersona);
    
    // Escucha la tecla 'Enter' en el campo de ID/Cédula
    document.getElementById('personaId').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            buscarPersona();
        }
    });

    // Agrega un evento de clic al botón "Regresar"
    document.getElementById('regresarBtn').addEventListener('click', function() {
        document.getElementById('formContainer').classList.add('hidden');
        document.getElementById('loginContainer').classList.remove('hidden');
        document.getElementById('resultado').classList.add('hidden');
        document.getElementById('descargaContainer').classList.add('hidden');
        document.getElementById('personaId').value = '';
    });

    // Agrega un evento de clic al botón "Descargar"
    document.getElementById('descargarBtn').addEventListener('click', function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4'); // Hoja vertical A4

        // Configurar márgenes
        const margin = 20; // 2 cm en mm
        const textMargin = margin + 20; // Para el inicio del texto

        // Rellenar datos de la constancia
        const nombre = 'Juan David Evies Cayama';
        const cedula = '28.744.014';
        const formacion = 'Corte de Pelo';
        const duracion = '90 horas';
        const fechaInicio = '4/10/2024';
        const fechaFin = '24/10/2024';

        // Cargar la imagen para el encabezado y pie de página
        const headerImageUrl = 'images/imagen1.jpeg'; // Cambia la extensión a .png
        const footerImageUrl = 'images/imagen2.jpeg'; // Cambia la extensión a .png

        // Agregar imágenes (asegúrate de que estén cargadas)
        doc.addImage(headerImageUrl, 'JPEG', margin, margin - 15, doc.internal.pageSize.getWidth() - (margin * 2), 20); // Encabezado
        doc.addImage(footerImageUrl, 'JPEG', margin, doc.internal.pageSize.getHeight() - margin + 5, doc.internal.pageSize.getWidth() - (margin * 2), 20); // Pie de página

        // Establecer fuente y tamaño
        doc.setFont("Times", "normal");
        doc.setFontSize(12); // Tamaño de letra 12

        // Agregar contenido al PDF
        doc.setFontSize(16);
        doc.setFont("bold");

        // Ajustar la distancia de 1.5 cm (15 mm) desde el encabezado
        const titleYPosition = textMargin + 15; // 1.5 cm en mm
        doc.text('CONSTANCIA', doc.internal.pageSize.getWidth() / 2, titleYPosition, { align: 'center' });
        
        // Subrayar el título
        const titleWidth = doc.getTextWidth('CONSTANCIA');
        const titleXPosition = (doc.internal.pageSize.getWidth() / 2) - (titleWidth / 2);
        doc.line(titleXPosition, titleYPosition + 3, titleXPosition + titleWidth, titleYPosition + 3); // Subrayar

        doc.setFontSize(12);
        doc.setFont("normal");

        // Crear el texto
        const textLines = [
            `La Coordinación del Centro de Formación Socialista Carora, INCES Región-Lara hace constar, por medio de la presente, que el (a) ciudadano (a): ${nombre}, Portador(a) de la Cédula de Identidad V- ${cedula}, participó en la formación de la Unidad Curricular: ${formacion}, con una duración de ${duracion}, con fecha de inicio el: ${fechaInicio} y fecha de término el: ${fechaFin}.`,
            '',
            'Constancia que se expide a petición de parte interesada en el Municipio Torres, Parroquia Trinidad Samuel, Estado Lara a los 22 días del mes de mayo 2024.'
        ];

        // Ajustar el texto a la página
        const fullText = textLines.join('\n'); // Unir todas las líneas en una sola cadena
        const splitText = doc.splitTextToSize(fullText, doc.internal.pageSize.getWidth() - (margin * 2)); // Dividir texto largo

        // Añadir texto al PDF
        let yOffset = titleYPosition + 10; // Comenzar un poco más abajo del título
        splitText.forEach(line => {
            doc.text(line, margin, yOffset);
            yOffset += 10; // Incrementar la posición vertical para la siguiente línea
        });

        // Añadir "Atentamente" en negrita
        doc.setFont("bold");
        doc.text('Atentamente,', doc.internal.pageSize.getWidth() / 2, yOffset + 10, { align: 'center' });

        // Añadir nombre y cargo en negrita
        doc.text('Jesus Campos', doc.internal.pageSize.getWidth() / 2, yOffset + 20, { align: 'center' });
        doc.text('Jefe de Centro', doc.internal.pageSize.getWidth() / 2, yOffset + 30, { align: 'center' });
        doc.text('Según el orden administrativo N OA-2024-02-29 de fecha 15-02-2024', doc.internal.pageSize.getWidth() / 2, yOffset + 40, { align: 'center' });

        // Descargar el PDF
        doc.save('constancia.pdf');
    });

    // Agrega un evento de clic al botón "Regresar" en la constancia
    document.getElementById('regresarConstanciaBtn').addEventListener('click', function() {
        document.getElementById('constanciaContainer').classList.add('hidden');
        document.getElementById('formContainer').classList.remove('hidden');
    });
});

// Función que valida la contraseña ingresada
function login() {
    const passwordInput = document.getElementById('password').value;
    if (passwordInput === 'Incess2024') {
        document.getElementById('formContainer').classList.remove('hidden');
        document.getElementById('loginContainer').classList.add('hidden');
        document.getElementById('regresarBtn').classList.remove('hidden');
        document.getElementById('passwordError').classList.add('hidden');
    } else {
        document.getElementById('passwordError').classList.remove('hidden');
    }
}

// Función para buscar una persona por ID/Cédula
function buscarPersona() {
    const idInput = document.getElementById('personaId').value;
    const resultado = document.getElementById('resultado');
    const descargaContainer = document.getElementById('descargaContainer');

    // Validar ID/Cédula
    if (idInput.length >= 7 && idInput.length <= 8 && !isNaN(idInput)) {
        resultado.textContent = `Buscando persona con ID/Cédula: ${idInput}`; // Agregado el backtick para interpolación
        resultado.classList.remove('hidden');
        descargaContainer.classList.remove('hidden');
    } else {
        resultado.textContent = 'DOCUMENTO DE IDENTIDAD INVALIDADO';
        resultado.classList.remove('hidden');
        descargaContainer.classList.add('hidden');
    }
}
