import { GET_LETTER_NAME, GetLetterCommand } from "./GetLetterCommand";
import ICommand from "./ICommand";
import { StartGame, STARTNAME } from "./StartCommand";
import { StopGame, STOPNAME } from "./StopCommand";

export default class CommandsFactory{

    create(commandName:string):ICommand|null{
        switch(commandName){
            case STARTNAME:
                return new StartGame();
            case STOPNAME:
                return new StopGame();
            case GET_LETTER_NAME:
                return new GetLetterCommand();
            default:
                console.log('Factory default');
                return null;
        }
    }
}