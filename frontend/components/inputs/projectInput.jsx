import api from '@/config/api'
import { errorMessage } from '@/config/errors'
import { Autocomplete, AutocompleteItem, Chip } from '@nextui-org/react'
import { useState } from 'react'
import useSWR from 'swr'
import { Label } from '../label'

export default function ProjectInput({ setValue, errors }) {
	const { data: allProjects, isLoading } = useSWR(api.allProjects)
	const [selectedProjects, setSelectedProjects] = useState(new Set())

	const selectProject = project => {
		if (project === null) return

		const updatedProjects = new Set(selectedProjects.add(project))

		setSelectedProjects(updatedProjects)
		setValue('projects', [...updatedProjects])
	}

	const removeProject = project => {
		const updatedProjects = new Set([...selectedProjects].filter(p => p !== project))
		setSelectedProjects(updatedProjects)
		setValue('projects', [...updatedProjects])
	}

	if (isLoading) return

	return (
		<div className="flex flex-col gap-6">
			<Autocomplete onSelectionChange={selectProject} variant="bordered" labelPlacement="outside" defaultItems={allProjects} label={<Label label={'Projects'} isRequired={true} />} placeholder={'Select the projects that user has access'} classNames={{ errorMessage: 'text-danger text-sm pt-1' }} errorMessage={selectedProjects.size === 0 && errorMessage.requiredProjects}>
				{project => <AutocompleteItem key={project.projectName}>{project.projectName}</AutocompleteItem>}
			</Autocomplete>
			<div className="flex flex-wrap gap-1">
				{Array.from(selectedProjects).map(project => (
					<Chip
						onClose={() => {
							removeProject(project)
						}}
						className="text-white bg-indigo-900 dark:text-indigo-950 dark:bg-emerald-50 "
						key={project}
					>
						{project}
					</Chip>
				))}
			</div>
		</div>
	)
}
