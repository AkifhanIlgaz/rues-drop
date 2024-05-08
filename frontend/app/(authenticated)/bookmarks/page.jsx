'use client'

import Loading from '@/components/loading'
import ProjectsTable from '@/components/tables/projectsTable'
import useSWR from 'swr'
import api from '../../../config/api'

export default function Bookmarks() {
	const { data: projects, isLoading } = useSWR(api.bookmarks)
	if (isLoading) return <Loading />

	return <ProjectsTable projects={projects} isLoading={isLoading} />
}
