import { useRouteError } from 'react-router-dom';
import ButtonLink from './ButtonLink';

function NotFound() {
  const error = useRouteError();
  console.log(error.data);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <ButtonLink to="-1">&larr; Go back</ButtonLink>
    </div>
  );
}

export default NotFound;
