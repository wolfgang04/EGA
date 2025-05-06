import axios from "axios";
import { useEffect, useState } from "react";
import SERVER from "../../SERVER";
import { Category } from "../../models/Category.model";
import { NavLink } from "react-router";
import Create from "../../components/Admin/Categories/Create";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [createCategory, setCreateCategory] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axios.get(`${SERVER}/category/categories`, {
          withCredentials: true,
        });

        setCategories(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getCategories();
  }, []);

  const handleAddCategory = (name: string) => {
    const newCategory: Category = {
      description: null,
      id: categories.length + 1,
      name,
      image: null,
    };

    setCategories((prevState) => [...prevState, newCategory]);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button onClick={() => setCreateCategory(true)} className="w-fit">
        Create
      </button>
      {createCategory && (
        <Create
          addCategory={handleAddCategory}
          close={() => setCreateCategory(false)}
        />
      )}

      <div className="flex gap-2">
        {isLoading !== true ? (
          categories.map((category, idx) => (
            <NavLink
              to={category.name}
              state={{ categoryID: category.id }}
              key={idx}
            >
              <p className="cursor-pointer hover:underline">{category.name}</p>
            </NavLink>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Categories;
