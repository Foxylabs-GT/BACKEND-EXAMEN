import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import { alumnos } from '../helpers/alumnos';

const AlumnosReporte = () => {
    const [alumnosData, setAlumnosData] = useState([]);
    const [order, setOrder] = useState({
        Id: 'asc',
        NombreCompleto: 'asc',
        FechaNacimiento: 'asc',
        NombrePadre: 'asc',
        NombreMadre: 'asc',
        Grado: 'asc',
        Seccion: 'asc',
        FechaIngreso: 'asc'
    });
    const [searchText, setSearchText] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedGrade, setSelectedGrade] = useState('1ro'); // Inicia en '1ro'

    useEffect(() => {
        loadAlumnos();
    }, [selectedGrade]); // Llama a loadAlumnos() cuando selectedGrade cambia

    const loadAlumnos = async () => {
        try {
            const data = await alumnos(selectedGrade); // Pasa selectedGrade a la función para filtrar los alumnos por grado
            setAlumnosData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSort = (column) => {
        const sortOrder = order[column] === 'asc' ? 'desc' : 'asc';
        const sortedAlumnos = [...alumnosData].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a[column] > b[column] ? 1 : -1;
            } else {
                return a[column] < b[column] ? 1 : -1;
            }
        });
        setAlumnosData(sortedAlumnos);
        setOrder({ ...order, [column]: sortOrder });
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const handlePaginationChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const filteredAlumnos = alumnosData.filter(alumno => {
        return (
            alumno.NombreCompleto.toLowerCase().includes(searchText.toLowerCase()) &&
            (selectedGrade === '' || alumno.Grado === selectedGrade)
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAlumnos = filteredAlumnos.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="container">
            <h2>Reporte de Alumnos</h2>
            <Link to="/alumno" className="btn btn-success">Nuevo</Link>
            <div className="mb-3">
                <label htmlFor="gradoSelect" className="form-label">Seleccionar Grado:</label>
                <select id="gradoSelect" className="form-select" value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)}>
                    <option value="1ro">1ro</option>
                    <option value="2do">2do</option>
                    <option value="3ro">3ro</option>
                    <option value="4to">4to</option>
                    <option value="5to">5to</option>
                    <option value="6to">6to</option>
                    <option value="7mo">7to</option>
                    <option value="8vo">8vo</option>
                    <option value="9no">9to</option>
                </select>
            </div>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Buscar por nombre" value={searchText} onChange={handleSearch} />
            </div>
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-primary">
                        <tr>
                            <th onClick={() => handleSort('Id')}>
                                ID
                                {order.Id === 'asc' ? <i className="bi bi-caret-up-fill"></i> : <i className="bi bi-caret-down-fill"></i>}
                            </th>
                            <th onClick={() => handleSort('NombreCompleto')}>
                                Nombre Completo
                                {order.NombreCompleto === 'asc' ? <i className="bi bi-caret-up-fill"></i> : <i className="bi bi-caret-down-fill"></i>}
                            </th>
                            <th onClick={() => handleSort('FechaNacimiento')}>
                                Fecha de Nacimiento
                                {order.FechaNacimiento === 'asc' ? <i className="bi bi-caret-up-fill"></i> : <i className="bi bi-caret-down-fill"></i>}
                            </th>
                            <th onClick={() => handleSort('NombrePadre')}>
                                Nombre del Padre
                                {order.NombrePadre === 'asc' ? <i className="bi bi-caret-up-fill"></i> : <i className="bi bi-caret-down-fill"></i>}
                            </th>
                            <th onClick={() => handleSort('NombreMadre')}>
                                Nombre de la Madre
                                {order.NombreMadre === 'asc' ? <i className="bi bi-caret-up-fill"></i> : <i className="bi bi-caret-down-fill"></i>}
                            </th>
                            <th onClick={() => handleSort('Grado')}>
                                Grado
                                {order.Grado === 'asc' ? <i className="bi bi-caret-up-fill"></i> : <i className="bi bi-caret-down-fill"></i>}
                            </th>
                            <th onClick={() => handleSort('Seccion')}>
                                Sección
                                {order.Seccion === 'asc' ? <i className="bi bi-caret-up-fill"></i> : <i className="bi bi-caret-down-fill"></i>}
                            </th>
                            <th onClick={() => handleSort('FechaIngreso')}>
                                Fecha de Ingreso
                                {order.FechaIngreso === 'asc' ? <i className="bi bi-caret-up-fill"></i> : <i className="bi bi-caret-down-fill"></i>}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAlumnos.map(alumno => (
                            <tr key={alumno.Id}>
                                <td>{alumno.Id}</td>
                                <td>{alumno.NombreCompleto}</td>
                                <td>{alumno.FechaNacimiento}</td>
                                <td>{alumno.NombrePadre}</td>
                                <td>{alumno.NombreMadre}</td>
                                <td>{alumno.Grado}</td>
                                <td>{alumno.Seccion}</td>
                                <td>{alumno.FechaIngreso}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    {/* Implementación de la paginación */}
                </ul>
            </nav>
            {/* Agregar el botón de color verde "Nuevo" que dirige a otra página */}
          
        </div>
    );
};

export default AlumnosReporte;
