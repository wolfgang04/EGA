import axios from "axios";
import React, { useState } from "react";
import SERVER from "../../SERVER";

interface Props {
  addCategory: (name: string) => void;
  close: () => void;
}

const Create: React.FC<Props> = ({ close, addCategory }) => {
  const [category, setCategory] = useState("");

  const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        `${SERVER}/category/create`,
        {
          name: category,
        },
        { withCredentials: true },
      );

      addCategory(category);
      setCategory("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-black/5">
      <div className="w-full" />
      <form onSubmit={handleCreateCategory}>
        <input
          type="text"
          placeholder="category name"
          value={category}
          onChange={(e) => handleChangeCategory(e)}
        />
      </form>
      <button className="block w-full" onClick={() => close()}>
        close
      </button>
    </div>
  );
};

export default Create;
