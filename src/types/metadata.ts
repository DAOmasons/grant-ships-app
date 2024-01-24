// Custom protocols are used to identify GrantShip specific metadata

import { AlloMetadata } from './common';

// --------------- Allo Strategy--------------------//

// 6 digits: 2 letters parsed to ASCII.
// If a letter is less than 3 digits, add a 0 in front

// 103115 = GrantShips (g = 103 + s = 115)

// ---------------Storage Protocol----------------//

// then we choose the file storage protocol type (2 digits)
// 00 = Raw calldata
// 01 = IPFS
// 02 = Arweave
/// ... more to come

// ---------------File Format---------------------//

// then we choose file type (4 digits 0000-9999)
// Choose the ten most common data formats for 0000-0009
// 0000 = RawText
// 0001 = JSON
// 0002 = Markdown
// 0003 = CSV
// 0004 = YAML
// 0005 = Protobuf
// 0006 = INI
// 0007 = TOML
// 0008 = XML
// 0009 = Binary
// Choose the ten most common media formats for 0010-0019
// 0010 = Image (only png & jpg)
// 0011 = JPEG
// 0012 = GIF
// 0013 = SVG
// 0014 = PNG
// 0015 = WAV
// 0016 = MP3
// 0017 = MP4
// 0018 = MOV
// 0019 = AVI
// Choose the ten most common web development formats for 0020-0029
// 0020 = JS
// 0021 = CSS
// 0022 = HTML
// 0023 = PY
// 0024 = TS
// 0025 = JSX
// 0026 = TSX
// 0027 = SOL
// 0028 = GO
// 0029 = RUST
// Choose the ten most common document formats for 0030-0039
// 0030 = PDF
// 0031 = DOCX
// 0032 = DOC
// 0033 = XLS
// 0034 = XLSX
// 0035 = TXT
// 0036 = RTF
// 0037 = ODT
// 0038 = LaTeX
// 0039 = Epub

// --------------------Data Model-----------------------//

// 3 digits allows for 999 models

// For indexing purposes, we need to know how to model data on the subgraph
// And while we can align some functions with the event types and contract address
// an agnostic approach would help other index or parse data without using our subgraph

// It could be common practice to use this as a way to 'link' the hash to an event

export const GRANT_SHIPS = '103115';

export enum StorageProtocol {
  Raw = '00',
  IPFS = '01',
  Arweave = '02',
}

export enum FileType {
  RawText = '0000',
  JSON = '0001',
  JPEG = '0011',
  GIF = '0012',
  SVG = '0013',
  PNG = '0014',
}

export enum Models {
  ProjectProfile = '000',
  ShipProfile = '001',
  ProjectGrant = '002',
}

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

export const shipProfileHash = () => {
  createMedataProtocol({
    storageProtocol: StorageProtocol.IPFS,
    fileType: FileType.JSON,
    model: Models.ShipProfile,
  });
};

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
  if (protocol.match(/^[0-9]+$/)) {
    throw new Error('Protocol must be a number');
  }

  return { protocol: BigInt(protocol), pointer: ipfsHash };
};
