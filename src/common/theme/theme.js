import { createConfig, config as defaultConfig } from "@gluestack-ui/themed"

const config = createConfig({
    ...defaultConfig.theme,
    themes: {
        ...defaultConfig.theme.themes,
        classic: {
            
        }
    }
})

export default config