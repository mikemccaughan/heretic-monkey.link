import React, { Component } from 'react';

export default class DifficultySelector extends Component {
    render() {
        return (
            <form>
                <div className="fieldset">
                    <div className="legend">Select difficulty</div>
                    <label className="radio">
                        <input type="radio" name="difficulty" value="9" checked={this.props.difficulty === 9} onChange={this.props.difficultyChanged} onClick={this.props.difficultyChanged} />
                        <span className="radio-name">Easy</span><span className="radio-size">(9x9)</span>
                    </label>
                    <label className="radio">
                        <input type="radio" name="difficulty" value="16" checked={this.props.difficulty === 16} onChange={this.props.difficultyChanged} onClick={this.props.difficultyChanged} />
                        <span className="radio-name">Medium</span><span className="radio-size">(16x16)</span>
                    </label>
                    <label className="radio">
                        <input type="radio" name="difficulty" value="30" checked={this.props.difficulty === 30} onChange={this.props.difficultyChanged} onClick={this.props.difficultyChanged} />
                        <span className="radio-name">Expert</span><span className="radio-size">(30x16)</span>  
                    </label>
                    <label className="radio">
                        <input type="radio" name="difficulty" value="?" checked={this.props.difficulty === '?' || this.props.difficulty === null} onChange={this.props.difficultyChanged} onClick={this.props.difficultyChanged} />
                        <span className="radio-name">Custom</span><span className="radio-size">(
                            <input type="number" name="custom-width" className="custom-unit" value={this.props.width} disabled={this.props.difficulty !== '?'} onChange={this.props.widthChanged} maxLength="3" />x
                            <input type="number" name="custom-height" className="custom-unit" value={this.props.height} disabled={this.props.difficulty !== '?'} onChange={this.props.heightChanged} maxLength="3" />
                        )</span>
                    </label>
                </div>
            </form>
        );
    }
}