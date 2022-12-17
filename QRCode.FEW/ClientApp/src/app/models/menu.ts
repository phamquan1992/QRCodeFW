export interface menu {
    title: string;
    spacing?: boolean;
    icon: string;
    submenu?: boolean;
    url?:string;
    submenuItem?: menu[];
}