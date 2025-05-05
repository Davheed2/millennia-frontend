import SignUpSuccess from "@/components/auth/SignUpSuccess";
//import { generatePageMetadata } from '@/components/common/PageMetaData';
//import { Metadata } from 'next';

// export const generateMetadata = (): Metadata => {
// 	return generatePageMetadata({
// 		title: 'Success - 100 Minds',
// 		content: 'You have successfully reset your password!.',
// 		url: 'https://admin-mmyv.onrender.com/reset-password/success',
// 	});
// };

export default function SignUpSuccessS() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignUpSuccess />
    </div>
  );
}
