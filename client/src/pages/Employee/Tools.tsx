import axios from "axios";
import React, { useEffect, useState } from "react";
import SERVER from "../../SERVER";
import Cart from "../../components/Employee/Tools/Cart";

interface Tool {
  name: string;
  id: string;
}

interface CART {
  quantity: number;
  note: string;
  id: string;
  name: string;
}

const Tools = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [cart, setCart] = useState<CART[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchTools = async () => {
      const { data } = await axios.get(`${SERVER}/tool/all`, {
        withCredentials: true,
      });

      setTools(data);
    };

    fetchTools();
  }, []);

  const handleAddToCart = (tool: Tool) => {
    if (cart.find((cartTool) => cartTool.id === tool.id) === undefined)
      setCart((prevState) => [
        ...prevState,
        { ...tool, quantity: 1, note: "" } as CART,
      ]);
  };

  const handleChangeAmount = (id: string, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const handleRequestTool = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const cartWithoutName = cart.map(({ id, name, ...rest }) => ({
        ...rest,
        toolID: id,
      }));

      const res = await axios.post(
        `${SERVER}/request/create/tools`,
        { tools: cartWithoutName },
        { withCredentials: true },
      );

      console.log(cartWithoutName, res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-center">
      <button onClick={() => setIsVisible(true)}>cart</button>
      {isVisible && (
        <Cart
          cart={cart}
          onClose={() => setIsVisible(false)}
          onChangeAmount={handleChangeAmount}
          onSubmit={handleRequestTool}
        />
      )}

      {tools.map((tool, idx) => (
        <p
          onClick={() => handleAddToCart(tool)}
          className="cursor-pointer hover:underline"
          key={tool.name + idx}
        >
          {tool.name}
        </p>
      ))}
    </div>
  );
};

export default Tools;
