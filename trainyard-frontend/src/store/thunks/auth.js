import { authApi } from 'src/api/auth';
import { authSlice } from '../slices/auth';
import toast from 'react-hot-toast';
import Router from 'next/router'
import { paths } from 'src/paths';
import { ca } from 'date-fns/locale';

const loginAdmin = (params) => async (dispatch) => {
    try {
        const response = await authApi.signIn(params);

        dispatch(authSlice.actions.login({
            user: {
                id: response.id,
                email: response.email,
                name: response.name,
            },
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
        }));

        toast.success('You have successfully logged in!');
        Router.push(paths.dashboard.index);
    } catch (err) {
        toast.error(err.response?.data?.message || err.message);
    }

};


export const thunks = {
    loginAdmin,
};
