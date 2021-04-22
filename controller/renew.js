const { updateUser, findUser } = require("../utils/user_utils/user");
const { updateCoupon, findCoupon } = require("../utils/coupon_utils/coupon");
const moment = require('moment');
const renewSub =async(req, res, next)=>{
    const {email, coupon} = req.body
    const timeOfRenew = moment().add(2, 'days');
    if(!email || !coupon) return res.status(404).json({Message:'Missing Field required', success:false})
    const {found, user} = await findUser({email})
    if(!found) return res.status(400).json({Message:'The User with this email can not be found', success:false})
    const {foundCoupon, couponFound} = await findCoupon({code:coupon, isUsed:false})
    if(!foundCoupon) return res.status(400).json({Message:'NO coupon found', success:false})
   const {updated} = await updateCoupon({_id:couponFound._id}, {isUsed:true})
   if(!updated) return res.status(404).json({Message:'Coupon is not Valid Please try again', success:false})
   const update  = await updateUser({_id:user._id}, {registrationDay:timeOfRenew.toISOString()})
   if(!update.user) return res.status(404).json({Message: 'We Could not identify this user'})
     res.status(200).json({Message:'Successfully Renewed Subscription Proceed to login', success: true})
}

module.exports = renewSub;
