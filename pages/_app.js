import "../styles/globals.css";
import { AppProvider } from "../utility/AppContext";
import { AuthProvider } from "../utility/AuthProvider";
import { doLogin } from "../utility/AuthProvider";
import ls from "local-storage";

function MyApp({ Component, pageProps }) {
  const localUser = ls.get("localUser");
  if (localUser != undefined) {
    // doLogin(localUser);
  }
  return (
    <AuthProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </AuthProvider>
  );
}

export default MyApp;
