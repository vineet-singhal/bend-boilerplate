import { addNewUser, confirmUser } from '../controller/userController';

export const userRoutes = (app) => {
    app.route("/api/users/register")
        .post((req, res) => {
            // Some middleware imported from controller file
        });
}