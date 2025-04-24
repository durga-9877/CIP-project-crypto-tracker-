export const cryptoEmojis = {
  bitcoin: '₿',
  ethereum: '⟠',
  binancecoin: 'Ƀ',
  ripple: '✕',
  cardano: '₳',
  solana: '◎',
  polkadot: '●',
  dogecoin: 'Ð',
  tron: 'Ŧ',
  litecoin: 'Ł',
  chainlink: '⬡',
  stellar: '*',
  tether: '₮',
  monero: 'ɱ',
  cosmos: '⚛',
  // Default emoji for other cryptocurrencies
  default: '🪙'
};

export const getCryptoEmoji = (coinId) => {
  return cryptoEmojis[coinId.toLowerCase()] || cryptoEmojis.default;
}; 