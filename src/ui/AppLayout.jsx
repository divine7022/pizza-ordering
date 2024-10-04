import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

function AppLayout() {
  // creating a generic loader here to using useNavigation( ) hook.
  const navigation = useNavigation();
  // console.log(navigation); it gives a state: idol ,
  const isLoading = navigation.state === "loading"; // if this is true the we need to display the loading indicatior.
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] ">
      {isLoading && <Loader />}

      <Header />

      <div className="overflow-scroll">
        <main className="max-w-3xl mx-auto">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;

// <Outlet /> :how we render the content of nested route inside another route: by using the Outlet component provided by the React-Router-dom

// useNavigation(): hook, with this we will be able to see wheather the application is currently "idol ", or it is "loading" or it is "submiting" . and this information is actually for the entair application , not just for one page , but really entair Router.

//if the state from the useNavigation( ) --> (state: "loading") then(isLoader is true) it will show the Loader component if the state: "idol" then(isLoader is false) it render the componet
