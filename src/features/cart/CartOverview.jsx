import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null; //if the cart is empty then we can't see the cartOver section at the bottom which is a part of AppLayout component . The movement we add the item to the cart by "Add to cart" button then the CartOverview section at the bottom will appers.

  return (
    <div className="bg-stone-800 text-stone-200 uppercase px-4 py-4 sm:px-6 text-sm md:text-base flex items-center justify-between">
      <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
        <span>{totalCartQuantity} Pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;

////--------/////////
/// const x = useSelector((state) => state.cart.cart.reduce((sum, item) => sum , 0));-->
//In your MenuItem component:When the "Add to cart" button is clicked, the handleAddToCart function is called. This function creates a newItem object and dispatches an addItem action with this object.
// and then the cart.reducer()(an array method) counst the how many quantity properties are there.
