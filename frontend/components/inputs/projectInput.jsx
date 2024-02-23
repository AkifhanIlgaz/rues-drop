import { Autocomplete, AutocompleteItem, Chip } from '@nextui-org/react'
import { useState } from 'react'
import { Label } from '../label'

export default function ProjectInput({ projects, setValue }) {
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

	return (
		<div className="flex flex-col gap-6">
			<Autocomplete onSelectionChange={selectProject} variant="bordered" labelPlacement="outside" defaultItems={projects} label={<Label label={'Projects'} isRequired={true} />} placeholder={'Select the projects that user has access'}>
				{project => <AutocompleteItem key={project.name}>{project.name}</AutocompleteItem>}
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
