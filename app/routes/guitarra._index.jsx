import { useLoaderData } from "@remix-run/react"
import { getGuitarras } from "../API/guitarras.server"
import ListadoGuitarras from '../components/listado_guitarras'

export function meta(){
  return (
    [
      { title: 'GuitarLA - Tienda de Guitarras' },
      { descripcion: 'Nuestra colección de Guitarras' }
    ]
  )
};

export async function loader(){
  const guitarras = await getGuitarras()
  return guitarras.data
}

function Tienda() {
  const guitarras = useLoaderData()
  return (
      <ListadoGuitarras
        guitarras={guitarras}
      />
  )
}

export default Tienda