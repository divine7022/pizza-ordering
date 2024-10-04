import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  // const navigate = useNavigate(); // this the hook to navigate to forword or backword page.
  const error = useRouteError();
  // console.log(error);
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      {/*if the error.data dosn't exit then it give the error.message*/}
      <LinkButton to="-1">&larr; Go back</LinkButton>
      {/* <button onClick={() => navigate(-1)}>&larr; Go back</button> */}
    </div>
  );
}

export default Error;

// to display the perticular/suitabel error message in the ui when Error component is rendered : there is another custom hook [we get the error by the *useRoutError()*]
