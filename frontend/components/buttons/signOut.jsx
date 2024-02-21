import { PowerIcon } from '@heroicons/react/24/outline'
import { Button } from '@nextui-org/react'
import clsx from 'clsx'

export default function SignOutButton({ signOut }) {
	return (
		<Button
			onClick={signOut}
			startContent={<PowerIcon className="w-6" />}
			className={clsx(
				// Base style
				'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-transparent p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3',
				// Light
				'text-danger hover:text-danger-foreground hover:bg-danger'
				// Dark
			)}
		>
			Sign Out
		</Button>
	)
}
