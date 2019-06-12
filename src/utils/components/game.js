import React from 'react';

import styled from 'styled-components';

import Board from '../store';

const GameCanvas = styled.canvas`
    width: 800px;
    height: 800px;
    padding: 0;
    margin: auto;
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 2px solid black;`;

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = { game: new Board };

        this.handleKeydown = this.handleKeydown.bind(this);
        this.update = this.update.bind(this);
    };

    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        this.update(ctx);
        this.interval = setInterval(() => {
            this.update(ctx);
        }, 500);

        document.addEventListener('keydown', this.handleKeydown);
    };

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeydown);
        clearInterval(this.interval);
    };

    handleKeydown(e)  {
        this.state.game.handleMove(e.keyCode);
    };

    update(cnvs) {
        cnvs.clearRect(0, 0, 800, 800);
        
        if (this.state.game.handleUpdate()) {
            let i = 0;
            let queue = this.state.game.snake.queue;

            while (i < queue.length) {
                cnvs.fillRect(queue[i][0] * 32, queue[i][1] * 32, 32, 32);
                i++;
            };

            let j = 0;
            let fruits = this.state.game.fruits.list;

            while (j < fruits.length) {
                cnvs.fillRect(fruits[j][0] * 32, fruits[j][1] * 32, 32, 32);
                j++;
            };
        } else {
            cnvs.strokeText("YOU NUB", 10 * 32, 12 * 32);
        };
    };

    render() {
        return ( 
            <div>
                <GameCanvas ref="canvas" height="800px" width="800px"/>
            </div>);
    };
};

export default Game;