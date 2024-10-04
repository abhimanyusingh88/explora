import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
 import Product from "./pages/Product";
 import Pricing from "./pages/Pricing";
 import Homepage from "./pages/Homepage";
 import Login from "./pages/Login";
 import Form from "./Components/Form";
//  import Error from "./pages/Error";
 import Applayout from "./pages/Applayout"
import CityList from "./Components/CityList";
// import { useEffect, useState } from "react";
import CountryList from "./Components/CountryList";
import City from "./Components/City";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import PageNotFound from "./pages/PageNotFound"
// import PageNav from "./Components/PageNav";

function App()
{
 
  return ( <AuthProvider>
<CitiesProvider>
    {/* this part will always remain intact wherever page you visit */}
    {/* <h1>Hello</h1> */}
    {/* <Applayout/> */}
    {/* <PageNav/> */}
    {/* routing using react router */}
    {/* <PageNav/> */}
    <BrowserRouter>
  <Routes>
    <Route path="product" element={<Product/>}/>
    <Route path="pricing" element={<Pricing/>}/>
    <Route index element={<Homepage/>}/>
    <Route path="homepage" element={<Homepage/>}/>
    <Route path="login" element={<Login/>}/>
    <Route path="app" element={<Applayout/>}>
    <Route index element={<Navigate replace to="cities" />} />

    <Route path="cities" element={<CityList/>}/>
    {/* here we created a route linked to city used to store State using url */}
    <Route path="cities/:id" element={<City/>}/>
    <Route path="countries" element={<CountryList />}/>
    <Route path="form" element={<Form/>}/>
        </Route >
    {/* when no valid rooute will be found this will be shown */}
    <Route path="*" element={<PageNotFound/>}/>

  </Routes>
  </BrowserRouter>
  </CitiesProvider> 
  </AuthProvider>)
 
} export default App;