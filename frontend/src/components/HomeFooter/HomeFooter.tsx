import "./HomeFooter.css";

import Logo from "../../assets/HomePage/UsenovStatus_logo.svg";
// import GithubLogo from "../../assets/HomePage/Github_logo.svg";

export function HomeFooter() {
    return (
        <footer className="home-footer">
            <div className="home-footer-container">
                <div className="home-footer-top">
                    <a href="/" className="home-footer-logo">
                        <img src={Logo} alt="Usenov Status" />

                        <span className="home-footer-brand-text">
                            <span className="home-footer-brand-name">USENOV</span>
                            <span className="home-footer-brand-word">STATUS</span>
                        </span>
                    </a>

                    {/* <div className="home-footer-socials">
                        <a
                            href="https://github.com/ArseniiFrontend/Usenov-Status"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                        >
                            <img src={GithubLogo} alt="" />
                        </a>
                    </div> */}
                </div>

                <div className="home-footer-menu">
                    <h3 className="home-footer-menu-title">Menu</h3>

                    <ul className="home-footer-links">
                        <li>
                            <a href="/">Home</a>
                        </li>

                        <li>
                            <a href="/live">Status</a>
                        </li>

                        <li>
                            <a href="/widget">Widget</a>
                        </li>

                        <li>
                            <a
                                href="https://github.com/ArseniiFrontend/Usenov-Status"
                                target="_blank"
                                rel="noreferrer"
                            >
                                GitHub
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="home-footer-bottom">
                    <p>© 2026 Usenov Status. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default HomeFooter;