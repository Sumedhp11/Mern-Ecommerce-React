import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function UserProfile() {
  const { register, handleSubmit, setValue, reset } = useForm();
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const [selectedEditIndex, setselectedEditIndex] = useState(-1);
  const [showNewAddressForm, setshowNewAddressForm] = useState(false);

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setselectedEditIndex(-1);
  };
  const handleRemove = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleEditForm = (index) => {
    setselectedEditIndex(index);
    const address = user.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
    setValue("phone", address.phone);
    setValue("street", address.street);
  };
  const handleAdd = (address) => {
    const newUser = { ...user, addresses: [...user.addresses], address };
    dispatch(updateUserAsync(newUser));
    setselectedEditIndex(-1);
    setshowNewAddressForm(false);
  };

  return (
    <div>
      <div>
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 text-left font-bold tracking-tight">
              Name {user.name ? user.name : "New User"}
            </h1>
            <h3 className="text-xl text-left my-5 font-bold tracking-tight">
              Email address : {user.email}
            </h3>
            {user.role === "admin" && (
              <h3 className="text-xl text-left my-5 font-bold tracking-tight">
                Role : {user.role}
              </h3>
            )}
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <button
              onClick={() => {
                setshowNewAddressForm(true);
                setselectedEditIndex(-1);
              }}
              type="submit"
              className="rounded-md  bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add New Address
            </button>
            <p className="mt-0.5 text-lg  text-left">Your Address:</p>
            {showNewAddressForm ? (
              <form
                noValidate
                className="bg-white px-5 py-12 mt-12"
                onSubmit={handleSubmit((data) => {
                  handleAdd(data);
                  reset();
                })}
              >
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm text-left font-medium leading-6 text-gray-900"
                        >
                          Full Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("name", {
                              required: "name is required",
                            })}
                            id="name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-left text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "email is required",
                            })}
                            type="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="phone"
                          className="block text-left text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone
                        </label>
                        <div className="mt-2">
                          <input
                            type="tel"
                            {...register("phone", {
                              required: "phone is required",
                            })}
                            id="phone"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="street-address"
                          className="block text-sm text-left font-medium leading-6 text-gray-900"
                        >
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("street", {
                              required: "street Address is required",
                            })}
                            id="street"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="block text-sm text-left font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("city", {
                              required: "City is required",
                            })}
                            id="city"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="state"
                          className="block text-sm text-left font-medium leading-6 text-gray-900"
                        >
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("state", {
                              required: "state is required",
                            })}
                            id="state"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="pinCode"
                          className="block text-left text-sm font-medium leading-6 text-gray-900"
                        >
                          ZIP / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("pinCode", {
                              required: "pinCode is required",
                            })}
                            id="pinCode"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                    <button
                      onClick={() => {
                        setselectedEditIndex(-1);
                        setshowNewAddressForm(false);
                      }}
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Address
                    </h2>
                    {user.address && (
                      <>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Choose From existing Address
                        </p>
                        <ul>
                          {user.addresses.map((address, index) => (
                            <li
                              key={index}
                              className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 border-gray-200"
                            >
                              <div className="flex  gap-x-4">
                                <input
                                  name="address"
                                  type="radio"
                                  value={index}
                                  className="h-4 w-4 border-gray-600 text-indigo-600 focus:ring-indigo-600"
                                />
                                <div className="min-w-0 flex-auto">
                                  <p className="text-sm font-semibold leading-6 text-gray-900">
                                    {address.name}
                                  </p>
                                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                    {address.street}
                                  </p>
                                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                    {address.pincode}
                                  </p>
                                </div>
                              </div>
                              <div className="hidden sm:flex sm:flex-col sm:items-center">
                                <p className="text-sm leading-6 text-gray-900">
                                  {address.phone}
                                </p>
                                <p className="text-sm leading-6 text-gray-500">
                                  {address.city}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </form>
            ) : null}
            {user.addresses.map((address, index) => (
              <div>
                {selectedEditIndex === index ? (
                  <form
                    noValidate
                    className="bg-white px-5 py-12 mt-12"
                    onSubmit={handleSubmit((data) => {
                      handleEdit(data, index);
                      reset();
                    })}
                  >
                    <div className="space-y-12">
                      <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                          Personal Information
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Use a permanent address where you can receive mail.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="block text-sm text-left font-medium leading-6 text-gray-900"
                            >
                              Full Name
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("name", {
                                  required: "name is required",
                                })}
                                id="name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-4">
                            <label
                              htmlFor="email"
                              className="block text-left text-sm font-medium leading-6 text-gray-900"
                            >
                              Email address
                            </label>
                            <div className="mt-2">
                              <input
                                id="email"
                                {...register("email", {
                                  required: "email is required",
                                })}
                                type="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="phone"
                              className="block text-left text-sm font-medium leading-6 text-gray-900"
                            >
                              Phone
                            </label>
                            <div className="mt-2">
                              <input
                                type="tel"
                                {...register("phone", {
                                  required: "phone is required",
                                })}
                                id="phone"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="street-address"
                              className="block text-sm text-left font-medium leading-6 text-gray-900"
                            >
                              Street address
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("street", {
                                  required: "street Address is required",
                                })}
                                id="street"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2 sm:col-start-1">
                            <label
                              htmlFor="city"
                              className="block text-sm text-left font-medium leading-6 text-gray-900"
                            >
                              City
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("city", {
                                  required: "City is required",
                                })}
                                id="city"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="state"
                              className="block text-sm text-left font-medium leading-6 text-gray-900"
                            >
                              State / Province
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("state", {
                                  required: "state is required",
                                })}
                                id="state"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="pinCode"
                              className="block text-left text-sm font-medium leading-6 text-gray-900"
                            >
                              ZIP / Postal code
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("pinCode", {
                                  required: "pinCode is required",
                                })}
                                id="pinCode"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Edit Address
                        </button>
                        <button
                          onClick={() => setselectedEditIndex(-1)}
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                          Address
                        </h2>
                        {user.address && (
                          <>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                              Choose From existing Address
                            </p>
                            <ul>
                              {user.addresses.map((address, index) => (
                                <li
                                  key={index}
                                  className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 border-gray-200"
                                >
                                  <div className="flex  gap-x-4">
                                    <input
                                      name="address"
                                      type="radio"
                                      value={index}
                                      className="h-4 w-4 border-gray-600 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <div className="min-w-0 flex-auto">
                                      <p className="text-sm font-semibold leading-6 text-gray-900">
                                        {address.name}
                                      </p>
                                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                        {address.street}
                                      </p>
                                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                        {address.pincode}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="hidden sm:flex sm:flex-col sm:items-center">
                                    <p className="text-sm leading-6 text-gray-900">
                                      {address.phone}
                                    </p>
                                    <p className="text-sm leading-6 text-gray-500">
                                      {address.city}
                                    </p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    </div>
                  </form>
                ) : null}
                <div
                  key={index}
                  className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 border-gray-200"
                >
                  <div className="flex  gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {address?.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address?.street}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address?.pincode}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-center">
                    <p className="text-sm leading-6 text-gray-900">
                      {address?.phone}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      {address?.city}
                    </p>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-center">
                    <button
                      onClick={(e) => handleEditForm(index)}
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleRemove(e, index)}
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
