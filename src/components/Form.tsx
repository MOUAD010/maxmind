import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import Post from "./Post";

type FormData = {
  Pages: string;
  Start: string;
  End: string;
};

export default function Form() {
  const [pages, setPages] = useState<any[]>([]);
  const [postProps, setpostProps] = useState<FormData>();
  const [loading, setLoading] = useState(true); // Loading state
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setpostProps(data);
    console.log(data);
  };

  useEffect(() => {
    const limits = { limit: "10", after: "", before: "" };
    const getData = async () => {
      try {
        const response = await axios.post(
          "https://meta-api-eight.vercel.app/api/v1/accounts",
          limits
        );
        // Set pages state with response data
        setPages(response.data.data.data || []);
        console.log(response.data.data.data);

        // console.log(pages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };
    getData();
  }, []);

  return (
    <div className="flex flex-col items-center mt-10 min-h-screen ">
      <h2 className="text-3xl font-semibold mb-2">MAXMIND</h2>
      <p className="text-gray-500 mb-8">
        Get all the data you need with a few clicks
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-5xl space-y-4"
      >
        <div className="flex justify-between">
          <select
            {...register("Pages", { required: true })}
            className="w-full  px-4 mr-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? (
              <option>Loading...</option> // Show "Loading..." while fetching data
            ) : pages.length > 0 ? (
              pages.map((item: any) => (
                <option key={item.id} value={item.id} className="w-[10px]">
                  {item.name}
                </option>
              ))
            ) : (
              <option>No options available</option> // Fallback if no data is available
            )}
          </select>

          <div className=" block">
            <input
              type="date"
              placeholder="Start"
              {...register("Start", { required: true })}
              className="px-4 w-fit py-2 mr-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="block">
            <input
              type="date"
              placeholder="End"
              {...register("End", { required: true })}
              className="w-fit px-4 py-2 mr-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="mx-4">
            {" "}
            {errors.Pages && (
              <span className="text-red-500">Please choose a Page</span>
            )}
          </div>
          <div className="mx-4">
            {errors.Start && (
              <span className="text-red-500">Please file the Start date</span>
            )}
          </div>
          <div className="mx-4">
            {errors.End && (
              <span className="text-red-500">Please file the End date</span>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <input
            type="submit"
            value="Generate"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </form>
      <div className="my-4 flex justify-center items-center ">
        {postProps && (
          <Post
            post_id={postProps?.Pages}
            since={postProps?.Start}
            until={postProps?.End}
          />
        )}
      </div>
    </div>
  );
}
