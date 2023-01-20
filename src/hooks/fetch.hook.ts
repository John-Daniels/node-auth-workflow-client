import { useCallback } from "react";

import axios from 'axios'
import { baseURL } from "../constants/index.constant";

const useRequestHook = () => {
        const user = JSON.parse(sessionStorage.getItem('pin-user') ?? "{}");
        const token = user.token

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