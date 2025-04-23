export type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	username: string;
	photo: string;
	role: string;
	accountType: string;
	organizationLogo: string;
	organizationName: string;
	organizationWebsite: string;
	organizationDescription: string;
	bio: string;
	careerGoals: string;
	opportunities: string;
	strengths: string;
	assessment: string;
	isSuspended: boolean;
	isDeleted: boolean;
	created_at: string;
};

export type SessionData = User[];

export type ApiResponse<T = Record<string, unknown>> = {
	status: string;
	message: string;
	error?: Record<string, string[]> | string;
	data?: T;
};
