import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Test } from "./pages";
import Layout from "./components/Layout";
function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="/test" element={<Test />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
