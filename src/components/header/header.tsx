"use client";
import Link from "next/link";
import Image from "next/image";
import "./header.scss";
import { useState } from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Header() {
  const [toggleImage, setToggleImage] = useState<string>("/images/menu.svg");
  const [token, setToken] = useState<string | undefined>(undefined);
  const router = useRouter();
  useEffect(() => {
    setToken(Cookies.get("token"));
    console.log(Cookies.get("token"));
  });
  function onToggleImageButtonClicked() {
    if (toggleImage === "/images/menu.svg") {
      setToggleImage("/images/cancel-icon.svg");
    } else {
      setToggleImage("/images/menu.svg");
    }
  }
  function toggleLoginLogout() {
    if (token) {
      Cookies.remove("token");
      setToken(undefined);
    } else {
      setToken(Cookies.get("token"));
    }
  }
  return (
    <header className="header-component">
      <nav className="header-nav">
        <Link href="/" className="header-logo">
          <h1>BuyersLead</h1>
        </Link>
        {token && (
          <ul className="header-nav-links">
            <li>
              <Link href={{ pathname: "/buyers" }}>All Buyers</Link>
            </li>
            <li>
              <Link href={{ pathname: "/buyers/new" }}>Add Buyer</Link>
            </li>
            <li>
              <Link href={{ pathname: "/buyers/import-csv" }}>CSV Import</Link>
            </li>
          </ul>
        )}

        <div className="header-nav-buttons">
          <Link href="/owner/auth" className="book-now-link">
            <button type="button" onClick={toggleLoginLogout}>
              <Image
                src="/images/Login-button-icon-red-color.svg"
                alt="Book Now"
                width={24}
                height={24}
              />
              {token ? <span>Logout</span> : <span>Login / Signup</span>}
            </button>
          </Link>
          <button
            className="mobile-toggle-button"
            onClick={onToggleImageButtonClicked}
          >
            <Image src={toggleImage} alt="menu-icon" width={18} height={18} />
          </button>
        </div>
      </nav>

      {toggleImage === "/images/cancel-icon.svg" ? (
        <nav className="header-mobile-nav">
          <div className="header-mobile-top-bar">
            <Link className="title" href={"/"}></Link>
            <div className="mobile-button-containers">
              <Link href="/owner/auth" className="mobile-book-now-link">
                <button type="button" onClick={toggleLoginLogout}>
                  <Image
                    src="/images/Login-button-icon-red-color.svg"
                    alt="Book Now"
                    width={24}
                    height={24}
                  />

                  {token ? <span>Logout</span> : <span>Login / Signup</span>}
                </button>
              </Link>
              <button
                className="cancel-button"
                onClick={onToggleImageButtonClicked}
              >
                <Image
                  src="/images/cancel-icon.svg"
                  alt="cross-icon"
                  width={25}
                  height={25}
                />
              </button>
            </div>
          </div>
          <hr />
          {token && (
            <ul className="mobile-header-nav-links">
              <li>
                <Link href="/buyers">All Buyers</Link>
              </li>
              <li>
                <Link href={{ pathname: "/buyers/new" }}>Add Buyer</Link>
              </li>
              <li>
                <Link href={{ pathname: "/buyers/cv-import" }}>CSV Import</Link>
              </li>
            </ul>
          )}
        </nav>
      ) : null}
    </header>
  );
}

export default Header;
