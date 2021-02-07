const config = {
  moduleNameMapper: {
    "\\.(scss|sass|css)$": "identity-obj-proxy"
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/']
}

export default config