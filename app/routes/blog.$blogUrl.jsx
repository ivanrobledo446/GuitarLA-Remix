import { useLoaderData, useRouteError, isRouteErrorResponse, Link} from "@remix-run/react"
import { getPost } from '../API/posts.server'
import { formatearFecha } from '../utils/helpers'

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
	const { postUrl } = params
	const post = await getPost(postUrl)
	
	if(post.data.length === 0 ){
		throw new Response('',{
			status: 400,
			statusText: 'Post No Encontrado'
		})
	}
	return post
}

export function meta({data}) {
	if (!data || !data.data || data.data.length === 0) { // Verifica si no hay datos o los datos están vacíos
	  return [
		{ title: 'GuitarLA - Post No Encontrado' },
		{ descripcion: 'Guitarras, venta de guitarras, post no encontrada' },
	  ];
	}
   
	// Resto del código para el caso de éxito
	return [
	  { title: `GuitarLA - ${data.data[0].attributes.titulo}` },
	  { descripcion: `Guitarras, venta de guitarras, guitarra ${data.data[0].attributes.titulo}` },
	];
  }

  export default function Post() {
	const post = useLoaderData();
  
	const { contenido, imagen, titulo, publishedAt } = post.data[0].attributes;
  
	const texto = Array.isArray(contenido)
	? contenido.map((cont) => (
		<p className='texto'>
			{cont.children.map((conte) => conte.text)}
		</p>
		))
	: <p className='texto'>{contenido}</p>;

  
	return (
	  <article className='post mt-3'>
		<img className='imagen' src={imagen.data.attributes.url} alt={`Imagen Blog ${titulo}`} />
		<div className='contenido'>
		  <h3>{titulo}</h3>
		  <p className='fecha'>{formatearFecha(publishedAt)}</p>
		  {texto}
		</div>
	  </article>
	);
  }  