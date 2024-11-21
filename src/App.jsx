import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import { ProductDetails } from './components/ProductDetails';
import { Layout } from './components/Layout';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';
import { ModelForm } from './components/models/ModelForm';
import { ModelProfile } from './components/models/ModelProfile';
import { EventDetails } from './components/events/EventDetails';
import { PhotoDetails } from './components/photos/PhotoDetails';
import { AdminDashboard, EventList, MembershipSignup, ModelList, PhotoGallery,
  Products, } from './pages';
import { AdminModels } from './components/admin/AdminModels';
import { AdminProducts } from './components/admin/AdminProducts';
 


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        {/* Usamos el `Layout` aquí y `Outlet` se encargará de renderizar las rutas hijas */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
          <Route index element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path='/models' element={<ModelList/>}></Route>
          <Route path="/models/create" element={<ModelForm />} />
          <Route path="/models/:id" element={<ModelProfile />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/photos" element={<PhotoGallery/>}/>
          <Route path="/photos/:id" element={<PhotoDetails />} />
          <Route path='membership' element={<MembershipSignup/>}/>
          <Route path='/admin' element={<AdminDashboard/>}>
            <Route path="models" element={<AdminModels />} />
            <Route path="products" element={<AdminProducts />} />
          </Route>

        </Route>
      </Routes>
    </Router>
  )
}

export default App
