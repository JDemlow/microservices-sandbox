import UserService from "./services/user.service.js";
import EmailService from "./services/email.service.js";
import AuthService from "./services/auth.service.js";

async function startApp() {
  await UserService.start();
  await EmailService.start();
  await AuthService.start();

  try {
    // Users
    const newUser = await UserService.call("user.createUser", {
      username: "Jim",
      email: "jim@gmail.com",
    });
    console.log("New user created", newUser);

    const users = await UserService.call("user.getUsers");
    console.log("All users: ", users);

    // Email
    const emailResult = await EmailService.call("email.sendEmail", {
      recipient: newUser.email,
      subject: "Welcome to our platform",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde repellendus deleniti optio blanditiis odit qui eligendi quia dolorem, quaerat consectetur nesciunt commodi nemo fuga numquam?",
    });
    console.log(emailResult);

    // Auth
    const authResult = await AuthService.call("auth.authUser", {
      username: "admin",
      password: "password",
    });
    console.log("Auth result: ", authResult); // Ensure you await this
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    await UserService.stop();
    await EmailService.stop();
    await AuthService.stop();
  }
}

startApp();
