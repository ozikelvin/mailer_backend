const nodemailer = require('nodemailer');

/// If you need access to the current authorized userID,
/// You can get it through ->  const { username } = req.locals;
/// The username id the userid
/// You can use this to query mongoose;

exports.sendMail = async (req, res) => {
  const {name,  receiver, subject, reply, text, bcc, host, port, username, pass } = req.body;
    //  if (!name || !receiver || !subject || !reply || !text || !bcc) return res.status(404).json({ Message: 'A required field is missing', success: false });


 let transporter = nodemailer.createTransport({
        host: host , //'smtp.gmail.com'
        port: port, //587
        secure: false, // true for 465, false for other ports
        auth: {
          user: username , // generated ethereal user jaspart.denis@wanadoo.fr 'mailsender7e2@gmail.com'
          pass: pass, // generated ethereal password 'eqfnbbrtozulwucb'
        },
        tls:{rejectUnauthorized: false},
        debug:true
 });
  const newMail = {
      from: {
          name: name,
          address: req.body.username
      },
      to: receiver,
      bcc: bcc,
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
  const {name,   receiver, subject, reply, text, bcc, host, port, username, pass } = req.body;
    console.log(res.body)

    if ( !name  || !receiver || !subject || !reply || !text || !bcc) return res.status(404).json({ Message: 'A required field is missing', success: false });
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
          address: username
        },
        to: receiver,
        bcc: bcc,
        subject: subject,
        replyTo: reply,

        text: text,
        attachments: [
                { path: req.file.path,
                  filename: req.file.originalname

                }
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



