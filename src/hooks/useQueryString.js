import { useMemo } from 'react';
import { createSearchParams, useSearchParams } from 'react-router-dom';

const useQueryString = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParamsObject = useMemo(() => {
    // eslint-disable-next-line no-shadow
    const searchParamsObject = {};

    [...searchParams].forEach(([key, value]) => {
      if (searchParamsObject[key]) {
        if (Array.isArray(searchParamsObject[key])) {
          searchParamsObject[key].push(value);
        } else {
          searchParamsObject[key] = [searchParamsObject, value];
        }
        return;
      }

      searchParamsObject[key] = value;
    });

    return searchParamsObject;
  }, [searchParams]);

  const parseQueryString = (queryString) => {
    // eslint-disable-next-line no-shadow
    const searchParams = createSearchParams(queryString);

    return searchParams;
  };

  return {
    queryString: { ...searchParamsObject },
    setQueryString: setSearchParams,
    parseQueryString,
  };
};

export default useQueryString;
