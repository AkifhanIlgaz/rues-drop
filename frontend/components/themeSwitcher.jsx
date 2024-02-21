import { Switch } from '@nextui-org/switch'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { MoonFilledIcon, SunFilledIcon } from './icons'

export const ThemeSwitcher = () => {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null
	return (
		<Switch
			onChange={e => {
				setTheme(e.target.checked ? 'light' : 'dark')
			}}
			isSelected={theme == 'light'}
			startContent={<SunFilledIcon size={12} />}
			endContent={<MoonFilledIcon size={12} />}
		/>
	)
}
