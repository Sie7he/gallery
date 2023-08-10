import React, { useEffect, useState } from 'react'
import { getImg } from '../services/request';
import { Link, useNavigate } from 'react-router-dom';
import { flushSync } from 'react-dom';

export const Grid = () => {

    const url = 'https://api.unsplash.com/photos/?client_id=R8DT-ZH2fRH0v0giTIuIyMoozd2pI6LC7Ew8gUTKOYI'
    const [imagen, setImagen] = useState([]);
    const navigate = useNavigate();

    const handleClick = (id) => {

        if (!document.startViewTransition) {
            navigate(id)
        }

        document.startViewTransition(() => {
            
            flushSync(() => navigate(id))
        }

        )

    }

    useEffect(() => {
        async function getItems() {
            const response = await getImg(url)
            setImagen(response);
            console.log(response)
        }
        getItems();
    }, [])


    return (
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
            <div className="-m-1 flex flex-wrap md:-m-2">{


                [...Array(Math.ceil(imagen.length / 3))].map((fila, i) => {
                    return (
                        <div className="flex w-1/2 flex-wrap" key={i}>
                            {imagen.slice(i * 3, i * 3 + 3).map((img, j) => {
                                return (
                                    j % 3 === 0 ?

                                        <div className="w-full p-1 md:p-2 relative cursor-pointer" key={j} onClick={() => handleClick(img.id)}>
                                            
                                            <picture  style={{viewTransitionName:`${img.id}`}} >
                                            <img
                                                alt={img.alt_description}
                                                className="block h-full w-full rounded-lg object-cover object-center"
                                                src={img.urls.regular}
                                               


                                            />
                                            </picture>
                                            <div className="absolute flex justify-center items-center rounded-lg bottom-2 right-2 top-2 left-2 p-20 opacity-0 bg-gray-800 sm:hover:opacity-70 transition delay-75">
                                                <h3 className="sm:text-xl text-sm text-white text-center font-bold hidden sm:block">
                                                    {img.alt_description}</h3>

                                            </div>

                                        </div>

                                        :

                                        <div className="w-1/2 p-1 md:p-2 relative cursor-pointer" key={j} onClick={() => handleClick(img.id)}>
                                            <img
                                                alt={img.alt_description}
                                                className="block h-full w-full rounded-lg object-cover object-center"
                                                src={img.urls.full}
                                                style={{viewTransitionName: `${img.id}`}}
                                            />
                                            <div className="absolute flex justify-center items-center rounded-lg bottom-2 right-2 top-2 left-2 p-10 opacity-0 sm:bg-gray-800 hover:opacity-70 transition delay-75">
                                                <h3 className="text-xl text-white hidden sm:block">
                                                    {img.alt_description}</h3>

                                            </div>
                                        </div>
                                )
                            }
                            )


                            }
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
