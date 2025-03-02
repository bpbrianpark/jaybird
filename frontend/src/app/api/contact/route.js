import nodemailer from "nodemailer";
import "dotenv/config";

export async function POST(req) {
    try {
        const { name, email, message } = await req.json();
        const user = process.env.USER_EMAIL;
        const pass = process.env.EMAIL_PASS;

        console.log("USER:", process.env.USER_EMAIL);
        console.log("PASS Loaded:", process.env.EMAIL_PASS ? "Yes" : "No");

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: { user, pass },
        });

        const mail = await transporter.sendMail({
            from: user,
            to: "jasonparkphotographyrec@gmail.com",
            replyTo: email,
            subject: `Contact form submission from ${name}`,
            html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
            `,
        });

        console.log("Message sent:", mail.messageId);
        return new Response(JSON.stringify({ message: "Success" }), { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return new Response(JSON.stringify({ message: "Could not send email" }), { status: 500 });
    }
}
