import user from "@/models/userModel";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer"

interface MailDetails {
    email: string;
    emailType: string;
    userId: string;
  }

export const sendMail = async ({ email, emailType, userId }:MailDetails) => {

    try {
        const hashToken = await bcrypt.hash(userId.toString(), 10); // Added await here
        if (emailType === "VERIFY") {
            await user.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashToken, verifyExpire: (Date.now() + 3600000)
                }
            }

            );
        } else if (emailType === "RESET") {
            await user.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashToken, resetExpire: (Date.now() + 3600000)

                }
            })

        }
        const transport = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: process.env.author,
                pass: process.env.pass
            }
        });
        const mailOptions = {
            from: process.env.author,
            to: email,
            subject: emailType === "VERIFY" ? "Verify you Email" : "Reset Your Password",
            html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashToken}">here</a>
                        to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} 
                        or copy and paste the link below in your browser.<br>
                        ${process.env.domain}/verifyemail?token=${hashToken}
                    </p>`,
        };
        const mailRespons = await transport.sendMail(mailOptions); // Added await here

        return mailRespons;

    } catch {
        console.log("email not send");
    }
};
