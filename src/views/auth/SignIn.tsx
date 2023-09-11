import InputField from "components/fields/InputField";
import Checkbox from "components/checkbox";
import Card from "components/card";
import { useState } from "react";

export default function SignIn() {
  const [eid, setEid] = useState("");
  const [password, setPassword] = useState("");

  const handleEidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEid(e.target.value.toUpperCase());
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center">
      {/* Sign in section */}
      <Card
        extra={
          "items-center flex-col w-[370px]  min-h-[55vh] p-[16px] bg-cover mt-8 py-8"
        }
      >
        <form onSubmit={handleSubmit} autoComplete="off" className="w-95p">
          {/* Employee ID */}
          <InputField
            variant="auth"
            extra="mb-5"
            label="Employee ID"
            placeholder="ABCD1234"
            id="eid"
            type="text"
            pattern="[A-Z0-9]+"
            maxLength={8}
            value={eid}
            onChange={handleEidChange}
          />

          {/* Password */}
          <InputField
            variant="auth"
            extra="mb-5"
            label="Password"
            placeholder="Min. 8 characters"
            id="password"
            type="password"
            minLength={8}
            value={password}
            onChange={handlePasswordChange}
          />
          {/* Checkbox */}
          <div className="mb-5 flex items-center justify-between px-2">
            <div className="flex items-center">
              <Checkbox />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                Keep me logged In
              </p>
            </div>
            <a
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              href=" "
            >
              Forgot Password?
            </a>
          </div>
          <button
            className="linear mt-4 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </Card>
    </div>
  );
}
