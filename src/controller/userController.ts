import { Request, Response } from "express"
import { pool } from '../config/db.config'

export const getUsersList = (req: Request, res: Response) => {

    let sql = 'SELECT * FROM user WHERE status = "active"'

    pool.query(sql, (err, data) => {

        if (err) throw err

        res.render('home', { userData: data })
    })

}

export const searchingUsers = (req: Request, res: Response) => {

    let searchTerm = req.body.search_value;

    let sql = 'SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR phone LIKE ?'
    let query_options = [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]

    pool.query(sql, query_options, (err, data) => {

        if (err) throw err

        res.render('home', { userData: data })

    })
}

export const addUser = (req: Request, res: Response) => {

    let { first_name, last_name, email, phone } = req.body

    let sql = "INSERT INTO user (first_name, last_name, email, phone) VALUES (?,?,?,?)"

    pool.query(sql, [first_name, last_name, email, phone], (err, data) => {

        if (err) throw err

        res.redirect('/')
    })
}

export const addUserPage = (req: Request, res: Response) => {
    res.render("add-user")
}

export const updateUserPage = (req: Request, res: Response) => {

    let sql = 'SELECT * FROM user WHERE id = ?'

    pool.query(sql, [req.params.id], (err, data) => {
        if (err) throw err;

        res.render("update-user", { userData: data })
    })
}

export const updateUserDetails = (req: Request, res: Response) => {

    let id = req.params.id
    let { first_name, last_name, email, phone } = req.body

    let sql = 'UPDATE user SET first_name=?, last_name=?, email=?, phone=? WHERE id=?'

    pool.query(sql, [first_name, last_name, email, phone, id.slice(1, id.length)], (err, data) => {
        if (err) throw err;
        res.redirect(`/view/${id.slice(1, id.length)}`)
    })

}

export const deleteUserDetails = (req: Request, res: Response) => {

    let id = +req.params.id

    let sql = 'DELETE FROM user WHERE id = ?'

    pool.query(sql, [id], (err, response) => {
        if (err) throw err;
        res.redirect('/')
    })
}

export const viewUserPage = (req: Request, res: Response) => {

    let { id } = req.params

    let sql = "SELECT * FROM user WHERE id = ?"

    pool.query(sql, [id], (err, data) => {
        if (err) throw err;

        res.render("view-page", { details: data })
    })

}




