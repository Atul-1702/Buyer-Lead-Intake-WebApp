"use client";
import Link from "next/link";
import Image from "next/image";
import "./header.scss";
import { useState } from "react";

function Header() {
  const [toggleImage, setToggleImage] = useState<string>("/images/menu.svg");

  function onToggleImageButtonClicked() {
    if (toggleImage === "/images/menu.svg") {
      setToggleImage("/images/cancel-icon.svg");
    } else {
      setToggleImage("/images/menu.svg");
    }
  }
  return (
    <header className="header-component">
      <nav className="header-nav">
        <Link href="/" className="header-logo">
          <h1>BuyersLead</h1>
        </Link>

        <ul className="header-nav-links">
          <li>
            <Link href={{ pathname: "/artists" }}>All Buyers</Link>
          </li>
          <li>
            <Link
              href={{ pathname: "/artists", query: { category: "Singer" } }}
            >
              Add Buyer
            </Link>
          </li>
          <li>
            <Link
              href={{ pathname: "/artists", query: { category: "Dancer" } }}
            >
              CV Import
            </Link>
          </li>
        </ul>

        <div className="header-nav-buttons">
          <Link href="/owner/auth" className="book-now-link">
            <button type="button">
              <Image
                src="/images/right-arrow-icon-white.svg"
                alt="Book Now"
                width={24}
                height={24}
              />

              {/* <span>Logout</span> */}

              <span>Login / Signup</span>
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
              <Link href="/artist-book" className="mobile-book-now-link">
                <button type="button">
                  <Image
                    src="/images/right-arrow-icon-white.svg"
                    alt="Book Now"
                    width={24}
                    height={24}
                  />

                  {/* <span>Logout</span> */}

                  <span>Login / Signup</span>
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
          <ul className="mobile-header-nav-links">
            <li>
              <Link href="/artists">All Artists</Link>
            </li>
            <li>
              <Link
                href={{ pathname: "/artists", query: { category: "Singer" } }}
              >
                Singer
              </Link>
            </li>
            <li>
              <Link
                href={{ pathname: "/artists", query: { category: "Dancer" } }}
              >
                Dancer
              </Link>
            </li>
            <li>
              <Link href={{ pathname: "/artists", query: { category: "DJ" } }}>
                DJ
              </Link>
            </li>
            <li>
              <Link
                href={{ pathname: "/artists", query: { category: "Comedian" } }}
              >
                Comedian
              </Link>
            </li>
            <li>
              <Link
                href={{ pathname: "/artists", query: { category: "Musician" } }}
              >
                Musician
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

export default Header;
