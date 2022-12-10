import { Loader } from 'semantic-ui-react';
import useDeveloper from '../hooks/useDeveloper';

const Developer = () => {
  const { isLoading, developer } = useDeveloper();

  if (isLoading || !developer) return <Loader active size='big' />;

  return <h1>{developer.name}</h1>;
};

export default Developer;
