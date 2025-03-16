import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import React from "react";

const CustomInput = ({
  contentLabel,
  placeholder,
  name,
  value,
  onChange,
  type = "text",
  classWrapper = "",
  onBlur,
  error,
  touched,
  disabled = false,
  setShowPassword,
  showPassword,
}) => {
  return (
    <div className={`${classWrapper}`}>
      <label className="block mb-2 text-sm font-medium">{contentLabel}</label>
      <div className="relative">
        <div className="absolute inset-y-0  left-0 pl-3 flex items-center">
          {name == "fullName" ? (
            <User className="size-5 text-base-content/40" />
          ) : name == "email" ? (
            <Mail className="size-5 text-base-content/40" />
          ) : (
            <Lock className="size-5 text-base-content/40" />
          )}
        </div>
        <input
          type={type}
          className={`text-sm rounded-lg  block w-full input-bordered pl-10 p-2.5 ${
            error && touched ? "border-red-500" : "border-blue-500"
          } `}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          disabled={disabled}
        />
        {name == "password" ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="size-5 text-base-content/40" />
            ) : (
              <Eye className="size-5 text-base-content/40" />
            )}
          </button>
        ) : (
          ""
        )}
      </div>
      {error && touched && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default CustomInput;
