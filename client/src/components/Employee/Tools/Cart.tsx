import React from "react";

interface Props {
  cart: Cart[];
  onClose: () => void;
  onChangeAmount: (id: string, newQuantity: number) => void;
  onSubmit: (e: React.FormEvent) => void;
}

interface Cart {
  quantity: number;
  note: string;
  id: string;
  name: string;
}

const Cart: React.FC<Props> = ({ cart, onClose, onChangeAmount, onSubmit }) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2">
      <form onSubmit={onSubmit}>
        <table>
          <thead>
            <tr>
              <th>tool name</th>
              <th>amount to borrow</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((cartItem, idx) => (
              <tr className="" key={cartItem.name + cartItem.id + idx}>
                <td>{cartItem.name}</td>
                <td>
                  <input
                    type="number"
                    min={1}
                    value={cartItem.quantity}
                    onChange={(e) =>
                      onChangeAmount(cartItem.id, Number(e.target.value))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit">add</button>
      </form>

      <button onClick={onClose}>close</button>
    </div>
  );
};

export default Cart;
