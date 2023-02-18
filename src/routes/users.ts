import { Router } from "express";
import { getUsersList, searchingUsers, addUser, addUserPage, updateUserPage, updateUserDetails, deleteUserDetails } from "../controller"

const router = Router()

    // logic
    .get('/', getUsersList)  // it retrieves users list 
    .post('/', searchingUsers) // searching by users details 
    .post('/adduser', addUser) // adding new user
    .post('/updateuser/:id', updateUserDetails) // updating user details

    // retrieving pages (views)
    .get('/adduser', addUserPage)
    .get('/update/:id', updateUserPage)
    .get('/delete/:id', deleteUserDetails)

export default router;
