import axios from 'axios';
import { useEffect, useState } from 'react';

interface AxiosProps {
  method: 'post' | 'get' | 'put' | 'delete';
  url: string;
  headers?: object;
  elastic?: boolean;
}

const URL = process.env.NEXT_PUBLIC_ADDR;
const ELASTIC_URL = process.env.NEXT_PUBLIC_ELASTIC_ADDR;

const useAxios = ({ method, url, headers, elastic = false }: AxiosProps) => {
  const [error, setError] = useState('');
  const [res, setRes] = useState<any>(null);

  const fetchData = (data: object | string | null) => {
    let requestData;
    const tmpData = { method, url: URL + url };
    if (headers) {
      requestData = { ...headers };
    }
    if (data) {
      if (method === 'get') {
        requestData = {
          ...requestData,
          ...tmpData,
          url: ((elastic ? ELASTIC_URL : URL) + url + data) as string,
        };
      } else {
        requestData = { ...requestData, ...tmpData, data };
      }
    } else {
      requestData = tmpData;
    }
    axios(requestData)
      .then((response) => {
        if (response.status === 200) {
          setRes(response.data);
        }
      })
      .catch((err) => {
        setError(err.toString());
      });
  };

  useEffect(() => {
    return () => {
      setError('');
      setRes(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { fetchData, res, error };
};

export default useAxios;

// 사용법
// const {res : res변수 이름 설정, fetchData : fetch함수 이름 설정 }
// = useAxios({ method : 'get', url : /api/~~ });
// 선언해주고 fetch할때
// fetch함수이름();
// 하면 res안에 결과가 담긴다.
// post일 경우 fetch함수이름({보낼 데이터});
// get일 경우 path variable이어서 baseUrl 뒤에 붙을 string값을 넣어주면된다.
// 아무것도 넣지 않아도 될 경우 null을 이용
