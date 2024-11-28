// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const INITIAL_GREETING = "Hello Kipu!";

const GreeterModule = buildModule("GreeterModule", (m) => {

    const initialGreeting = m.getParameter("greeting", INITIAL_GREETING);

    const greeter = m.contract("Greeter", [initialGreeting]);

    return { greeter }
});

export default GreeterModule;