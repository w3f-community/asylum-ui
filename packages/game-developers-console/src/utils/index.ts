import axios from 'axios'
import map from 'lodash/map'

export const formatAddress = (address: string) => {
   return `${address.substring(0, 4).toUpperCase()}...${address
      .substring(address.length - 4)
      .toUpperCase()}`
}

export const getAllFiles = async (cidArray: string[]) => {
   const result = await Promise.all(
      cidArray.map((cid) => axios.get(`http://localhost:8080/ipfs/${cid}`))
   )
   return map(result, 'data')
}
