import type { Config } from 'tailwindcss'
import { colors } from './styles/theme'

const config: Config = {
  content: [
    // ...existing code...
  ],
  theme: {
    extend: {
      colors: {
        chineseRed: colors.chineseRed,
      }
    },
  },
  // ...existing code...
}

export default config
