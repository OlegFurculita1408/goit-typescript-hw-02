// Your API key: 37017731-87154c65e3580dd14aba57926
// ?q=cat&page=12&key=37017731-87154c65e3580dd14aba57926&image_type=photo&orientation=horizontal&per_page=12
// import axios from "axios";

// axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.params = {
//     key: '37017731-87154c65e3580dd14aba57926',
//     image_type: 'photo',
//     orientation: 'horizontal',
//     per_page: 12,
// }

// export function necessaryValues(data) {
//     return data.map(({ id, tags, largeImageURL, webformatURL }) => ({
//         id,
//         tags,
//         largeImageURL,
//         webformatURL,
//     }))
// }

// export const getAllImages = async (searchQuery, page) => {
//     const answer = await axios.get(`?q=${searchQuery}&page=${page}`);
//     return answer.data;
// }

import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
    key: '37017731-87154c65e3580dd14aba57926',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
};
// intrrface data images
interface ImageData {
    id: number;
    tags: string;
    largeImageURL: string;
    webformatURL: string;
}
// functiuon unloaded data image
export function necessaryValues(data: ImageData[]): ImageData[] {
    return data.map(({ id, tags, largeImageURL, webformatURL }) => ({
        id,
        tags,
        largeImageURL,
        webformatURL,
    }));
}
// respons API 
interface ApiResponse {
    total: number;
    totalHits: number;
    hits: ImageData[];
}
// function respons images all
export const getAllImages = async (searchQuery: string, page: number): Promise<ApiResponse> => {
    const answer = await axios.get<ApiResponse>(`?q=${searchQuery}&page=${page}`);
    return answer.data;
};