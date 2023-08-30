import React, { useContext, useEffect, useState } from 'react'
import { getImg } from '../services/request';
import { useNavigate, useParams } from 'react-router-dom';
import { flushSync } from 'react-dom';
import { Contexto } from '../services/Memory';


export const SearchGallery = () => {

    const {VITE_API_KEY} = import.meta.env
    const { query } = useParams();
    const [state, dispatch] = useContext(Contexto);
    const [page, setPage] = useState(1)
    const url = `https://api.unsplash.com/search/photos?page=${page}&per_page=12&query=${query}&client_id=${VITE_API_KEY}`
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
    }, [dispatch, query])
    return (

        <main className="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(Math.ceil(state.orden.length / 3))].map((photo, i) => {
                    return (
                        <div className="grid gap-4" key={i}>
                            {...state.orden.slice(i * 3, i * 3 + 3).map((id) => {
                                const imagenes = state.objetos[id];
                                return (
                                    <picture onClick={() => handleClick(imagenes.id)} className='cursor-pointer'>
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
        </main>


    )
}
