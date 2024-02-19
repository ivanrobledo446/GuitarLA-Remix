import { useState } from 'react'
import { useLoaderData, useRouteError, isRouteErrorResponse, Link, useOutletContext } from "@remix-run/react"
import { getGuitarra } from "../API/guitarras.server"

/* Manejo de Errores */
export function ErrorBoundary(){
    const error = useRouteError()

    if(isRouteErrorResponse(error)){
        return (
				<div>
					<p className='error'>{error.status} {error.statusText}</p>
					<Link className='error-enlace' to='/'>Tal vez quieras volver a la página principal</Link>
				</div>
        )
    }
	return <p className='error'>Error Desconocido</p>
}

export async function loader({params}){
	const { guitarraUrl } = params
	const guitarra = await getGuitarra( guitarraUrl )
	
	if(guitarra.data.length === 0 ){
		throw new Response('',{
			status: 400,
			statusText: 'Guitarra No Encontrada'
		})
	}
	return guitarra
}

export function meta({data}) {
	if (!data || !data.data || data.data.length === 0) { // Verifica si no hay datos o los datos están vacíos
	  return [
		{ title: 'GuitarLA - Guitarra No Encontrada' },
		{ descripcion: 'Guitarras, venta de guitarras, guitarra no encontrada' },
	  ];
	}
   
	// Resto del código para el caso de éxito
	return [
	  { title: `GuitarLA - ${data.data[0].attributes.nombre}` },
	  { descripcion: `Guitarras, venta de guitarras, guitarra ${data.data[0].attributes.nombre}` },
	];
  }

function Guitarras() {

	const { agregarCarrito } = useOutletContext()

	const [ cantidad, setCantidad] = useState(0)
	const guitarra = useLoaderData()
	const { nombre, descripcion, precio, imagen } = guitarra.data[0].attributes

	const descrip = Array.isArray(descripcion)
    ? descripcion.map((desc) =>
        desc.children.map((descrip) => descrip.text)
      )
    : descripcion

	const handleSubmit = e => {
		e.preventDefault()

		if(cantidad < 1){
			alert('Debes seleccionar una cantidad')
			return	
		}

		const guitarraSelecionada = {
			id: guitarra.data[0].id,
			imagen: imagen.data.attributes.url,
			nombre,
			precio,
			cantidad
		}
		
		agregarCarrito(guitarraSelecionada)
	}

	return (
	  <div className="guitarra">
		<img className="imagen" src={imagen.data.attributes.url} alt={`Imagen de la guitarra ${nombre}`} />

		<div className='contenedor'>
			<h3>{nombre}</h3>
			<p className='texto'>{descrip}</p>
			<p className='precio'>${precio}</p>

			<form onSubmit={handleSubmit} className='formulario'>
				<label htmlFor='cantidad'>Cantidad</label>
				<select
					onChange={ e => setCantidad(+e.target.value)}
					id='cantidad'
				>
					<option value="0">--Seleccione--</option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select>

				<input
					type='submit'
					value='Agregar al carrito'
				/>
			</form>
		</div>
	  </div>
	)
  }
  
  export default Guitarras