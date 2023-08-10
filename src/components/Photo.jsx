import React, { useEffect, useState } from 'react'
import { getImg } from '../services/request';
import { useParams } from 'react-router-dom';

export const Photo = () => {

    const { id } = useParams()
    const url = `https://api.unsplash.com/photos/${id}?client_id=R8DT-ZH2fRH0v0giTIuIyMoozd2pI6LC7Ew8gUTKOYI`
    const [imagen, setImagen] = useState('');

    useEffect(() => {
        async function getPhoto() {
            try {
                const response = await getImg(url);
                setImagen(response)
                console.log(response)
            } catch (error) {
                console.log("Error fetching image:", error)
            }
        }
        getPhoto();
    }, [])

    return (

        <main className='m-auto max-w-4xl'>
            <div className='grid grid-cols-[350PX_1fr] gap-x-12 mt-20'>

                <div className='flex flex-col'>
                    <picture className='mb-8 w-full relative'>
                    {imagen.urls ? 
            <img
                alt={imagen.alt_description}
                className="aspect-[389/500] h-full object-cover w-full max-w-full rounded"
                src={imagen.urls.regular} 
                style={{viewTransitionName: `${imagen.id}`}}
                />
                :
                ''
            }
                    </picture>
                </div>
                <aside>
                    <h1 className='text-5xl font-black mb-4'>{imagen.alt_description}</h1>
                    <p className='text-lg'>{imagen.description}</p>
                </aside>
            </div>

            </main>

          
            
            
            
       
    )
}