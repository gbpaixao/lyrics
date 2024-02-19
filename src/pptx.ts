import pptxgen from "pptxgenjs";
import { background } from "./img/cafofo_base64";

interface CreatePPTX {
  band: string;
  filename: string;
  lyrics: string[];
  title: string;
}

export class PPTX {
  band: string;
  filename: string;
  lyrics: string[];
  file: pptxgen;
  title: string;
  options: pptxgen.TextPropsOptions = {
    align: "center",
    bold: true,
    fontFace: 'Montserrat',
    fontSize: 38,
    h: 1,
    paraSpaceAfter: 4,
    paraSpaceBefore: 4,
    w: "100%",
    wrap: true,
    x: 0,
  }

  constructor({ band, filename, lyrics, title }: CreatePPTX) {
    this.band = band
    this.file = new pptxgen()
    this.filename = filename
    this.lyrics = lyrics
    this.title = title
  }

  private createTitleSlide() {
    const slide = this.file.addSlide();
    slide.color = 'FFFFFF'
    slide.background = { color: '#000000', data: `image/png;base64,${background}` }

    slide.addText(this.title, {
      ...this.options,
      y: "40%",
    });

    slide.addText(this.band, {
      ...this.options,
      y: "55%",
      fontSize: 24,
    });

    return this.file
  }

  private createLyricsSlide(lyrics: string) {
    const slide = this.file.addSlide();
    slide.color = 'FFFFFF'
    slide.background = { color: '#000000', data: `image/png;base64,${background}` }
    slide.addText(lyrics, {
      ...this.options,
      h: "100%",
      y: 0,
    });
    return this.file
  }

  async createSlides() {
    this.createTitleSlide()
    for (const lyrics of this.lyrics) {
      this.createLyricsSlide(lyrics)
    }
  }

  async exportSlide() {
    await this.file.writeFile({ fileName: this.filename });
  }
}