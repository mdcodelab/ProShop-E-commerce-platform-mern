import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin",
        email: "admin@email.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true
    },
    {
        name: "Mary",
        email: "mary@email.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false
    },
    {
        name: "Mike",
        email: "mike@email.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false
    }
];

export default users;