const Secretary = require("../models/secretary.model");

const addSecretary = async (req, res) => {
  const { secretaryName, email } = req.body;
  try {
    const secretaryDetails = await Secretary.create({
      secretaryName,
      email,
      logintime: new Date(),
      logouttime: 0,
    });
    return res.status(200).json({
      status: true,
      message: "Secretary added successfully",
      data: secretaryDetails,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!", error: err });
  }
};

const logoutSecretary = async (req, res) => {
  const { secretaryName } = req.body;
  try {
    const secretaryOne = await Secretary.findOne({
      secretaryName: secretaryName,
    });
    secretaryOne.logouttime = new Date();
    await secretaryOne.save();
    const diff = secretaryOne.logouttime-secretaryOne.logintime[0] ;
    const minutes=Math.floor((diff/(1000*60))%60)
    const hours=Math.floor((diff/(1000*60*60))%24)
    return res.status(200).json({
      status: true,
      message: "Secretary logged out successfully",
      data: {
        secretaryName: secretaryOne.secretaryName,
        email: secretaryOne.email,
        logintime: secretaryOne.logintime,
        logouttime: secretaryOne.logouttime,
        workingTime: `${hours} hours ${minutes} minutes`,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!", error: err });
  }
};

const againLogin=async(req,res)=>{
    const {secretaryName}=req.body;
    try {
        const secretaryOne=await Secretary.findOne({secretaryName:secretaryName});
        console.log("ScertaryLoginTimes",secretaryOne);
        const agianlogin=new Date()
        secretaryOne.logintime.push(agianlogin)
        await secretaryOne.save();
        console.log("again LOgin",agianlogin);
        // secretaryOne.logintime=new Date();
        // await secretaryOne.save();
        return res.status(200).json({
                status:true,
                message:"Secretary logged in successfully",
                data:secretaryOne
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error!", error: err });
      }
}
module.exports = {
  addSecretary,
  logoutSecretary,
  againLogin
};
