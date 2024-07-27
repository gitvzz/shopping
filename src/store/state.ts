export interface IProduct {
    category: string
    packageType: string
    name: string
    defaultStandard: string
    defaultQuantity: number
    images: { src: string, alt?: string }[]
    standards: { name: string, price: number, inStock: boolean }[]
    description: string
    highlights?: string[]
    details?: string
    features?: { label: string, content: string }[]
    link?:string
    standard?:string
    quantity?:number
    inBag?:boolean
}

export interface ICategory {
    name: string
    packageType: string
    products: IProduct[]
}

export interface ICountry {
    id: number
    name: string
    searchName:string
}

export interface IPackage {
    code: string
    name: string
}

export interface IShoppingBag {
    category: string
    product: string
    standard: string
    quantity: number
    enabled?: boolean
}

export interface IState {
    debug: boolean
    version: string
    isInitialized: boolean
    navigation: { name: string, current: boolean, href?: string, router?: string }[]
    packages: IPackage[]
    countries: ICountry[]
    products: IProduct[]
}