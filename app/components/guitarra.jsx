import { Link } from "@remix-run/react"
export default function Guitarra({guitarra}) {
  
  const { descripcion, imagen, precio, url, nombre } = guitarra

  const texto = Array.isArray(descripcion)
    ? descripcion.map((desc) =>
        desc.children.map((descrip) => descrip.text)
      )
    : descripcion

  return (
	<div className="guitarra">
    <img src={imagen.data.attributes.formats.medium.url} alt={`Imagen Guitarra ${nombre}`} />
    <div className="contenido">
      <h3>{nombre}</h3>
      <p className="descripcion">{texto}</p>
      <p className="precio">${precio}</p>
      <Link className="enlace" to={`/guitarra/${url}`}>Ver Producto</Link>
    </div>
  </div>
  )
}