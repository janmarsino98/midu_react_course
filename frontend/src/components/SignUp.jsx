import React, { useState } from "react";

const CreateAccount = () => {
  const [isFocused, setIsFocused] = useState({
    name: false,
    phone: false,
    month: false,
    day: false,
    year: false,
  });

  const handleFocus = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: false }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">Create your account</h1>
        <form>
          <div className="relative mb-4">
            <input
              type="text"
              id="name"
              name="name"
              maxLength="50"
              onFocus={() => handleFocus("name")}
              onBlur={() => handleBlur("name")}
              className={`w-full p-2 border ${
                isFocused.name ? "border-blue-500" : "border-gray-600"
              } rounded bg-black text-white`}
            />
            <label
              className={`absolute left-2 transition-all ${
                isFocused.name || document.getElementById("name")?.value
                  ? "top-1 text-xs"
                  : "top-2 text-sm"
              } ${isFocused.name ? "text-blue-500" : "text-gray-500"}`}
              htmlFor="name"
            >
              Name
            </label>
          </div>

          <div className="relative mb-4">
            <input
              type="tel"
              id="phone"
              name="phone"
              onFocus={() => handleFocus("phone")}
              onBlur={() => handleBlur("phone")}
              className={`w-full p-2 border ${
                isFocused.phone ? "border-blue-500" : "border-gray-600"
              } rounded bg-black text-white`}
            />
            <label
              className={`absolute left-2 transition-all ${
                isFocused.phone || document.getElementById("phone")?.value
                  ? "top-1 text-xs"
                  : "top-2 text-sm"
              } ${isFocused.phone ? "text-blue-500" : "text-gray-500"}`}
              htmlFor="phone"
            >
              Phone
            </label>
          </div>

          <div className="mb-4">
            <a href="#" className="text-sm text-blue-500">
              Use email instead
            </a>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Date of birth
            </label>
            <p className="text-xs mb-2">
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else.
            </p>
            <div className="flex space-x-2">
              <select
                className={`flex-1 p-2 border ${
                  isFocused.month ? "border-blue-500" : "border-gray-600"
                } rounded bg-black text-white`}
                onFocus={() => handleFocus("month")}
                onBlur={() => handleBlur("month")}
              >
                <option value="">Month</option>
                {/* Add month options */}
              </select>
              <select
                className={`flex-1 p-2 border ${
                  isFocused.day ? "border-blue-500" : "border-gray-600"
                } rounded bg-black text-white`}
                onFocus={() => handleFocus("day")}
                onBlur={() => handleBlur("day")}
              >
                <option value="">Day</option>
                {/* Add day options */}
              </select>
              <select
                className={`flex-1 p-2 border ${
                  isFocused.year ? "border-blue-500" : "border-gray-600"
                } rounded bg-black text-white`}
                onFocus={() => handleFocus("year")}
                onBlur={() => handleBlur("year")}
              >
                <option value="">Year</option>
                {/* Add year options */}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
