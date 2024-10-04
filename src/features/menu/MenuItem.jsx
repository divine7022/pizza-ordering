import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentQuantity = useSelector(getCurrentQuantityById(id)); // it is a special selector fuction is actually a fucn that reutrns a  another fucn. [bit advance js]

  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    // here  the pizza came from the api called in the Menu.jsx from that data got from the pizza(from api) we are destructring all the properties from the pizza like id, name, unitPrice etc... that we are setting in the newItem and sending it to the store by dispatching.
    const newItem = {
      pizzaId: id,
      name, // we are manually initializing here coz i am getting the id from the above destructured value.
      quantity: 1, // initially the value of the item in the getting the id from the above destructured form the pizza
      unitPrice,
      totalPrice: unitPrice,
    };
    dispatch(addItem(newItem)); // this
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-col grow pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between ">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm uppercase font-medium text-stone-500">
              Sold out
            </p>
          )}

          {/* the DeleteItem Button should only visibel if the item "is in cart" */}
          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}
          {/* Add to cart Button should only visibel if the item "is not in cart"  */}
          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;

/// -----TAILWIND-----
// Here we want to add the margin to the bottom of the MenuItem .
// so there is a very handy class in Tailwind i,e ** divide **class.
// So we can use the ** divide ** class on the parent element (i,e <ul> which is in Menu component not <li> which is here) of this lists items.

// to allow the flex element as much as they can, we need to use (not to be in restriction of it own div) for that with the regular css property we set the ** flex-item : 1 ; ** . here in tailwind it flex-grow or grow. [but do it in the parent <dev>]
