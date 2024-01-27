import {v4 as uuidv4} from 'uuid';

const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

type Vector3 = [number, number, number][];
type Vector2 = [number, number];
type Vector = number[];
export type OptionalArguments = {
  backgrounds?: Vector3,
  brightnessRange?: Vector,
  direction?: number,
  duration?: number,
  expansionStrategy?: number,
  fadeoff?: number,
  hueRange?: Vector2,
  initStates?: Vector3,
  randomSeed?: number,
  repeatTimes?: number,
  runTime?: number,
  saturationRange?: Vector2,
  segmentLength?: number,
  segments?: Vector,
  sequence?: Vector3,
  spread?: number,
  transitionRange?: Vector2,
  transitionSequence?: Vector,
  transition?: number,
};
export type LightEffectOptions = {
  id: string,
  name: string,
  type: LightingEffectType,
  isCustom: boolean,
  enable: boolean,
  brightness: number,
  displayColors: Vector3,
  optionalArgs?: OptionalArguments
};

export enum LightingEffectType {
  Sequence = "sequence",
  Random = "random",
  Pulse = "pulse",
  Static = "static",
}

export enum LightEffectPresetEnum {
  Aurora,
  BubblingCauldron,
  CandyCane,
  Christmas,
  Flicker,
  GrandmasChristmasLights,
  Hanukkah,
  HauntedMansion,
  Icicle,
  Lightning,
  Ocean,
  Rainbow,
  Raindrop,
  Spring,
  Sunrise,
  Sunset,
  Valentines,
}

export class LightEffect {
  private id: string;
  private name: string;
  private type: LightingEffectType;
  private isCustom: boolean;
  private enable: boolean;
  private brightness: number;
  private displayColors: Vector3;
  private backgrounds?: Vector3
  private brightnessRange?: Vector
  private direction?: number
  private duration?: number
  private expansionStrategy?: number
  private fadeoff?: number
  private hueRange?: Vector2
  private initStates?: Vector3
  private randomSeed?: number
  private repeatTimes?: number
  private runTime?: number
  private saturationRange?: Vector2
  private segmentLength?: number
  private segments?: Vector
  private sequence?: Vector3
  private spread?: number
  private transitionRange?: Vector2
  private transitionSequence?: Vector
  private transition?: number

  constructor(options: LightEffectOptions) {
    this.id = options.id;
    this.name = options.name;
    this.type = options.type;
    this.isCustom = options.isCustom;
    this.enable = options.enable;
    this.brightness = options.brightness;
    this.displayColors = options.displayColors;
  }

  static newWithRandomId(options: Omit<LightEffectOptions, 'id'>) {
    return new LightEffect({id: uuidv4(), ...options})
  }

  withBackgrounds(backgrounds: OptionalArguments['backgrounds']): LightEffect {
    this.backgrounds = backgrounds;
    return this
  }

  withBrightnessRange(brightnessRange: OptionalArguments['brightnessRange']): LightEffect {
    this.brightnessRange = brightnessRange;
    return this
  }

  withDirection(direction: OptionalArguments['direction']): LightEffect {
    this.direction = direction;
    return this
  }

  withDuration(duration: OptionalArguments['duration']): LightEffect {
    this.duration = duration;
    return this
  }

  withExpansionStrategy(expansionStrategy: OptionalArguments['expansionStrategy']): LightEffect {
    this.expansionStrategy = expansionStrategy;
    return this
  }

  withFadeoff(fadeoff: OptionalArguments['fadeoff']): LightEffect {
    this.fadeoff = fadeoff;
    return this
  }

  withHueRange(hueRange: OptionalArguments['hueRange']): LightEffect {
    this.hueRange = hueRange;
    return this
  }

  withInitStates(initStates: OptionalArguments['initStates']): LightEffect {
    this.initStates = initStates;
    return this
  }

  withRandomSeed(randomSeed: OptionalArguments['randomSeed']): LightEffect {
    this.randomSeed = randomSeed;
    return this
  }

  withRepeatTimes(repeatTimes: OptionalArguments['repeatTimes']): LightEffect {
    this.repeatTimes = repeatTimes;
    return this
  }

  withRunTime(runTime: OptionalArguments['runTime']): LightEffect {
    this.runTime = runTime;
    return this
  }

