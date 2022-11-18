import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/layout';
import Home from './Pages/Home/Home';
import Login from './Pages/auth/LogIn';
import DashLayout from './components/DashLayout/DashLayout';
import ProductsList from './Pages/Products/GetProducts';
import UsersList from './Pages/Users/GetUsers';
import EditUser from './Pages/Users/PatchUser';
import NewUser from './Pages/Users/PostUserForm';

import Prefetch from './Pages/auth/Prefetch';
import PersistLogin from './Pages/auth/PersistLogin';
import RequireAuth from './Pages/auth/RequireAuth';
import { ROLES } from './config/roles';
import useTitle from './hooks/useTitle';

function App() {
  useTitle('LandDom Shop')

  return (
    <Routes >
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />} >
            <Route element={<Prefetch />}>

              <Route path='dash' element={<DashLayout />} >
                <Route path='products'>
                  <Route index element={<ProductsList />} />
                </Route>
                <Route path='users'>
                  <Route index element={<UsersList />} />
                  <Route path=':id' element={<EditUser />} />
                  <Route path=':new' element={<NewUser />} />
                </Route>
              </Route>

            </Route>
          </Route>
        </Route>

      </Route >
    </Routes >
    
  );
}

export default App;