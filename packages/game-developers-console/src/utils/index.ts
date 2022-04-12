export const formatAddress = (address: string) => {
   return `0x${address.substring(0, 4).toUpperCase()}...${address
      .substring(address.length - 4)
      .toUpperCase()}`
}
