import { useState } from "react";
import classNames from "classnames";
import Select from "react-select";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { NextPageWithLayout } from "@typings/types";
import { theme, styles } from "@lib/shared";
import AppLayout from "@components/layouts/app";
import payment_methods_categories from "@lib/data/payment_methods_categories.json";
import currencies from "@lib/data/currencies.json";

type FormValues = {
  payment_methods_categories: string[];
  default_currency: string;
  allow_tips: boolean;
};

const Settings: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    control,
  } = useForm<FormValues>({
    defaultValues: {
      payment_methods_categories: [],
      default_currency: undefined,
      allow_tips: false,
    },
    mode: "onChange",
  });
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
      className="flex flex-col gap-6 flex-grow p-6 max-w-md self-center w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="payment_methods_categories"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field, fieldState: { error } }) => (
          <label>
            <span className="block font-medium text-sm mb-1">
              Allowed payment methods
            </span>
            <Select
              {...field}
              onChange={(val) => field.onChange(val.map((c) => c.value))}
              value={payment_methods_categories.filter((c) =>
                field.value.includes(c.value)
              )}
              isMulti={true}
              isSearchable={false}
              options={payment_methods_categories}
              styles={styles<typeof payment_methods_categories[number], true>(
                error
              )}
              theme={theme}
            />
          </label>
        )}
      />
      <Controller
        name="default_currency"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field, fieldState: { error } }) => (
          <label>
            <span className="block font-medium text-sm mb-1">
              Default currency
            </span>
            <Select
              {...field}
              onChange={(val) => field.onChange(val?.code)}
              value={currencies.find((c) => c.code === field.value)}
              isMulti={false}
              options={currencies}
              styles={styles<typeof currencies[number], false>(error)}
              theme={theme}
              getOptionValue={(option) => option?.code || ""}
              getOptionLabel={(option) =>
                [option?.code, option?.name].filter(Boolean).join(" - ")
              }
            />
          </label>
        )}
      />
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          {...register("allow_tips")}
          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-transparent"
        />
        <span className="ml-2 font-medium text-gray-800 text-sm">
          Allow customers to add tips
        </span>
      </label>
      <button
        className={classNames("btn mt-auto", { loading })}
        disabled={!isValid || loading}
        type="submit"
      >
        Save settings
      </button>
    </form>
  );
};

Settings.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default Settings;
