import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  return (
    // we are using the patch method to update only the necessary properties, not all.
    <fetcher.Form method="patch" className="text-right">
      <Button type="primary">Get Fast Delivery</Button>
      {/* <button type="submit">Make priority</button> */}
    </fetcher.Form>
  );
}

export default UpdateOrder;

// we need to connect this action with the page[path: "/order/:orderId",] in the App.jsx.
// this function should be called as action by default.
export async function action({ request, params }) {
  // here we don't to any data from "request" [ like what we did in the CreateOrder.jsx(here we got the request and read the data from there in the CreateOreder.jsx)]
  // console.log("updated proiority");
  const data = { priority: true }; // because we need to pass the object that we need to update. So priority will be false then if we pass this object to the updateOrder() function. Then the label will be displayed in the UI
  // updateOrder(id, updateObj): it needs a two parameters, so the id we can get by the "params" which is the order id(Ex: /OZSSTC), so we need to pass this id.

  await updateOrder(params.orderId, data);

  return null;
}

////
// Basically as we click the "Make priority" Button we want to change priority from "false" to "true". and then the hole page should "re-render"(coz then to make visiable of the priority labele at the top.) and make that Button dissapper.
// So we can do this by using the useFetcher() hook, just like we used in the "order.jsx".
// So in order to write/ update the data we do not use fetcher.load( )[like we did in the "order.jsx"] . But inster we use a <fetcher.Form> component that the fetcher provides to us.
// so even though if we don't have a form we simple wrap the <Button> inside the <fetcher.Form>.

// <Form > :  basically the idea behind it why we used this Form is when we submite this will creates a "new navigation"(is to navigate away from the page(to another page)) and also crates an action (in which all the data will that we inputed will be there.)

// <fetcher.Form> :
// * will "not navigate"(not create a new navigation) like a <Form >.
// * It will just ** Submit ** the page and ** re-render ** the hole page.

///<fetcher.Form method="PATCH" className="text-right">
//method="PATCH" :
//Using PATCH in a React form is ideal when you want to update only specific fields of a resource without affecting the rest of the resource’s data. It optimizes network usage by sending only the necessary changes to the server.
// PATCH method is used when you want to update certain fields of a resource without affecting other fields.
//className="text-right" -->moves the button to the right and to he right of the prop

// here we need to call the updateOrder(id, updateObj) which makes an API request . and we need to pass the id of the order that should be updated and only the data that should be updated(updateObj)
