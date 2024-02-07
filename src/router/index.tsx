import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "src/layouts/MainLayout";
import Error from "src/pages/Error/Error";
import From from "src/pages/Form/Form";
import Submitted from "src/pages/Submitted/Submitted";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<From />} />
          <Route path="submitted" element={<Submitted />} />
          <Route path="error" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
