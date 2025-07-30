import axios from "axios";
import SERVER from "../../SERVER";

export interface Tool {
  name: string;
  id: string;
  available_quantity: number;
  category_name: string;
  location: string;
  total_quantity: number;
}

interface CART {
  quantity: number;
  note: string;
  id: string;
  name: string;
  max: number;
}

export const fetchTools = async (): Promise<{
  tools: Tool[];
  categories: { name: string }[];
}> => {
  const { data: tools } = await axios.get(`${SERVER}/tool/all`, {
    withCredentials: true,
  });

  const { data: categories } = await axios.get(
    SERVER + "/category/categories",
    { withCredentials: true },
  );

  return { tools, categories };
};

export const submitToolRequest = async (cart: CART[]) => {
  if (cart.length === 0) throw new Error("Cart is empty");

  const cartWithoutName = cart.map(({ id, name, ...rest }) => ({
    ...rest,
    toolID: id,
  }));

  await axios.post(
    `${SERVER}/request/create/tools`,
    { tools: cartWithoutName },
    { withCredentials: true },
  );
};
