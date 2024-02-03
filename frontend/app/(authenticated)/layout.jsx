import AuthenticatedNavbar from '@/components/navbar/authenticatedNavbar'

export default function Layout({ children }) {
	return (
		<div>
			<AuthenticatedNavbar />
			{children}
		</div>
	)
}
