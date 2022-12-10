import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getDeveloper } from '../utils/api';
import useQueryWithRedirect from './useQueryWithRedirect';

const useDeveloper = () => {
  const params = useParams();

  const {
    isLoading,
    isError,
    data: developer,
  } = useQuery(
    ['developer', params.id],
    () => getDeveloper(params.id!),
    useQueryWithRedirect({
      cacheTime: 0,
    })
  );
  return { isLoading, isError, developer };
};

export default useDeveloper;