  withSaturationRange(saturationRange: OptionalArguments['saturationRange']): LightEffect {
    this.saturationRange = saturationRange;
    return this
  }

  withSegmentLength(segmentLength: OptionalArguments['segmentLength']): LightEffect {
    this.segmentLength = segmentLength;
    return this
  }

  withSegments(segments: OptionalArguments['segments']): LightEffect {
    this.segments = segments;
    return this
  }

  withSequence(sequence: OptionalArguments['sequence']): LightEffect {
    this.sequence = sequence;
    return this
  }

  withSpread(spread: OptionalArguments['spread']): LightEffect {
    this.spread = spread;
    return this
  }

  withTransitionRange(transitionRange: OptionalArguments['transitionRange']): LightEffect {
    this.transitionRange = transitionRange;
    return this
  }

  withTransitionSequence(transitionSequence: OptionalArguments['transitionSequence']): LightEffect {
    this.transitionSequence = transitionSequence;
    return this
  }

  withTransition(transition: OptionalArguments['transition']): LightEffect {
    this.transition = transition;
    return this
  }

  toJson() {
    const self = this as any;
    let result: { [key: string]: any } = {};

    // Enumerate own properties excluding the ones inherited from the prototype
    for (const key of Object.getOwnPropertyNames(self)) {
      if (self[key] !== undefined) {
        if (key === 'isCustom') {
          result['custom'] = self[key] ? 1 : 0
        } else if (typeof self[key] === 'boolean') {
          result[camelToSnakeCase(key)] = self[key] ? 1 : 0
        } else {
          result[camelToSnakeCase(key)] = self[key]
        }
      }
    }
    console.log("JSON", result)
    return result;
  };
}

export class LightEffectPreset {
  static from(preset: LightEffectPresetEnum): LightEffect {
    switch (preset) {
      case LightEffectPresetEnum.Aurora:
        return this.aurora();
      case LightEffectPresetEnum.BubblingCauldron:
        return this.bubblingCauldron();
      case LightEffectPresetEnum.CandyCane:
        return this.candyCane();
      case LightEffectPresetEnum.Christmas:
        return this.christmas();
      case LightEffectPresetEnum.Flicker:
        return this.flicker();
      case LightEffectPresetEnum.GrandmasChristmasLights:
        return this.grandmasChristmasLights();
      case LightEffectPresetEnum.Hanukkah:
        return this.hanukkah();
      case LightEffectPresetEnum.HauntedMansion:
        return this.hauntedMansion();
      case LightEffectPresetEnum.Icicle:
        return this.icicle();
      case LightEffectPresetEnum.Lightning:
        return this.lightning();
      case LightEffectPresetEnum.Ocean:
        return this.ocean();
      case LightEffectPresetEnum.Rainbow:
        return this.rainbow();
      case LightEffectPresetEnum.Raindrop:
        return this.raindrop();
      case LightEffectPresetEnum.Spring:
        return this.spring();
      case LightEffectPresetEnum.Sunrise:
        return this.sunrise();
      case LightEffectPresetEnum.Sunset:
        return this.sunset();
      case LightEffectPresetEnum.Valentines:
        return this.valentines();
    }
  }

  static aurora(): LightEffect {
    return new LightEffect({
        id: "TapoStrip_1MClvV18i15Jq3bvJVf0eP",
        name: "Aurora",
        type: LightingEffectType.Sequence,
        isCustom: false,
        enable: true,
        brightness: 100,
        displayColors: [
          [120, 100, 100],
          [240, 100, 100],
          [260, 100, 100],
          [280, 100, 100],
        ],
      }
    ).withDirection(4)
      .withDuration(0)
      .withExpansionStrategy(1)
      .withRepeatTimes(0)
      .withSegments([0])
      .withSequence([
        [120, 100, 100],
        [240, 100, 100],
        [260, 100, 100],
        [280, 100, 100],
      ])
      .withSpread(7)
      .withTransition(1500)
  }

  static bubblingCauldron() {
    return new LightEffect({
        id: "TapoStrip_6DlumDwO2NdfHppy50vJtu",
        name: "Bubbling Cauldron",
        type: LightingEffectType.Random,
        isCustom: false,
        enable: true,
        brightness: 100,
        displayColors: [
          [100, 100, 100], [270, 100, 100]
        ],
      }
    )
      .withBackgrounds([[270, 40, 50]])
      .withBrightnessRange([50, 100])
      .withInitStates([[270, 100, 100]])
      .withDuration(0)
      .withExpansionStrategy(1)
      .withFadeoff(1000)
      .withHueRange([100, 270])
      .withRandomSeed(24)
      .withSaturationRange([80, 100])
      .withSegments([0])
      .withTransition(200)
  }

