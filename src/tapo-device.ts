import {getColour} from "./colour-helper"
import {base64Decode} from "./tplink-cipher"
import {LightComponentsInput, TapoDeviceInfo, TapoProtocol} from "./types"
import {valid} from "./validation";
import {LightEffect, LightEffectPreset, LightEffectPresetEnum} from "./light-effect";

export const TapoDevice = ({send}: TapoProtocol) => {

  const setDeviceOn = async (deviceOn: boolean = true) => {
    const turnDeviceOnRequest = {
      "method": "set_device_info",
      "params": {
        "device_on": deviceOn,
      }
    }
    await send(turnDeviceOnRequest)
  }

  const augmentTapoDeviceInfo = (deviceInfo: TapoDeviceInfo): TapoDeviceInfo => {
    return {
      ...deviceInfo,
      ssid: base64Decode(deviceInfo.ssid),
      nickname: base64Decode(deviceInfo.nickname),
    }
  }
  const setLightComponents = async (components: LightComponentsInput) => {
    if (Object.keys(components).length === 0) {
      throw new Error("At least one of the properties has to be set.");
    }

    const validParams: LightComponentsInput = {};
    Object.entries(components).forEach(([key, value]) => {
      if (value !== undefined && valid(key, value)) {
        validParams[key as keyof LightComponentsInput] = value as number;
      }
    });

    const setLightComponentsRequest = {
      method: "set_device_info",
      params: validParams,
    }
    await send(setLightComponentsRequest);
  }

  return {
    send,

    setLightComponents,

    turnOn: () => setDeviceOn(true),

    turnOff: () => setDeviceOn(false),

    setBrightness: async (brightnessLevel: number = 100) => {
      await setLightComponents({brightness: brightnessLevel});
    },

    setColour: async (colour: string = 'white') => {
      const params = getColour(colour);
      await setLightComponents(params);
    },

    setHue: async (hue: number) => {
      await setLightComponents({hue});
    },

    setSaturation: async (saturation: number) => {
      await setLightComponents({saturation});
    },

    setColorTemp: async (color_temp: number) => {
      await setLightComponents({color_temp});
    },

    setLightingEffect: async (
      effect: string | LightEffect,
    ) => {
      let lightingEffect: LightEffect
      if (typeof effect === 'string') {
        lightingEffect = LightEffectPreset.from(LightEffectPresetEnum[effect.toUpperCase()]);
      } else {
        lightingEffect = effect
      }
      await send({
        method: "set_lighting_effect",
        params: lightingEffect.toJson()
      })
    },

    getDeviceInfo: async (): Promise<TapoDeviceInfo> => {
      const statusRequest = {
        "method": "get_device_info"
      }
      return augmentTapoDeviceInfo(await send(statusRequest))
    },

    getEnergyUsage: async (): Promise<TapoDeviceInfo> => {
      const statusRequest = {
        "method": "get_energy_usage"
      }
      return await send(statusRequest)
    }
  }
}
