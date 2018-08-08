export interface NotificationOptions {
    timeOut?: number;
    showProgressBar?: boolean;
    pauseOnHover?: boolean;
    lastOnBottom?: boolean;
    clickToClose?: boolean;
    maxStacks?: number;
    preventDuplicates?: number;
    preventLastDuplicates?: boolean | string;
    theClass?: string;
    rtl?: boolean;
    animate?: "fromRight" | "fromLeft" | "rotate" | "scale";
    position?: ["top" | "bottom", "right" | "left"];
}