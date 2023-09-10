/**
 * @type import('naive-ui').GlobalThemeOverrides
 */
export const lightThemeOverrides = {
  "common": {
    "diyColor": "red",
    "bodyColor": "#f2f3f5",
    "primaryColor": '#2563eb',  // 主色
    "primaryColorHover": '#1d4ed8',  // 主色 hover
    "textColorBase": "#000",
    "warningColorSuppl": "#fcb040",
  },
  "Layout": {
    "siderColor": "#f2f3f5FF"
  }
}

export const darkThemeOverrides = {
  "common": {
    "bodyColor": "#252525",
    "primaryColorSuppl": "#36ad6a",
    "primaryColor": "#519af7FF",
    "primaryColorHover": "#3274f6FF",
  },
  "Layout": {
    "siderColor": "#252525",
    "headerColor": "#2a2a2a",
  },
  "Card": {
    "color": "#2a2a2a",
  },
  "Switch": {
    "railColorActive": "#519af7FF",
  }
}