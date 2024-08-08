export enum MediaType {
  None = 'none',
  Unknown = 'unknown',
  ImageLink = 'image/link',
  Youtube = 'video/youtube',
  Vimeo = 'video/vimeo',
}

export type ShowcaseLink = {
  id: string;
  url: string;
  mediaType: MediaType;
};

const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.*$/i;
const extractYoutubeIdRegex =
  /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

const vimeoRegex =
  /(?:https?:\/\/)?(?:www\.)?vimeo\.com(?:\/manage\/videos)?\/(\d+)\/([a-zA-Z0-9]+)(?:\?.*)?$/;

const isYoutubeUrl = (url: string) => youtubeRegex.test(url);

const isVimeoUrl = (url: string) => vimeoRegex.test(url);

const isHostedImageUrl = (url: string) => hostedImageRegex.test(url);

const hostedImageRegex = /\.(png|jpe?g|webp)$/;

export const detectMediaTypeFromUrl = (url: string): MediaType => {
  if (isYoutubeUrl(url)) {
    return MediaType.Youtube;
  }
  if (isVimeoUrl(url)) {
    return MediaType.Vimeo;
  }
  if (isHostedImageUrl(url)) {
    return MediaType.ImageLink;
  }
  return MediaType.Unknown;
};

const transformYoutubeUrl = (url: string) => {
  const match = url.match(extractYoutubeIdRegex);
  console.log('match', match);

  if (match && match[1]?.length === 11) {
    const videoId = match[1];
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestBranding=1&showinfo=0&controls=0&title=0`;
  }

  return url;
};

const transformVimeoUrl = (url: string) => {
  const match = url.match(vimeoRegex);

  if (match && match?.length === 3) {
    const videoId = match[1];
    const h_id = match[2];

    return `https://player.vimeo.com/video/${videoId}?h=${h_id}&autopause=0&player_id=0&byline=0&title=0&transparent=1&autoplay=1&dnt=1&controls=0&background=1`;
  }

  return url;
};

export const parseShowcaseLink = (
  link: string
): { url: string | null; mediaType: MediaType } => {
  const mediaType = detectMediaTypeFromUrl(link);

  console.log('mediaType', mediaType);

  if (mediaType === MediaType.Youtube) {
    return {
      url: transformYoutubeUrl(link),
      mediaType,
    };
  }

  if (mediaType === MediaType.Vimeo) {
    return {
      url: transformVimeoUrl(link),
      mediaType,
    };
  }

  return {
    url: link,
    mediaType,
  };
};

// const testPNG = youtubeRegex.test(
//   'https://presskit.manada.dev/images/cloudlines/0000screenshot.png'
// );

// const youtubeURLTest = youtubeRegex.test(
//   'https://www.youtube.com/watch?v=Sg-G1E1UwAY'
// );

// const youtubeShareTest = youtubeRegex.test(
//   'https://youtu.be/Sg-G1E1UwAY?feature=shared'
// );
