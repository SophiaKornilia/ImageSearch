import { useAuth0 } from "@auth0/auth0-react";
import { Loading } from "./Loading";
import LogoutButton from "./LogoutButton";
import { Navigation } from "./Navigation";
import "../styles/main.scss";
import LoginButton from "./LoginButton";
import { Outlet } from "react-router-dom";
import { Startpage } from "../pages/Startpage";

export const Layout = () => {
  const {isAuthenticated, isLoading } = useAuth0();


  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {isAuthenticated ? (
        <div>
          <header>
            <Navigation />
            <LogoutButton />
          </header>
          <main>
            <Outlet />
          </main>
        </div>
      ) : (
        <>
          <Startpage />
          <LoginButton />
        </>
      )}
    </>
  );
};
