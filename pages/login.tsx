import { useState } from "react";
import classNames from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "@components/input";
import GuestLayout from "@components/layouts/guest";
import { NextPageWithLayout } from "@typings/types";

type FormValues = {
  email: string;
};

const Login: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async () => {
    setLoading(true);
    try {
      console.log("success");
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <form
      className="bg-white w-full max-w-sm border-2 border-gray-100 rounded-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-center border-b-2 border-gray-100 p-8">
        <h3 className="font-semibold mb-2 text-lg">Log in to Moala</h3>
        <p className="text-sm text-gray-500 font-medium">
          We&apos;ll create an account if you <br />
          don&apos;t have one yet.
        </p>
      </div>
      <div className="p-8 flex flex-col gap-4">
        <Input
          id="email"
          type="email"
          label="Email address"
          placeholder="Enter your email address"
          register={register}
          errors={errors}
          validation={{
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Please enter a valid e-mail address",
            },
          }}
        />

        <button
          className={classNames("btn", { loading })}
          disabled={loading}
          type="submit"
        >
          Continue
        </button>
      </div>
    </form>
  );
};

Login.getLayout = function getLayout(page) {
  return <GuestLayout>{page}</GuestLayout>;
};

export default Login;
