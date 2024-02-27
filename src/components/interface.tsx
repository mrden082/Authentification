export interface User {
    username: string;
    password: string;
    url: string;
    userId: number;
}

export interface UserContext {
    userList: User[];
    addUser: (user: User) => void;
    deleteUser: (userId: number) => void;
    editUser: (newName: string, newPassword: string, url: string, userId: number) => void;
}

export interface RegisterFormProps {
    onSave: (username: string, password: string) => void;
  }
  