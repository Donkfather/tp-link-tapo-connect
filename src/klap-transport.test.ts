import { loginDeviceByIp } from "./klap-transport";

// const DEFAULT_KASA_SETUP_EMAIL = "kasa@tp-link.net"
// const DEFAULT_KASA_SETUP_PASSWORD = "kasaSetup"

const email = process.env.TAPO_USERNAME;
const password = process.env.TAPO_PASSWORD;
const deviceIp = process.env.TAPO_IP_ADDRESS;

it ("getDeviceInfo", async () => {
    const device = await loginDeviceByIp(email, password, deviceIp);

    const statusResult = await device.getDeviceInfo();
    console.log({statusResult});
});

xit ("turnOn", async () => {
    const device = await loginDeviceByIp(email, password, deviceIp);

    await device.turnOn()
})
