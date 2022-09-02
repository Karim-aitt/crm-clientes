import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const VerCliente = () => {
	const [cliente, setCliente] = useState({});
	const [cargando, setCargando] = useState(true);

	const { id } = useParams();

	useEffect(() => {
		
		const obtenerClienteApi = async () => {
			try {
				const url = `http://localhost:4000/clientes/${id}`;
				const respuesta = await fetch(url);
				const resultado = await respuesta.json();
				setCliente(resultado);
			} catch (error) {
				console.log(error);
			}
			// Sirve para cambiar al valor contrario de cargando
			setCargando(!cargando);
			
		};
		obtenerClienteApi();
	}, []);

	return cargando ? <Spinner /> : 
	Object.keys(cliente).length === 0 ? <p>No hay resultados</p> : 
	(
		<div>
			<>
				<h1 className="text-blue-800 uppercase text-3xl font-bold ">
					Ver Cliente: {cliente.nombre}
				</h1>
				<p className="text-gray-600 font-semibold">Información del Cliente</p>

				<p className="text-2xl text-gray-600 mt-4">
					<span className="text-gray-800 uppercase font-bold ">Cliente: </span>
					{cliente.nombre}
				</p>
				<p className="text-2xl text-gray-600 mt-4">
					<span className="text-gray-800 uppercase font-bold ">Empresa: </span>
					{cliente.empresa}
				</p>
				<p className="text-2xl text-gray-600 mt-4">
					<span className="text-gray-800 uppercase font-bold ">Email: </span>
					{cliente.email}
				</p>
				{cliente.telefono && (
					<p className="text-2xl text-gray-600 mt-4">
						<span className="text-gray-800 uppercase font-bold ">
							Telefono:{" "}
						</span>
						{cliente.telefono}
					</p>
				)}
				{cliente.notas && (
					<p className="text-2xl text-gray-600 mt-4">
						<span className="text-gray-800 uppercase font-bold ">Notas: </span>
						{cliente.notas}
					</p>
				)}
			</>
		</div>
	);
};

export default VerCliente;
