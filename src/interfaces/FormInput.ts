export type SignUpProps = {
	firstName: string;
	lastName: string;
	email: string;
	country: string;
	phone: string;
	password: string;
	confirmPassword: string;
};

export type LoginProps = {
	email: string;
	password: string;
};

export type ResetPasswordProps = {
	password: string;
	confirmPassword: string;
};

export type ForgotPasswordProps = {
	email: string;
};

export type UpdatePasswordsProps = {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
};

export type OtpVerificationProps = {
	otp: string;
};
