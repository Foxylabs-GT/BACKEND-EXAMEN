export const alumnos = async (grado) => {
    const url = `https://localhost:44341/api/Estudiantes/Grado/${grado}`;
    const username = 'Admin'; // Reemplaza 'tu_usuario' con tu nombre de usuario
    const password = 'Admin'; // Reemplaza 'tu_contraseña' con tu contraseña

    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(`${username}:${password}`)); // Codificar las credenciales en Base64

    try {
        const resp = await fetch(url, {
            method: 'GET',
            headers: headers
        });

        if (!resp.ok) {
            throw new Error(`Error al obtener los datos de estudiantes: ${resp.status}`);
        }

        const alumnos = await resp.json();
        console.log(alumnos);
        return alumnos;
    } catch (error) {
        console.error('Error al obtener los datos de estudiantes:', error);
        throw error; // Propagar el error para que pueda ser manejado por el código que llama a esta función
    }
};
