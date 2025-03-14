import { toast } from "react-toastify";
import Constants from "../config/api";
import fetchApi from "./helper";

const fetchData = async ({ setLoading = false, method, setData, endpoint, isUpdate = false, isEndId = false }) => {
    setLoading && setLoading(true);
    try {
        const response = await fetchApi({
            url: isEndId ? `${Constants.API_ENDPOINTS[endpoint]}/${isEndId}` : Constants.API_ENDPOINTS[endpoint],
            method: method,
            isAuthRequired: true
        });
        if (response.status === 200) {
            isUpdate && toast.success(toast.message);
            setData(response.data);
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.log(error);
    } finally {
        setLoading && setLoading(false);
    }
}

export default fetchData;