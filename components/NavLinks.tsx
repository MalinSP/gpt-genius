import Link from "next/link";
import React from "react";

interface INavLinkProps {
  href: string;
  label: string;
}

interface INavLinksArr {
  links: INavLinkProps[];
}

const NavLinks: React.FC<INavLinksArr> = ({ links }) => {
  return (
    <ul className="menu text-base-content">
      {links.map((link) => {
        return (
          <li key={link.href}>
            <Link href={link.href} className="capitalize">
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;
