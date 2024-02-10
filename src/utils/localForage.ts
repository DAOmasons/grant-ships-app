import localforage from 'localforage';

const IPFS_DATA_STORE = 'ipfsDataStore';
const IPFS_JSON = 'ipfsJson';

localforage.config({
  driver: localforage.INDEXEDDB, // Use IndexedDB
  name: IPFS_DATA_STORE,
  storeName: IPFS_JSON,
});

export const IpfsJsonStore = {
  async set(cid: string, data: any) {
    try {
      await localforage.setItem(cid, data);
    } catch (error: any) {
      console.error('Error saving ipfs data', error);
    }
  },
  async get(cid: string) {
    try {
      const data = await localforage.getItem(cid);
      return data;
    } catch (error: any) {
      console.warn('Error fetching ipfs data', error);
    }
  },
};
