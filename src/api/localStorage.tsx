import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { User, UserContext } from "../components/interface";

const localStorage = create<UserContext>() (
  immer(
    persist(
      devtools((set) => {({
          userList: [],
          addUser: (user: User) => set((state) => {
            userList: [...state.userList, user];
          }),

          deleteUser: (userId: number) => set((state) => {
            userList: state.userList.filter((user) => user.userId !== userId);
          }),

          editUser: (
            newName: string,
            newPassword: string,
            url: string,
            userId: number
          ) => set((state) => ({
            users: state.userList.map((el, index) => userId === index
              ? { ...el, name: newName, password: newPassword, url: url }
              : el
            )
          }))
          //
        })
      }),
    { name: "userStore" })//, version: 1 })
  ));

export default localStorage;
