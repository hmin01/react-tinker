import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
  const navigator = useNavigate();

  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404 - Not Found</h1>
        <p className="mt-4">
          Sorry, the page you are looking for does not exist.
        </p>
        <button
          className="mx-auto mt-8 cursor-pointer rounded bg-blue-500 px-4 py-2 text-white"
          onClick={() => navigator("/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
