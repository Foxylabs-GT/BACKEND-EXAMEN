export const alumno = async (NombreCompleto, FechaNacimiento, NombrePadre, NombreMadre, grado, Seccion, FechaIngres) => {
    const username = 'Admin'; // Reemplaza 'tu_usuario' con tu nombre de usuario
    const password = 'Admin'; // Reemplaza 'tu_contraseña' con tu contraseña

    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(`${username}:${password}`)); // Codificar las credenciales en Base64

    // Formatear las fechas a año-mes-día
    const formattedFechaNacimiento = new Date(FechaNacimiento).toISOString().split('T')[0];
    const formattedFechaIngreso = new Date(FechaIngres).toISOString().split('T')[0];

    const bodyData = {
        NombreCompleto,
        FechaNacimiento: formattedFechaNacimiento,
        NombrePadre,
        NombreMadre,
        Grado: grado,
        Seccion,
        FechaIngreso: formattedFechaIngreso
    };
    console.log("data enviada ___"+JSON.stringify(bodyData))
    const url = `https://localhost:44341/api/Estudiantes`;
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': headers.get('Authorization') // Agregar la autorización a los encabezados de la solicitud
        },
        body: JSON.stringify(bodyData)
    });
    const data = await resp.json();
    console.log(data);
    return data;
};
