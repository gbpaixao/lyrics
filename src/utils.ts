import { PPTX } from "./pptx";

export function getLyrics(lyric: string) {
  const paragraphs = lyric.split('\n\n')
  // break long paragraph into smaller chunks - if needed
  return paragraphs
}

interface CreateSlide {
  title: string;
  lyrics: string;
  band: string;
}

export function createSlide({ title, lyrics, band }: CreateSlide) {
  const filename = `${title}.pptx`
  const lyricsArray = getLyrics(lyrics)

  const pptx = new PPTX({ band, filename, lyrics: lyricsArray, title })
  pptx.createSlides()
  pptx.exportSlide()

  return { filename }
}