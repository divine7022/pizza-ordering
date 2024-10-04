import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress, updateName } from "../user/userSlice";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  // here we are getting the data from the store and we are destructring the required data and renaming it as required.
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  // this is going to be "true" when ever the addressStatus is loading.
  const isLoadingAddress = addressStatus === "loading";

  // this navigation hook conatins the states --> idol, loading, submitting[see the AppLayout.jsx for explaination]
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  // custom hook is used to return some error , that we can then display in the user interface.
  const formErrors = useActionData();
  const dispatch = useDispatch();

  // const cart = useSelector(getCart()); here we can't call the fuction getCart() like this . Redux is the one which call the fucnction . we need to just use it.
  const cart = useSelector(getCart); // here Redux will call the fuction getCart().
  const totalCartPrice = useSelector(getTotalCartPrice);
  // after clicking on the priority then we need to increase the totalPrice with priority price(which is 20% of the totalCartPrice)
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6 ">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>
      {/* to make this form work nicely with react router we need to replace this(<form>) with a <Form> component that react-router gives us. */}

      {/* <Form method="POST" action ="/order/new">   this also works but since we are using <Form> it is not required*/}
      <Form method="post">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isSubmitting || isLoadingAddress} // this input field will be disabled whene we click the "Get Position" button , when the loading state will be "true" while fetching the address
              defaultValue={address} // it is used to get the address in the address field
              required
            />
            {addressStatus === "error" && (
              <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">
                {errorAddress}
              </p>
            )}
          </div>
          {/* to place the button inside the input field: make parent class relative and child class(that prerticular element class as absolute and adjust it to the right).That may be div or span . and z index is not necessary*/}
          {/*we want to only display the button before fetching the adderess*/}
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[3px] md:right-[5px] md:top-[5px] z-50">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 
            focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to get Fast Delivery?
          </label>
        </div>

        <div>
          {/* this creates a POST request method to the URL specfied in the action fucn , if not specified then it submit the form to the current URL */}
          {/* basically this "hidded" type is used to send the inputed data to the "action" when submited*/}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          {/*we are using "hidden" type to send the address got from the input field to the action when form is submited.*/}
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting
              ? "placing order...."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// AS soon as we submited the <Form > that will then create the request , that will basically be intresepted by this action function as soon as we connected with React-router.
// So when ever this Form will be submited by default React-router will then call this action fuction and it will pass in the request(to the action function) that was submited by the Form .
// here(in action fuction) we can then get access to that.

export async function action({ request }) {
  console.log("action is being triggered");
  const formData = await request.formData();
  console.log(formData);
  const data = Object.fromEntries(formData); // this is not so important to understand, this is just a some "standerd recipy" to take the requested data.
  // console.log(data);

  // here we are conveting the string data into object and we are just overwriting the some of the properties(see the properties are displayed in the below comment section)
  const order = {
    ...data, // this is the data which we are getting from the input field when we submit.
    cart: JSON.parse(data.cart), //is used to parse a JSON string (data.cart) into a js object or array.

    //priority: data.priority === "on", // by default the value of the priority is 'on', so we are seting priority is true or false.(i,e priority:true )

    // but after calculaing the priorityPrice in createOrder.jsx the value of the priority will no not be "on" as above now it will be "true"
    priority: data.priority === "true", //Refer the above Explainatios.
  };
  // console.log(order);
  // here we are sending the order object to createOrder() function. And we want to immidetly redirect to the page/url(order/id) that the id which we got from the api.
  // But we can't naviget using useNavigate() hook. coz we can't use useNavigat() hook inside the function it is only used in inside the components.

  console.log(data.username);
  // dispatch(updateName(data.username));

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number . We might need it to contact you. ";

  if (Object.keys(errors).length > 0) return errors;

  // If everything is okey, then create new order and redirect.
  //the newOrder that we get here is already the new Object comming back from the API as a response of calling createOrder(order) function.
  const newOrder = await createOrder(order);

  // we don't want to display cartOverview at the bottom in the order page(coz we alredy orderd so no need of display cartOverview)
  store.dispatch(clearCart()); // DO NOT OVERUSE THIS TRICK
  return redirect(`/order/${newOrder.id}`); // then this Api call will generate Random id (by using backend ) each time we create a new oreder.
  // return null;
}

