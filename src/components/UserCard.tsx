import { FC } from "react"
import { IUser } from "../types/types"

interface Props {
    user: IUser
}

const UserCard: FC<Props> = ({ user }) => {
    return (
        <div className="flex flex-col gap-4 min-w-[254px] items-center justify-center bg-white p-6 text-ellipsis overflow-hidden">
            <img src={user.photo} alt="" className="object-contain rounded-full w-[70px] h-[70px]" />
            <p className="text-ellipsis w-full overflow-hidden text-nowrap">{user.name}</p>
            <div className="flex flex-col gap-1 w-full">
                <p className="text-ellipsis w-full overflow-hidden text-nowrap">{user.position}</p>
                <p className="text-ellipsis w-full overflow-hidden text-nowrap">{user.email}</p>
                <p className="text-ellipsis w-full overflow-hidden text-nowrap">{user.phone}</p>
            </div>
        </div>
    )
}

export default UserCard