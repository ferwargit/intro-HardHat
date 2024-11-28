import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Greeter", function () {
  async function deployGreeterFixture() {
    const initialGreeting = "Hello, world!";

    // Get the ContractFactory and Signers
    const Greeter = await ethers.getContractFactory("Greeter");
    const [owner, otherAccount] = await ethers.getSigners();

    const greeter = await Greeter.deploy(initialGreeting);

    return { greeter, initialGreeting, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right initial greeting", async function () {
      const { greeter, initialGreeting } = await loadFixture(deployGreeterFixture);
      expect(await greeter.greet()).to.equal(initialGreeting);
    });
  });

  describe("Interactions", function () {
    it("Should return the current greeting", async function () {
      const { greeter, initialGreeting } = await loadFixture(deployGreeterFixture);
      expect(await greeter.greet()).to.equal(initialGreeting);
    });

    it("Should change the greeting when setGreeting is called", async function () {
      const { greeter } = await loadFixture(deployGreeterFixture);
      const newGreeting = "Hola, mundo!";
      
      await greeter.setGreeting(newGreeting);
      expect(await greeter.greet()).to.equal(newGreeting);
    });
  });
});