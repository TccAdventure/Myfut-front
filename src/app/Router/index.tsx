import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { lazyLoad } from "@app/utils/lazyLoad";
import { DefaultLayout } from "@views/layouts/DefaultLayout";
import { AuthGuard } from "./AuthGuard";
import { routes } from "./routes";

const { Home } = lazyLoad(() => import('@views/pages/Home'))
const { CourtAdminHome } = lazyLoad(() => import('@views/pages/CourtAdminHome'))
const { Login } = lazyLoad(() => import('@views/pages/Login'))
const { Register } = lazyLoad(() => import('@views/pages/Register'))

export function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={
          <div className="flex items-center justify-center h-screen w-screen ">
            <div className="w-10 h-10 rounded-full border-4 border-r-white animate-spin" />
          </div>
        }>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route element={<AuthGuard isPrivate={false} />}>
              <Route path={routes.login} element={<Login />} />
              <Route path={routes.register} element={<Register />} />
            </Route>

            <Route element={<AuthGuard isPrivate />}>
              <Route path={routes.home} element={<Home />} />
              <Route path={routes.courtAdminHome} element={<CourtAdminHome />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
