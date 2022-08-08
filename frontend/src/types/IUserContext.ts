import { UserData } from "./UserData"

export interface IUserContext {
    userData: UserData | null,
    handleLogout: () => void,
    fetchUser: () => void,
    handleModal: (catagory: string) => void,
    handleLoginUserInfo: (userInfo: any) => void,
    isLoading: boolean,
    modal: {
        isVisible: boolean,
        transaction: string
    }
}