// Test ID: IIDSAT
import OrderItem from "./OrderItem";
import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { useEffect } from "react";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData(); // Read below for more expln.

  const fetcher = useFetcher();

  // so right after component(fetcher) mounts(in the initial render/when the page loades), so we are using useEffect()
  useEffect(
    function () {
      // the way we use fetcher is by calling fetcher.load(name of the rout from where we want to fetch the data) ;and then later we can retrive the data from there when we want.
      // only fetch this data if there is no data yet.
      // by default the state (fetcher.data) will be "idel" , so let start fetching the data when ever the data in the idel state.(we putting )
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher]
  );
  // console.log(fetcher.data);

  // Everyone can search for all orders, so for privacy reasons we're gonna exclude names or address, these are only for the restaurant staff.
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="bg-red-500 rounded-full px-3 py-1 text-sm uppercase font-semibold text-red-50 tracking-wide">
              Fast Delivery
            </span>
          )}
          <span className="bg-green-500 rounded-full px-3 py-1 text-sm uppercase font-semibold text-green-50 tracking-wide">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 bg-stone-200 py-5 px-6">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              // used optional chaining( the is not yet exist or recived then return empty array)
              fetcher?.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 py-5 px-6">
        <p className="text-sm font-medium text-stone-600">
          Price Pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Fast Delivery Charge: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

// to get the id in the of the (order/4567567) i,e in the url we use the useParams() hook .It only works inside components , it dosn't work in regular function.
// by react Router V6.4 the loader() function gives a property called params by itself we no need to use params.
// so destructuer that object(loader) and get the param.
// the one of the object that the loader function recives(from the router by default) is params. so we can use param without using the useParams() hook.

export async function loader({ params }) {
  // getOrder(params.orderID) --> { path: "/order/:orderId", element: <Order /> } in the App.jsx
  //this is exactly the name that we given in the path, so orderID will contains the id that is in the url.
  const order = await getOrder(params.orderId);
  // console.log(order);
  return order;
}

export default Order;

//////

//The ** loader ** function is responsible for fetching that order data.
//** useLoaderData() ** is a shortcut to grab that fetched data and make it available inside the component, so you can display it.

// So, ** useLoaderData() ** is just getting the order info that was already prepared before the page was shown.

//if (!fetcher.data && fetcher.idle === "idle") fetcher.load("/menu"); --->
// by default the state (fetcher.data) will be "idle" , so let start fetching the data when ever the data in the idle state.(we putting the condition here coz we should not fetch the data from the menu.jsx when it is in "loading" or "submiting" state. we should only fetch the data from the menu when it is in the "idle" state )

// fetcher.data --> like for the useNavigation() the fetcher will be having a differet state (i,e "idle", "loading", "submiting")
