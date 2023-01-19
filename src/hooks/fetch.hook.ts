import { useCallback } from "react";

import axios from 'axios'
import { baseURL } from "../constants/index.constant";

const useRequestHook = () => {
        const token = sessionStorage.getItem('pin-user')

        return useCallback(
                () => {

                        return axios.create({
                                baseURL,
                                headers: {
                                        common: {
                                                Authorization: token ? `Bearer ${token}` : ''
                                        }
                                },

                        })
                },
                [token],
        )()
}

export default useRequestHook;