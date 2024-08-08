import React, { useContext, useEffect, useState } from "react";
import { getImg } from "../services/request";
import { useNavigate, useParams } from "react-router-dom";
import { flushSync } from "react-dom";
import { Contexto } from "../services/Memory";

export const Photo = () => {
  const { VITE_API_KEY, VITE_URL } = import.meta.env;
  const { id } = useParams();
  const url = `${VITE_URL}/photos/${id}?client_id=${VITE_API_KEY}`;
  const [state, dispatch] = useContext(Contexto);
  console.log(state)
  const img = state.objetos[id];

  useEffect(() => {
    async function getPhoto() {
      try {
        const response = await getImg(url);
        dispatch({ tipo: "mostrarUnaFoto", response });
      } catch (error) {
        console.log("Error fetching image:", error);
      }
    }
    getPhoto();
  }, [dispatch, url]);

  return (
    img && (
      <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative">
        <img
          src={img.urls.regular}
          alt={img.alt_description}
          className="w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent text-white p-4 w-full">
          <h2 className="text-xl font-semibold capitalize">{img.user.name}</h2>
          <p className="text-sm capitalize">{img.alt_description}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <img
              src={img.user.profile_image.small}
              alt={img.user.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <h3 className="text-gray-900 font-semibold">{img.user.name}</h3>
              <p className="text-gray-600 text-sm">@{img.user.username}</p>
            </div>
          </div>
          <a
            href={img.links.html}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Ver en Unsplash
          </a>
        </div>
        <div className="flex justify-between items-center text-gray-700">
          <span>{img.likes} Me gusta</span>
          <span>{new Date(img.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>

      
      
    )
  );
};
