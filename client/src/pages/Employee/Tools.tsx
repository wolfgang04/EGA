import axios from "axios";
import React, { useEffect, useState } from "react";
import SERVER from "../../SERVER";
import Cart from "../../components/Employee/Tools/Cart";
import FilterAndSearch from "../../components/Employee/Tools/FilterAndSearch";
import ToolCard from "../../components/Employee/Tools/ToolCard";
import { Button, Flex } from "antd";
import ToolTable from "../../components/Employee/Tools/ToolTable";
import { useSearchParams } from "react-router";

interface Tool {
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
}

const Tools = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tools, setTools] = useState<Tool[]>([]);
  const [cart, setCart] = useState<CART[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [requestSent, setRequestSent] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayParams, setDisplayParams] = useSearchParams();

  const categoryFilter = searchParams.get("category") || "";
  const searchVal = searchParams.get("search") || "";
  const display = displayParams.get("display") || "";

  const filteredTools = tools.filter(
    (tool) =>
      (!categoryFilter || tool.category_name === categoryFilter) &&
      tool.name.toLowerCase().includes(searchVal.toLowerCase()),
  );

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const { data } = await axios.get(`${SERVER}/tool/all`, {
          withCredentials: true,
        });

        setTools(data);

        const { data: categories } = await axios.get(
          SERVER + "/category/categories",
          { withCredentials: true },
        );
        setCategories(categories);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTools();
  }, [requestSent]);

  const handleAddToCart = (tool: CART) => {
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
    if (cart.length === 0) return;

    try {
      const cartWithoutName = cart.map(({ id, name, ...rest }) => ({
        ...rest,
        toolID: id,
      }));

      await axios.post(
        `${SERVER}/request/create/tools`,
        { tools: cartWithoutName },
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsVisible(false);
      setRequestSent((prevState) => !prevState);
    }
  };

  return (
    <div className="p-5 text-center">
      <FilterAndSearch
        category={categoryFilter}
        searchVal={searchVal}
        categories={categories}
        onSearch={(text) => {
          setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            if (text) params.set("search", text);
            else params.delete("search");
            return params;
          });
        }}
        onFilter={(filter) => {
          setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            if (filter) params.set("category", filter);
            else params.delete("category");
            return params;
          });
        }}
        onChangeDisplay={(display) => {
          setDisplayParams((prev) => {
            const params = new URLSearchParams(prev);
            if (display) params.set("display", display);
            else params.delete("display");
            return params;
          });
        }}
        display={display}
      />
      <Button onClick={() => setIsVisible(true)}>cart</Button>
      {isVisible && (
        <Cart
          cart={cart}
          open={isVisible}
          onClose={() => setIsVisible(false)}
          onChangeAmount={handleChangeAmount}
          onSubmit={handleRequestTool}
        />
      )}

      {/* Custom display */}
      {display === "Grid" ? (
        <Flex wrap justify="center" gap="middle" style={{ marginTop: 20 }}>
          {filteredTools.map((tool) => (
            <ToolCard
              isLoading={isLoading}
              tool={tool}
              onAdd={handleAddToCart}
              key={tool.id}
            />
          ))}
        </Flex>
      ) : (
        <div className="px-10">
          <ToolTable
            tools={filteredTools}
            loading={isLoading}
            onAdd={handleAddToCart}
          />
        </div>
      )}
    </div>
  );
};

export default Tools;
