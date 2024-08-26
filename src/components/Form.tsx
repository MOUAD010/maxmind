//meta-api-eight.vercel.app/api/v1/accounts
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";

type FormData = {
  Pages: string;
  Start: string;
  End: string;
};

export default function Form() {
  const [pages, setPages] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    axios
      .post("https://meta-api-eight.vercel.app/api/v1/accounts")
      .then(function (response) {
        setPages(response.data.data); // Set pages state with response data
        console.log(response.data.data); // Log the response data
        console.log(pages);
        if (pages.length == 0) {
          console.log("no value found");
          setPages([]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div className="flex flex-col items-center mt-10  min-h-screen bg-gray-50">
      <h2 className="text-3xl font-semibold mb-2">Get in touch</h2>
      <p className="text-gray-500 mb-8">Let us know how we can help.</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-5xl space-y-4"
      >
        <div className="flex justify-between">
          <select
            {...register("Pages", { required: true })}
            className="w-1/3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {pages?.map((item: any) => {
              return (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
          {errors.Pages && (
            <span className="text-red-500">This field is required</span>
          )}
          <div className="flex justify-between">
            <input
              type="datetime-local"
              placeholder="Start"
              {...register("Start", { required: true })}
              className=" px-4 w-fit py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.Start && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="flex justify-between">
            <input
              type="datetime-local"
              placeholder="End"
              {...register("End", { required: true })}
              className="w-fit px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.End && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <input
            type="submit"
            value="Submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </form>
    </div>
  );
}
