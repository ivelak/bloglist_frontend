import React from 'react'

class ShowBlog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    toggleVisibility = () => {
        this.setState({ visible: !this.state.visible })
    }

    render() {
        const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
        const showWhenVisible = { display: this.state.visible ? '' : 'none' }

        return (
            <div>
                <div style={hideWhenVisible}>
                    <h3 onClick={this.toggleVisibility}>{this.props.label}</h3>
                </div>
                <div style={showWhenVisible}>

                    <h2 onClick={this.toggleVisibility}>{this.props.label}</h2>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default ShowBlog