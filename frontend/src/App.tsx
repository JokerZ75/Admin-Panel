import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Orders, Graphs, Profile } from "./pages";
import Layout from "./components/Layout";
import { DarkModeProvider } from "./lib/context/darkModeContext";
function App() {
  return (
    <>
      <DarkModeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
              <Route
                path="/orders"
                element={
                  <Layout>
                    <Orders />
                  </Layout>
                }
              />
              <Route
                path="/graphs"
                element={
                  <Layout>
                    <Graphs />
                  </Layout>
                }
              />
              <Route
                path="/profile"
                element={
                  <Layout>
                    <Profile />
                  </Layout>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </DarkModeProvider>
    </>
  );
}

export default App;
