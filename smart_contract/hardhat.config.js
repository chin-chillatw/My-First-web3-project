https://eth-sepolia.g.alchemy.com/v2/dHuzBxTUIK0hgnbwr7_GhVF8VC-DGBO0

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/dHuzBxTUIK0hgnbwr7_GhVF8VC-DGBO0',
      accounts: ['83f223dd14f308f3fc8caea9b1792092ba18507cc11f7b51f5e06076ee4a5437'],
    },
  },
};