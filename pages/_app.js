import "../styles/globals.css";
import { AppProvider } from "../utility/AppContext";
import { AuthProvider } from "../utility/AuthContext";
import Loader from "../components/Loader";
import Router from "next/router";

//Binding events.
Router.events.on("routeChangeStart", (e) =>
  document
    .querySelector(".page-loader")
    .classList.remove("opacity-0", "invisible", "scale-75")
);
Router.events.on(
  "routeChangeComplete",
  (j) =>
    document
      .querySelector(".page-loader")
      .classList.add("opacity-0", "invisible", "scale-75")
  // document.querySelector(".page-loader").classList.remove("opacity-100")
);
Router.events.on("routeChangeError", () =>
  document.querySelector(".page-loader").classList.add("opacity-0")
);

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <AuthProvider>
        <Component {...pageProps} />
        <div
          className="page-loader fixed flex items-center justify-center p-12 top-0 right-0 invisible
        opacity-0 transition-all transform scale-75"
        >
          <Loader />
        </div>
      </AuthProvider>
    </AppProvider>
  );
}

export default MyApp;
