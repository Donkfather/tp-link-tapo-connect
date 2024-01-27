import { loginDeviceByIp } from "./secure-passthrough-transport";

const email = process.env.TAPO_USERNAME;
const password = process.env.TAPO_PASSWORD;
const deviceIp = process.env.TAPO_PASSTHROUGH_DEVICE_IP_ADDRESS;
const test = deviceIp ? it : xit
if(!deviceIp) console.warn("No passthrough device set in env.")
test ("getDeviceInfo", async () => {
    const device = await loginDeviceByIp(email, password, deviceIp);

    const statusResult = await device.getDeviceInfo();
    console.log({statusResult});
});

xtest ("turnOn", async () => {
    const device = await loginDeviceByIp(email, password, deviceIp);

    await device.turnOn()
})
