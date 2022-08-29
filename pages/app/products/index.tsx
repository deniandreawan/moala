import Link from "next/link";
import classNames from "classnames";
import { InboxIcon } from "@heroicons/react/24/outline";
import { NextPageWithLayout } from "@typings/types";
import AppLayout from "@components/layouts/app";

const Products: NextPageWithLayout = () => {
  return (
    <div className="p-6 flex-grow flex flex-col gap-6 max-w-md self-center w-full relative">
      <div className="font-semibold flex justify-between items-center">
        <h1 className="text-lg">Products</h1>
        <Link href="/app/products/new">
          <a className="text-sm border-2 py-1 px-3 rounded-md">New product</a>
        </Link>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center">
        <InboxIcon className="h-12 w-12" />
        <span className="mt-4 text-sm font-semibold">
          You haven&apos;t added any products yet
        </span>
      </div>
      <button
        className={classNames(
          "btn !transition-bottom mt-auto sticky bottom-0 opacity-0 md:bottom-0"
        )}
      >
        Create payment - $0
      </button>
    </div>
  );
};

Products.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default Products;
