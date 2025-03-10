"use client";
import { createUser, getUser, login } from "@/backend/users";
import React, { useState } from "react";

const RegisterForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [file, setFile] = useState<any>(null);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  async function handleLogin() {
    await createUser({ email, password }, file);
    const element: any = document.getElementById("login_modal");
    element.close();
  }

  return (
    <>
      <dialog id="register_modal" className="modal">
        <div className="modal-box flex flex-col items-center">
          <h3 className="font-bold text-lg text-gray-400">Create Account</h3>
          <div className="flex flex-col gap-4 w-full mt-6">
            <label className="input input-bordered flex items-center gap-2 w-full input-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 input-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                value={password}
                type="password"
                className="grow"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label className="input-bordered flex items-center input-primary">
              <input
                type="file"
                className="file-input file-input-primary w-full max-w-xs"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <button
            onClick={() => handleLogin()}
            className="btn w-full btn-secondary mt-8"
          >
            Create Account
          </button>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default RegisterForm;
