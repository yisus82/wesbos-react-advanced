import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: +process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const makeANiceEmail = (text: string) => `
    <div className="email" style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello There!</h2>
      <p>${text}</p>
      <p>😘, Yisus</p>
    </div>
  `;

export const sendPasswordResetEmail = async (
  resetToken: string,
  to: string
): Promise<void> => {
  const info = await transport.sendMail({
    to,
    from: 'yisus@sickfits.com',
    subject: 'Your password reset token!',
    html: makeANiceEmail(`Your password reset token is here!
      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click here to reset</a>
    `),
  });

  if (process.env.MAIL_USER.includes('ethereal.email')) {
    const messageUrl = getTestMessageUrl(info);
    if (messageUrl) {
      console.log(`✉️ Message sent!  Preview it at ${messageUrl}`);
    }
  }
};
