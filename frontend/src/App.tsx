import { AppRoutes } from "./routes/AppRoutes";

import { AuthProvider } from "./context/auth/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;