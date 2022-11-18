import { store } from '../../app/store'
import { productsApiSlice } from '../Products/productsApiSlice'
import { usersApiSlice } from '../Users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {

    useEffect(() => {
        store.dispatch(productsApiSlice.util.prefetch('getProducts', 'productList', { force: true }))
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
    }, [])

    return <Outlet />
}
export default Prefetch