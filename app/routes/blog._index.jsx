import { useLoaderData } from '@remix-run/react' 
import { getPosts } from '../API/posts.server'
import ListadoPosts from '../components/listado_posts'

export function meta(){
  return (
    [
      { title: 'GuitarLA - Nuestro Blog' },
		  { descripcion: 'GuitarLa, Blog de música y venta de guitarras' },
    ]
  )
}

export async function loader(){
  const posts = await getPosts()
  return posts?.data
}

function Blog() {
  const posts = useLoaderData()
  return (
      <ListadoPosts
        posts={posts}
      />
  )
}

export default Blog