import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head />
            <body className="bg-base-100 w-full">
                <nav className="navbar bg-base-300 relative">
                    <div className="navbar-start">
                        <Link href="/" className="btn btn-ghost normal-case text-xl">
                            FGC Trainer
                        </Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            <li>
                                <Link href="/">Routines</Link>
                            </li>
                            <li>
                                <Link href="/settings">Settings</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <Link href="/create" className="btn">
                            Create Routine
                        </Link>
                    </div>
                </nav>
                <div className="container mx-auto">{children}</div>
            </body>
        </html>
    );
}
