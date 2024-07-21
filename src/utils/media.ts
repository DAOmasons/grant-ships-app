export enum MediaType {
  None = 'none',
  Unknown = 'unknown',
  ImageLink = 'image/link',
  Youtube = 'video/youtube',
  Vimeo = 'video/vimeo',
}

const youtubeRegex =
  /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;

const vimeoRegex = /(?:vimeo)\.com.*(?:video\/|clip\/|)(\d+).*/;

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

console.log(
  detectMediaTypeFromUrl('https://www.youtube.com/watch?v=Sg-G1E1UwAY')
);

console.log(
  detectMediaTypeFromUrl('https://vimeo.com/959789512/56ef99baed?share=copy')
);
