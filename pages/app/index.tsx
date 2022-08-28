import Link from "next/link";
import AppLayout from "../../components/layouts/app";
import { InboxIcon } from "@heroicons/react/24/outline";
import { NextPageWithLayout } from "../../types/types";

const App: NextPageWithLayout = () => {
  const currentHour = new Date().getHours();

  return (
    <div className="p-6 w-full max-w-5xl self-center">
      <div className="font-semibold flex justify-between items-center mb-6">
        <h1 className="text-lg">
          {currentHour < 12 && currentHour > 4
            ? "Good morning"
            : currentHour < 17 && currentHour > 12
            ? "Good afternoon"
            : "Good evening"}
        </h1>
        <Link href="/app/payments/new">
          <a className="text-sm border-2 py-1 px-3 rounded-md">New payment</a>
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col border-2 rounded-md divide-y-2 min-h-[500px] w-full">
          <div className="p-3 text-sm font-medium">Recent payments</div>
          <div className="flex-grow flex flex-col items-center justify-center text-center">
            <InboxIcon className="h-12 w-12" />
            <span className="mt-4 text-sm font-semibold">
              You haven&apos;t requested any payments yet
            </span>
          </div>
        </div>
        <div className="flex flex-col border-2 rounded-md divide-y-2 min-h-[500px] w-full">
          <div className="p-3 text-sm font-medium">Top products</div>
          <div className="flex-grow flex flex-col items-center justify-center text-center p-3">
            <InboxIcon className="h-12 w-12" />
            <span className="mt-4 text-sm font-semibold">
              You haven&apos;t added any products yet
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

App.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default App;
