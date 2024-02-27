import "./globals.css";
import { Providers } from "@/components";

export const metadata = {
	title: "ChatiLie",
	description: 'Best place to lie :">',
};

const RootLayout: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	return (
		<html lang="en">
			<body className="drop-shadow-lg">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
