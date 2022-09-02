import { useState, useEffect } from "react";

import Cliente from "../components/Cliente";

const Inicio = () => {
	const [clientes, setClientes] = useState([]);

	useEffect(() => {
		const obtenerClientesAPI = async () => {
			try {
				const url = "http://localhost:4000/clientes";
				const respuesta = await fetch(url);
				const resultado = await respuesta.json();
				setClientes(resultado);
			} catch (error) {}
		};
		obtenerClientesAPI();
	}, []);

	const handleEliminar = async id => {
		const confirmar = confirm("¿Deseas eliminar este cliente?")
		if(confirmar){
			// Eliminamos el usuario con la id
			try {
				const url = `http://localhost:4000/clientes/${id}`
				const respuesta = await fetch(url, {
					method: "DELETE"
				})
				await respuesta.json()

				// Actualizamos el state de Clientes con todos menos con el que hemos eliminado
				const arrayClientes = clientes.filter(cliente => cliente.id !== id)
				setClientes(arrayClientes)

			} catch (error) {
				console.log(error)
			}
		}

	}

	return (
		<>
			<h1 className="font-black text-4xl text-blue-900">Clientes</h1>
			<p className="mt-3">Administra tus clientes</p>

      {/* Tabla donde se muestran los clientes */}
			<table className="w-full mt-5 table-auto shadow bg-white">
        {/* head de la tabla con las categorias de datos */}
				<thead className="bg-blue-800 text-white">
					<tr>
						<th className="p-2">Nombre</th>
						<th className="p-2">Contacto</th>
						<th className="p-2">Empresa</th>
						<th className="p-2">Acciones</th>
					</tr>
				</thead>
        {/* body de la tabla con todos los clientes mapeados*/}
				<tbody>
          {clientes.map(cliente => (
            <Cliente 
              key={cliente.id}
              cliente={cliente}
			  handleEliminar={handleEliminar}
            />
          ))}
        </tbody>
			</table>
		</>
	);
};

export default Inicio;
