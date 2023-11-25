import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_Image_Upload_Token;
const image_hosting_api = ` https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };
      const menuRes = await axiosSecure.post("menu", menuItem);
      if (menuRes.data.insertedId) {
        reset()
        Swal.fire({
          title: "Succecessfully Added an Item!",
          text: `${data.name} is added to the menu.`,
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
    }
  };

  return (
    <>
      <div>
        <SectionTitle title={"Add An Items"} subTitle={"---What's new?---"} />
      </div>
      <div className="bg-base-200 p-4 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Recipe name*</label>
          <input
            placeholder="Recipe name"
            className="w-full p-3 rounded-lg my-4 "
            {...register("name", { require: true })}
          />
          <div className="flex ">
            <div className="flex-1">
              <label>Category*</label>
              <div>
                <select
                  defaultValue="default"
                  {...register("category", { require: true })}
                  className="select block my-4 select-bordered w-full max-w-xs"
                >
                  <option disabled value="default">
                    Select a category
                  </option>
                  <option value="salad">Salad</option>
                  <option value="pizza">Pizza</option>
                  <option value="soup">Soup</option>
                  <option value="dessert">Dessert</option>
                  <option value="drinks">Drinks</option>
                </select>
              </div>
            </div>
            <div className="flex-1">
              <label>Price*</label>
              <input
                placeholder="Price"
                className="w-full p-3 rounded-lg my-4 "
                {...register("price", { require: true })}
              />
            </div>
          </div>
          <label>Recipe Details*</label>
          <textarea
            {...register("recipe", { require: true })}
            placeholder="Recipe Details"
            className="textarea w-full block p-3 rounded-lg my-4 textarea-bordered textarea-lg "
          ></textarea>
          <div>
            <input
              {...register("image", { require: true })}
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </div>

          <button className="btn btn-active btn-neutral my-4 hover:text-white">
            Add Item <FaUtensils />
          </button>
        </form>
      </div>
    </>
  );
};

export default AddItems;
