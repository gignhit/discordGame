import { GET_LETTER_NAME, GetLetterCommand } from "./GetLetterCommand";
import ICommand from "./ICommand";
import { INPUT_WORD_NAME, InputWordCommand } from "./InputWordCommand";
import { INPUTED_LETTERS_NAME, InputedLettersCommand } from "./LettersCommand";
import { StartGame, STARTNAME } from "./StartCommand";
import { StopGame, STOPNAME } from "./StopCommand";
import { WORDNAME, WordCommand } from "./WordCommand";



export default class CommandsFactory{

    create(commandName:string):ICommand|null{
        switch(commandName){
            case STARTNAME:
                return new StartGame();
            case STOPNAME:
                return new StopGame();
            case GET_LETTER_NAME:
                return new GetLetterCommand();
            case INPUTED_LETTERS_NAME:
                return new InputedLettersCommand();
            case WORDNAME:
                return new WordCommand();
            case INPUT_WORD_NAME:
                return new InputWordCommand();
            default:
                console.log('Factory default');
                return null;
        }
    }
}