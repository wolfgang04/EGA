import axios from "axios";
import { useEffect, useState } from "react";
import SERVER from "../../SERVER";
import { Category, CategoryOverView } from "../../models/Category.model";
import Create from "../../components/Admin/Categories/Create";
import CategoryCard from "../../components/Admin/Categories/CategoryCard";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesOverview, setCategoriesOverview] = useState<
    CategoryOverView[]
  >([]);
  const [createCategory, setCreateCategory] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axios.get(
          `${SERVER}/category/categoriesOverview`,
          {
            withCredentials: true,
          },
        );

        setCategoriesOverview(data);
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
          categoriesOverview.map((category, idx) => (
            <CategoryCard
              id={category.id}
              available={category.total_available}
              name={category.category_name}
              totalQuantity={category.total_quantity}
              totalTools={category.total_tools}
              key={idx}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Categories;
