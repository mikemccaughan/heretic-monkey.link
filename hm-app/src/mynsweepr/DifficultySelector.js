import React, { Component } from 'react';

class DifficultySelector extends Component {
    render() {
        return (
            <form>
                <div className="fieldset">
                    <div className="legend">Select difficulty</div>
                    <label className="radio">
                        <input type="radio" name="difficulty" value="9" checked={this.props.difficulty === '9'} onChange={this.props.difficultyChanged} /> Easy (9x9)
                    </label>
                    <label className="radio">
                        <input type="radio" name="difficulty" value="16" checked={this.props.difficulty === '16'} onChange={this.props.difficultyChanged} /> Medium (16x16)
                    </label>
                    <label className="radio">
                        <input type="radio" name="difficulty" value="30" checked={this.props.difficulty === '30'} onChange={this.props.difficultyChanged} /> Expert (30x16)
                    </label>
                    <label className="radio">
                        <input type="radio" name="difficulty" value="?" checked={this.props.difficulty === '?'} onChange={this.props.difficultyChanged} /> Custom (
                        <input type="number" name="custom-width" className="custom-unit" value={this.props.width} disabled={this.props.difficulty !== '?'} onChange={this.props.widthChanged} />x
                        <input type="number" name="custom-height" className="custom-unit" value={this.props.height} disabled={this.props.difficulty !== '?'} onChange={this.props.heightChanged} />)
                    </label>
                </div>
            </form>
        );
    }
}

export default DifficultySelector;