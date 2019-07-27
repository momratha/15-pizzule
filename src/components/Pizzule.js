import React, { Component } from 'react';
import _ from "lodash";

export default class Pizzule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            positions: _.shuffle(_.range(0, 16))
        };
        this.reshuffle = this.reshuffle.bind(this);
    }

    reshuffle() {
        this.setState({
            positions: _.shuffle(_.range(0, 16))
        });
    }

    updateCellPosition(index) {
        let { positions } = this.state;
        let emptyIndex = positions.indexOf(0);
        let targetIndex = positions.indexOf(index);
        const different = Math.abs(targetIndex - emptyIndex);
        if (different === 1 || different === 4) {
            positions[emptyIndex] = index;
            positions[targetIndex] = 0;
            this.setState({ positions });

            let win = _.every(positions, (value, index, array) => {
                value = value || 16;
                return index === 0 || parseInt(array[index - 1]) <= parseInt(value)
            });

            if (win) {
                window.alert('You Win!!!');
            }
        }
    }

    render() {
        const layout = _.range(0, 16).map(n => {
            const row = Math.floor(n / 4);
            const col = n % 4;
            return [80 * col, 80 * row];
        });
        return (
            <div className="pizzule">
                <button className="btn" onClick={this.reshuffle}>
                    Reset
                </button>

                <div className="game">
                    {
                        this.state.positions.map((i, key) => {
                            let cellClass = key ? "cell" : 'empty cell';
                            let [x, y] = layout[this.state.positions.indexOf(key)];
                            return (
                                <div key={key}
                                    className={cellClass}
                                    onClick={this.updateCellPosition.bind(this, key)}
                                    style={{ transform: `translate3d(${x}px,${y}px,0) scale(1.1)` }}>
                                    {key}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }

}