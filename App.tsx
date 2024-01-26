import React from "react"
import { HomePage, BookInfo, LoginPage, SiginIn, Korzina, CategoryBook ,Profil,Favorite,Order,Search} from "./Pages";
import { AdminSiginIn, ProtektRoute, Layout, Dashboard, AdminHome, AdminUsers, AdminBooks, AdminCategory ,AdminOrders,AudioAdmin,AdminAudio} from "./Pages/Admin"
import { Route, Routes, Navigate } from "react-router-dom";
import AdminAvtor from "./Pages/Admin/AdminAvtor/AdminAvtor";
import { searchModalReducers } from "./redux/searchBookSlice/searchBookSlice";
import { useAppDispatch } from "./redux/hooks/hooks";
import { Navbar } from "./companets";
function App() {
  const dispatch = useAppDispatch()
  const hendelClick = () => {
    dispatch(searchModalReducers(false))
  }
  return (
    <div onClick={() => hendelClick()}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={< Navigate to="/login" />} />
          <Route path="/book" element={<HomePage />} />
          <Route path="/bookInfo/:name/:id" element={<BookInfo />} />
          <Route path="/signup" element={<SiginIn />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/korzina" element={<Korzina />} />
          <Route path="/category/:category_name" element={<CategoryBook />} />
          <Route path="/profil" element={<Profil/>}/>
          <Route path="/favorite" element={<Favorite/>}/>
          <Route path="/Order" element={<Order/>}/>
          <Route path="/search" element={<Search/>}/>
        </Route>
        <Route path="/admin-siginIn" element={<AdminSiginIn />} />
        <Route element={<ProtektRoute />}>
          <Route path="" element={<Layout />}>
            <Route path="/admin" element={<Dashboard />}>
              <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
              <Route path="/admin/dashboard" element={<AdminHome />} />
              <Route path="/admin/books" element={<AdminBooks />} />
              <Route path="/admin/books/:id" element={<AdminBooks />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/category" element={<AdminCategory />} />
              <Route path="/admin/order" element={<AdminOrders/>}/>
              <Route path="/admin/author" element={<AdminAvtor/>}/>
              <Route path="/admin/author/:id" element={<AdminAvtor/>}/>
              <Route path="/admin/author_audio" element={<AudioAdmin/>}/>
              <Route path="/admin/author_audio/:id" element={<AudioAdmin/>}/>
              <Route path="/admin/audio" element={<AdminAudio/>}/>
              <Route path="/admin/audio/:id" element={<AdminAudio/>}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
