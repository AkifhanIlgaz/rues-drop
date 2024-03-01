import EditInput from '@/components/inputs/editInput'
import { label } from '@/config/labels'

export default function ProjectInfo({ project }) {
	return (
		<div className="grid grid-cols-2 gap-3 pb-8">
			<EditInput projectName={project.projectName} label={label.website} value={project.website} />
			<EditInput projectName={project.projectName} label={label.discord} value={project.discord} />
			<EditInput projectName={project.projectName} label={label.twitter} value={project.twitter} />
			<EditInput projectName={project.projectName} label={label.logo} value={project.logo} />
		</div>
	)
}