  static candyCane() {
    return new LightEffect({
      id: "TapoStrip_6Dy0Nc45vlhFPEzG021Pe9",
      name: "Candy Cane",
      type: LightingEffectType.Sequence,
      isCustom: false,
      enable: true,
      brightness: 100,
      displayColors: [[0, 0, 100], [360, 81, 100]],
    })
      .withDirection(1)
      .withDuration(700)
      .withExpansionStrategy(1)
      .withRepeatTimes(0)
      .withSegments([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
      .withSequence([
        [0, 0, 100],
        [0, 0, 100],
        [360, 81, 100],
        [0, 0, 100],
        [0, 0, 100],
        [360, 81, 100],
        [360, 81, 100],
        [0, 0, 100],
        [0, 0, 100],
        [360, 81, 100],
        [360, 81, 100],
        [360, 81, 100],
        [360, 81, 100],
        [0, 0, 100],
        [0, 0, 100],
        [360, 81, 100]
      ])
      .withSpread(1)
      .withTransition(500)
  }

  static christmas() {
    return new LightEffect({
      id: "TapoStrip_5zkiG6avJ1IbhjiZbRlWvh",
      name: "Christmas",
      type: LightingEffectType.Random,
      isCustom: false,
      enable: true,
      brightness: 100,
      displayColors: [[136, 98, 100], [350, 97, 100]],
    })
      .withBackgrounds([
        [136, 98, 75],
        [136, 0, 0],
        [350, 0, 100],
        [350, 97, 94],
      ])
      .withBrightnessRange([50, 100])
      .withInitStates([[136, 0, 100]])
      .withDuration(5000)
      .withExpansionStrategy(1)
      .withFadeoff(2000)
      .withHueRange([136, 146])
      .withRandomSeed(100)
      .withSaturationRange([90, 100])
      .withSegments([0])
      .withTransition(0);
  }

  static flicker() {
    return new LightEffect({
      id: "TapoStrip_4HVKmMc6vEzjm36jXaGwMs",
      name: "Flicker",
      type: LightingEffectType.Random,
      isCustom: false,
      enable: true,
      brightness: 100,
      displayColors: [[30, 81, 100], [40, 100, 100]],
    })
      .withBrightnessRange([50, 100])
      .withInitStates([[30, 81, 80]])
      .withDuration(0)
      .withExpansionStrategy(1)
      .withHueRange([30, 40])
      .withSaturationRange([100, 100])
      .withSegments([1])
      .withTransition(0)
      .withTransitionRange([375, 500]);
  }

  static grandmasChristmasLights() {
    return new LightEffect({
      id: "TapoStrip_3Gk6CmXOXbjCiwz9iD543C",
      name: "Grandma's Christmas Lights",
      type: LightingEffectType.Sequence,
      isCustom: false,
      enable: true,
      brightness: 100,
      displayColors: [
        [30, 100, 100],
        [240, 100, 100],
        [130, 100, 100],
        [0, 100, 100],
      ],
    })
      .withDirection(1)
      .withDuration(5000)
      .withExpansionStrategy(1)
      .withRepeatTimes(0)
      .withSegments([0])
      .withSequence([
        [30, 100, 100],
        [30, 0, 0],
        [30, 0, 0],
        [240, 100, 100],
        [240, 0, 0],
        [240, 0, 0],
        [240, 0, 100],
        [240, 0, 0],
        [240, 0, 0],
        [130, 100, 100],
        [130, 0, 0],
        [130, 0, 0],
        [0, 100, 100],
        [0, 0, 0],
        [0, 0, 0],
      ])

  }

  static hanukkah() {
    return new LightEffect({
      id: "TapoStrip_2YTk4wramLKv5XZ9KFDVYm",
      name: "Hanukkah",
      type: LightingEffectType.Random,
      isCustom: false,
      enable: true,
      brightness: 100,
      displayColors: [[200, 100, 100]],
    })
      .withBrightnessRange([50, 100])
      .withInitStates([[35, 81, 80]])
      .withDuration(1500)
      .withExpansionStrategy(1)
      .withHueRange([200, 210])
      .withSaturationRange([0, 100])
      .withSegments([1])
      .withTransition(0)
      .withTransitionRange([400, 500]);
  }

  static hauntedMansion() {
    return new LightEffect({
      id: "TapoStrip_4rJ6JwC7I9st3tQ8j4lwlI",
      name: "Haunted Mansion",
      type: LightingEffectType.Random,
      isCustom: false,
      enable: true,
      brightness: 100,
      displayColors: [[45, 10, 100]],
    })
      .withBackgrounds([[45, 10, 100]])
      .withBrightnessRange([0, 80])
      .withInitStates([[45, 10, 100]])
      .withDuration(0)
      .withExpansionStrategy(2)
      .withFadeoff(200)
      .withHueRange([45, 45])
      .withRandomSeed(1)
      .withSaturationRange([10, 10])
      .withSegments([80])
      .withTransition(0)
      .withTransitionRange([50, 1500]);
  }

  static icicle() {
    return new LightEffect({
      id: "TapoStrip_7UcYLeJbiaxVIXCxr21tpx",
      name: "Icicle",
      type: LightingEffectType.Sequence,
      isCustom: false,
      enable: true,
      brightness: 100,
      displayColors: [[190, 100, 100]],
    })
      .withDirection(4)
      .withDuration(0)
      .withExpansionStrategy(1)
      .withRepeatTimes(0)
      .withSegments([0])
      .withSequence([
        [190, 100, 70],
        [190, 100, 70],
        [190, 30, 50],
        [190, 100, 70],
        [190, 100, 70]
      ])
      .withSpread(3)
      .withTransition(400);
  }

  static lightning() {
    return new LightEffect({
      id: "TapoStrip_7OGzfSfnOdhoO2ri4gOHWn",
      name: "Lightning",
      type: LightingEffectType.Random,
      isCustom: false,
      enable: true,
      brightness: 100,
      displayColors: [[210, 10, 100], [200, 50, 100], [200, 100, 100]],
    })
      .withBackgrounds([
        [200, 100, 100],
        [200, 50, 10],
        [210, 10, 50],
        [240, 10, 0]
      ])
      .withBrightnessRange([90, 100])
      .withInitStates([[240, 30, 100]])
      .withDuration(0)
      .withExpansionStrategy(1)
      .withFadeoff(150)
      .withHueRange([240, 240])
      .withRandomSeed(600)
      .withSaturationRange([10, 11])
      .withSegments([7, 20, 23, 32, 34, 35, 49, 65, 66, 74, 80])
      .withTransition(50)
  }


  static ocean() {
    return new LightEffect({
      id: "TapoStrip_0fOleCdwSgR0nfjkReeYfw",
      name: "Ocean",
      type: LightingEffectType.Sequence,
      isCustom: false,
      enable: true,
      brightness: 100,
      displayColors: [[198, 84, 100]],
    })
      .withDirection(3)
      .withDuration(0)
      .withExpansionStrategy(1)
      .withRepeatTimes(0)
      .withSegments([0])
      .withSequence([[198, 84, 30], [198, 70, 30], [198, 10, 30]])
      .withSpread(16)
      .withTransition(2000);
  }

  static rainbow() {
    return new LightEffect({
      id: "TapoStrip_7CC5y4lsL8pETYvmz7UOpQ",
      name: "Rainbow",
      type: LightingEffectType.Sequence,
      isCustom: false,
      enable: true,
      brightness: 100,
      displayColors: [
        [0, 100, 100],
        [100, 100, 100],
        [200, 100, 100],
        [300, 100, 100],
      ],
    })
      .withDirection(1)
      .withDuration(0)
      .withExpansionStrategy(1)
      .withRepeatTimes(0)
      .withSegments([0])
      .withSequence([
        [0, 100, 100],
        [100, 100, 100],
        [200, 100, 100],
        [300, 100, 100],
      ])
      .withSpread(12)
      .withTransition(1500);
  }

  static raindrop() {
    return new LightEffect({
      id: "TapoStrip_1t2nWlTBkV8KXBZ0TWvBjs",
      name: "Raindrop",
      type: LightingEffectType.Random,
      isCustom: false,
      enable: true,
      brightness: 100,
      displayColors: [[200, 10, 100], [200, 20, 100]],
    })
      .withBackgrounds([[200, 40, 0]])
      .withBrightnessRange([10, 30])
      .withInitStates([[200, 40, 100]])
      .withDuration(0)
      .withExpansionStrategy(1)
      .withFadeoff(1000)
      .withHueRange([200, 200])
      .withRandomSeed(24)
      .withSaturationRange([10, 20])
      .withSegments([0])
      .withTransition(1000);
  }

  static spring() {
    return new LightEffect({
      id: "TapoStrip_1nL6GqZ5soOxj71YDJOlZL",
      name: "Spring",
      type: LightingEffectType.Random,
      isCustom: false,
      enable: true,
      brightness: 100,
      displayColors: [[0, 30, 100], [130, 100, 100]],
    })
      .withBackgrounds([[130, 100, 40]])
      .withBrightnessRange([90, 100])
      .withInitStates([[80, 30, 100]])
      .withDuration(600)
      .withExpansionStrategy(1)
      .withFadeoff(1000)
      .withHueRange([0, 90])
      .withRandomSeed(20)
      .withSaturationRange([30, 100])
      .withSegments([0])
      .withTransition(0)
      .withTransitionRange([2000, 6000]);
  }

  static sunrise() {
    return new LightEffect({
      id: "TapoStrip_1OVSyXIsDxrt4j7OxyRvqi",
      name: "Sunrise",
      type: LightingEffectType.Pulse,
      isCustom: false,
      enable: true,
      brightness: 100,
      displayColors: [[30, 0, 100], [30, 95, 100], [0, 100, 100]],
    })
      .withDirection(1)
      .withDuration(600)
      .withExpansionStrategy(2)
      .withRepeatTimes(1)
      .withSegments([0])
      .withSequence([
        [0, 100, 5],
        [0, 100, 5],
        [10, 100, 6],
        [15, 100, 7],
        [20, 100, 8],
        [20, 100, 10],
        [30, 100, 12],
        [30, 95, 15],
        [30, 90, 20],
        [30, 80, 25],
        [30, 75, 30],
        [30, 70, 40],
        [30, 60, 50],
        [30, 50, 60],
        [30, 20, 70],
        [30, 0, 100]
      ])
      .withSpread(1)
      .withTransition(60000)
      .withRunTime(0);
  }

  static sunset() {
    return new LightEffect({
      id: "TapoStrip_5NiN0Y8GAUD78p4neKk9EL",
      name: "Sunset",
      type: LightingEffectType.Pulse,
      isCustom: false,
      enable: true,
      brightness: 100,
      displayColors: [[0, 100, 100], [30, 95, 100], [30, 0, 100]],
    })
      .withDirection(1)
      .withDuration(600)
      .withExpansionStrategy(2)
      .withRepeatTimes(1)
      .withSegments([0])
      .withSequence([
        [30, 0, 100],
        [30, 20, 100],
        [30, 50, 99],
        [30, 60, 98],
        [30, 70, 97],
        [30, 75, 95],
        [30, 80, 93],
        [30, 90, 90],
        [30, 95, 85],
        [30, 100, 80],
        [20, 100, 70],
        [20, 100, 60],
        [15, 100, 50],
        [10, 100, 40],
        [0, 100, 30],
        [0, 100, 0]
      ])
      .withSpread(1)
      .withTransition(60000)
      .withRunTime(0);
  }

  static valentines() {
    return new LightEffect({
      id: "TapoStrip_2q1Vio9sSjHmaC7JS9d30l",
      name: "Valentines",
      type: LightingEffectType.Random,
      isCustom: false,
      enable: true,
      brightness: 100,
      displayColors: [[340, 20, 100], [20, 50, 100], [0, 100, 100], [340, 40, 100]],
    })
      .withBackgrounds([[340, 20, 50], [20, 50, 50], [0, 100, 50]])
      .withBrightnessRange([90, 100])
      .withInitStates([[340, 30, 100]])
      .withDuration(600)
      .withExpansionStrategy(1)
      .withFadeoff(3000)
      .withHueRange([340, 340])
      .withRandomSeed(100)
      .withSaturationRange([30, 40])
      .withSegments([0])
      .withTransition(2000);
  }
}
