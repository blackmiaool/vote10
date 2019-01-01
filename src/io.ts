import axios from "axios";

interface requestParams {
    method: string;
    data: any;
}
export default function request({ method, data }: requestParams): Promise<any> {
    return axios.request({
        url: "/vote10-api/" + method,
        data,
        method: "POST"
    });
}
