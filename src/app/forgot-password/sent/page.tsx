import ForgotPasswordSent from '@/components/auth/ForgotPasswordSent';
import { generatePageMetadata } from '@/components/common/PageMetaData';
import { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
	return generatePageMetadata({
	  title: 'Password Reset - Millennia Trades',
	  content: 'We’ve sent a password reset link to your email. Please check your inbox or spam folder.',
	  url: 'https://milleniatrades.com/forgot-password/sent',
	});
  };

export default function ForgotPassword() {
	return (
		<div className="">
			<ForgotPasswordSent />
		</div>
	);
}
