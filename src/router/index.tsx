import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "src/layouts/MainLayout";
import FeedbackForm from "src/pages/FeedbackForm";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<FeedbackForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
