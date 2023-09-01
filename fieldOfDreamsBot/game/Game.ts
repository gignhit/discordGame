import { GameState, state } from "./GameState";
import { statesDB } from "../game/StateDB";


export class Game{
    private gameState:GameState|undefined;

    constructor(channelId:string){
        if(statesDB.has(channelId)){
            this.gameState = statesDB.get(channelId);
        } else {
            this.gameState = new GameState(channelId);
            statesDB.set(channelId, this.gameState);
        }

        console.log('Взаимодействие в канале ' + channelId);
    }

    public start(){
        switch(this.gameState?.state){
            case(state['playing']):
                return 'Игра в этом чате уже создана, сиди играй чушка';
            case(state['not created']):
                this.gameState.state = 1;
                return `Начата игра!\nВопрос: " ${this.gameState.question}\nСлово: " ${this.gameState.cipherWord} "`;
            case(state['ending']):
                return'Завершается игра';
            default:
                console.log('game start наебнулся');
                return 'err';
        }
    }

    public setLetter(letter:string):string{
        if(letter.length > 1) return 'Ты долбаеб? Это несколько букв!';
        return this.gameState?.setLetter(letter) ?? 'Иди на хуй со своей буквой';
    }

    public getword():string{
        return this.gameState?.cipherWord ?? ''
    }
}