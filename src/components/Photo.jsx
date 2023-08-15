import React, { useContext, useEffect, useState } from 'react'
import { getImg } from '../services/request';
import { useNavigate, useParams } from 'react-router-dom';
import { flushSync } from 'react-dom';
import { Contexto } from '../services/Memory';

export const Photo = () => {

    const navigate = useNavigate();
    const { id } = useParams()
    const url = `https://api.unsplash.com/photos/${id}?client_id=R8DT-ZH2fRH0v0giTIuIyMoozd2pI6LC7Ew8gUTKOYI`
    const [state, dispatch] = useContext(Contexto);
    const img = state.objetos[id];
   

    useEffect(() => {
        async function getPhoto() {
            try {
                const response = await getImg(url);
                dispatch({tipo : 'mostrarUnaFoto', response} )
                
            } catch (error) {
                console.log("Error fetching image:", error)
            }
        }
        getPhoto();
    }, [dispatch])

console.log(state)
    return (
       img && 
         
        <main className='m-auto max-w-4xl photo'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-12 mt-20 mx-4'>

                <div className='flex flex-col'>
                    <picture className='mb-8 w-full relative'>
                       
                            <img
                                alt={img.alt_description}
                                className="aspect-[28/29] h-full object-fill w-full max-w-full rounded pic-two"
                                src={img.urls.small}
                                style={{ viewTransitionName: `imagen-${img.id}` }}
                            />
                           
                    </picture>
                </div>
                <aside>
                    <h1 className='text-3xl text-amber-700 '>{img.alt_description.toUpperCase()}</h1>
                    <h2 className='text-lg text-slate-500'>Autor: {img.user.username}</h2>
                    <p className='text-lg'>{img.description}</p>
                </aside>
            </div>

        </main>
        
    
    )
}

