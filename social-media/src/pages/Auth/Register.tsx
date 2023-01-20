import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "../../components/Buttom";
import Layout from "../../components/Layout";

import "../../styles/index.css";

function Register() {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (email && password && firstName && lastName) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, firstName, lastName, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    };
    axios
      .post("register", body)
      .then((res) => {
        const { message, data } = res.data;
        if (data) {
          navigate("/login");
        }
      })
      .catch((err) => {
        const { message } = err.response.data;
        console.log(message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Layout>
      <div className="w-full bg-center bg-slate-50">
        <div className="flex h-full w-full flex-wrap items-center justify-center">
          <div className="card w-4/5 gap-4 p-3 shadow-sm shadow-black lg:h-4/5 lg:card-side ">
            <img
              className="h-3/5 w-2/5 place-self-center object-contain md:h-4/5 md:w-3/5 mx-auto"
              src="src/assets/gurl.svg"
            />
            <div className="card-body justify-between mt-1 place-self-center">
              <form
                className="flex flex-col gap-4 min-w-[40%]"
                onSubmit={(e) => handleSubmit(e)}
              >
                <h1 className="text-center">Welcome!</h1>
                <h1 className="text-start">Sign up to</h1>
                <div className="flex-cols-row">
                  <label className="label">
                    <span className="label-text text-lg text-white dark:text-black ">
                      First Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs border-black"
                  />
                  <label className="label">
                    <span className="label-text text-lg text-white dark:text-black">
                      Last Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs border-black"
                  />

                  <label className="label">
                    <span className="label-text text-lg text-white dark:text-black ">
                      Email
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your email..."
                    className="input input-bordered w-full max-w-xs border-black"
                  />
                  <label className="label">
                    <span className="label-text text-lg text-white dark:text-black">
                      Password
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your password..."
                    className="input input-bordered w-full max-w-xs border-black"
                  />
                </div>
                <Button
                  className="btn  bg-zinc-500 p-2 font-bold text-white hover:bg-zinc-400/90 dark:bg-zinc-800/90 dark:hover:bg-zinc-700/90 mt-5 w-full max-w-xs"
                  label="REGISTER"
                />
                <label className="label-one">
                  <p className="font-normal font-weight-300 ">
                    Already have an Account?{" "}
                    <span className="font-bold text-black "> Login</span>
                  </p>
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Register;
