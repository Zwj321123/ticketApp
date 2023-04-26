import Link from "next/link";

export default function Header({ currentUser }) {
    //filter: removes any falsy values
    //map: returns an array of <li> elements
    const links = [
        !currentUser && { label: 'Sign Up', href: '/auth/signup' },
        !currentUser && { label: 'Sign In', href: '/auth/signin' },
        currentUser && { label: 'Sign Out', href: '/auth/signout' },
        currentUser && { label: 'Orders', href: '/orders' }
    ].filter(linkConfig => linkConfig).map(({ label, href }) => {
        return <li key={href} className="nav-item">
            <Link legacyBehavior href={href}>
                <a className="nav-link">{label}</a>
            </Link>
        </li>
    });

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">GitTix</a>
                <div className="d-flex justify-content-end">
                    <ul className="nav d-flex align-items-center">
                        {links}
                    </ul>
                </div>
            </div>
        </nav>
    );
}