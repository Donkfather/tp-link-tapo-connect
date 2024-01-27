import {loginDeviceByIp} from "./api";
import {TapoDeviceLightInfo} from "./types";
import {LightEffectPreset, LightEffectPresetEnum} from "./light-effect";

const email = process.env.TAPO_USERNAME;
const password = process.env.TAPO_PASSWORD;
const deviceIp = process.env.TAPO_IP_ADDRESS;

describe('setLightComponents', () => {
  it("fails with invalid data", async () => {
    const device = await loginDeviceByIp(email, password, deviceIp);
    expect.assertions(5)
    try {
      await device.setLightComponents({})
    } catch (error) {
      expect(error.message).toMatch('At least one of the properties has to be set.')
    }

    try {
      await device.setLightComponents({hue: 1000})
    } catch (error) {
      expect(error.message).toMatch('Invalid hue value. Hue must be between 0 and 360.')
    }

    try {
      await device.setLightComponents({brightness: 1000})
    } catch (error) {
      expect(error.message).toMatch('Invalid brightness value. Brightness must be between 0 and 100.')
    }

    try {
      await device.setLightComponents({saturation: 1000})
    } catch (error) {
      expect(error.message).toMatch('Invalid saturation value. Saturation must be between 0 and 100.')
    }

    try {
      await device.setLightComponents({color_temp: 1000})
    } catch (error) {
      expect(error.message).toMatch('Invalid color temperature value. Color temperature must be between 2500 and 6500.')
    }
  })

  xit('can set one value', async () => {
    const device = await loginDeviceByIp(email, password, deviceIp);

    async function testLightComponent(device, component, value) {
      await device.setLightComponents({[component]: value});
      const deviceInfo = await device.getDeviceInfo() as TapoDeviceLightInfo;
      expect(deviceInfo[component]).toBe(value);
    }

    await testLightComponent(device, "brightness", 100);
    await testLightComponent(device, "hue", 360);
    await testLightComponent(device, "saturation", 100);
    await testLightComponent(device, "color_temp", 6500);
  })

  it('can set effect', async() => {
    const device = await loginDeviceByIp(email, password, deviceIp);
    await device.setLightingEffect(LightEffectPreset.from(LightEffectPresetEnum.Raindrop))
    console.log(await device.getDeviceInfo())
  })
})
