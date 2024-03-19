import React, { useState } from 'react';
import '../App.css'; // Importa el archivo CSS para el estilo del formulario
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import { alumno } from '../helpers/alumno'; // Importa la función alumno desde alumno.js

const Alumno = () => {
    const [formData, setFormData] = useState({
        nombreCompleto: '',
        fechaNacimiento: '',
        nombrePadre: '',
        nombreMadre: '',
        grado: '1ro',
        seccion: 'A',
        fechaIngreso: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validar que todos los campos estén llenos antes de enviar el formulario
        const { nombreCompleto, fechaNacimiento, nombrePadre, nombreMadre, grado, seccion, fechaIngreso } = formData;
        if (!nombreCompleto || !fechaNacimiento || !nombrePadre || !nombreMadre || !fechaIngreso) {
            alert('Por favor llena todos los campos');
            return;
        }
        // Enviar los datos del formulario a la función alumno
        try {
            await alumno(nombreCompleto, fechaNacimiento, nombrePadre, nombreMadre, grado, seccion, fechaIngreso);
            alert('Alumno guardado exitosamente');
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };

    return (
        <div className="alumno-form-container">
            <h1>Crear alumno</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre Completo:</label>
                    <input type="text" name="nombreCompleto" value={formData.nombreCompleto} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Fecha de Nacimiento:</label>
                    <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Nombre del Padre:</label>
                    <input type="text" name="nombrePadre" value={formData.nombrePadre} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Nombre de la Madre:</label>
                    <input type="text" name="nombreMadre" value={formData.nombreMadre} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Grado:</label>
                    <select name="grado" value={formData.grado} onChange={handleChange}>
                        <option value="1ro">1ro</option>
                        <option value="2do">2do</option>
                        <option value="3ro">3ro</option>
                        <option value="4to">4to</option>
                        <option value="5to">5to</option>
                        <option value="6to">6to</option>
                        <option value="7mo">7mo</option>
                        <option value="8vo">8vo</option>
                        <option value="9no">9no</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Sección:</label>
                    <select name="seccion" value={formData.seccion} onChange={handleChange}>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Fecha de Ingreso:</label>
                    <input type="date" name="fechaIngreso" value={formData.fechaIngreso} onChange={handleChange} />
                </div>
                <div className="form-buttons">
                    <button type="submit" className="btn-blue">Guardar</button>
                    <Link to="/alumnos">
                        <button type="button" className="btn-green">Cancelar</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Alumno;
