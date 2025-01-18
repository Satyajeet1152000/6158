// import { z } from "zod";

import { z } from "zod";

// export const LoginSchema = z.object({
//     email: z.string().email({
//         message: "Email is required.",
//     }),
//     password: z.string().min(1, {
//         message: "Pasword is required.",
//     }),
// });

// export const RegisterSchema = z.object({
//     name: z.string().min(1, {
//         message: "Name is required.",
//     }),
//     email: z.string().email({
//         message: "Email is required.",
//     }),
//     password: z
//         .string({
//             message: "Pasword is required.",
//         })
//         .min(5, {
//             message: "Minimum password length 5",
//         }),
// });

export const SearchSchema = z.object({
	search: z.string({
		message: "Full name is required.",
	}),
});

export const CreateNewTaskSchema = z.object({
	title: z.string().min(1, {
		message: "Required",
	}),
	status: z.enum(["todo", "inProgress", "underReview", "finished"], {
		message: "Required",
	}),
	priority: z.enum(["low", "medium", "urgent"], {
		message: "Required",
	}),
	deadline: z.date(),
	description: z.string().optional(),
	favorite: z.boolean().optional().default(false),
});

export type User = {
	id: string;
	name: string;
	email: string;
	token: string;
};

// export type RecordType = {
// 	_id: string;
// 	title: string;
// 	category: StatusType;
// 	priority: PriorityType;
// 	deadline: Date;
// 	description: string;
// 	favorite: boolean;
// 	user: string;
// 	createdAt: Date;
// 	updatedAt: Date;
// 	__v?: string;
// };

export type Attachment = {
	filename: string;
	url: string;
	type: string;
	uploadDate?: Date;
};

export type Comment = {
	userId: string;
	content: string;
	timestamp?: Date;
};

export type Reference = {
	type?: "manager" | "colleague" | "client";
	refererId?: string;
};

export type Metrics = {
	efficiencyScore?: number;
	impactScore?: number;
	qualityScore?: number;
};

export type TaskType = {
	_id?: string;
	employeeId: string;
	title: string;
	description: string;
	category: "BAU" | "AdHoc" | "Project";
	priority: "Low" | "Medium" | "High" | "Urgent";
	status?: "Pending" | "InProgress" | "Completed" | "Overdue";
	timeEstimated?: number; // in minutes
	timeSpent?: number; // in minutes
	startDate?: Date;
	completionDate?: Date;
	deadline?: Date;
	reference?: Reference;
	attachments?: Attachment[];
	dependencies?: string[];
	tags?: string[];
	comments?: Comment[];
	metrics?: Metrics;
	createdAt?: Date;
	updatedAt?: Date;
};
