import HeaderWrapper from "./HeaderWrapper";
import HeaderMenu from "./HeaderMenu";

export default function LayoutWrapper({ children }) {
  return (
    <div className="bg-white overflow-x-hidden">
      <HeaderWrapper>
        <HeaderMenu />
      </HeaderWrapper>
      {children}
      <div className="bg-pink-500">
        <div className="container mx-auto p-8 text-pink-200 text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="tracking-wider">ᴄαɴɪᴠeᴛe</span>
        </div>
      </div>
    </div>
  );
}
