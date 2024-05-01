import axios from "axios";
const END_POINT_URL =
  process.env.NEXT_PUBLIC_ENV == "development"
    ? process.env.NEXT_PUBLIC_LOCAL_BACKEND_API_URL
    : process.env.NEXT_PUBLIC_BACKEND_API_URL;

const getToken = () => {
  return localStorage.getItem("token") ?? "";
};

export const axiosGet = async (endpoint : string, success = (data : any) => {}, error = (data : any) => {}) => {
  await axios
    .get(`${END_POINT_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res) => res.data)
    .then(success)
    .catch((err) => {
      const { data } = err.response;
      error(data);
    });
};

export const axiosPost = async (endpoint : string, params : any, success = (data : any) => {}, error = (data : any) => {}) => {
  await axios
    .post(`${END_POINT_URL}/${endpoint}`, params, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res) => res.data)
    .then(success)
    .catch((err) => {
      const { data } = err.response;
      error(data);
    });
};

export const axiosPatch = async (endpoint : string, params : any, success = (data : any) => {}, error = (data : any) => {}) => {
  await axios
    .patch(`${END_POINT_URL}/${endpoint}`, params, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res) => res.data)
    .then(success)
    .catch((err) => {
      const { data } = err.response;
      error(data);
    });
};

export const axiosDelete = async (endpoint: string, params: any = {}, success: (data: any) => void = () => {}, error: (data: any) => void = () => {}
) => {
  await axios
    .delete(`${END_POINT_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      data: params, 
    })
    .then((res: any) => res.data)
    .then(success)
    .catch((err) => {
      const { data } = err.response;
      error(data);
    });
};
