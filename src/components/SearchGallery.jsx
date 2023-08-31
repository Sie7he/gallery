import React, { useContext, useEffect, useState } from 'react'
import { getImg } from '../services/request';
import { useNavigate, useParams } from 'react-router-dom';
import { flushSync } from 'react-dom';
import { Contexto } from '../services/Memory';


export const SearchGallery = () => {

    const {VITE_API_KEY, VITE_URL} = import.meta.env
    const { query } = useParams();
    const [state, dispatch] = useContext(Contexto);
    const [page, setPage] = useState(1)
    const url = `${VITE_URL}/search/photos?page=${page}&per_page=12&query=${query}&client_id=${VITE_API_KEY}`
    const navigate = useNavigate();
    const handleClick = (id) => {

        if (!document.startViewTransition) {
            navigate(`/${id}`)
        }
        document.startViewTransition(() => {
            flushSync(() => navigate(`/${id}`))
        }
        )
    }
    useEffect(() => {
        async function getItems() {
            try {
                const response = await getImg(url);
                dispatch({ tipo: 'mostrarBusqueda', fotos: response.results })
            } catch (error) {
                console.error('Error: ', error)
            }

        }
        getItems();
    }, [dispatch, query, url])
    return (

        <main className="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(Math.ceil(state.orden.length / 3))].map((photo, i) => {
                    return (
                        <div className="grid gap-4" key={i}>
                            {...state.orden.slice(i * 3, i * 3 + 3).map((id, j) => {
                                const imagenes = state.objetos[id];
                                return (
                                    <picture onClick={() => handleClick(imagenes.id)} key={j} className='cursor-pointer'>
                                        <img src={imagenes.urls.small}
                                            className='h-full max-w-full rounded-lg object-fill object-center '
                                            alt={imagenes.alt_description}
                                            style={{viewTransitionName: `imagen-${imagenes.id}`}}
                                        />
                                    </picture>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            <div class="flex justify-between m-4 p-4">
  {page > 1 ? <button onClick={() => setPage(page-1)}
   className="flex items-center justify-center px-3 h-8 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 ">
    <svg className="w-3.5 h-3.5 mr-2" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
    </svg>
    Anterior
  </button>
  :
  ''
  }
  <button 
    onClick={()=>setPage(page+1)}
    className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 ">
    Siguiente
    <svg className="w-3.5 h-3.5 ml-2" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
    </svg>
  </button>
</div>
        </main>


    )
}
