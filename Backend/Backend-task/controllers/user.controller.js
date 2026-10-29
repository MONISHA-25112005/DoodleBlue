const UserService = require("../services/user.services");

class UserController {
    async signup(req, res) {
        try {
            const { name, email, password } = req.body;

            // Validate required fields
            if (!name || !email || !password) {
                return res.status(400).json({
                    message: "All fields are required!",
                });
            }

            // Call the service
            const result = await UserService.signup(
                name,
                email,
                password
            );

            return res.status(201).json({
                message: "User created successfully",
                data: result,
            });
        } catch (error) {
            console.error(error.message);

            return res.status(500).json({
                message: error.message,
            });
        }
        
    }
    async login(req,res){
        try{
            const{email,password}=req.body;
            if(!email||!password){
                return res
                .status(400)
                .json({message:`both "emai" and "password" are required`});
        
            }
            const loginData=await UserService.loginUser(email,password);
            return res.status(200).json(loginData);
        }catch(error){
            res.status(401).json({error:error.message});
        }
    }
    async getAllUsers(req,res){
            try {
                const users = await UserService.getAllUsers();
                return res.status(200).json({message:'Users fetched Successfully',data:users});
            } catch (error) {
                console.error(error.message);
                return res.status(500).json({message:'Iternal Server error'});

            }
        }
    async updateUser(req,res){
        try {
            const userId=req.user.id;
            const updateUser=await UserService.updateUser(
                userId,
                req.body
            );
            return res.status(200).json({
                message:"User Updated Successfully",
                data:updateUser
                 });
        } catch (error) {
            return res.status(400).json({
               message:error.message
            })
            
        
            
        }
    }
    async deleteUser(req,res){
        try {
            const userId=req.user.id;
            const result=await UserService.deleteUser(userId);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({
                message:error.message
            });
        }
    }

   
async addUserProfile(req, res) {
    try {
        const userId = req.user?.id;
        const { age, dob, bio } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        const newUserProfile = await UserService.addUserProfile(
            userId,
            { age, dob, bio }
        );

        return res.status(201).json(newUserProfile);

    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                message: "A profile for this user already exists"
            });
        }

        console.error(err);

        return res.status(400).json({
            error: err.message
        });
    }
}

}

module.exports = new UserController();
