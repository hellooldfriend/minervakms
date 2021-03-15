export interface IItem {
    readonly id: number,
    value: string | '',
}

export interface IAction {
    type: string,
    payload: string,
}

export interface IAppState {
    items: IItem[],
}