const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const { create_token, check_token } = require("../Middleware/authMiddleware");
const { registration_val, login_val, add_product_val, forgot_password_val, reset_password_val, change_password_val } = require("../validation/validation");
const addProduct = require("../Models/add_product_schema");
const User_schema = require("../Models/schema");
const sendEmail = require("../Utils/sendEmail");
//______________________________________
const userSchema = require("../Models/User_schema");
//_______________________________________

// const registration_control = async (req, res) => {
//     try {
//         let data = req.body;
//         const hash_password = bcrypt.hashSync(data["password"], saltRounds)
//         const { error } = registration_val({ data })
//         data["password"] = hash_password
//         if (error) return res.send(error.details.map(err => err.message));
//         data["role"] = "admin"
//         const newUser = new User_schema(data);
//         const response = await newUser.save();
//         res.send({ response })
//     } catch (error) {
//         res.status(401).send(error.message)
//     }
// };

//___________________________________________________AdminRegistration_________________________________
const registration_control = async (req, res) => {
    try {
        let data = req.body;
        const hash_password = bcrypt.hashSync(data["password"], saltRounds)
        const { error } = registration_val({ data })
        data["password"] = hash_password
        if (error) return res.send(error.details.map(err => err.message));
        data["role"] = "admin"
        // const newUser = new User_schema(data);
        //______________________
        const newUser = new userSchema(data);
        //______________________
        const response = await newUser.save();
        res.send({ response })
    } catch (error) {
        res.status(401).send(error.message)
    }
};

//__________________________________________________________________________________________________

//___________________________________________________Adminlogin_________________________________
const login_control = async (req, res) => {
    try {
        const user_data = req.body;
        const { error } = login_val({ data: user_data })
        if (error) return res.status(401).send(error.details.map(err => err.message));
        const db_data = await userSchema.findOne({ Email: user_data.Email } ?? { Mobile: user_data.Mobile });
        if (db_data?.password && db_data?.Email) {
            const isMatch_password = bcrypt.compareSync(user_data.password, db_data["password"]);
            if (isMatch_password) {
                const token = create_token({ data: user_data },);
                return res.send({ token, msg: "login successfull" });
            }
        }
        res.status(401).send("invalid userName and password");
    } catch (error) {

        res.status(401).send(error.message)
    }
};

//___________________________________________________Adminlogin_________________________________


// const login_control = async (req, res) => {
//     try {
//         const user_data = req.body;
//         const { error } = login_val({ data: user_data })
//         if (error) return res.status(401).send(error.details.map(err => err.message));
//         const db_data = await User_schema.findOne({ Email: user_data.Email } ?? { Mobile: user_data.Mobile });
//         if (db_data?.password && db_data?.Email) {
//             const isMatch_password = bcrypt.compareSync(user_data.password, db_data["password"]);
//             if (isMatch_password) {
//                 const token = create_token({ data: user_data },);
//                 return res.send({ token, msg: "login successfull" });
//             }
//         }
//         res.status(401).send("invalid userName and password");
//     } catch (error) {

//         res.status(401).send(error.message)
//     }
// };

const change_password_controler = async (req, res) => {
    try {
        const { Email, newPassword } = req.body;
        const { error } = change_password_val({ data: req.body });
        if (error) return res.send(error.details[0].message)
        const User = await User_schema.findOne({ Email });
        if (!User) return res.send("invalide password");
        const hash_password = bcrypt.hashSync(newPassword, saltRounds);
        User.password = hash_password;
        await User.save();
        res.send("password successfully change")
    } catch (error) {
        res.send(error.message);
    }

}

const forgot_password_controler = async (req, res) => {
    try {
        const { error } = forgot_password_val({ data: req.body });
        if (error) return res.send(error.details[0].message);
        const User = await User_schema.findOne({ Email: req.body.email });
        if (!User) return res.send("invalide user");
        const token = create_token({ data: req.body });
        User["resetPasswordToken"] = token;
        User["resetPasswordExpires"] = Date.now() + 10 * 60 * 1000;
        await User.save();
        // const resetLink = `http://localhost:7000/user/resetPassword/${token}`;
        const clickableLink = `<a href="http://localhost:7000/user/resetPassword/${token}">Reset your password</a>`
        await sendEmail(User.Email, "password reset", `<p>Click the following link to reset your password:</p>${clickableLink}`);
        res.send({ success: true, msg: "password reset link successfully send for Email" })

    } catch (error) {
        res.send(error.errmsg);
    }
};

