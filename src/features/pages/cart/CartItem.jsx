import { formatCurrency } from '../../utils/helpers';
import DeleteCart from './DeleteCart';
import UpdateItemQuantity from './UpdateItemQuantity';

function CartItem({ item }) {
  const { id, pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

        <UpdateItemQuantity pizzaId={pizzaId} />

        <DeleteCart pizzaId={pizzaId}>Delete</DeleteCart>
      </div>
    </li>
  );
}

export default CartItem;
