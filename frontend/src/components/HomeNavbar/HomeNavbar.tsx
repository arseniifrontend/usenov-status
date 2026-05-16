import "./HomeNavbar.css";

import { useState } from "react";

import Logo from "../../assets/HomePage/UsenovStatus_logo.svg";

import MenuIcon from "../../assets/Navbar/navbar-icon.svg";
import CloseIcon from "../../assets/Navbar/navbar-close.svg";

export function HomeNavbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <nav className="home-navbar">
                <div className="home-nav-left">
                    <a href="/" className="home-brand" onClick={closeMenu}>
                        <img
                            src={Logo}
                            className="home-brand-mark"
                            alt="Usenov Status"
                        />

                        <span className="home-brand-text">
                            <span className="home-brand-name">USENOV</span>

                            <span className="home-brand-word">
                                STATUS
                            </span>
                        </span>
                    </a>

                    <div className="home-nav-links">
                        <a href="/" className="home-nav-link">
                            Home
                        </a>

                        <a href="/live" className="home-nav-link">
                            Status
                        </a>

                        <a href="/widget" className="home-nav-link">
                            Widget
                        </a>

                        <a
                            href="https://github.com/ArseniiFrontend/Usenov-Status"
                            target="_blank"
                            rel="noreferrer"
                            className="home-nav-link"
                        >
                            GitHub
                        </a>
                    </div>
                </div>

                <div className="home-nav-right">
                    <a href="/live" className="home-nav-cta">
                        Open status
                    </a>

                    <button
                        type="button"
                        className="home-mobile-menu-btn"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <img src={MenuIcon} alt="" />
                    </button>
                </div>
            </nav>

            <div
                className={`home-mobile-menu-overlay ${menuOpen ? "show" : ""}`}
                onClick={closeMenu}
            />

            <div className={`home-mobile-menu ${menuOpen ? "show" : ""}`}>
                <button
                    type="button"
                    className="home-close-btn"
                    onClick={closeMenu}
                    aria-label="Close menu"
                >
                    <img src={CloseIcon} alt="" />
                </button>

                <div className="home-mobile-nav">
                    <a href="/" onClick={closeMenu}>
                        Home
                    </a>

                    <a href="/live" onClick={closeMenu}>
                        Status
                    </a>

                    <a href="/widget" onClick={closeMenu}>
                        Widget
                    </a>

                    <a
                        href="https://github.com/ArseniiFrontend/Usenov-Status"
                        target="_blank"
                        rel="noreferrer"
                        onClick={closeMenu}
                    >
                        GitHub
                    </a>
                </div>

                <a
                    href="/live"
                    className="home-mobile-cta"
                    onClick={closeMenu}
                >
                    Open status
                </a>
            </div>
        </>
    );
}

export default HomeNavbar;