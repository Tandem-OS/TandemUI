import api from "@/lib/requests/Axios";

interface Scrapervalues {
  designer_email: string;
  url: string;
  role: string;
  client_email?: string | null;
}

const SCRPAPER_ENDPOINT = '/scraper' 

export const createScraper = async (values: Scrapervalues) => {
  return await api.post(`${SCRPAPER_ENDPOINT}/scrape_url`, values);
}
