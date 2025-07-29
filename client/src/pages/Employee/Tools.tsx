import React, { useEffect, useState } from "react";
import Cart from "../../components/Employee/Tools/Cart";
import FilterAndSearch from "../../components/Employee/Tools/FilterAndSearch";
import { Button, message, Skeleton } from "antd";
import ToolTable from "../../components/Employee/Tools/ToolTable";
import { useSearchParams } from "react-router";
import ToolsCard from "../../components/Employee/Tools/ToolsCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTools, submitToolRequest } from "../../utils/api/tools";

interface CART {
  quantity: number;
  note: string;
  id: string;
  name: string;
  max: number;
}

const Tools = () => {
  const [cart, setCart] = useState<CART[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayParams, setDisplayParams] = useSearchParams();
  const [pageParams, setPageParams] = useSearchParams();

  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const rawCategoryFilter = searchParams.get("category") || "";
  const categoryFilter =
    rawCategoryFilter.charAt(0).toUpperCase() + rawCategoryFilter.slice(1);
  const searchVal = searchParams.get("search") || "";
  const page = Number(pageParams.get("page") || "1");

  const rawDisplay = displayParams.get("display") || "grid";
  const display = rawDisplay.charAt(0).toUpperCase() + rawDisplay.slice(1);

  useEffect(() => {
    const currentDisplay = displayParams.get("display");
    if (!currentDisplay) {
      displayParams.set("display", "grid");
      setDisplayParams(displayParams, { replace: true });
    }
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["tools"],
    queryFn: fetchTools,
  });

  const tools = data?.tools || [];
  const categories = data?.categories || [];

  const filteredTools = tools.filter(
    (tool) =>
      (!categoryFilter ||
        tool.category_name.toLowerCase() === categoryFilter.toLowerCase()) &&
      tool.name.toLowerCase().includes(searchVal.toLowerCase()),
  );

  const msg = (tool: string, type: "add" | "remove") => {
    messageApi.open({
      type: "success",
      content:
        type === "add" ? `added ${tool} to cart` : `removed ${tool} from cart`,
    });
  };

  const handleAddToCart = (tool: CART) => {
    if (cart.find((cartTool) => cartTool.id === tool.id) === undefined) {
      setCart((prevState) => [
        ...prevState,
        { ...tool, quantity: 1, note: "" } as CART,
      ]);
      msg(tool.name, "add");
    }
  };

  const handleChangeAmount = (id: string, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const handleRemove = (id: string) => {
    const tool = cart.find((tool) => tool.id === id);
    setCart((prevCart) => prevCart.filter((prev) => prev.id !== id));
    msg(tool!.name, "remove");
  };

  const mutation = useMutation({
    mutationFn: submitToolRequest,
    onSuccess: () => {
      messageApi.open({ type: "success", content: "Submitted request" });
      setIsVisible(false);
      setCart([]);

      queryClient.invalidateQueries({ queryKey: ["histories"] });
      queryClient.invalidateQueries({ queryKey: ["tools"] });
    },
    onError: () => {
      messageApi.open({ type: "error", content: "Error submitting request" });
    },
  });

  const handleRequestTool = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(cart);
  };

  return (
    <div className="text-center">
      {contextHolder}
      <FilterAndSearch
        category={categoryFilter}
        searchVal={searchVal}
        categories={categories}
        onSearch={(text) => {
          setSearchParams(
            (prev) => {
              const params = new URLSearchParams(prev);
              if (text) params.set("search", text);
              else params.delete("search");
              return params;
            },
            { replace: true },
          );
        }}
        onFilter={(filter) => {
          setSearchParams(
            (prev) => {
              const params = new URLSearchParams(prev);
              if (filter) params.set("category", filter.toLowerCase());
              else params.delete("category");
              return params;
            },
            { replace: true },
          );
        }}
        onChangeDisplay={(display) => {
          setDisplayParams(
            (prev) => {
              const params = new URLSearchParams(prev);
              if (display) params.set("display", display.toLowerCase());
              else params.delete("display");
              return params;
            },
            { replace: true },
          );
        }}
        display={display}
      />

      <Button onClick={() => setIsVisible(true)}>Cart</Button>
      {isVisible && (
        <Cart
          cart={cart}
          open={isVisible}
          onClose={() => setIsVisible(false)}
          onChangeAmount={handleChangeAmount}
          onSubmit={handleRequestTool}
          onRemove={handleRemove}
        />
      )}

      {/* Custom display */}
      <Skeleton loading={isLoading}>
        {display === "Grid" ? (
          <ToolsCard
            page={page}
            filteredTools={filteredTools}
            isLoading={isLoading}
            onAdd={handleAddToCart}
            onChange={(page) =>
              setPageParams(
                (prev) => {
                  const params = new URLSearchParams(prev);
                  if (page) params.set("page", page.toString());
                  else params.delete("page");

                  return params;
                },
                { replace: true },
              )
            }
          />
        ) : (
          <div className="px-10">
            <ToolTable
              tools={filteredTools}
              loading={isLoading}
              onAdd={handleAddToCart}
              onNavigate={(page) => {
                setPageParams(
                  (prev) => {
                    const params = new URLSearchParams(prev);
                    if (page) params.set("page", page);
                    else params.delete("page");

                    return params;
                  },
                  { replace: true },
                );
              }}
              page={page}
            />
          </div>
        )}
      </Skeleton>
    </div>
  );
};

export default Tools;
