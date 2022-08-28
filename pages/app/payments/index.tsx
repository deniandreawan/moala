import { NextPageWithLayout } from "../../../types/types";
import AppLayout from "../../../components/layouts/app";
import { InboxIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Payments: NextPageWithLayout = () => {
  return (
    <div className="p-6 flex-grow flex flex-col gap-6 max-w-md self-center w-full relative">
      <div className="font-semibold flex justify-between items-center">
        <h1 className="text-lg">Payments</h1>
        <Link href="/app/payments/new">
          <a className="text-sm border-2 py-1 px-3 rounded-md">New payment</a>
        </Link>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <InboxIcon className="h-12 w-12" />
        <span className="mt-4 text-sm font-semibold">
          You haven&apos;t requested any payments yet
        </span>
      </div>
    </div>
  );
};

Payments.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default Payments;
