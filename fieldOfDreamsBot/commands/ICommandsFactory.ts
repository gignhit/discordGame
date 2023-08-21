import ICommand from "./ICommand";

export default interface ICommandsFactory{
    create():ICommand
}