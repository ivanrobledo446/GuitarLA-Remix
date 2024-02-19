import Imagen from '../../public/img/nosotros.jpg'
import styles from '../styles/nosotros.css'

export function meta(){
  return (
    [
      { title: 'GuitarLA - Sobre Nosotros' },
      { desciption: 'Venta de Guitarras, Blog de Música' }
    ]
  )
};

export function links(){
  return [
    {
      rel: 'stylesheet',
      href: styles
    },
    {
      rel: 'preload',
      href: Imagen,
      as: 'image'
    }
  ]
};

function Nosotros() {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>

      <div className="contenido">
        <img src={Imagen} alt="Imagen sobre Nosotros" />

        <div>
          <p>Nunc interdum id sem ut volutpat. Suspendisse potenti. Curabitur tincidunt tellus non efficitur pretium. Integer vel magna erat. Nunc efficitur magna a pharetra mattis. Quisque eget magna ligula. Etiam nisi ex, vehicula eu nisl eget, tempor molestie justo. Pellentesque sit amet convallis ex.</p>
          <p>Nunc interdum id sem ut volutpat. Suspendisse potenti. Curabitur tincidunt tellus non efficitur pretium. Integer vel magna erat. Nunc efficitur magna a pharetra mattis. Quisque eget magna ligula. Etiam nisi ex, vehicula eu nisl eget, tempor molestie justo. Pellentesque sit amet convallis ex.</p>
        </div>
      </div>
    </main>
  )
}

export default Nosotros