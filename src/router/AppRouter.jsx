import React from 'react';
import {
    Route,
    Routes
  } from "react-router";
import { Grid } from '../components/Grid';
import { Photo } from '../components/Photo';
import { NotFounded } from '../components/NotFounded';
import { BrowserRouter } from 'react-router-dom';

export const AppRouter = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route >

       
        <Route path='/' element={<Grid />} />

        <Route path='/:id' element={<Photo />} />

        <Route path='*' element={<NotFounded />} />
        </Route>
    </Routes>
    </BrowserRouter>
  )
}
