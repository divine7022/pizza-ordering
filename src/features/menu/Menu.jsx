import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
// import MenuItem from "./MenuItem";
import MenuItem from "./MenuItem";

// to use loader function which we passad as an argument in a App.jsx of <Menu /> component, to use that loader function which we got from the <Main /> * WE NEED TO USE THE CUSTOM HOOK *useLoaderData() *
// here we no need to pass any argument coz it automatically know it is the data is comming from the <Menu /> which we passed in the App.jsx

function Menu() {
  const menu = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {/*never forget a key in map function*/}
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// this loader( ) is given by the React-router
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;

//The loader( ) :This is where you fetch the data. It is an async function that returns the data needed for a particular route. and this data is comming from the file apiGeocoding.js and apiRestaurant.js.
// this loader( ) is given by the React-router

// React Router is not only responsible for matching componet to url's in the browser. But to also provide the data that is nessary for each page.

// THIS IS USING A RENDER AS YOU FETCH STATURGY NOT FETCH ON RENDER STATURGY THAT CREAT A WATERFALLS.

// useNavigation(): hook, with this we will be able to see wheather the application is currently idol , or it is loading or it is submiting . and this information is actually for the entair application , not just for one page , but really entair Router.

/// ---TAILWIND----
// this gives a border :
// className="divide-y divide-stone-200"
