import HeaderWrapper from "./HeaderWrapper";
import HeaderMenu from "./HeaderMenu";

export default function LayoutWrapper({ children }) {
  return (
    <div className="bg-white overflow-x-hidden">
      <HeaderWrapper>
        <HeaderMenu />
      </HeaderWrapper>
      {children}
    </div>
  );
}
