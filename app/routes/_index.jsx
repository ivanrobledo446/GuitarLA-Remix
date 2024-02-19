import { useLoaderData } from '@remix-run/react'
import { getGuitarras } from '../API/guitarras.server'
import { getPosts } from '../API/posts.server'
import { getCurso } from '../API/curso.server' 
import ListadoGuitarras from '../components/listado_guitarras'
import ListadoPosts from '../components/listado_posts'
import Curso from '../components/curso'
import stylesGuitarras from '../styles/guitarras.css'
import stylesPosts from '../styles/blog.css'
import stylesCurso from '../styles/curso.css'

export function meta(){

}

export function links(){
  return[
    {
      rel: 'stylesheet',
      href: stylesGuitarras
    },
    {
      rel: 'stylesheet',
      href: stylesPosts
    },
    {
      rel: 'stylesheet',
      href: stylesCurso
    }
  ]
}

export async function loader(){

  const [guitarras, posts, curso] = await Promise.all([
    getGuitarras(),
    getPosts(),
    getCurso()
  ])

  return {
    guitarras: guitarras.data,
    posts: posts.data,
    curso: curso.data
  }
}

function Index() {

  const datos = useLoaderData()
  const { guitarras, posts, curso} = datos

  return (
    <>
      <main className='contenedor'>
        <ListadoGuitarras
          guitarras={guitarras}
        />
      </main>

      <Curso
        curso={curso.attributes}
      />
       
      <section className='contenedor'>
        <ListadoPosts
          posts={posts}
        />
      </section>
    </>
  )
}

export default Index