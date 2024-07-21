export enum MediaType {
  None = 'none',
  Unknown = 'unknown',
  ImageLink = 'image/link',
  Youtube = 'video/youtube',
  Vimeo = 'video/vimeo',
}

const youtubeRegex =
  /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

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
  const match = url.match(youtubeRegex);

  if (match && match[2].length === 11) {
    const videoId = match[2];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  return null;
};

const transformVimeoUrl = (url: string) => {
  const match = url.match(vimeoRegex);

  if (match && match?.length === 3) {
    const videoId = match[1];
    const h_id = match[2];

    return `https://player.vimeo.com/video/${videoId}?h=${h_id}&badge=0&autopause=0&player_id=0&byline=0&title=0`;
  }

  return null;
};

export const parseShowcaseLink = (
  link: string
): { url: string | null; mediaType: MediaType } => {
  const mediaType = detectMediaTypeFromUrl(link);

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

// https://vimeo.com/959789512/56ef99baed?share=copy
