import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'

export default function BreadCrumbs({ items }) {
	return (
		<Breadcrumbs
			itemClasses={{
				item: ' dark:data-[current=true]:text-yellow '
			}}
		>
			{items.map((item, i) => {
				const Icon = item.icon
				return (
					<BreadcrumbItem key={i} href={item.href} startContent={Icon && <Icon className="w-5 mr-1" />}>
						{item.name}
					</BreadcrumbItem>
				)
			})}
		</Breadcrumbs>
	)
}
