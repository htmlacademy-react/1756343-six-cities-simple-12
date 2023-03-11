export type Location = {
    latitude: number;
    longitude: number;
    zoom: number;
};

export type City = {
    name: string;
    location: Location;
};

export type Host = {
    id: number;
    name: string;
    isPro: boolean;
    avatarUrl: string;
};

export type Offer = {
    city: City;
    previewImage: string;
    images: string[];
    title: string;
    isPremium: boolean;
    rating: number;
    type: string;
    bedrooms: number;
    maxAdults: number;
    price: number;
    goods: string[];
    host: Host;
    description: string;
    location: Location;
    id: number;
};

export type Offers = Offer[];
