import { User } from "discord.js";
import { statesDB } from "../game/StateDB";
const crypto = require('crypto').webcrypto;
const fs = require('fs');

export enum state {
    'not created',
    'playing',
    'ending',
}

export class GameState{
    private _channelId:string;
    private _question:string = '';
    private _answer:string = '';
    private _inputedLetters:string[] = [];
    private _state:state = state["not created"];
    private _cipherWord:string = '';
    private _members:User[] = [];

    constructor(channelId:string){
        this._channelId = channelId;
        this.createQuest(this.randomLine());
        this._cipherWord = ''.padStart(this._answer.length, '#');
        statesDB.set(channelId, this);
    }

    private randomLine(){
        let line = crypto.getRandomValues(new Uint8Array(1))[0];
        while(line > 53){
            line = crypto.getRandomValues(new Uint8Array(1))[0]
        }
        return line;
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
    public setCipherWord(position:number, letter:string){
        this._cipherWord = this._cipherWord.slice(0, position) + letter + this._cipherWord.slice(position + 1);
    }


    public get inputedLetters():string[]{
        return this._inputedLetters;
    }
    public set inputedLetters(letter:string){
        this._inputedLetters.push(letter);
    }


    public addMember(user:User){
        this._members.push(user);
    }
    public get members(){
        return this._members;
    }


    public get channelId(){
        return this._channelId;
    }

    public deleteState(channelId:string){
        this._state = state['ending'];
        statesDB.delete(channelId);
    }
}