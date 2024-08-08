import React from "react";
import { Route, Routes } from "react-router";
import { Grid } from "../components/Home";
import { Photo } from "../components/Photo";
import { NotFounded } from "../components/NotFounded";
import { BrowserRouter } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { SearchGallery } from "../components/SearchGallery";
import Modal from "../components/Modal";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <SearchBar />
      <Routes>
        <Route>
          <Route path="/" element={<Grid />} />

          <Route
            path="/:id"
            element={
              <Modal>
                <Photo />
              </Modal>
            }
          />

          <Route path="/buscar/:query" element={<SearchGallery />} />

          <Route path="*" element={<NotFounded />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
