"use client";

import { BellDot, ChevronsRight, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import useMount from "@/hooks/useMount";
import { Button } from "../../ui/button";
import { signOut } from "next-auth/react";

const Toolbar = () => {
	const { theme, setTheme } = useTheme();
	const mount = useMount();

	if (!mount) return null;

	return (
		<div className='text-gray-500 flex items-center justify-between py-2'>
			<div className='flex'>
				<Button variant={"ghost"}>
					<BellDot />
				</Button>
				<Button
					variant={"ghost"}
					onClick={() => {
						if (theme === "dark") {
							setTheme("light");
						} else {
							setTheme("dark");
						}
					}}
				>
					{theme === "dark" ? (
						<Moon size={20} className='ml-auto' />
					) : (
						<Sun size={20} className='ml-auto' />
					)}
				</Button>
				<Button variant={"ghost"}>
					<ChevronsRight />
				</Button>
			</div>
			<Button
				variant={"link"}
				className='text-lg text-gray-500'
				onClick={() => signOut({ callbackUrl: "/login" })}
			>
				Logout
			</Button>
		</div>
	);
};

export default Toolbar;
