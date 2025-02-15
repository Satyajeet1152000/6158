"use client";

import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import CardWrapper from "./CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormSuccess from "../FormSuccess";
import { RegisterFormSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
// import register from "@/actions/auth/register";

const RegisterForm = () => {
	const [isPending, startTransition] = useTransition();
	const [formSuccess, setFormSuccess] = useState({
		success: false,
		message: "",
	});
	const router = useRouter();

	const form = useForm<z.infer<typeof RegisterFormSchema>>({
		resolver: zodResolver(RegisterFormSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof RegisterFormSchema>) => {
		startTransition(async () => {
			const res = await fetch(`${process.env.API_URL}/auth/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			const result = await res.json();

			console.log(result);

			if (!result.success) {
				setFormSuccess({
					success: false,
					message: result.error,
				});
				return;
			}
			setFormSuccess({
				success: result.success,
				message: result.success
					? "Registration complete."
					: result.error,
			});
			router.push("/home");
		});
	};

	return (
		<CardWrapper
			footerText='Already have an account?'
			footerHrefText='Log in'
			footerHref='/login'
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className=' space-y-6'
				>
					<div className=' space-y-6'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder='Full name'
											type='text'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder='Your eamil'
											type='email'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										{/* TODO: Change password text dot to asterisk */}
										<Input
											{...field}
											disabled={isPending}
											placeholder='Password'
											type='password'
											className=''
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormSuccess
						success={formSuccess.success}
						message={formSuccess.message}
					/>
					<Button
						type='submit'
						className=' w-full bg-[#154879] hover:bg-[#0e3a6a] py-7 text-xl font-normal text-white'
						disabled={isPending}
					>
						Sign Up
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};

export default RegisterForm;
