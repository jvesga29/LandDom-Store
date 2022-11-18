import { useParams } from 'react-router-dom'
import EditUserForm from './PatchUserForm'
import { useGetUsersQuery } from './usersApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const PatchUser = () => {
    useTitle('LandDom: Edit User')

    const { id } = useParams()

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        }),
    })

    if (!user) return <PulseLoader color={"#FFF"} />

    const content = <EditUserForm user={user} />

    return content
}
export default PatchUser