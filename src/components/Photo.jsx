import React, { useEffect, useState } from 'react'
import { getImg } from '../services/request';
import { useNavigate, useParams } from 'react-router-dom';
import { flushSync } from 'react-dom';

export const Photo = () => {

    const navigate = useNavigate();
    const { id } = useParams()
    const url = `https://api.unsplash.com/photos/${id}?client_id=R8DT-ZH2fRH0v0giTIuIyMoozd2pI6LC7Ew8gUTKOYI`
    const [img, setImagen] = useState('');

    const handleClick = () => {

        if (!document.startViewTransition) {
            navigate('/')
        }
        document.startViewTransition(() => {      
            flushSync(() => navigate('/'))
        }
     )
    }

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
<>
        <header>
        <button onClick={handleClick}> Volver </button>
        </header>
        <main className='m-auto max-w-4xl'>
            <div className='grid grid-cols-2 gap-x-12 mt-20'>

                <div className='flex flex-col'>
                    <picture className='mb-8 w-full relative'>
                    {img.urls ? 
            <img
                alt={img.alt_description}
                className="aspect-[389/500] h-full object-cover w-full max-w-full rounded"
                src={img.urls.regular} 
                style={{viewTransitionName:`${img.id}`}}
                />
                :
                ''
            }
                    </picture>
                </div>
                <aside>
                    <h1 className='text-5xl font-black mb-4'>{img.alt_description}</h1>
                    <p className='text-lg'>{img.description}</p>
                </aside>
            </div>

            </main>

          
            </> 
            
            
       
    )
}
