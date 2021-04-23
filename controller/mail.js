const nodemailer = require('nodemailer');

/// If you need access to the current authorized userID,
/// You can get it through ->  const { username } = req.locals;
/// The username id the userid
/// You can use this to query mongoose;

exports.sendMail = async (req, res) => {
    const {name, sender, receiver, subject, reply, text,host,port,username, pass } = req.body;
    if (!name || !sender || !receiver || !subject || !reply || !text) return res.status(404).json({ Message: 'A required field is missing', success: false });


 let transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: false, // true for 465, false for other ports
        auth: {
          user: username, // generated ethereal user
          pass: pass, // generated ethereal password
        },
        tls: {rejectUnauthorized: false},
        debug: true
 });
  const newMail = {
      from: {
          name: name,
          address: sender
      },
      to: receiver,
      subject: subject,
      replyTo: reply,
      html: text

  }

 transporter.sendMail(newMail, (err, done)=>{
       if(err){
           return res.status(400).json({Message:`Message not sent ${err}`, success:false})
        }
             return res.status(200).json({Message:'Message Sent Successfully', success:true})
 })
 }





exports.multipleMail = async (req, res) => {

    const { sender, receiver, subject, reply, text, name, host,port,username, pass } = req.body;
    if (!sender || !receiver || !subject || !reply || !text || !name) return res.status(404).json({ Message: 'A required field is missing', success: false });
    let transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: false, // true for 465, false for other ports
        auth: {
          user: username, // generated ethereal user
          pass: pass, // generated ethereal password
        },
      });

    const newMail = {
         from: {
          name: name,
          address: sender
        },
        to: receiver,
        subject: subject,
        replyTo: reply,
        text: text,
        attachments: [
                { path: req.file.path}
        ]
    }

    console.log(newMail)

    transporter.sendMail(newMail, (err, done)=>{
        if(err){
            return res.status(400).json({Message:`Message not sent ${err}`, success:false})
        }
        return res.status(200).json({Message:'Message Sent Successfully', success:true})
    })

}




