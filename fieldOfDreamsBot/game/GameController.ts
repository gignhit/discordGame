import { GameState, state } from "./GameState";
import { statesDB } from "../game/StateDB";
import { User } from "discord.js";


class GameController{
    private letters = ['й','ц','у','к','е','н','г','ш','щ','з','х','ъ','ф','ы','в','а','п','р','о','л','д','ж','э','я','ч','с','м','и','т','ь','б','ю','ё'];

    private getGameState(channelId:string):GameState|undefined{
        return statesDB.get(channelId);
    }

    public start(channelId:string, user:User):string{
        let gameState = this.getGameState(channelId);
        // console.log(gameState?.members);
        // console.log(statesDB);
        
        if(gameState != undefined){
            switch(gameState.state){
                case(state['playing']):
                    return 'Игра в этом чате уже создана, сиди играй чушка';

                case(state['not created']):
                    if(user.id != gameState.members[0].id && gameState.members.length < 4){
                        gameState.addMember(user);
                        return 'Добавлен новый участник';
                    }
                    gameState.state = state['playing'];
                    return `Начата игра!\nВопрос: " ${gameState.question}\nСлово: " ${gameState.cipherWord} "`;

                case(state['ending']):
                    return 'Завершается игра';

                default:
                    console.log('game start наебнулся');
                    return 'err';
            }
        } else {
            gameState = new GameState(channelId);
            gameState.addMember(user);
            return 'Ты становишся гавным лобби напиши снова "/start" когда все согласятся с тобой играть.'
        }
    }


    public inputLetter(channelId:string, user:User, letter:string):string{
        let gameState = this.getGameState(channelId);

        if(gameState == undefined) return 'Иди на хуй со своей буквой!\nНачни игру!';
        if(!this.hasMember(gameState, user)) return 'Ты не участвуешь в игре. ЖДИ!';
        if(letter.length > 1) return 'Ты долбаеб? Это несколько букв!';

        return this.setLetter(gameState, letter);
    }

    public inputWord(channelId:string, user:User, word:string){
        let state = this.getGameState(channelId);
        if(state == undefined) return 'Иди на хуй со своим словом!\nНачни игру!';
        if(!this.hasMember(state, user)) return 'Ты не участвуешь в игре. ЖДИ!';
        if(word.length > 20) return 'Зачем столько букв?';

        return this.checkWord(word, state);
    }

    public getword(channelId:string):string{

        let state = this.getGameState(channelId);
        if(state == undefined) return 'Начни игру!';

        return state.cipherWord;
    }

    public getLetters(channelId:string):string{

        let state = this.getGameState(channelId);
        if(state == undefined) return 'Начни игру!';

        return state.inputedLetters.toString();
    }

    public cancelGame(channelId:string, user:User){
        let gameState = this.getGameState(channelId);
        if(gameState == undefined) return 'Начни игру!';
        if(!this.hasMember(gameState, user)) return 'Ты не участвуешь! Что ты собрался отменять?';

        if(user.id == gameState.members[0].id){
            gameState.deleteState(channelId);
            return 'Игра закончена.';
        }

        return 'Только лидер лобби может выключить меня!';
    }

    private setLetter(gameState:GameState, letter:string):string{
        if(gameState.inputedLetters.includes(letter)) return 'Такая буква уже была введена';
        if(!this.letters.includes(letter)) return 'А русские буквы надо было вводить';

        gameState.inputedLetters = letter;

        for(let i = 0; i < gameState.answer.length; i++){
            if(gameState.answer[i] == letter){
                gameState.setCipherWord(i, letter);
                return `В слове найдена буква ${letter}\n` + this.checkWord(gameState.cipherWord, gameState);
            }
        }

        return this.checkWord(gameState.cipherWord, gameState);
    }

    private checkWord(word:string, gameState:GameState){
        if(word == 'гнида') return 'Сам гнида!';
        if(word != gameState.cipherWord){
            return 'Не угадал';
        }
        if(word == gameState.answer){
            gameState.state = 2;
            statesDB.delete(gameState.channelId);

            return `Ответ: ${gameState.answer},\nигра окончена!`;
        }
        return 'Слово: ' + gameState.cipherWord;
    }

    private hasMember(gameState:GameState, user:User):boolean{
        for(let member of gameState.members){
            if(member.id == user.id) return true;
        }
        return false;
    }
}

export const gameController = new GameController();