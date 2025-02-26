// import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { createOrder } from '../../utils/apiRestaurant';
import { Form, redirect, useNavigation, useActionData } from 'react-router-dom';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    address,
    status: addressStatus,
    position,
    error: addressError,
  } = useSelector((state) => state.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const isSubmitting = navigation.state === 'submitting';
  const isLoading = addressStatus === 'loading';
  const formErrors = useActionData();
  const cart = fakeCart;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row">
          <label htmlFor="firstName" className="sm:basis-40">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            name="customer"
            defaultValue={username}
            required
            className="input grow"
          />
        </div>

        <div className="mb-6 flex flex-col gap-2 sm:flex-row">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow gap-2 sm:flex sm:flex-col">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="px-2 py-0.5 text-sm tracking-tight text-red-400">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-6 flex flex-col gap-2 sm:flex-row">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              defaultValue={address}
              name="address"
              required
              className="input w-full"
              disabled={isLoading}
            />
            {addressStatus === 'error' && (
              <p className="px-2 py-0.5 text-sm tracking-tight text-red-400">
                {addressError}
              </p>
            )}
          </div>
          <span className="absolute right-[3px] top-[34.5px] sm:top-[3px] md:top-[5px]">
            {!position.longitude && !position.latitude && (
              <Button
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                disabled={isLoading}
              >
                Get Position
              </Button>
            )}
          </span>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-500 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `{${position.longitude}, ${position.latitude}}`
                : ''
            }
          />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Placing order...' : 'Order now'}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  };
  console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.';
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  // StorageEvent.dispatch(clearCart())
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
