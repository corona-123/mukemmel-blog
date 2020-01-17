import Link from "next/link";
import Head from "next/head";
import Nav from "./nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faInstagram,
  faTwitter,
  faLinkedinIn,
  faGit,
  faUsb
} from "@fortawesome/free-brands-svg-icons";
import Meta from "./Meta";

library.add(faInstagram, faLinkedinIn, faTwitter, faGit, faUsb);

export default function Header({ props }) {
  return (
    <section className="header">
      <Nav></Nav>
      <div className="hero">
        <h1 className="hero-profile">
          <img
            className="hero-profile-picture"
            src="/pp.jpg"
            alt="Profile Picture"
            height="120"
            width="120"
          />
        </h1>
        <div className="hero-social-information">
          <h1 className="hero-title">{props.name}</h1>
          <div className="hero-social-links">
            {props.links.map(({ href, name, username }) => (
              <Link key={`${name}/${href}`} href={href}>
                <a className="social-link" title={username}>
                  <FontAwesomeIcon
                    width="21px"
                    icon={
                      name == "Instagram"
                        ? faInstagram
                        : name == "Twitter"
                        ? faTwitter
                        : name == "LinkedIn"
                        ? faLinkedinIn
                        : name == "GitHub"
                        ? faGit
                        : faUsb
                    }
                  ></FontAwesomeIcon>
                  <p>{`${username}`}</p>
                </a>
              </Link>
            ))}
          </div>
        </div>
        <style jsx>{`
          .hero {
            text-align: center;
            padding: 130px 0 32px 0;
            display: flex;
            flex-direction: row;
            justify-content: center;
          }
          .hero-profile-picture {
            border-radius: 50%;
          }
          .hero-social-links {
            text-align: center;
            display: flex;
          }
          .hero-social-information {
            text-align: left;
            margin-left: 6px;
          }
          .social-link {
            margin-right: 30px;
            font-size: 18px;
            display: flex;
            flex-direction: row;
            text-decoration: none;
            align-items: center;
          }
          .social-link > p {
            margin-left: 6px;
            margin-bottom: 0;
          }

          .hero-title {
            font-size: 48px;
            margin-bottom: 1px;
          }
        `}</style>
      </div>
    </section>
  );
}
