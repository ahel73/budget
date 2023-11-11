import { useAppSelector } from '../store/hooks'

export const useAutn = (): boolean => {
    const isAuth = useAppSelector((state) => state.user.isAuth);
    return isAuth;
}