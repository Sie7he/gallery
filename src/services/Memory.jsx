import { createContext, useReducer } from "react";

const lista = []
const estadoInicial = {
    orden: [],
    objetos: {}
}

function reductor(estado, accion) {

    switch (accion.tipo) {
        case 'mostrar': {
            const fotos = accion.fotos;
            const nuevoEstado = {
                orden: fotos.map(foto => foto.id),
                objetos: fotos.reduce((objeto, foto) => ({...objeto, [foto.id]: foto}), {})
            };
            return nuevoEstado;
        };
        case 'mostrarBusqueda': {
            const fotos = accion.fotos;
            const nuevoEstado = {
                orden: fotos.map(foto => foto.id),
                objetos: fotos.reduce((objeto, foto) => ({...objeto, [foto.id]: foto}), {})
            };
            return nuevoEstado;
        };
        case 'mostrarUnaFoto' : {
            const foto = accion.response;
            const nuevoEstado = {
                orden: [foto.id],
                objetos : {[foto.id]: foto}
            };
            return nuevoEstado;
        };
        default: 
        throw new Error();
    }
}

reductor(estadoInicial, {tipo: 'mostrar', fotos : lista})

export const Contexto = createContext(null);

function Memory({ children }) {

    const [state, dispatch] = useReducer(reductor, estadoInicial)

    return (
        <Contexto.Provider value={[state, dispatch]}>
            {children}
        </Contexto.Provider>
    )
}

export default Memory;