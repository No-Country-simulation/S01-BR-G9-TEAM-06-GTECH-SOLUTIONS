import { Bell, Moon, UserCircle } from "lucide-react";

export function Header() {
    return (
        <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-end px-8 gap-6">

            <Bell />

            <Moon />

            <UserCircle size={34} />

        </header>
    );
}