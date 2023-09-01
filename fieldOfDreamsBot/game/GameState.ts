import { statesDB } from "../game/StateDB";
const fs = require('fs');

export enum state {
    'not created',
    'playing',
    'ending',
}

export class GameState{
    private channelId:string;
    private _question:string = '';
    private _answer:string = '';
    private inputedLetters:string[] = [];
    private _state:state = state["not created"];
    private _cipherWord:string = '';

    public get state(){
        return this._state;
    }
    public set state(state:state){
        this._state = state;
    }

    public get question():string{
        return this._question;
    }

    public get answer():string{
        return this._answer;
    }

    public get cipherWord():string{
        return this._cipherWord;
    }

    constructor(channelId:string){
        this.channelId = channelId;
        this.createQuest(Math.floor(Math.random() * 53));
        this._cipherWord = ''.padStart(this._answer.length, '#');
    }

    private createQuest(line:number){
        this._answer = fs
            .readFileSync(`${__dirname}/answers.txt`, 'utf8')
            .split('\n')[line]
            .toLowerCase()
            .trim();

        this._question = fs
            .readFileSync(`${__dirname}/questions.txt`, 'utf8')
            .split('\n')[line];

    }

    public setLetter(letter:string):string{
        if(this.inputedLetters.includes(letter)) return 'Такая буква уже была введена';
        this.inputedLetters.push(letter);

        for(let i = 0; i < this._answer.length; i++){
            if(this._answer[i] == letter){
                this._cipherWord = this._cipherWord.slice(0, i) + letter + this._cipherWord.slice(i+1);
            }
        }

        return this.checkWord();
    }

    public checkWord(){
        if(this._cipherWord == this._answer){
            this._state = state['ending'];
            statesDB.delete(this.channelId);

            return `Ответ: ${this._answer},\nигра окончена!`;
        }

        return this._cipherWord;
    }
}