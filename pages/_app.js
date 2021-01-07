import "../styles/globals.css";
import { AppProvider } from "../utility/AppContext";
import { AuthProvider } from "../utility/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </AppProvider>
  );
}

export default MyApp;
