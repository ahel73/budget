import {RouterProvider} from "react-router-dom";
import {router} from "./router/router";
import { useAppDispatch } from './store/hooks';
import { getTokenLocalStorage } from './helpers/localstorage.helper';
import { AuthService } from './services/auth.service';
import { login, logout } from './store/user/userSlice';
import { useEffect} from 'react'

function App() {
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    const token = getTokenLocalStorage();
    try {
      if (token) {
        const data = await AuthService.getMi();

        if (data) {
          dispatch(login(data));
        } else {
          dispatch(logout());
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkAuth();
  }, [])
  return <RouterProvider router={router} />
}

export default App
