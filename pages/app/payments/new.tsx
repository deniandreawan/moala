import { useState } from "react";
import classNames from "classnames";
import Select, { SingleValueProps, ValueContainerProps } from "react-select";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import CurrencyInput, { formatValue } from "react-currency-input-field";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import AppLayout from "@components/layouts/app";
import Input from "@components/input";
import { NextPageWithLayout } from "@typings/types";
import currencies from "@lib/data/currencies.json";
import { theme } from "@lib/shared";

const SingleValue = (props: SingleValueProps<any>) => (
  <>
    <span className="text-sm">{props.data.code}</span>
    <ChevronDownIcon className="ml-1 h-6 w-6" />
  </>
);

const ValueContainer = (props: ValueContainerProps<any>) => (
  <>{props.children}</>
);

const IndicatorsContainer = () => <></>;

type FormValues = {
  amount: string;
  currency: typeof currencies[number];
  description: string;
};

const NewPayment: NextPageWithLayout = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      currency: currencies[0],
    },
    mode: "onChange",
  });
  const [loading, setLoading] = useState(false);
  const currency = watch("currency");

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
    <form className="flex flex-col flex-grow" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="amount"
        control={control}
        rules={{ validate: (s) => !!parseFloat(s) }}
        render={({ field: { value, onChange } }) => (
          <CurrencyInput
            className="text-center flex-grow w-full border-0 text-6xl !outline-none !ring-0 font-bold pl-6 rtl:pr-6"
            autoComplete="off"
            placeholder={formatValue({
              value: "0",
              decimalScale: currency.digits_after_decimal_separator,
              intlConfig: { locale: "en-US", currency: currency.code },
            })}
            allowNegativeValue={false}
            maxLength={9}
            intlConfig={{ locale: "en-US", currency: currency.code }}
            decimalsLimit={currency.digits_after_decimal_separator}
            onValueChange={onChange}
            value={value}
          />
        )}
      />
      <div className="p-6 self-center flex flex-col gap-6 w-full max-w-md">
        <Controller
          name="currency"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              isMulti={false}
              isSearchable={false}
              options={currencies}
              styles={{
                control: () => ({
                  background: "#f3f4f6",
                  textAlign: "center",
                  borderRadius: "9999px",
                  fontWeight: "bold",
                  padding: "4px 14px",
                  color: "#475569",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }),
                option: (p) => ({
                  ...p,
                  fontWeight: "500",
                  fontSize: "0.875rem",
                }),
              }}
              theme={theme}
              menuPlacement="top"
              getOptionValue={(option) => option?.code || ""}
              getOptionLabel={(option) =>
                [option?.code, option?.name].filter(Boolean).join(" - ")
              }
              className="flex justify-center"
              components={{
                SingleValue,
                ValueContainer,
                IndicatorsContainer,
              }}
            />
          )}
        />
        <Input
          id="description"
          placeholder="Payment description"
          register={register}
          errors={errors}
          validation={{
            required: true,
          }}
        />
        <button
          className={classNames("btn", { loading })}
          disabled={!isValid || loading}
          type="submit"
        >
          Create payment
        </button>
      </div>
    </form>
  );
};

NewPayment.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default NewPayment;
