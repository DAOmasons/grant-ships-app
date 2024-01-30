import { AlloMetadata } from '../types/common';
import {
  FileType,
  GRANT_SHIPS,
  Models,
  StorageProtocol,
} from '../types/metadata';

export const createMedataProtocol = ({
  storageProtocol,
  fileType,
  model,
}: {
  storageProtocol: StorageProtocol;
  fileType: FileType;
  model: Models;
}) => `${GRANT_SHIPS}${storageProtocol}${fileType}${model}`;

export const projectProfileHash = () =>
  createMedataProtocol({
    storageProtocol: StorageProtocol.IPFS,
    fileType: FileType.JSON,
    model: Models.ProjectProfile,
  });

export const shipProfileHash = () =>
  createMedataProtocol({
    storageProtocol: StorageProtocol.IPFS,
    fileType: FileType.JSON,
    model: Models.ShipProfile,
  });

export const projectGrantHash = () =>
  createMedataProtocol({
    storageProtocol: StorageProtocol.IPFS,
    fileType: FileType.JSON,
    model: Models.ProjectGrant,
  });

export const createMetadata = ({
  ipfsHash,
  protocol,
}: {
  ipfsHash: string;
  protocol: string;
}): AlloMetadata => {
  // check that protocol string is all numbers

  console.log('protocol', protocol);
  //   if (protocol.match(/^[0-9]+$/)) {
  //     throw new Error('Protocol must be a number');
  //   }

  return { protocol: BigInt(protocol), pointer: ipfsHash };
};
