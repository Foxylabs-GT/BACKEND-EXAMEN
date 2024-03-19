import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AlumnosReporte from '../pages/alumnosReporte'; // Importa el componente Pruebas con la primera letra en mayúscula
import Alumno from '../pages/alumno';

const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<AlumnosReporte />} /> {/* Utiliza Pruebas con la primera letra en mayúscula */}
                <Route path="/alumnos" element={<AlumnosReporte />} /> {/* Agrega la ruta para '/pruebas' */}
                <Route path="/alumno" element={<Alumno />} /> {/* Agrega la ruta para '/pruebas' */}
            </Routes>
        </>
    );
};

export default AppRouter;