export default CreateOrder;

///----COMMENT SECTION-----///

// <Form method="POST"> :means we are going to do a "POST"(to update the content in the API) request to create a new order. we could also do "PATCH" and "DELETE" but not "GET".
// the GET is not going to work here but POST, PATCH, DELETE is going to work.
//this is similar to the ** loader ** that we have already created.

// then we could also specify the *action* where we could also write the path that form should be submitted to. But this not nessary by default React-router will simply match the closest Route.
// So there no need to write acction = "/order/new" [<Form method="POST" acction = "/order/new" >]

// <Form></Form> :
// * even we no need to create onSubmit() event handler to handle submit ( that is managed by the React-router , here we are using a react-router Form so it automatically do the work. and providing a action(data that we entered) on pressing the order now button  )
// Ex: console.log(data); >> {customer: 'Akash', phone: '34563456', address: 'India'}
//we even no need to create a state(using useState()) variable for each of the input fields and no need to even create a loading state. So the React-Router will do all of this automatically without us having to do anything.
//So the only thing we need to do is to connect this action to the required url(path:"/order/new") (i,e in this case we are the writing  [action: createOrderAction,] in the App.jsx  )
//request.formData(); this .formDate is provided by the browser this is just a regular web api Provided by the browser

//<input type="hidden" name="cart" value={JSON.stringify(cart)} /> : --->
// value={JSON.stringify(cart)} : coz the cart is in the object form, so we need to convet in the string form.
// type="hidden" : means it will not be visiable in the UI.
//When the form is submitted, the value of this hidden field will be included in the request body (for a POST request) or in the URL parameters (for a GET request) under the key "cart".
// EX: {customer: 'Akash', phone: '23456', address: 'wef', **cart**: '[{"pizzaId":12,"name":"Mediterranean","quantity":2…om","quantity":1,"unitPrice":15,"totalPrice":15}]'}

/// <button disabled={isSubmitting}>{isSubmitting ? "placing order...." : "Order now"}</button> :
//If isSubmitting is true, the button will be disabled, preventing the user from clicking it.
//If isSubmitting is false, the button will be enabled and clickable.

///  if (Object.keys(errors).length > 0) return errors; :->
// Basically we are using this in this context is to check the validation of the phone no. that user entered.
// it get access to that data in the form componet, we can get it by key property in the Object
// before redireciting to the id we got we need to first check the if there is an error by any input field , so if we got any error we can then before redirecting to new order we then return the error message.

/// {formErrors?.phone && <p>{formErrors.phone}</p>} : --> :
// The useActionData() hook in React Router (specifically in React Router v6.4 and later) is used to access data returned from an action function after a form submission.

///const errors = {}; -->  Here why i am using an empty object .

//In the code snippet you provided, the empty object errors is used to collect validation messages for the various fields being checked—in this case, the phone number of an order.

/////*****defaultValue={username} *****/ --> basically as name says allows to set a default value at the begining and which we can then change or edit.

/////
//*** Form Submission with react-router-dom's <Form> Component ? ***
//The <Form> component from react-router-dom handles form submission for you. When the user submits the form (either by pressing the "Enter" key or clicking the submit button), it automatically makes a POST request to the URL specified in the action attribute of the <Form> tag. If the action attribute is not specified, it defaults to submitting to the current route.

////  store.dispatch(clearCart); --->
// here we are calling the dispatch fuction on store ? coz we should only use the dispatch function inside the componet(in this case i,e inside CreateOrder fucn) . so since we are using the dispatch fucn outsidet the component so we should dispatch on store.
