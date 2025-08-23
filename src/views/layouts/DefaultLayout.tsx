import { Outlet } from 'react-router-dom';

export function DefaultLayout() {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="w-full max-w-[504px] px-8 lg:px-0 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