const reset_password_controler = async (req, res) => {

    try {
        const { error } = reset_password_val({ data: req.body });
        if (error) return res.send(error.details[0].message);
        const decode = jwt.verify(req.query.resetPasswordToken, process.env.SECRET_KEY);
        const User = await User_schema.findOne({
            Email: decode.email,
            resetPasswordToken: req.query.resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() }
        })
        if (!User) return res.send({ msg: "invalide token" });
        const hashPassword = bcrypt.hashSync(req.body.password, 10);
        User["password"] = hashPassword;
        User.resetPasswordExpires = undefined;
        User.resetPasswordToken = undefined;
        res.send({ success: true, msg: "password successfully reset", token: req.query });

        await User.save();
    } catch (error) {
        res.send({ err: error.message });
    }
};

const add_product_control = async (req, res) => {
    try {
        const product = req.body;
        const { error } = add_product_val({ data: product });
        if (error) return res.status(401).send(error.details[0].message);
        const newAdd_product = new addProduct(product);
        const response = await newAdd_product.save();
        res.status(200).send(response);
    } catch (error) {
        res.status(401).send(error.errmsg)
    }
};

const fetch_product_controler = async (req, res) => {
    try {
        const { code } = req.body;
        if (code) {
            const product_datails = await addProduct.findOne({ code });
            if (!product_datails) return res.send("product not found");
            return res.send(product_datails);
        }
        const produnct_list = await addProduct.find();
        if (!produnct_list) return res.send("product not found");
        res.send(produnct_list);
    } catch (error) {
        res.status(401).send(error.message)
    }

};

const update_product_controler = async (req, res) => {
    try {
        const data = req.body;
        if (!data.code) return res.send("please enter iteam code");
        const update_product = await addProduct.updateOne({ code: data.code }, { $set: data });
        if (update_product.matchedCount === 0) return res.send("No product found with the given code");
        if (update_product.modifiedCount === 0) return res.send("Product found, but no changes were made");
        res.send(update_product);
    } catch (error) {
        res.send({ msg: error.message });
    }

};

const delete_product_controler = async (req, res) => {
    try {
        const { code } = req.body;
        if (!code) return res.send("enter iteam code");
        const deleteProduct = await addProduct.deleteOne({ code });
        if (deleteProduct.deletedCount === 0) return res.send("No product found with given iteam code");
        res.send({ success: true, msg: "product deleted successfully" });


    } catch (error) {
        res.send(error.message)
    }
}

// const login_control = async(req, res) => {
//     try {
//         const user_data = req.body;
//         const { error } = login_val({ user_data })
//         if (error) res.send(error.details.map(err => err.message));
//         else {
//             const db_data = await User_schema.findOne({ Email: user_data.Email });
//             if (db_data?.password && db_data?.Email) {
//                 const isMatch_password = bcrypt.compareSync(user_data.password, db_data["password"]);
//                 if (isMatch_password) {
//                     res.send("login successfull");
//                 }
//             } else {
//                 res.send("invalid userName and password");
//             }z
//         };
//     } catch (error) {
//         res.send(error)
//     }
// };



//____________________________________________________________________________________
//____________________________________________________________________________________
//____________________________________________________________________________________
const create_controler = async (req, res) => {
    let data = req.body;
    try {
        const decode = check_token(data)
        console.log(_id);
        const hash_password = bcrypt.hashSync(data["password"], saltRounds);
        data["password"] = hash_password
        const newData = new userSchema(data);
        const resp = await newData.save();
        res.send({ resp,_id })
    } catch (error) {
        console.log(error.errmsg)
        res.status(401).send({ error, data })
    }
}
//____________________________________________________________________________________//
//____________________________________________________________________________________
//____________________________________________________________________________________
module.exports = {
    registration_control,
    login_control,
    change_password_controler,
    forgot_password_controler,
    reset_password_controler,
    add_product_control,
    fetch_product_controler,
    update_product_controler,
    delete_product_controler,
    create_controler
}





