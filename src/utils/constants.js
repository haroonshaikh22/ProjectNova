export const UserRolesEnum = {
    ADMIN: "admin",
    PROJECT_ADMIN: "project_admin",
    MEMBER : "member",
    USER: "user",
    GUEST: "guest"
}

export const AvailableUserRole = Object.values(UserRolesEnum);


export const TASKSTatusEnum = {
    TODO : "todo",
    IN_PROGRESS : "in_progress",
    DONE : "done",
    BLOCKED : "blocked" 
}

export const AvailableTaskStatus = Object.values(TASKSTatusEnum);