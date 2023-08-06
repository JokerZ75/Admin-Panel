import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Test } from "./pages";
import Layout from "./components/Layout";
import { DarkModeProvider } from './lib/context/darkModeContext';
function App() {
  return (
    <>
    <DarkModeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Layout><Home/></Layout>} />
              <Route path="/test" element={<Layout><Test /></Layout>} />
            </Route>
          </Routes>
        </BrowserRouter>
    </DarkModeProvider>
    </>
  );
}

export default App;
