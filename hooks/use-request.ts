import { useEffect, useState } from 'react';

type UseRequest = (func: (...args: any[]) => Promise<any>) => UseRequestState & {
  fetch: (...args: any[]) => void;
};

interface UseRequestState {
  data: any;
  error: any;
  loading: boolean;
  success: boolean;
  fail: boolean;
  complete: boolean;
}

const useRequest: UseRequest = (func) => {
  const [state, setState] = useState<UseRequestState>({
    data: null,
    error: null,
    loading: true,
    success: false,
    fail: false,
    complete: false,
  });

  const fetch = async (...args: any[]) => {
    setState({
      ...state,
      loading: true,
    });

    try {
      const response = await func(...args);

      setState({
        data: response,
        error: null,
        loading: false,
        success: true,
        fail: false,
        complete: true,
      });
    } catch (error) {
      setState({
        data: null,
        error: error as Error,
        loading: false,
        success: false,
        fail: true,
        complete: true,
      });
    }
  };

  return { fetch, ...state };
};