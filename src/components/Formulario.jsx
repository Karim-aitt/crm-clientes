import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

import Alerta from "./Alerta";
import Spinner from "./Spinner";

import * as Yup from "yup";

const Formulario = ({ cliente, cargando }) => {
	const navigate = useNavigate();

	const nuevoClienteSchema = Yup.object().shape({
		nombre: Yup.string()
			.min(3, "El nombre es muy corto") //Cantidad minima de letras que acepta este campo
			.max(30, "El nombre es muy largo") //Cantidad maxima de letras que acepta este campo
			.required("El Nombre del Cliente es Obligatorio"), // es requerido este campo
		empresa: Yup.string()
        .max(30, "El nombre es muy largo")
        .required("El Nombre de la empresa es obligatorio"),
		email: Yup.string()
			.email("Email no valido")
			.required("El Email es obligatorio"),
		// A veces la validación no deja escribir texto, para ello escribimos typeError("texto")
		telefono: Yup.number().typeError("Número no valido"),
	});

	const handleSubmit = async (valores) => {
		try {
            let respuesta

			if(cliente.id){
                // Editando un registro
                const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`; //Clientes se genera automaticamente en base a lo que haya en db.json
                respuesta = await fetch(url, {
                    method: "PUT",
                    body: JSON.stringify(valores),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

            } else {
                // Nuevo registro
                const url = import.meta.env.VITE_API_URL; //Clientes se genera automaticamente en base a lo que haya en db.json
                respuesta = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(valores),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                
            }

            await respuesta.json();
            navigate("/clientes")

		} catch (error) {}
	};
	// -----------------------------------------------------------------------------------RETURN
	return cargando ? (
		<Spinner />
	) : (
		<div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
			<h1 className="text-gray-600 font-bold text-xl uppercase text-center">
				{cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
			</h1>

			<Formik
				initialValues={{
					nombre: cliente?.nombre ?? "", //Si existe cliente usa .nombre, sino, usa ""
					empresa: cliente?.empresa ?? "",
					email: cliente?.email ?? "",
					telefono: cliente?.telefono ?? "",
					notas: cliente?.notas ?? "",
				}}
				// Esto hace que se vuelva a ejecutar el componente y tome nuevos valores
				// en caso de que los haya
				enableReinitialize={true}
				onSubmit={async (values, { resetForm }) => {
					await handleSubmit(values);
					resetForm();
					navigate("/clientes");
				}}
				validationSchema={nuevoClienteSchema}
			>
				{({ errors, touched }) => {
					return (
						<Form className="mt-10">
							<div className="mb-4">
								<label className="text-gray-800" htmlFor="nombre">
									Nombre:
								</label>
								<Field
									id="nombre"
									type="text"
									className="mt-2 block w-full p-3 bg-gray-200"
									placeholder="Nombre del Cliente"
									name="nombre"
								/>
								{/* touched lo que hace es que tenga validacion en tiempo real y no es
                necesario esperar a que clicken en el boton */}
								{errors.nombre && touched.nombre ? (
									<Alerta>{errors.nombre}</Alerta>
								) : null}
							</div>
							<div className="mb-4">
								<label className="text-gray-800" htmlFor="empresa">
									Empresa:
								</label>
								<Field
									id="empresa"
									type="text"
									className="mt-2 block w-full p-3 bg-gray-200"
									placeholder="Empresa del Cliente"
									name="empresa"
								/>
								{errors.empresa && touched.empresa ? (
									<Alerta>{errors.empresa}</Alerta>
								) : null}
							</div>
							<div className="mb-4">
								<label className="text-gray-800" htmlFor="email">
									Email:
								</label>
								<Field
									id="email"
									type="email"
									className="mt-2 block w-full p-3 bg-gray-200"
									placeholder="Email"
									name="email"
								/>
								{errors.email && touched.email ? (
									<Alerta>{errors.email}</Alerta>
								) : null}
							</div>
							<div className="mb-4">
								<label className="text-gray-800" htmlFor="telefono">
									Telefono:
								</label>
								<Field
									id="telefono"
									type="tel"
									className="mt-2 block w-full p-3 bg-gray-200"
									placeholder="Telefono"
									name="telefono"
								/>
								{errors.telefono && touched.telefono ? (
									<Alerta>{errors.telefono}</Alerta>
								) : null}
							</div>
							<div className="mb-4">
								<label className="text-gray-800" htmlFor="notas">
									Notas:
								</label>
								<Field
									as="textarea"
									id="notas"
									type="text"
									className="mt-2 block w-full p-3 bg-gray-200 h-40"
									placeholder="Notas del Cliente"
									name="notas"
								/>
							</div>
							<input
								type="submit"
								value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
								className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
							/>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

// Esto funciona como los parametros por default, si no estan presenten los props, entra
// los defaultProps, si están presente los pros, toma los valores de ellos.
// Es decir: si cliente existe lo usa, si no, usa defaultprops
Formulario.defaultProps = {
	cliente: {},
    cargando: false
};

export default Formulario;
