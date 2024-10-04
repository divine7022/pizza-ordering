import { Link } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  // const username = useSelector(getUsername);
  const username = useSelector((state) => state.user.username);
  // const cart = useSelector((state) => state.cart); // this gives an error coz here i am getting cart slice itself which is an object contaning an array of the newItems so? so to fix it we need to access the array inside the sice cart object. so then we can't use the cart object on the array map() function.
  // console.log(cart);

  //  const cart = useSelector((state) => state.cart.cart); // now we accessing the array inside the cart(slice) object . which work fine with the array map( ) function.

  // const cart = useSelector((state) => state.cart.cart);

  // const cart = useSelector(getCart( )); here we can't call the fuction like this () . Redux is the one which call the function
  const cart = useSelector(getCart); // these is the cart item that we added to the cart at Menu.jsx by dispatching by calling the action addItem which is the store.
  // console.log(cart);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="divide-y divide-stone-200 border-b mt-3">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-2 ">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>

        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
        {/* <Link to="/order/new">Order pizzas</Link> */}
        {/* <button>Clear cart</button> */}
      </div>
    </div>
  );
}

export default Cart;
