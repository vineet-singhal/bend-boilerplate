import mongoose from 'mongoose';
import { sendmail } from '../mailer';
import { UserSchema } from '../model/userModel';
import { errorHandler, hashItUp, successHandler } from '../utils';

const User = mongoose.model("user", UserSchema);

export const addNewUser = async (req, res) => {
    req.body.password = await hashItUp(req.body.password);
    let newUser = new User(req.body);
    newUser.save((err, newUser) => {
        errorHandler(err, res);
        sendmail(newUser.email,
            "Welcome to Princebook", 
            `<p>Please click the button below to confirm your email</p><br/>
            <a href="https://princebook.com/confirm/${newUser.confirm}"><button>Confirm your email</button></a>`
            )
        successHandler(newUser, res, 201);
    })
}

export const confirmUser = (req, res) => {

    User.findOneAndUpdate(
            { confirm: req.params.confirmHash}, 
            {confirm: "1"}, 
            {new: true, useFindAndModify: false},
            (err, updatedResult) => {
                errorHandler(err, res);
                successHandler(
                    {message:`User ${updatedResult.name}(${updatedResult.email}) was confirmed successfully`}, 
                    res, 
                    200);
            }
    )

}