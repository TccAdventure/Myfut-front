import { BrowserRouter, Link } from "react-router-dom";

import { Router } from "@app/Router";
import { routes } from "@app/Router/routes";
import { ThemeProvider } from "@app/contexts/ThemeContext";
import { ThemeSwitcher } from "@views/components/ThemeSwitcher";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <header className="border-b p-6 mb-10 space-x-6">
          <Link to='/'>Home</Link>
          <Link to={routes.createUser}>Criar usuário</Link>
        </header>

        <ThemeSwitcher />
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
