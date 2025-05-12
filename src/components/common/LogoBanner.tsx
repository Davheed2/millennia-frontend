import Image from 'next/image';
import Link from 'next/link';

const LogoBanner = ({ className }: { className?: string }) => {
	return (
		<Link href="/" className={`flex items-center justify-center gap-2`}>
			<Image
				className="aspect-square w-6 md:w-10"
				src="/millennnia.png"
				width={200}
				height={200}
				priority
				alt="logo"
			/>
			<span role="" className={`font-bold md:text-xl ${className}`}>
				Millennia Trades
			</span>
		</Link>
	);
};

export default LogoBanner;
