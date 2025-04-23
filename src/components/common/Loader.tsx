import { JSX } from "react";

type CompProp = {
  message?: string | JSX.Element;
};

const Loader = ({ message }: CompProp) => {
  return (
    <div className="flex h-svh w-full flex-col items-center justify-center gap-3 overflow-hidden font-medium">
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default Loader;
